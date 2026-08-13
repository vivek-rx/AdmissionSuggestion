import React from 'react';
import skritaLogo from '../../assets/skrita-logo.png';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all duration-300"
      title="Visit vivekrandad.app"
    >
      <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
        Designed & developed by
      </span>
      <img
        src={skritaLogo}
        alt="Skrita"
        className="h-8 md:h-10 w-auto object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-105"
      />
    </a>
  );
};
