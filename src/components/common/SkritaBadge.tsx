import React from 'react';
import skritaLogo from '../../assets/skrita-logo.png';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-[11px] text-slate-500 hover:text-slate-300 transition-all duration-300"
      title="Crafted by Skrita — vivekrandad.app"
    >
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] opacity-60 group-hover:opacity-100 transition-opacity" />
        <span className="font-medium">Crafted with passion by</span>
      </span>
      <img
        src={skritaLogo}
        alt="Skrita"
        className="h-4 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:brightness-110"
      />
    </a>
  );
};
