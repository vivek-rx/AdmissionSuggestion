import React, { useEffect } from 'react';
import { AboutSection } from '../components/home/AboutSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { Info, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
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

      {/* Pune Head Office Contact Info */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#00A3FF] flex items-center justify-center shrink-0 border border-blue-100">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Pune Head Office</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#00A3FF] flex items-center justify-center shrink-0 border border-blue-100">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Direct Helpline</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                +91 9860 777 069<br />
                +91 8446 000 555
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#00A3FF] flex items-center justify-center shrink-0 border border-blue-100">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Counselling Timings</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Monday to Saturday: 10:00 AM – 7:30 PM<br />
                Sunday: By Prior Appointment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
