import React from 'react';
import skritaLogo from '../../assets/skrita-dark-logo.png';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-all duration-300 py-1 px-3 rounded-full hover:bg-slate-900/80 border border-transparent hover:border-slate-800"
      title="Crafted with passion by Skrita — vivekrandad.app"
    >
      <span className="font-medium text-slate-400">crafted with</span>
      <span className="text-[#FF007A] animate-pulse text-xs">❤️</span>
      <span className="font-medium text-slate-400">by</span>

      {/* Skrita Exact Crisp Logo (contains emblem + wordmark) */}
      <img
        src={skritaLogo}
        alt="Skrita"
        className="h-4.5 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ml-0.5"
      />
    </a>
  );
};
