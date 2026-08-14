import React, { useEffect } from 'react';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { CapStageTracker } from '../components/home/CapStageTracker';
import { SpotRoundGuide } from '../components/home/SpotRoundGuide';
import { MahaDbtFeeCalculator } from '../components/home/MahaDbtFeeCalculator';
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
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ADEF]/20 border border-[#00ADEF]/30 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <Compass className="w-4 h-4" />
              <span>Full Service Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Strategic CAP Round & Direct Admission Solutions
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              From Option Form sequencing to Category fee concessions, MahaDBT scholarships, and institutional vacancy quota seats across Maharashtra.
            </p>
          </div>
        </div>
      </div>

      {/* DTE Admission Stages Tracker */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <CapStageTracker />
      </div>

      {/* Core Services Section */}
      <ServicesSection onOpenConsultation={onOpenConsultation} />

      {/* Maharashtra Fee Structure & Scholarship Calculator */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <MahaDbtFeeCalculator />
      </div>

      {/* ACAP & Institutional Quota Guide */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SpotRoundGuide />
      </div>

      {/* 5-Step Process & Senior Counsellor Warning */}
      <ProcessSection onOpenConsultation={onOpenConsultation} />

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
