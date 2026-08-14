import React, { useEffect } from 'react';
import { DocumentChecklist } from '../components/home/DocumentChecklist';
import { DocumentValidityChecker } from '../components/home/DocumentValidityChecker';
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
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ADEF]/20 border border-[#00ADEF]/30 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
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

      {/* Interactive Zero-Rejection Scanner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <DocumentValidityChecker />
      </div>

      {/* Interactive Document Checklist Component */}
      <DocumentChecklist />

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
