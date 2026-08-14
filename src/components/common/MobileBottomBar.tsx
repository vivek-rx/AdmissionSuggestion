import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileSpreadsheet, Phone, Calculator, MessageSquare, Compass, School } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenConsultation: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenConsultation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const isActive = (path: string) => pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
      <div className="grid grid-cols-5 items-center justify-around text-center">
        
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            isActive('/')
              ? 'text-[#00ADEF]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className={`w-5 h-5 ${isActive('/') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-heading font-medium mt-0.5 tracking-tight">Home</span>
        </Link>

        {/* 2. Colleges & Cutoffs */}
        <Link
          to="/colleges"
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            isActive('/colleges')
              ? 'text-[#00ADEF]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <School className={`w-5 h-5 ${isActive('/colleges') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-heading font-medium mt-0.5 tracking-tight">Colleges</span>
        </Link>

        {/* 3. Center CTA: CAP Generator (Elevated Action Pill) */}
        <Link
          to="/cap-generator"
          className="flex flex-col items-center justify-center -mt-4 group relative"
        >
          <div className="w-12 h-12 rounded-full bg-[#00ADEF] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,173,239,0.5)] border-2 border-slate-950 group-active:scale-95 transition-transform">
            <FileSpreadsheet className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-heading font-extrabold text-[#00ADEF] mt-0.5 tracking-tight">
            CAP Form
          </span>
        </Link>

        {/* 4. Marks Estimator */}
        <Link
          to="/marks-vs-percentile"
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            isActive('/marks-vs-percentile')
              ? 'text-[#00ADEF]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className={`w-5 h-5 ${isActive('/marks-vs-percentile') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-heading font-medium mt-0.5 tracking-tight">Estimator</span>
        </Link>

        {/* 5. Direct WhatsApp / Call Helpline */}
        <a
          href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20need%20expert%20guidance%20for%20Maharashtra%20CAP%20Round%20Admissions."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-emerald-400 hover:text-emerald-300 transition-all"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 stroke-2" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-heading font-bold mt-0.5 tracking-tight">Helpline</span>
        </a>

      </div>
    </div>
  );
};
