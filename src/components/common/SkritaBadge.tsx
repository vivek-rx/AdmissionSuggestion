import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

export const SkritaBadge: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://vivekrandad.app"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,85,0,0.15)]"
      title="Visit vivekrandad.app"
    >
      {/* Subtle border glow on hover */}
      <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
        Crafted by
      </span>

      {/* Skrita Clean Logo Branding */}
      <div className="flex items-center gap-1.5">
        {/* Dynamic S Swirl Icon */}
        <svg
          viewBox="0 0 40 40"
          className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skritaSwirlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF007A" />
              <stop offset="50%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
          <path
            d="M31 10C24 4 15 3 8 9C2 15 1 24 5 30C9 36 17 38 24 36C28 35 32 32 34 28C36 24 35 20 32 18C29 16 25 17 23 20C21 23 21 26 19 28C16 30 12 29 10 26C8 23 8 19 11 16C14 13 19 14 23 16C26 18 29 19 32 17C35 15 36 12 34 9C33 8 32 9 31 10Z"
            fill="url(#skritaSwirlGrad)"
          />
          <path
            d="M9 30C16 36 25 37 32 31C38 25 39 16 35 10C31 4 23 2 16 4C12 5 8 8 6 12C4 16 5 20 8 22C11 24 15 23 17 20C19 17 19 14 21 12C24 10 28 11 30 14C32 17 32 21 29 24C26 27 21 26 17 24C14 22 11 21 8 23C5 25 4 28 6 31C7 32 8 31 9 30Z"
            fill="url(#skritaSwirlGrad)"
            opacity="0.9"
          />
        </svg>

        {/* Crisp "Skrita" Wordmark */}
        <span className="font-heading font-extrabold text-sm tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-200 transition-all">
          Skrita
        </span>
      </div>

      {/* External Link Arrow */}
      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-[#FFA500] transition-colors ml-0.5" />
    </a>
  );
};
