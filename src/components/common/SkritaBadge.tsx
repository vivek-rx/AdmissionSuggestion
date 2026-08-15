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

      {/* Skrita Exact Logo Image & Crisp Gradient Branding */}
      <div className="inline-flex items-center gap-1.5 pl-0.5">
        <img
          src={skritaLogo}
          alt="Skrita"
          className="h-4 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <span className="font-extrabold tracking-tight font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FF5F6D] via-[#FF007A] to-[#FFA500] group-hover:brightness-110 transition-all">
          Skrita
        </span>
      </div>
    </a>
  );
};
