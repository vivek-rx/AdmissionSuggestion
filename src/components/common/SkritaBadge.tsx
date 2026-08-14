import React from 'react';
import skritaLogo from '../../assets/skrita-dark-logo.png';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-orange-500/30 shadow-xs hover:shadow-[0_0_20px_rgba(255,107,0,0.15)] transition-all duration-300 transform hover:-translate-y-0.5"
      title="Crafted by Skrita — vivekrandad.app"
    >
      <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
        Crafted by
      </span>
      <img
        src={skritaLogo}
        alt="Skrita"
        className="h-4.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </a>
  );
};
