import React from 'react';
import skritaLogo from '../../assets/skrita-logo.webp';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 text-[11px] text-slate-500 hover:text-slate-300 transition-colors duration-200"
      title="Visit vivekrandad.app"
    >
      <span>Designed & developed by</span>
      <img
        src={skritaLogo}
        alt="Skrita"
        className="h-5 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
      />
    </a>
  );
};
