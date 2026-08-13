import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ExternalLink, Heart, Code2 } from 'lucide-react';

export const SkritaLogoSvg: React.FC<{ className?: string; textClassName?: string }> = ({
  className = "h-5 w-auto",
  textClassName = "text-white"
}) => (
  <svg
    viewBox="0 0 240 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="skritaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF007A" />
        <stop offset="50%" stopColor="#FF4500" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
      <linearGradient id="skritaGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF0055" />
        <stop offset="60%" stopColor="#FF6600" />
        <stop offset="100%" stopColor="#FFCC00" />
      </linearGradient>
    </defs>

    {/* Skrita Dynamic S Swirl Icon */}
    <g transform="translate(10, 5)">
      {/* Outer Curved Ribbon */}
      <path
        d="M32 6C18 6 6 18 6 32C6 39 9 45 14 49C17 52 23 49 26 44C29 39 30 33 27 28C24 23 26 17 32 15C38 13 46 16 50 22C54 28 58 35 60 41C61 46 64 51 68 53C73 55 77 52 75 46C72 37 66 28 58 20C50 11 41 6 32 6Z"
        fill="url(#skritaGrad1)"
      />
      {/* Inner Fluid Swirl Curve */}
      <path
        d="M48 58C62 58 74 46 74 32C74 25 71 19 66 15C63 12 57 15 54 20C51 25 50 31 53 36C56 41 54 47 48 49C42 51 34 48 30 42C26 36 22 29 20 23C19 18 16 13 12 11C7 9 3 12 5 18C8 27 14 36 22 44C30 53 39 58 48 58Z"
        fill="url(#skritaGrad2)"
      />
    </g>

    {/* Modern Typographic Wordmark "Skrita" */}
    <g className={textClassName} fill="currentColor">
      {/* S */}
      <path d="M100 24C95 24 91 26 91 30C91 38 106 36 106 45C106 50 101 54 94 54C88 54 83 50 82 46L88 42C89 45 92 48 95 48C98 48 100 46 100 44C100 37 85 39 85 30C85 24 90 20 98 20C103 20 108 23 109 27L103 31C103 27 99 24 95 24H100Z" />
      {/* k */}
      <path d="M112 14H119V33L129 21H138L126 34L139 53H129L119 37V53H112V14Z" />
      {/* r */}
      <path d="M143 21H150V27C152 23 156 21 161 21V28C155 28 150 32 150 38V53H143V21Z" />
      {/* i */}
      <path d="M166 14H173V19H166V14ZM166 21H173V53H166V21Z" />
      {/* t */}
      <path d="M182 14H189V21H197V27H189V44C189 47 191 48 194 48C196 48 197 47 198 47L199 53C197 54 194 54 191 54C185 54 182 50 182 44V27H177V21H182V14Z" />
      {/* a */}
      <path d="M221 21H228V53H221V48C218 52 213 54 207 54C199 54 194 48 194 40C194 32 200 27 208 27C213 27 218 29 221 32V30C221 26 217 24 212 24C208 24 205 26 204 28L200 23C203 20 208 18 214 18C222 18 228 22 228 30V40C228 44 227 48 225 50L221 47V21ZM221 38C219 35 216 33 211 33C206 33 202 36 202 41C202 46 206 48 211 48C216 48 220 45 221 41V38Z" />
    </g>
  </svg>
);

export const SkritaBadge: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <a
        href="https://vivekrandad.app"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-[#FF5500]/50 shadow-md hover:shadow-[0_0_20px_rgba(255,85,0,0.25)] transition-all duration-300 transform hover:scale-105 active:scale-95"
        title="Designed & Developed by Skrita (vivekrandad.app)"
      >
        {/* Soft Animated Background Ambient Glow */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF007A] via-[#FF5500] to-[#FFA500] opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300 pointer-events-none" />

        {/* Fun Icon & Text */}
        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-[#FF007A] fill-current animate-pulse inline" />
          <span>by</span>
        </span>

        {/* Skrita Logo Vector */}
        <div className="flex items-center gap-1.5 pl-0.5">
          <SkritaLogoSvg className="h-4 sm:h-4.5 w-auto" textClassName="text-white" />
        </div>

        {/* External Link Arrow Icon */}
        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#FFA500] transition-colors ml-0.5" />
      </a>

      {/* Floating Playful Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: -30, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950/95 text-white text-[10px] font-bold rounded-xl border border-slate-700 shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-1.5 z-30"
          >
            <Sparkles className="w-3 h-3 text-[#FFA500]" />
            <span>Built by Vivek Randad • vivekrandad.app</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
