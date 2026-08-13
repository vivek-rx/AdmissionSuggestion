import React from 'react';
import skritaLogo from '../../assets/skrita-logo.png';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-all duration-300"
      title="Visit vivekrandad.app"
    >
      <span className="font-medium">Designed & developed by</span>
      <img
        src={skritaLogo}
        alt="Skrita"
        className="h-5 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
      />
    </a>
  );
};
