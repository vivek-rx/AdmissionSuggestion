import React, { useEffect } from 'react';
import { DocumentChecklist } from '../components/home/DocumentChecklist';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { FileCheck, ShieldCheck, Download, AlertCircle } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
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
              <FileCheck className="w-4 h-4" />
              <span>Facilitation Center Readiness</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              19-Point Mandatory Document Checklist
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Verify your original certificates before visiting the FC Scrutiny Center. Ensure zero seat cancellations due to document discrepancies.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Document Checklist Component */}
      <DocumentChecklist />

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
