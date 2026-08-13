import React from 'react';

export const SkritaBadge: React.FC = () => {
  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 transition-colors duration-200"
      title="Visit vivekrandad.app"
    >
      <span className="text-slate-600">⚡</span>
      <span>Designed & developed by</span>
      <span className="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] group-hover:from-[#FF007A] group-hover:to-[#FFA500] transition-all duration-300">
        Skrita
      </span>
    </a>
  );
};
