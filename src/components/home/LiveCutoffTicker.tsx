import React from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export const LiveCutoffTicker: React.FC = () => {
  const cutoffs = [
    { college: 'COEP Pune', branch: 'Computer Sci', quota: 'GOPENS', cutoff: '99.88 %ile', dte: '6006' },
    { college: 'PICT Pune', branch: 'Computer Engg', quota: 'GOPENH', cutoff: '99.52 %ile', dte: '6214' },
    { college: 'PICT Pune', branch: 'Information Tech', quota: 'TFWS', cutoff: '99.45 %ile', dte: '6214' },
    { college: 'VJTI Mumbai', branch: 'Computer Engg', quota: 'GOPENS', cutoff: '99.78 %ile', dte: '3012' },
    { college: 'VJTI Mumbai', branch: 'Electronics & TC', quota: 'GOPENH', cutoff: '98.92 %ile', dte: '3012' },
    { college: 'SPIT Mumbai', branch: 'CSE (AI-ML)', quota: 'GOPENS', cutoff: '99.10 %ile', dte: '3215' },
    { college: 'VIT Pune', branch: 'AI & Data Science', quota: 'LOPENH', cutoff: '97.90 %ile', dte: '6273' },
    { college: 'PCCOE Pune', branch: 'Computer Engg', quota: 'GOPENH', cutoff: '96.85 %ile', dte: '6175' },
    { college: 'Walchand Sangli', branch: 'IT (Autonomous)', quota: 'GOPENS', cutoff: '97.10 %ile', dte: '6007' },
    { college: 'Cummins Women', branch: 'Computer Sci', quota: 'LOPENH', cutoff: '97.40 %ile', dte: '6276' },
    { college: 'VESIT Mumbai', branch: 'AI & DS', quota: 'GOPENS', cutoff: '96.20 %ile', dte: '3185' },
    { college: 'DJSCE Mumbai', branch: 'IT (Autonomous)', quota: 'GOPENS', cutoff: '98.15 %ile', dte: '3199' },
  ];

  return (
    <div className="bg-[#0A192F] text-white border-y border-slate-800/90 py-2.5 overflow-hidden font-sans relative shadow-inner">
      <div className="flex items-center">
        {/* Left Fixed Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#00ADEF] text-white font-extrabold text-[10px] uppercase tracking-wider shrink-0 z-10 ml-4 rounded-md font-heading shadow-sm">
          <TrendingUp className="w-3 h-3" />
          <span>Live DTE Cut-Offs</span>
        </div>

        {/* Scrolling Ticker Line */}
        <div className="flex overflow-x-hidden whitespace-nowrap mask-radial-gradient">
          <div className="flex items-center gap-6 animate-marquee shrink-0">
            {cutoffs.concat(cutoffs).map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 py-0.5 px-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-[#00ADEF]/50 transition-colors"
              >
                <span className="font-bold text-white font-heading">{item.college}</span>
                <span className="text-slate-400 font-sans text-[11px]">({item.branch})</span>
                <span className="bg-sky-500/20 text-[#00ADEF] px-1.5 py-0.2 rounded text-[10px] font-bold">
                  {item.quota}
                </span>
                <span className="text-emerald-400 font-bold">{item.cutoff}</span>
                <span className="text-slate-600 text-[10px]">DTE:{item.dte}</span>
                <span className="text-slate-700 ml-2">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
