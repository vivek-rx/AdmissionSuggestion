import React, { useState } from 'react';
import { Calculator, ShieldCheck, IndianRupee, Award, ArrowRight, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export const MahaDbtFeeCalculator: React.FC = () => {
  const [collegeType, setCollegeType] = useState<'Govt' | 'Autonomous' | 'Private'>('Autonomous');
  const [annualTuition, setAnnualTuition] = useState<number>(165000);
  const [developmentFee, setDevelopmentFee] = useState<number>(20000);
  const [category, setCategory] = useState<'OPEN' | 'EBC_EWS' | 'OBC' | 'TFWS' | 'SC_ST' | 'VJNT_SBC'>('EBC_EWS');

  // Calculation Logic under Maharashtra Government & MahaDBT Rules:
  // TFWS: 100% Tuition Fee Waived (Pays only Development + Exam fee)
  // EBC / EWS (Rajarshi Shahu Maharaj Scheme): 50% Tuition Fee Concession (Family income < 8 Lakhs)
  // OBC / SEBC: 50% Tuition Fee Concession
  // VJNT / SBC / NT-1/2/3: 100% Tuition Fee Concession (Pays only Development Fee)
  // SC / ST: 100% Tuition & 100% Development Fee Waived by Social Welfare Dept (Pays only nominal University/Exam charges ~₹2,500)

  let tuitionConcession = 0;
  let devConcession = 0;
  let schemeName = 'Regular Open Category Fee';

  if (category === 'TFWS') {
    tuitionConcession = annualTuition;
    devConcession = 0;
    schemeName = 'AICTE Tuition Fee Waiver Scheme (TFWS) • 100% Tuition Waived';
  } else if (category === 'EBC_EWS') {
    tuitionConcession = annualTuition * 0.5;
    devConcession = 0;
    schemeName = 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Yojna (EBC/EWS) • 50% Tuition Concession';
  } else if (category === 'OBC') {
    tuitionConcession = annualTuition * 0.5;
    devConcession = 0;
    schemeName = 'OBC Post-Matric MahaDBT Scholarship Scheme • 50% Tuition Concession';
  } else if (category === 'VJNT_SBC') {
    tuitionConcession = annualTuition;
    devConcession = 0;
    schemeName = 'VJNT/SBC Free-ship & Fee Reimbursement • 100% Tuition Concession';
  } else if (category === 'SC_ST') {
    tuitionConcession = annualTuition;
    devConcession = developmentFee;
    schemeName = 'Govt. of Maharashtra Social Justice & Tribal Dept. • 100% Tuition & Dev Fee Waived';
  }

  const netPayable = Math.max(2500, (annualTuition - tuitionConcession) + (developmentFee - devConcession));
  const totalSavings = (annualTuition + developmentFee) - netPayable;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md font-sans">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider font-heading">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>MahaDBT & State Fee Concession Matrix</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
              Maharashtra Engineering Fee Structure & Scholarship Calculator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Calculate your exact 1st year net fee payable after official MahaDBT, TFWS, and EBC government fee reimbursements for Pune & Maharashtra colleges.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          
          {/* Institute Type Quick Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
              Institute Category Preset
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-200/70 p-1 rounded-xl">
              {[
                { type: 'Govt' as const, label: 'COEP/VJTI', t: 90000, d: 15000 },
                { type: 'Autonomous' as const, label: 'PICT/VIT', t: 165000, d: 20000 },
                { type: 'Private' as const, label: 'Pvt. College', t: 135000, d: 18000 }
              ].map(p => (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => {
                    setCollegeType(p.type);
                    setAnnualTuition(p.t);
                    setDevelopmentFee(p.d);
                  }}
                  className={`py-2 px-1 rounded-lg text-xs font-bold font-heading transition-all ${
                    collegeType === p.type ? 'bg-white text-[#00ADEF] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quota / Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
              Category / Quota Scheme
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-bold"
            >
              <option value="OPEN">Open / General (No Concession)</option>
              <option value="EBC_EWS">EBC / EWS (50% Tuition Waiver - Income &lt; 8L)</option>
              <option value="TFWS">TFWS (100% Tuition Waiver - AICTE)</option>
              <option value="OBC">OBC / SEBC (50% Tuition Waiver)</option>
              <option value="VJNT_SBC">VJ / NT / SBC (100% Tuition Waiver)</option>
              <option value="SC_ST">SC / ST (100% Tuition + Dev Fee Waived)</option>
            </select>
          </div>

          {/* Annual Base Tuition Fee */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
              Approved Tuition Fee (₹ / Year)
            </label>
            <input
              type="number"
              value={annualTuition}
              onChange={e => setAnnualTuition(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-mono font-bold"
            />
          </div>

        </div>

        {/* Live Calculation Output Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-xl items-center">
          
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADEF]/20 text-[#00ADEF] text-xs font-bold font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Applied Scholarship Scheme</span>
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-white font-heading">
              {schemeName}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2 font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Standard College Fee</span>
                <span className="text-sm font-bold text-white">₹{(annualTuition + developmentFee).toLocaleString('en-IN')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-emerald-400 block text-[10px]">Govt Fee Reimbursement</span>
                <span className="text-sm font-bold text-emerald-400">-₹{totalSavings.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold font-heading">
              Net Fee Payable At Admission
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00ADEF] font-mono tracking-tight">
              ₹{netPayable.toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-sans block mt-1 font-normal">/ 1st Year (Approx.)</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              *Plus nominal university exam & gymkhana charges (~₹2,000 to ₹3,500).
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
