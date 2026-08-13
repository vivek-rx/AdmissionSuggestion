import React, { useEffect } from 'react';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { Compass, ShieldCheck, CheckCircle2, AlertTriangle, FileSpreadsheet, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onOpenConsultation: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenConsultation }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-12 py-6">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-r from-[#00A3FF] to-blue-700 rounded-3xl p-8 sm:p-12 text-white border border-blue-500 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#00A3FF]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-[#00A3FF] text-xs font-bold uppercase tracking-wider font-heading">
              <Compass className="w-4 h-4" />
              <span>Full Service Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Strategic CAP Round & Direct Admission Solutions
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              From Option Form sequencing to Category fee concessions and institutional management quota seats across Maharashtra.
            </p>
          </div>
        </div>
      </div>

      {/* Core Services Section */}
      <ServicesSection onOpenConsultation={onOpenConsultation} />

      {/* 5-Step Process & Senior Counsellor Warning */}
      <ProcessSection onOpenConsultation={onOpenConsultation} />

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
