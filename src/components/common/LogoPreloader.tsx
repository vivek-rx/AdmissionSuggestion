import React, { useEffect, useState } from 'react';
import trustedLogo from '../../assets/logo.png';

interface LogoPreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

export const LogoPreloader: React.FC<LogoPreloaderProps> = ({
  duration = 2.2,
  onComplete
}) => {
  const [phase, setPhase] = useState<'init' | 'loading' | 'logoOut' | 'done'>('init');

  useEffect(() => {
    // Phase 1: Animate in
    const t0 = setTimeout(() => {
      setPhase('loading');
    }, 60);

    // Phase 2: Animate logo up & out
    const t1 = setTimeout(() => {
      setPhase('logoOut');
    }, duration * 1000 + 60);

    // Phase 3: Finish and unmount
    const t2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, duration * 1000 + 750);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [duration, onComplete]);

  if (phase === 'done') return null;

  // Animation transforms based on Framer LogoPreloader specifications
  let logoTranslateY = 0;
  let logoOpacity = 1;
  let logoScale = 1;

  if (phase === 'init') {
    logoTranslateY = 50;
    logoOpacity = 0;
    logoScale = 0.95;
  } else if (phase === 'loading') {
    logoTranslateY = 0;
    logoOpacity = 1;
    logoScale = 1;
  } else if (phase === 'logoOut') {
    logoTranslateY = -50;
    logoOpacity = 0;
    logoScale = 1.05;
  }

  const bgOpacity = phase === 'logoOut' ? 0 : 1;
  const transition = 'all 0.65s cubic-bezier(0.7, 0.2, 0.2, 1)';

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{
        transition: 'opacity 0.65s cubic-bezier(0.7, 0.2, 0.2, 1)',
        opacity: bgOpacity,
        pointerEvents: phase === 'logoOut' ? 'none' : 'all'
      }}
      role="status"
      aria-label="Loading Admission Suggestion"
    >
      {/* Subtle background ambient blur matching logo sky-blue */}
      <div className="absolute w-72 h-72 rounded-full bg-[#00A3FF]/10 blur-3xl pointer-events-none" />

      {/* Main Logo Container */}
      <div
        className="relative flex flex-col items-center justify-center p-8 max-w-sm w-full mx-4"
        style={{
          transition,
          transform: `translateY(${logoTranslateY}px) scale(${logoScale})`,
          opacity: logoOpacity,
          willChange: 'transform, opacity'
        }}
      >
        <img
          src={trustedLogo}
          alt="Admission Suggestion"
          className="h-16 sm:h-20 w-auto object-contain drop-shadow-md select-none"
          draggable={false}
        />

        {/* Minimalist Progress Indicator */}
        <div className="w-44 h-1 bg-slate-100 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00A3FF] to-[#0284C7] rounded-full"
            style={{
              transition: `width ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
              width: phase === 'init' ? '0%' : '100%'
            }}
          />
        </div>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-3 font-heading">
          Pune's Trusted Counselling Partner
        </p>
      </div>
    </div>
  );
};
