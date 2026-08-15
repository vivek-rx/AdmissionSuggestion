import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Download,
  Printer,
  Share2,
  Filter,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  Building2,
  MapPin,
  TrendingUp,
  RotateCcw,
  SlidersHorizontal,
  FileCheck,
  Send,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { initialColleges } from '../data/initialData';
import { College } from '../types';
import { useApp } from '../context/AppContext';
import trustedLogo from '../assets/logo.png';
import confetti from 'canvas-confetti';
import { WhatsAppShareToParents } from '../components/common/WhatsAppShareToParents';

interface ChoiceItem {
  id: string;
  preferenceNumber: number;
  college: College;
  branch: string;
  choiceCode: string;
  tier: 'dream' | 'target' | 'safe';
  expectedCutoff: number;
  studentDiff: number;
  seatType: string;
}

const BRANCH_OPTIONS = [
  'Computer Engineering',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'AI & Machine Learning (AI & ML)',
  'Electronics & Telecommunication (ENTC)',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Automation & Robotics',
  'Instrumentation Engineering'
];

const BRANCH_CODE_MAP: Record<string, string> = {
  'Computer Engineering': '24510',
  'Information Technology (IT)': '24610',
  'Artificial Intelligence & Data Science (AI & DS)': '26310',
  'AI & Machine Learning (AI & ML)': '26410',
  'Electronics & Telecommunication (ENTC)': '37210',
  'Mechanical Engineering': '61210',
  'Electrical Engineering': '29310',
  'Civil Engineering': '19110',
  'Chemical Engineering': '50710',
  'Automation & Robotics': '91110',
  'Instrumentation Engineering': '46610'
};

