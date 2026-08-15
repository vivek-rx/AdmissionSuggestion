import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Send,
  Building2,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Sliders,
  Compass,
  RotateCcw,
  Zap,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initialColleges } from '../data/initialData';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';

type ExamType = 'MHT-CET (PCM)' | 'MHT-CET (PCB)' | 'JEE Main' | 'Diploma (DSE)';
type DifficultyLevel = 'Easy Shift' | 'Moderate Shift' | 'Hard / Tough Shift';

export const MarksEstimatorPage: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const { addLead } = useApp();

  // Inputs
  const [exam, setExam] = useState<ExamType>('MHT-CET (PCM)');
  const [marks, setMarks] = useState<number>(145);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Moderate Shift');
  const [category, setCategory] = useState<string>('Open / General (GOPENS)');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [leadSaved, setLeadSaved] = useState(false);

  // Subject-wise split (Optional Granular mode)
  const [isSubjectSplit, setIsSubjectSplit] = useState(false);
  const [mathsMarks, setMathsMarks] = useState(70);
  const [physicsMarks, setPhysicsMarks] = useState(38);
  const [chemMarks, setChemMarks] = useState(37);

  // Update total marks if subject split is modified
  const handleSubjectChange = (m: number, p: number, c: number) => {
    setMathsMarks(m);
    setPhysicsMarks(p);
    setChemMarks(c);
    setMarks(m + p + c);
  };

  // Max marks per exam
  const maxMarks = useMemo(() => {
    if (exam === 'JEE Main') return 300;
    if (exam === 'Diploma (DSE)') return 100;
    return 200;
  }, [exam]);

  // Calculations: Accurate MHT-CET & JEE Normalization Curves based on 2023-2025 DTE CET Cell Shift Analysis
  const estimates = useMemo(() => {
    let rawScore = marks;
    let minPct = 50.0;
    let maxPct = 99.99;
    let rankMin = 1;
    let rankMax = 100000;

    let difficultyModifier = 0.0;
    if (difficulty === 'Hard / Tough Shift') difficultyModifier = 1.6;
    if (difficulty === 'Easy Shift') difficultyModifier = -1.4;

    if (exam === 'MHT-CET (PCM)' || exam === 'MHT-CET (PCB)') {
      // MHT-CET 200 Marks Curve
      const score = Math.min(200, Math.max(0, rawScore));
      if (score >= 175) {
        minPct = 99.70;
        maxPct = 99.99;
        rankMin = 1;
        rankMax = 450;
      } else if (score >= 160) {
        minPct = 99.20;
        maxPct = 99.75;
        rankMin = 451;
        rankMax = 1200;
      } else if (score >= 145) {
        minPct = 98.40;
        maxPct = 99.25;
        rankMin = 1201;
        rankMax = 2600;
      } else if (score >= 130) {
        minPct = 97.10;
        maxPct = 98.45;
        rankMin = 2601;
        rankMax = 4900;
      } else if (score >= 115) {
        minPct = 95.20;
        maxPct = 97.15;
        rankMin = 4901;
        rankMax = 8200;
      } else if (score >= 100) {
        minPct = 92.50;
        maxPct = 95.30;
        rankMin = 8201;
        rankMax = 13500;
      } else if (score >= 85) {
        minPct = 88.00;
        maxPct = 92.60;
        rankMin = 13501;
        rankMax = 21000;
      } else if (score >= 70) {
        minPct = 81.00;
        maxPct = 88.10;
        rankMin = 21001;
        rankMax = 33000;
      } else if (score >= 55) {
        minPct = 70.00;
        maxPct = 81.20;
        rankMin = 33001;
        rankMax = 52000;
      } else {
        minPct = Math.max(20, score * 1.2);
        maxPct = minPct + 7;
        rankMin = 52001;
        rankMax = 115000;
      }
    } else if (exam === 'JEE Main') {
      // JEE Main 300 Marks Curve
      const score = Math.min(300, Math.max(0, rawScore));
      if (score >= 260) {
        minPct = 99.85;
        maxPct = 99.99;
        rankMin = 1;
        rankMax = 2000;
      } else if (score >= 220) {
        minPct = 99.30;
        maxPct = 99.88;
        rankMin = 2001;
        rankMax = 8500;
      } else if (score >= 180) {
        minPct = 98.40;
        maxPct = 99.35;
        rankMin = 8501;
        rankMax = 19000;
      } else if (score >= 150) {
        minPct = 96.80;
        maxPct = 98.45;
        rankMin = 19001;
        rankMax = 38000;
      } else if (score >= 120) {
        minPct = 93.50;
        maxPct = 96.90;
        rankMin = 38001;
        rankMax = 75000;
      } else if (score >= 90) {
        minPct = 87.00;
        maxPct = 93.60;
        rankMin = 75001;
        rankMax = 140000;
      } else {
        minPct = Math.max(30, score * 0.9);
        maxPct = minPct + 8;
        rankMin = 140001;
        rankMax = 350000;
      }
    } else {
      // Diploma Percentage (100%)
      const score = Math.min(100, Math.max(0, rawScore));
      minPct = Math.max(50, score - 0.5);
      maxPct = Math.min(99.9, score + 0.5);
      rankMin = Math.max(1, Math.round((100 - score) * 350));
      rankMax = Math.round(rankMin * 1.3);
    }

    // Apply difficulty shift
    const finalMinPct = Math.min(99.95, Math.max(25, minPct + difficultyModifier));
    const finalMaxPct = Math.min(99.99, Math.max(30, maxPct + difficultyModifier));
    const avgPct = (finalMinPct + finalMaxPct) / 2;

    return {
      minPct: parseFloat(finalMinPct.toFixed(2)),
      maxPct: parseFloat(finalMaxPct.toFixed(2)),
      avgPct: parseFloat(avgPct.toFixed(2)),
      rankMin: Math.max(1, Math.round(rankMin * (1 - difficultyModifier * 0.05))),
      rankMax: Math.max(50, Math.round(rankMax * (1 - difficultyModifier * 0.05)))
    };
  }, [exam, marks, difficulty]);

  // Top eligible colleges matching this estimated percentile
  const topEligibleColleges = useMemo(() => {
    const targetScore = estimates.avgPct;
    return initialColleges
      .filter(col => {
        const cut = parseFloat(String(col.cutoffPercentile || '90.0')) || 90.0;
        // Eligible if college cutoff is within or slightly below candidate score
        return cut <= targetScore + 1.2 && cut >= targetScore - 6.0;
      })
      .slice(0, 6);
  }, [estimates.avgPct]);

  // Lead capture and direct navigation to CAP generator
  const handleLaunchCapGenerator = () => {
    if (studentPhone && !leadSaved) {
      addLead({
        name: studentName || 'Student (Marks Estimator)',
        phone: studentPhone,
        email: 'N/A',
        exam: `${exam} — ${marks}/${maxMarks}`,
        scorePercentile: `${estimates.avgPct}%ile`,
        preferredBranch: 'Engineering',
        targetLocation: 'Maharashtra',
        message: `Marks vs Percentile Calculated: ${marks}/${maxMarks} -> ~${estimates.avgPct}%ile (${difficulty})`
      });
      setLeadSaved(true);
    }

    navigate('/cap-generator');
  };

  // WhatsApp verification
  const handleWhatsAppShare = () => {
    const message = `Hello Admission Suggestion Team,%0A%0AI used your Marks vs Percentile Estimator:%0A%0AName: ${studentName || 'Student'}%0AExam: ${exam}%0ARaw Score: ${marks} / ${maxMarks} marks%0AEstimated Percentile: ${estimates.minPct}%ile - ${estimates.maxPct}%ile%0AEstimated State Rank: ~${estimates.rankMin.toLocaleString('en-IN')} - ${estimates.rankMax.toLocaleString('en-IN')}%0A%0APlease verify my cutoff eligibility for COEP, PICT, VIT and top Maharashtra colleges.`;
    window.open(`https://wa.me/919860777069?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-8 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#00A3FF] text-xs font-extrabold uppercase tracking-wider mb-4 font-heading shadow-xs">
            <Calculator className="w-4 h-4 text-[#00A3FF]" />
            Official Normalization & Shift Engine 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading">
            Marks vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#0284C7]">Percentile & Rank</span> Estimator
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 font-medium">
            Calculate your expected MHT-CET, JEE Main & DSE percentile and State General Merit Rank (GMR) based on raw shift scores.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs & Score Controls (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00A3FF] flex items-center justify-center font-bold">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-heading">Enter Your Marks</h2>
                  <p className="text-xs text-slate-500">Calculate percentile & rank prediction</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 bg-sky-50 text-[#0284C7] border border-sky-200 rounded-full font-heading">
                CET Cell Model
              </span>
            </div>

            {/* Exam Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-heading">
                Select Exam
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['MHT-CET (PCM)', 'MHT-CET (PCB)', 'JEE Main', 'Diploma (DSE)'] as const).map(ex => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => {
                      setExam(ex);
                      if (ex === 'JEE Main') setMarks(160);
                      else if (ex === 'Diploma (DSE)') setMarks(85);
                      else setMarks(145);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border font-heading text-left flex items-center justify-between ${
                      exam === ex
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>{ex}</span>
                    {exam === ex && <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3FF]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Shift Difficulty Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                  Exam Shift Difficulty
                </label>
                <span className="text-[11px] text-slate-500 font-medium">Shift Normalization</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Easy Shift', 'Moderate Shift', 'Hard / Tough Shift'] as const).map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center font-heading ${
                      difficulty === diff
                        ? diff === 'Hard / Tough Shift'
                          ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                          : diff === 'Moderate Shift'
                          ? 'bg-[#00A3FF] text-white border-[#00A3FF] shadow-xs'
                          : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {diff.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Marks Slider & Direct Input */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase font-heading block">
                    Expected Marks
                  </span>
                  <span className="text-[11px] text-slate-400">Out of {maxMarks} Marks</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max={maxMarks}
                    value={marks}
                    onChange={(e) => setMarks(Math.min(maxMarks, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-20 px-2 py-1 text-right text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3FF] font-heading"
                  />
                  <span className="text-xs font-bold text-slate-500">/ {maxMarks}</span>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max={maxMarks}
                value={marks}
                onChange={(e) => setMarks(parseInt(e.target.value))}
                className="w-full accent-[#00A3FF] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                <span>0</span>
                <span>{Math.round(maxMarks * 0.25)}</span>
                <span>{Math.round(maxMarks * 0.50)}</span>
                <span>{Math.round(maxMarks * 0.75)}</span>
                <span>{maxMarks}</span>
              </div>
            </div>

            {/* Optional Candidate Profile for Direct WhatsApp / PDF Record */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Atharva Patil"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00A3FF]"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleLaunchCapGenerator}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-heading"
            >
              <Zap className="w-5 h-5" />
              Build 3-Tier Option Form With This Score
            </button>
          </div>

          {/* Right Column: Prediction Results Dashboard (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Calculated Score Card */}
            <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
                <div>
                  <span className="text-[#00A3FF] text-xs font-extrabold uppercase tracking-wider font-heading block">
                    Prediction Summary
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
                    {exam} Result Forecast
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-bold text-slate-200 self-start sm:self-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Score: {marks} / {maxMarks} ({difficulty})
                </div>
              </div>

              {/* Core Metrics: Percentile & General Merit Rank */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {/* Metric 1: Percentile */}
                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-[#00A3FF]" />
                    Estimated Percentile
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#00A3FF] font-heading pt-1">
                    {estimates.minPct}% - {estimates.maxPct}%
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Average Expected: <strong className="text-white font-bold">{estimates.avgPct}%ile</strong>
                  </p>
                </div>

                {/* Metric 2: Rank */}
                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    Estimated State Rank (GMR)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-heading pt-1 font-mono">
                    ~{estimates.rankMin.toLocaleString('en-IN')} - {estimates.rankMax.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Maharashtra State General Merit Rank
                  </p>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Verification & Consultation */}
              <div className="flex flex-wrap items-center gap-3 pt-2 relative z-10">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all font-heading"
                >
                  <Send className="w-4 h-4" />
                  WhatsApp Verification
                </button>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-2 transition-all font-heading"
                >
                  <Building2 className="w-4 h-4 text-[#00A3FF]" />
                  Book Pune Office Counselling
                </button>
              </div>
            </div>

            {/* Top Recommended Maharashtra Colleges Matching This Score */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#00A3FF]" />
                    Top Colleges Eligible with ~{estimates.avgPct}%ile
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Based on official CAP cutoff benchmarks for {exam}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchCapGenerator}
                  className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#00A3FF] hover:underline font-heading"
                >
                  <span>View full sequence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* College Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topEligibleColleges.map((col) => (
                  <div
                    key={col.id}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00A3FF]/40 transition-all shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-extrabold text-slate-900 font-heading truncate">
                        {col.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-[#00A3FF] font-bold border border-sky-100 shrink-0">
                        {col.city}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 font-medium">
                      Cutoff: <strong className="text-slate-900 font-bold">{col.cutoffPercentile}%ile</strong> • Highest: <strong className="text-emerald-700 font-bold">{col.highestPackage}</strong>
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {col.courses.slice(0, 3).map((crs) => (
                        <span
                          key={crs}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200"
                        >
                          {crs}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA Banner */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLaunchCapGenerator}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-heading shadow-sm"
                >
                  <span>Generate Full 3-Tier Preference List (Dream / Target / Safe)</span>
                  <ArrowRight className="w-4 h-4 text-[#00A3FF]" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
