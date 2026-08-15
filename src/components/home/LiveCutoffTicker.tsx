import React from 'react';
import { TrendingUp, ShieldCheck, Activity } from 'lucide-react';

export const LiveCutoffTicker: React.FC = () => {
  const cutoffs = [
    { college: 'COEP Pune', branch: 'Computer Sci', quota: 'GOPENS', cutoff: '99.88 %ile', delta: '+0.12%', dte: '6006' },
    { college: 'PICT Pune', branch: 'Computer Engg', quota: 'GOPENH (SPPU)', cutoff: '99.52 %ile', delta: '+0.25%', dte: '6214' },
    { college: 'PICT Pune', branch: 'Information Tech', quota: 'TFWS 100%', cutoff: '99.45 %ile', delta: '+0.18%', dte: '6214' },
    { college: 'VJTI Mumbai', branch: 'Computer Engg', quota: 'GOPENS', cutoff: '99.78 %ile', delta: '+0.08%', dte: '3012' },
    { college: 'VJTI Mumbai', branch: 'Electronics & TC', quota: 'GOPENH', cutoff: '98.92 %ile', delta: '+0.34%', dte: '3012' },
    { college: 'SPIT Mumbai', branch: 'CSE (AI-ML)', quota: 'GOPENS', cutoff: '99.10 %ile', delta: '+0.40%', dte: '3215' },
    { college: 'VIT Pune', branch: 'AI & Data Science', quota: 'LOPENH', cutoff: '97.90 %ile', delta: '+0.65%', dte: '6273' },
    { college: 'PCCOE Pune', branch: 'Computer Engg', quota: 'GOPENH', cutoff: '96.85 %ile', delta: '+0.50%', dte: '6175' },
    { college: 'Walchand Sangli', branch: 'IT (Autonomous)', quota: 'GOPENS', cutoff: '97.10 %ile', delta: '+0.22%', dte: '6007' },
    { college: 'Cummins Women', branch: 'Computer Sci', quota: 'LOPENH', cutoff: '97.40 %ile', delta: '+0.30%', dte: '6276' },
    { college: 'VESIT Mumbai', branch: 'AI & DS', quota: 'GOPENS', cutoff: '96.20 %ile', delta: '+0.45%', dte: '3185' },
    { college: 'DJSCE Mumbai', branch: 'IT (Autonomous)', quota: 'GOPENS', cutoff: '98.15 %ile', delta: '+0.15%', dte: '3199' },
  ];

  return (
    <div className="bg-[#0A192F] text-white border-y border-slate-800/90 py-2 overflow-hidden font-sans relative shadow-inner z-30">
      <div className="flex items-center">
        
        {/* Left Fixed Institutional Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 text-white font-bold text-[10px] uppercase tracking-wider shrink-0 z-20 ml-2 sm:ml-4 rounded-lg font-heading shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[#00ADEF] flex items-center gap-1 font-mono font-bold">
            <Activity className="w-3 h-3 text-[#00ADEF]" />
            DTE 2026-27
          </span>
          <span className="hidden sm:inline text-slate-400">• CUT-OFFS</span>
        </div>

        {/* Continuous Infinite Scrolling Track */}
        <div className="flex overflow-x-hidden whitespace-nowrap mask-radial-gradient w-full ml-3">
          <div className="animate-marquee flex items-center gap-4 shrink-0">
            {/* Set 1 + Set 2 concatenated for seamless continuous loop */}
            {cutoffs.concat(cutoffs).map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 py-1 px-3 rounded-lg bg-slate-900/80 border border-slate-800/90 hover:border-[#00ADEF] transition-colors shrink-0"
              >
                <span className="font-bold text-white font-heading">{item.college}</span>
                <span className="text-slate-400 font-sans text-[11px]">({item.branch})</span>
                <span className="bg-sky-500/15 text-[#00ADEF] px-1.5 py-0.5 rounded text-[10px] font-bold border border-sky-500/30">
                  {item.quota}
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <span>▲</span>
                  <span>{item.cutoff}</span>
                </span>
                <span className="text-slate-500 text-[10px]">DTE:{item.dte}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
