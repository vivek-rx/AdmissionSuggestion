import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Search, CheckCircle2, ArrowRight, Building2, MapPin, Award, FileText, PhoneCall, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initialColleges } from '../../data/initialData';
import { College } from '../../types';

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
        <AnimatePresence>
          {predictedResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="pt-6 border-t border-slate-200 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                  Estimated Institutes for {percentile}%ile ({category} • {branch})
                </span>
                <span className="text-xs text-[#0284C7] font-bold">
                  {predictedResults.length} Institutes Analyzed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {predictedResults.slice(0, 6).map(({ college, probability }) => (
                  <div
                    key={college.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {college.logoUrl ? (
                          <div className="h-10 px-2 py-1 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                            <img
                              src={college.logoUrl}
                              alt={`${college.name} logo`}
                              className="max-h-7 max-w-[90px] w-auto object-contain"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A3FF] to-blue-700 text-white flex items-center justify-center font-black text-xs shrink-0">
                            {college.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono font-bold bg-blue-100 text-[#0284C7] px-2 py-0.5 rounded">
                              DTE: {college.dteCode}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                probability === 'Safe'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : probability === 'Moderate'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                              }`}
                            >
                              {probability === 'Safe' ? '● Safe Choice' : probability === 'Moderate' ? '● Target Choice' : '● Ambitious Choice'}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug mt-1">
                            {college.name}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-slate-200 font-medium text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px]">City:</span>
                        <span className="font-bold text-slate-800">{college.city}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Cut-off Bench:</span>
                        <span className="font-bold text-emerald-700">{college.cutoffPercentile}%ile</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Annual Fee:</span>
                        <span className="font-bold text-slate-800">{college.fees}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Avg Package:</span>
                        <span className="font-bold text-[#0284C7]">{college.averagePackage}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-bold text-slate-500">
                        {college.ranking}
                      </span>
                      <button
                        onClick={onOpenConsultation}
                        className="text-xs font-extrabold text-[#00A3FF] hover:text-[#0284C7] flex items-center gap-1 transition-colors font-heading"
                      >
                        <span>Option Strategy</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

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