export const CapPreferenceGeneratorPage: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const { addLead } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  // Form Inputs
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [exam, setExam] = useState<'MHT-CET' | 'JEE Main' | 'DSE'>('MHT-CET');
  const [percentile, setPercentile] = useState<number>(95.5);
  const [category, setCategory] = useState<string>('Open / General (GOPENS)');
  const [homeUniversity, setHomeUniversity] = useState<string>('SPPU (Pune University)');
  const [cityFilter, setCityFilter] = useState<string>('All');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([
    'Computer Engineering',
    'Information Technology (IT)',
    'Artificial Intelligence & Data Science (AI & DS)',
    'AI & Machine Learning (AI & ML)'
  ]);
  const [capRound, setCapRound] = useState<'Round 1' | 'Round 2' | 'Round 3'>('Round 1');

  const [generatedList, setGeneratedList] = useState<ChoiceItem[] | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'dream' | 'target' | 'safe'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  // Toggle Branch selection
  const toggleBranch = (branch: string) => {
    if (selectedBranches.includes(branch)) {
      if (selectedBranches.length > 1) {
        setSelectedBranches(selectedBranches.filter(b => b !== branch));
      }
    } else {
      setSelectedBranches([...selectedBranches, branch]);
    }
  };

  // Generate Option Form Algorithm
  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    // Save lead silently if phone provided
    if (studentPhone && !leadCaptured) {
      addLead({
        name: studentName || 'Student (CAP Generator)',
        phone: studentPhone,
        email: 'N/A',
        exam: `${exam} (${percentile}%ile)`,
        scorePercentile: `${percentile}%ile`,
        preferredBranch: selectedBranches.slice(0, 2).join(', '),
        targetLocation: cityFilter === 'All' ? 'Maharashtra' : cityFilter,
        message: `Generated CAP Option Form: ${category} | ${homeUniversity}`
      });
      setLeadCaptured(true);
    }

    setTimeout(() => {
      // Category offset logic
      let catBonus = 0;
      let seatTypeSuffix = 'GOPENS';

      if (category.includes('OBC')) {
        catBonus = 1.3;
        seatTypeSuffix = 'GOBCO';
      } else if (category.includes('EWS')) {
        catBonus = 1.0;
        seatTypeSuffix = 'EWS';
      } else if (category.includes('TFWS')) {
        catBonus = -0.5; // TFWS has higher cutoffs
        seatTypeSuffix = 'TFWS';
      } else if (category.includes('SC')) {
        catBonus = 5.0;
        seatTypeSuffix = 'GSCO';
      } else if (category.includes('ST')) {
        catBonus = 8.5;
        seatTypeSuffix = 'GSTO';
      } else if (category.includes('VJ/NT') || category.includes('SBC')) {
        catBonus = 3.5;
        seatTypeSuffix = 'GVJO';
      }

      const effectivePercentile = percentile + catBonus;

      // Filter colleges by city
      const relevantColleges = initialColleges.filter(col => {
        if (cityFilter !== 'All' && col.city !== cityFilter) return false;
        return true;
      });

      // Build combinations of college + selected branches
      const rawChoices: {
        college: College;
        branch: string;
        choiceCode: string;
        expectedCutoff: number;
        studentDiff: number;
        tier: 'dream' | 'target' | 'safe';
        seatType: string;
      }[] = [];

      relevantColleges.forEach(col => {
        const baseCutoff = parseFloat(String(col.cutoffPercentile || '90.0')) || 90.0;
        const dteCode = col.dteCode || col.code || '6000';

        selectedBranches.forEach(branch => {
          // Adjust cutoff per branch popularity
          let branchDelta = 0;
          if (branch.includes('Computer')) branchDelta = 0.0;
          else if (branch.includes('IT')) branchDelta = -0.6;
          else if (branch.includes('Artificial') || branch.includes('AI')) branchDelta = -0.9;
          else if (branch.includes('ENTC')) branchDelta = -2.8;
          else if (branch.includes('Mechanical')) branchDelta = -5.5;
          else if (branch.includes('Electrical')) branchDelta = -4.8;
          else if (branch.includes('Civil')) branchDelta = -7.0;

          const collegeBranchCutoff = Math.max(50, Math.min(99.9, baseCutoff + branchDelta));
          const studentDiff = effectivePercentile - collegeBranchCutoff;

          // 3-Tier Classification
          let tier: 'dream' | 'target' | 'safe' = 'target';
          if (studentDiff < -0.6) {
            tier = 'dream';
          } else if (studentDiff >= -0.6 && studentDiff <= 2.2) {
            tier = 'target';
          } else {
            tier = 'safe';
          }

          const branchSuffix = BRANCH_CODE_MAP[branch] || '24510';
          const choiceCode = `${dteCode}${branchSuffix}`;

          rawChoices.push({
            college: col,
            branch,
            choiceCode,
            expectedCutoff: parseFloat(collegeBranchCutoff.toFixed(2)),
            studentDiff: parseFloat(studentDiff.toFixed(2)),
            tier,
            seatType: seatTypeSuffix
          });
        });
      });

      // Strategy Sorting:
      // Tier 1: Dream choices (Highest cutoffs first) - Top 4 to 6 choices
      // Tier 2: Target choices (Realistic near score) - Next 8 to 12 choices
      // Tier 3: Safe choices (Reliable safety backups) - Remaining 6 to 10 choices
      const dreams = rawChoices
        .filter(c => c.tier === 'dream')
        .sort((a, b) => b.expectedCutoff - a.expectedCutoff)
        .slice(0, 6);

      const targets = rawChoices
        .filter(c => c.tier === 'target')
        .sort((a, b) => b.expectedCutoff - a.expectedCutoff)
        .slice(0, 12);

      const safes = rawChoices
        .filter(c => c.tier === 'safe')
        .sort((a, b) => b.expectedCutoff - a.expectedCutoff)
        .slice(0, 8);

      // Assemble into final structured list
      const combined = [...dreams, ...targets, ...safes];

      const finalList: ChoiceItem[] = combined.map((item, index) => ({
        id: `choice-${index + 1}-${item.choiceCode}`,
        preferenceNumber: index + 1,
        college: item.college,
        branch: item.branch,
        choiceCode: item.choiceCode,
        tier: item.tier,
        expectedCutoff: item.expectedCutoff,
        studentDiff: item.studentDiff,
        seatType: item.seatType
      }));

      setGeneratedList(finalList);
      setIsGenerating(false);

      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch (err) {}
    }, 600);
  };

  // Move Preference Up
  const moveUp = (index: number) => {
    if (!generatedList || index === 0) return;
    const updated = [...generatedList];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    // re-number
    const renumbered = updated.map((item, idx) => ({ ...item, preferenceNumber: idx + 1 }));
    setGeneratedList(renumbered);
  };

  // Move Preference Down
  const moveDown = (index: number) => {
    if (!generatedList || index === generatedList.length - 1) return;
    const updated = [...generatedList];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    // re-number
    const renumbered = updated.map((item, idx) => ({ ...item, preferenceNumber: idx + 1 }));
    setGeneratedList(renumbered);
  };

  // Remove Choice
  const removeChoice = (index: number) => {
    if (!generatedList) return;
    const updated = generatedList.filter((_, idx) => idx !== index);
    const renumbered = updated.map((item, idx) => ({ ...item, preferenceNumber: idx + 1 }));
    setGeneratedList(renumbered);
  };

  // Filtered List by Tab
  const displayedChoices = useMemo(() => {
    if (!generatedList) return [];
    if (activeTab === 'all') return generatedList;
    return generatedList.filter(item => item.tier === activeTab);
  }, [generatedList, activeTab]);

  // Counts
  const counts = useMemo(() => {
    if (!generatedList) return { dream: 0, target: 0, safe: 0, total: 0 };
    return {
      dream: generatedList.filter(i => i.tier === 'dream').length,
      target: generatedList.filter(i => i.tier === 'target').length,
      safe: generatedList.filter(i => i.tier === 'safe').length,
      total: generatedList.length
    };
  }, [generatedList]);

  // Print Option Form
  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Review Message
  const handleWhatsAppReview = () => {
    if (!generatedList || generatedList.length === 0) return;
    const topChoices = generatedList
      .slice(0, 5)
      .map(c => `${c.preferenceNumber}. ${c.college.name} (${c.branch})`)
      .join('%0A');

    const message = `Hello Admission Suggestion Team,%0A%0AI used your CAP Option Form Generator and want an expert review for my Maharashtra Engineering admission:%0A%0AName: ${studentName || 'Student'}%0AScore: ${percentile}%ile (${exam})%0ACategory: ${category}%0ARegion: ${homeUniversity}%0A%0ATop 5 Preferences:%0A${topChoices}%0A%0APlease verify my preference strategy and suggest if any modifications are needed.`;
    
    window.open(`https://wa.me/919860777069?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-8 pb-20 font-sans">
      {/* Printable Area - Styles specifically for window.print() */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-option-form, #printable-option-form * {
            visibility: visible;
          }
          #printable-option-form {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#00A3FF] text-xs font-extrabold uppercase tracking-wider mb-4 font-heading shadow-sm">
            <Sparkles className="w-4 h-4 text-[#00A3FF]" />
            Official DTE Maharashtra CAP 2026 Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-heading">
            CAP Round <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] to-[#0284C7]">Option Form & Preference</span> Generator
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 font-medium">
            Generate your personalized, 3-Tier (Dream, Target, Safe) College Preference List with 9-digit DTE Choice Codes to avoid seat disqualification in CAP Round 1, 2 & 3.
          </p>
        </div>

        {/* Two-Column Grid: Form Inputs vs Generated Preference List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00A3FF] flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 font-heading">Candidate Parameters</h2>
                  <p className="text-xs text-slate-500">Configure your score & seat preferences</p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-heading">
                CAP 2026-27
              </span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Optional Student Info for direct PDF export & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:bg-white font-medium"
                  />
                </div>
              </div>

              {/* Exam & Score Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                    Select Exam
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    {[
                      { key: 'MHT-CET' as const, label: 'MHT-CET' },
                      { key: 'JEE Main' as const, label: 'JEE Main' },
                      { key: 'DSE' as const, label: 'DSE (Diploma Engg)' }
                    ].map(ex => (
                      <button
                        key={ex.key}
                        type="button"
                        onClick={() => setExam(ex.key)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all font-heading ${
                          exam === ex.key
                            ? 'bg-[#00ADEF] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 font-heading">Percentile Score:</span>
                    <span className="text-xl font-black text-[#00A3FF] font-heading bg-sky-50 px-3 py-0.5 rounded-lg border border-sky-200">
                      {percentile.toFixed(2)} %ile
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50.0"
                    max="99.99"
                    step="0.05"
                    value={percentile}
                    onChange={(e) => setPercentile(parseFloat(e.target.value))}
                    className="w-full accent-[#00A3FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 font-mono">
                    <span>50.00 %ile</span>
                    <span>75.00 %ile</span>
                    <span>90.00 %ile</span>
                    <span>99.99 %ile</span>
                  </div>
                </div>
              </div>

              {/* Category & Home University */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Category / Quota
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] font-heading"
                  >
                    <option value="Open / General (GOPENS)">Open / General (GOPENS)</option>
                    <option value="OBC (Other Backward Class)">OBC (GOBCO)</option>
                    <option value="EWS (10% Economically Weaker)">EWS Quota</option>
                    <option value="TFWS (100% Tuition Fee Waiver)">TFWS (100% Waiver)</option>
                    <option value="SC (Scheduled Caste)">SC (GSCO)</option>
                    <option value="ST (Scheduled Tribe)">ST (GSTO)</option>
                    <option value="VJ / NT (Vimukta Jati / Nomadic)">VJ / NT Quota</option>
                    <option value="SBC (Special Backward Class)">SBC Quota</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Home University / Region
                  </label>
                  <select
                    value={homeUniversity}
                    onChange={(e) => setHomeUniversity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] font-heading"
                  >
                    <option value="SPPU (Pune University)">SPPU (Pune University)</option>
                    <option value="Mumbai University (MU)">Mumbai University (MU)</option>
                    <option value="Shivaji University (Kolhapur/Sangli)">Shivaji University (Kolhapur)</option>
                    <option value="DBATU / Other Maharashtra Universities">DBATU / Other Universities</option>
                    <option value="OMS (Outside Maharashtra Candidate)">OMS (All India Quota)</option>
                  </select>
                </div>
              </div>

              {/* City Filter & CAP Round */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    College Location
                  </label>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] font-heading"
                  >
                    <option value="All">All Maharashtra</option>
                    <option value="Pune">Pune Institutes Only</option>
                    <option value="Mumbai">Mumbai & Navi Mumbai</option>
                    <option value="Sangli">Sangli & Western MH</option>
                    <option value="Nagpur">Nagpur & Vidarbha</option>
                    <option value="Nashik">Nashik & North MH</option>
                    <option value="Chhatrapati Sambhajinagar">Sambhajinagar / Marathwada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Target CAP Round
                  </label>
                  <select
                    value={capRound}
                    onChange={(e) => setCapRound(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] font-heading"
                  >
                    <option value="Round 1">CAP Round 1 (Initial Allotment)</option>
                    <option value="Round 2">CAP Round 2 (Betterment / Shift)</option>
                    <option value="Round 3">CAP Round 3 (Final Mop-up)</option>
                  </select>
                </div>
              </div>

              {/* Branch Multi-Select Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-heading">
                  Eligible Branch Preferences ({selectedBranches.length} Selected)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {BRANCH_OPTIONS.map(branch => {
                    const isSelected = selectedBranches.includes(branch);
                    return (
                      <button
                        key={branch}
                        type="button"
                        onClick={() => toggleBranch(branch)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border font-heading flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-[#00A3FF]" />}
                        {branch}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-heading disabled:opacity-75"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Calculating 3-Tier Cutoffs...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate 3-Tier Option Form
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Generated Option Form & Preferences (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {!generatedList ? (
              // Empty State Illustration
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-50 text-[#00A3FF] flex items-center justify-center shadow-inner">
                  <FileCheck className="w-10 h-10" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                    Ready to Generate Your Strategy
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Adjust your percentile score and preferences on the left, then click <strong>"Generate 3-Tier Option Form"</strong> to build your customized college sequence.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                  <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 text-left">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 mb-1" />
                    <h4 className="text-xs font-extrabold text-rose-900 font-heading">1. Dream Tier (1-5)</h4>
                    <p className="text-[11px] text-rose-700 mt-0.5">Top-tier reach colleges for lucky allotment</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-left">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mb-1" />
                    <h4 className="text-xs font-extrabold text-amber-900 font-heading">2. Target Tier (6-15)</h4>
                    <p className="text-[11px] text-amber-700 mt-0.5">Realistic matches for Round 1 & 2</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-left">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
                    <h4 className="text-xs font-extrabold text-emerald-900 font-heading">3. Safe Tier (16+)</h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">Guaranteed backup safety net</p>
                  </div>
                </div>
              </div>
            ) : (
              // Generated Preference List Table
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                
                {/* List Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                        Your CAP Option Form
                      </h2>
                      <span className="bg-sky-50 text-[#00A3FF] border border-sky-200 text-xs font-extrabold px-2.5 py-0.5 rounded-full font-heading">
                        {generatedList.length} Preferences
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Drag or use arrows to re-order priority before final CET Cell portal submission
                    </p>
                  </div>

                  {/* Print & WhatsApp Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handlePrint}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all font-heading"
                      title="Print or Save PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Form
                    </button>
                    <button
                      onClick={handleWhatsAppReview}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all font-heading"
                      title="Get WhatsApp Review"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Counsellor Review
                    </button>
                  </div>
                </div>

                {/* 3-Tier Filter Badges */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-heading shrink-0 ${
                      activeTab === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({counts.total})
                  </button>
                  <button
                    onClick={() => setActiveTab('dream')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-heading shrink-0 flex items-center gap-1.5 ${
                      activeTab === 'dream'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    Dream Choices ({counts.dream})
                  </button>
                  <button
                    onClick={() => setActiveTab('target')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-heading shrink-0 flex items-center gap-1.5 ${
                      activeTab === 'target'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    Target Choices ({counts.target})
                  </button>
                  <button
                    onClick={() => setActiveTab('safe')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-heading shrink-0 flex items-center gap-1.5 ${
                      activeTab === 'safe'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    Safe Choices ({counts.safe})
                  </button>
                </div>

                {/* Preferences Items List */}
                <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {displayedChoices.map((item, index) => {
                      const actualIndex = generatedList.findIndex(g => g.id === item.id);
                      
                      let tierBadgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
                      let tierDotColor = 'bg-amber-500';
                      let tierLabel = 'Target Match';

                      if (item.tier === 'dream') {
                        tierBadgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
                        tierDotColor = 'bg-rose-500';
                        tierLabel = 'Dream Choice';
                      } else if (item.tier === 'safe') {
                        tierBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                        tierDotColor = 'bg-emerald-500';
                        tierLabel = 'Safe Backup';
                      }

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-[#00A3FF]/40 transition-all hover:shadow-md group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          {/* Left: Preference Number + College Info */}
                          <div className="flex items-start gap-3.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0 font-mono shadow-xs">
                              #{item.preferenceNumber}
                            </div>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-extrabold text-slate-900 text-sm font-heading">
                                  {item.college.name}
                                </h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 font-heading ${tierBadgeColor}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${tierDotColor}`} />
                                  {tierLabel}
                                </span>
                              </div>

                              <p className="text-xs font-bold text-[#00A3FF]">
                                {item.branch}
                              </p>

                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-medium">
                                <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                                  DTE Code: <strong>{item.choiceCode}</strong>
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  {item.college.city}
                                </span>
                                <span>
                                  Est. Cutoff: <strong>{item.expectedCutoff}%ile</strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Action Buttons (Move up, down, remove) */}
                          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => moveUp(actualIndex)}
                              disabled={actualIndex === 0}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-all"
                              title="Move Priority Up"
                            >
                              <ArrowUpDown className="w-3.5 h-3.5 rotate-180" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveDown(actualIndex)}
                              disabled={actualIndex === generatedList.length - 1}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-all"
                              title="Move Priority Down"
                            >
                              <ArrowUpDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeChoice(actualIndex)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 transition-all"
                              title="Remove Choice"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Bottom Assistance Card */}
                {/* Send This to Dad/Mom WhatsApp Forwarder */}
                <WhatsAppShareToParents
                  studentName={studentName || 'Candidate'}
                  exam={exam}
                  percentile={percentile}
                  branch={selectedBranches.join(' / ') || 'Engineering Branches'}
                  category={category}
                  colleges={generatedList.map(item => ({
                    name: item.college.name,
                    city: item.college.city,
                    fees: item.college.fees,
                    cutoff: item.expectedCutoff,
                    probability: item.tier === 'safe' ? 'Safe' : item.tier === 'target' ? 'Moderate' : 'Ambitious',
                    courses: [item.branch]
                  }))}
                />

                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00A3FF] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                        Not sure which college you should choose as Preference #1?
                      </h4>
                      <p className="text-xs text-slate-600 font-normal">
                        Auto-Freeze rules apply if Choice No. 1 is allotted. Get your 1-to-300 Choice Code sequence reviewed by our senior mentors.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenConsultation}
                    className="px-5 py-2.5 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider font-heading shrink-0 shadow-sm transition-all"
                  >
                    Talk to a Counsellor
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Printable Official Option Form Template (Hidden on Screen, Appears on Print) */}
        <div id="printable-option-form" className="hidden print:block font-sans text-black">
          {/* Official Letterhead Header with Logo */}
          <div className="border-b-2 border-slate-900 pb-4 mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={trustedLogo}
                alt="Admission Suggestion"
                className="h-16 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">
                  Admission Suggestion
                </h1>
                <p className="text-[11px] font-bold text-slate-600">
                  Maharashtra's #1 Trusted Educational & CAP Round Counselling Center
                </p>
                <p className="text-[10px] text-slate-500">
                  Head Office: Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Near Pune Station | Mob: +91 9860 777 069
                </p>
              </div>
            </div>
            
            <div className="text-right border-l-2 border-slate-200 pl-3">
              <span className="inline-block bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Official Strategic Report
              </span>
              <p className="text-[10px] text-slate-500 font-mono mt-1">
                Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="text-center mb-3">
            <h2 className="text-sm font-black uppercase text-slate-800 tracking-wide">
              MHT-CET & JEE Centralized Admission Process (CAP) — Provisional Option Form 2026-27
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs border border-slate-900 p-2.5 mb-3.5 bg-slate-50/50">
            <div><strong>Candidate Name:</strong> {studentName || 'PROVISIONAL CANDIDATE'}</div>
            <div><strong>Contact / WhatsApp:</strong> {studentPhone || 'N/A'}</div>
            <div><strong>Exam & Percentile:</strong> {exam} — <span className="font-bold text-blue-800">{percentile.toFixed(2)} %ile</span></div>
            <div><strong>Applied Category / Quota:</strong> {category}</div>
            <div><strong>Home University / Region:</strong> {homeUniversity}</div>
            <div><strong>Target Round:</strong> {capRound}</div>
          </div>

          <table className="w-full text-xs border-collapse border border-slate-900">
            <thead>
              <tr className="bg-slate-100 font-bold">
                <th className="border border-slate-900 p-1 text-center w-10">Pref #</th>
                <th className="border border-slate-900 p-1 text-left font-mono">DTE Choice Code</th>
                <th className="border border-slate-900 p-1 text-left">Institute Name</th>
                <th className="border border-slate-900 p-1 text-left">Course / Branch</th>
                <th className="border border-slate-900 p-1 text-center">Location</th>
                <th className="border border-slate-900 p-1 text-center">Tier</th>
              </tr>
            </thead>
            <tbody>
              {generatedList?.map((item) => (
                <tr key={item.id}>
                  <td className="border border-slate-900 p-1 text-center font-bold">{item.preferenceNumber}</td>
                  <td className="border border-slate-900 p-1 font-mono font-semibold">{item.choiceCode}</td>
                  <td className="border border-slate-900 p-1">{item.college.name}</td>
                  <td className="border border-slate-900 p-1">{item.branch}</td>
                  <td className="border border-slate-900 p-1 text-center">{item.college.city}</td>
                  <td className="border border-slate-900 p-1 text-center capitalize font-semibold">
                    {item.tier === 'dream' ? 'Dream' : item.tier === 'target' ? 'Target' : 'Safe'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-[10px] border-t border-slate-900 pt-2 flex justify-between items-end">
            <div>
              <p className="font-semibold text-slate-800">
                Admission Suggestion • Empowering 15,000+ Maharashtra Engineering Aspirants
              </p>
              <p className="text-slate-500">
                For in-person verification or management/institutional seats: Call +91 9860 777 069 / Visit Sohrab Hall, Pune.
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">Authorized Signature / Stamp</p>
              <div className="h-6" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
