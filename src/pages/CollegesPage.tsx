import React, { useEffect } from 'react';
import { CollegeDirectory } from '../components/home/CollegeDirectory';
import { CollegeCompareWidget } from '../components/home/CollegeCompareWidget';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { PillMarkPro } from '../components/ui/pillmark-pro';
import { collegeBrochureLogos } from '../data/initialData';
import { School, ArrowRight, Building2, BarChart2 } from 'lucide-react';

interface CollegesPageProps {
  onOpenConsultation: () => void;
}

export const CollegesPage: React.FC<CollegesPageProps> = ({ onOpenConsultation }) => {
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
              <School className="w-4 h-4" />
              <span>Maharashtra DTE College Database</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Top Engineering & Medical Colleges Directory
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Explore authentic DTE Institute Codes, CAP Round cut-off percentiles, annual tuition fees, and highest/average placement packages.
            </p>
          </div>
        </div>
      </div>

      {/* Featured College Logos PillMark Pro Marquee */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider font-heading">
              Associated Institutions (DTE Codes & Universities)
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              ← Drag to explore →
            </span>
          </div>
          <PillMarkPro
            logos={collegeBrochureLogos}
            rowSplit="shifted"
            showSecondRow={true}
            oppositeDirection={true}
            direction="left"
            speed={30}
            hoverBehavior="slow"
            hoverSpeed={0.15}
            dragEnabled={true}
            itemGap={16}
            rowGap={12}
            pillPadX={20}
            pillPadY={12}
            pillRadius={16}
            borderWidth={1}
            borderColor="rgba(226, 232, 240, 0.9)"
            shadow={true}
            shadowColor="rgba(15, 23, 42, 0.04)"
            fadeEdges={true}
            fadeWidth={80}
          />
        </div>
      </div>

      {/* College Directory */}
      <CollegeDirectory onOpenConsultation={onOpenConsultation} />

      {/* Side-by-Side Comparison Tool */}
      <div id="compare">
        <CollegeCompareWidget onOpenConsultation={onOpenConsultation} />
      </div>

      {/* Contextual Comparison Hook */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Confused between two colleges or branches?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Compare actual campus coding culture, average packages, hostel facilities, and commute feasibility with our senior Pune mentors before locking your DTE Choice Codes.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3.5 rounded-2xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider font-heading shrink-0 shadow-sm transition-all"
          >
            Talk to a Counsellor
          </button>
        </div>
      </div>

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
