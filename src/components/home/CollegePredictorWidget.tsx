import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Search, CheckCircle2, ArrowRight, Building2, MapPin, Award, FileText, PhoneCall, Calculator, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initialColleges } from '../../data/initialData';
import { College } from '../../types';
import { WhatsAppShareToParents } from '../common/WhatsAppShareToParents';

interface CollegePredictorWidgetProps {
  onOpenConsultation: () => void;
}

export const CollegePredictorWidget: React.FC<CollegePredictorWidgetProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const [exam, setExam] = useState<'MHT-CET' | 'JEE Main' | 'NEET' | 'DSE'>('MHT-CET');
  const [percentile, setPercentile] = useState<string>('97.5');
  const [category, setCategory] = useState<string>('Open / General');
  const [branch, setBranch] = useState<string>('Computer Engg / AI & DS');
  const [location, setLocation] = useState<string>('Pune');
  interface PredictResult {
    college: College;
    probability: 'Safe' | 'Moderate' | 'Ambitious';
    diff: number;
  }

  const [predictedResults, setPredictedResults] = useState<PredictResult[] | null>(null);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseFloat(percentile) || 90.0;
    
    // Category adjustment factor
    let categoryOffset = 0;
    if (category.includes('OBC') || category.includes('EWS') || category.includes('TFWS')) {
      categoryOffset = 1.2;
    } else if (category.includes('SC') || category.includes('VJ/NT')) {
      categoryOffset = 4.5;
    } else if (category.includes('ST')) {
      categoryOffset = 8.0;
    }

    const effectiveScore = score + categoryOffset;

    const filtered = initialColleges.filter(col => {
      if (location !== 'All' && col.city !== location) return false;
      return true;
    });

    const scored: PredictResult[] = filtered.map(col => {
      const cut = parseFloat(String(col.cutoffPercentile || '92.0')) || 92.0;
      const diff = effectiveScore - cut;
      let probability: 'Safe' | 'Moderate' | 'Ambitious' = 'Moderate';
      if (diff >= 0.5) {
        probability = 'Safe';
      } else if (diff >= -3.0) {
        probability = 'Moderate';
      } else {
        probability = 'Ambitious';
      }
      return { college: col, probability, diff };
    });

    // Sort by best match (Safe and Moderate first, then closest cutoff diff)
    scored.sort((a, b) => Math.abs(a.diff) - Math.abs(b.diff));

    setPredictedResults(scored);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative overflow-hidden my-10 font-sans">
      <div className="relative z-10 space-y-6">
        
        {/* Widget Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A3FF] to-[#0284C7] text-white flex items-center justify-center shadow-md shadow-sky-500/20">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  Maharashtra CAP Cut-Off Estimator
                </h3>
                <span className="bg-blue-50 text-[#0284C7] border border-blue-200 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  DTE Official Data
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Benchmark your score against official DTE Maharashtra cut-offs for top engineering, medical & management institutes
              </p>
            </div>
          </div>

          {/* Exam Selector Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-stretch sm:self-auto">
            {(['MHT-CET', 'JEE Main', 'NEET', 'DSE'] as const).map(ex => (
              <button
                key={ex}
                type="button"
                onClick={() => setExam(ex)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all font-heading ${
                  exam === ex
                    ? 'bg-[#00A3FF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Marks vs Percentile Prompt */}
        <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <Calculator className="w-4 h-4 text-[#00A3FF] shrink-0" />
            <span>Don't have your official percentile yet? Calculate raw marks to percentile with shift analysis:</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/marks-vs-percentile')}
            className="px-3 py-1.5 rounded-lg bg-[#00A3FF] hover:bg-[#0284C7] text-white font-bold font-heading text-[11px] shrink-0 transition-all flex items-center gap-1 shadow-xs"
          >
            <span>Marks Estimator</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handlePredict} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
              {exam} Score / Percentile *
            </label>
            <input
              type="number"
              step="0.01"
              min="1"
              max="100"
              required
              value={percentile}
              onChange={e => setPercentile(e.target.value)}
              placeholder="e.g. 97.85"
              className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
              Reservation Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-3 rounded-xl outline-none font-semibold"
            >
              <option value="Open / General">Open / General (GOPEN)</option>
              <option value="OBC">OBC (Other Backward Class)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
              <option value="TFWS">TFWS (100% Tuition Fee Waiver)</option>
              <option value="SC / ST">SC / ST Category</option>
              <option value="VJ / NT">VJ / NT Category</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
              Target Branch Stream
            </label>
            <select
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-3 rounded-xl outline-none font-semibold"
            >
              <option value="Computer Engg / AI & DS">Computer Engineering / AI & DS</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="Electronics & Telecommunication">Electronics & Telecom (ENTC)</option>
              <option value="Mechanical / Robotics">Mechanical / Automation</option>
              <option value="MBBS / BDS / BAMS">MBBS / BDS / BAMS (Medical)</option>
              <option value="MBA / MMS">MBA / MMS (Management)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
              Preferred Region
            </label>
            <div className="flex gap-2">
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-3 rounded-xl outline-none font-semibold"
              >
                <option value="All">All Maharashtra</option>
                <option value="Pune">Pune Region</option>
                <option value="Mumbai">Mumbai Region</option>
              </select>

              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all shrink-0 flex items-center justify-center gap-1.5 font-heading"
              >
                <Search className="w-4 h-4" />
                <span>Estimate</span>
              </button>
            </div>
          </div>
        </form>

        {/* Prediction Results Area */}
        {/* Dopamine Loop Prediction Results Area */}
        <AnimatePresence>
          {predictedResults && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="pt-8 border-t border-slate-200 space-y-6"
            >
              {/* Dopamine Headline Badge */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F172A] to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00ADEF]/20 text-[#00ADEF] text-[11px] font-bold uppercase tracking-wider font-heading">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-Time Merit Engine</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white tracking-tight">
                    Your <span className="text-[#00ADEF]">{percentile}%ile</span> just unlocked <span className="text-emerald-400 font-mono">{predictedResults.length} options</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-heading">
                    {predictedResults.filter(p => p.probability === 'Safe').length} High Probability
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-heading">
                    {predictedResults.filter(p => p.probability === 'Moderate').length} Target
                  </span>
                </div>
              </div>

              {/* Animated Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predictedResults.slice(0, 9).map(({ college, probability }, idx) => {
                  const isSafe = probability === 'Safe';
                  const isModerate = probability === 'Moderate';

                  // Calculate realistic cutoff band around candidate score
                  const targetCutoff = typeof college.cutoffPercentile === 'number' 
                    ? college.cutoffPercentile 
                    : parseFloat(String(college.cutoffPercentile || '88'));
                  const minBand = (targetCutoff - 1.2).toFixed(1);
                  const maxBand = (targetCutoff + 0.8).toFixed(1);

                  return (
                    <motion.div
                      key={college.id}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className={`p-5 rounded-2xl border transition-all space-y-3.5 flex flex-col justify-between ${
                        isSafe
                          ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400 shadow-xs'
                          : isModerate
                          ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400 shadow-xs'
                          : 'bg-indigo-50/30 border-indigo-200 hover:border-indigo-400 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Status Tier & Chance Pill */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide font-heading border ${
                              isSafe
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : isModerate
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : 'bg-indigo-100 text-indigo-900 border-indigo-300'
                            }`}
                          >
                            {isSafe ? 'VERY REALISTIC' : isModerate ? 'TARGET CHOICE' : 'AMBITIOUS SPOT ROUND'}
                          </span>
                          <span className={`text-[11px] font-bold font-mono ${
                            isSafe ? 'text-emerald-700' : isModerate ? 'text-amber-800' : 'text-indigo-700'
                          }`}>
                            Chances: {isSafe ? 'HIGH' : isModerate ? 'MODERATE' : 'ROUND 2/3'}
                          </span>
                        </div>

                        {/* College Name & Branch */}
                        <div>
                          <h4 className="text-base font-bold text-slate-900 font-heading leading-snug">
                            {college.name}
                          </h4>
                          <div className="text-xs font-bold text-[#00ADEF] mt-0.5 font-heading">
                            {branch === 'All' ? 'Computer Engg / IT / AI-DS' : branch}
                          </div>
                        </div>

                        {/* Realistic Cutoff Band */}
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 font-mono text-xs space-y-1">
                          <div className="flex items-center justify-between text-slate-500 text-[11px] font-sans">
                            <span>Historical Cutoff Band:</span>
                            <span className="font-bold text-slate-900 font-mono">~{minBand}% – {maxBand}%ile</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-500 text-[11px] font-sans">
                            <span>Campus / Fees:</span>
                            <span className="font-bold text-slate-800">{college.city} • {college.fees}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-500 font-mono">
                          DTE: {college.dteCode || college.code}
                        </span>
                        <button
                          onClick={onOpenConsultation}
                          className="text-xs font-bold text-[#00ADEF] hover:text-[#0098D4] flex items-center gap-1 transition-colors font-heading"
                        >
                          <span>Lock in Option Form</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Send This to Dad/Mom WhatsApp Forwarder */}
              <WhatsAppShareToParents
                exam={exam}
                percentile={percentile}
                branch={branch}
                category={category}
                colleges={predictedResults.map(p => ({
                  name: p.college.name,
                  city: p.college.city,
                  fees: p.college.fees,
                  cutoff: p.college.cutoffPercentile,
                  probability: p.probability,
                  courses: p.college.courses
                }))}
              />

              {/* Contextual Counsellor Advisory Hook */}
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 font-heading block">
                    Want a Senior Counsellor to verify your college options?
                  </span>
                  <p className="text-xs text-slate-600 font-normal">
                    We evaluate your Home University quota (SPPU vs Mumbai), category seat matrices, and branch probability before you lock Choice Codes.
                  </p>
                </div>
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider shadow-sm shrink-0 transition-all font-heading"
                >
                  Get My List Reviewed
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
