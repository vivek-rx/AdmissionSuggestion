import React, { useEffect } from 'react';
import { AboutSection } from '../components/home/AboutSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { OfficeLocationMap } from '../components/common/OfficeLocationMap';
import { Info, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
              <Info className="w-4 h-4" />
              <span>Established 2004 • Pune, Maharashtra</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              20+ Years of Ethical Admission Mentorship
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Guiding Maharashtra students and parents through transparent merit-based counselling, choice optimization, and official DTE compliance.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Interactive Google Map & Office Details */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <OfficeLocationMap />
      </section>

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
