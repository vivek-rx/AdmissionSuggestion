import React, { useState } from 'react';
import { Cpu, Code2, Database, Radio, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

export const BranchRealityMatrix: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<'cse' | 'aids' | 'it' | 'entc'>('cse');

  const branchData = {
    cse: {
      title: 'Computer Engineering (CSE / CE)',
      sppuCode: 'Course Code: 245 / 501',
      curriculumOverlap: '100% Core Computing Foundation',
      codingCulture: '10 / 10 (Highest in PICT, COEP, VIT, VJTI)',
      placementTruth: 'Eligible for 100% of software, cloud, quant & product engineering hiring drives.',
      averagePackage: '₹14.2 LPA (Top Autonomous Avg)',
      realityCheck: 'Most in-demand degree in Maharashtra. Safe bet if you get it in Top 10 institutes.',
      witTip: 'Parents favorite. If you get it in PICT/COEP/VIT, accept it without second thoughts.'
    },
    aids: {
      title: 'AI & Data Science (AI/DS) / AIML',
      sppuCode: 'Course Code: 995 / 911',
      curriculumOverlap: '85% Overlap with Core CSE + 15% Machine Learning & Stats',
      codingCulture: '9.5 / 10 (High Focus on Python, PyTorch & LLMs)',
      placementTruth: '98% of product companies treat AI/DS identical to CSE during Day-1 campus placement.',
      averagePackage: '₹13.8 LPA (Top Autonomous Avg)',
      realityCheck: 'Cutoffs are ~0.8% to 1.5% lower than Core CSE in Round 1. Best tactical choice to enter a Tier-1 college.',
      witTip: 'Smart hack: Taking AI/DS at VIT Pune beats taking Core CSE at a Tier-3 college every single time.'
    },
    it: {
      title: 'Information Technology (IT)',
      sppuCode: 'Course Code: 246',
      curriculumOverlap: '92% Overlap with CSE (Less hardware/microprocessors, more web/cloud)',
      codingCulture: '9.5 / 10',
      placementTruth: '100% placement eligibility alongside CSE across Microsoft, Amazon, Nvidia, Barclays, and TCS Digital.',
      averagePackage: '₹13.5 LPA (Top Autonomous Avg)',
      realityCheck: 'Practically zero difference in 4th-year placements compared to Computer Engineering.',
      witTip: 'Never leave PICT IT for Core CSE in a lower-ranked college.'
    },
    entc: {
      title: 'Electronics & Telecommunication (E&TC / EXTC)',
      sppuCode: 'Course Code: 372',
      curriculumOverlap: '40% Software / Embedded + 60% Signal Processing & Semiconductor Hardware',
      codingCulture: '7.5 / 10 (Requires dual effort in coding + core electronics)',
      placementTruth: '80% of software companies allow ENTC students. Also opens semiconductor giants (Qualcomm, Texas Instruments, Intel).',
      averagePackage: '₹9.8 LPA (Top Autonomous Avg)',
      realityCheck: 'Tougher curriculum than CSE/IT. Great choice in COEP, VJTI, PICT if you want semiconductor hardware or product tech.',
      witTip: 'You will study Signals & Fourier Transforms alongside C++. Only take it if you enjoy mathematics.'
    }
  };

  const active = branchData[selectedBranch];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Branch Reality Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            CSE vs AI/DS vs IT vs E&TC: <span className="text-[#00ADEF]">The Placement Truth</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            No jargon. Real data on curriculum overlap, hiring eligibility, and Maharashtra cutoff strategies.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold self-start sm:self-auto">
          2026-27 Curriculum Benchmark
        </span>
      </div>

      {/* Branch Tab Switcher (Zerodha OS Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {[
          { key: 'cse' as const, label: 'Core CSE', icon: Code2 },
          { key: 'aids' as const, label: 'AI & Data Science', icon: Database },
          { key: 'it' as const, label: 'Information Tech', icon: Cpu },
          { key: 'entc' as const, label: 'Electronics (E&TC)', icon: Radio }
        ].map((item) => {
          const isSelected = selectedBranch === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setSelectedBranch(item.key)}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 font-heading ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-[#00ADEF]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Branch Reality Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Core Stats (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {active.title}
              </h3>
              <span className="text-xs font-mono text-slate-500 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                {active.sppuCode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-sans font-semibold text-slate-400 block uppercase">Curriculum Overlap</span>
                <span className="font-bold text-slate-900 text-xs font-sans">{active.curriculumOverlap}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-sans font-semibold text-slate-400 block uppercase">Average Tech Package</span>
                <span className="font-bold text-[#00ADEF] text-sm">{active.averagePackage}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 font-normal">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Placement Reality:</strong> {active.placementTruth}</span>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#00ADEF] shrink-0 mt-0.5" />
                <span><strong>Cutoff Strategy:</strong> {active.realityCheck}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indian Student Reality & Wit Box (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase font-heading">
              Counsellor Insider Rule
            </span>
          </div>

          <h4 className="text-base font-bold font-heading text-white">
            "College Brand vs Branch Name?"
          </h4>

          <p className="text-xs text-slate-300 font-normal leading-relaxed">
            {active.witTip}
          </p>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>DTE Round 1 Strategy</span>
            <span className="text-[#00ADEF] font-bold">100% Merit Compliant</span>
          </div>
        </div>

      </div>

    </section>
  );
};
