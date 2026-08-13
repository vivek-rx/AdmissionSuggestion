import React, { useEffect } from 'react';
import { EventsSection } from '../components/home/EventsSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { Calendar, Video, MapPin, Sparkles } from 'lucide-react';

export const EventsPage: React.FC = () => {
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
              <Calendar className="w-4 h-4" />
              <span>Free Admissions Masterclasses</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Live Webinars & Offline Pune Seminars
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Reserve your seat for interactive Q&A sessions on CAP Round option forms, branch vs college dilemmas, and cutoff estimates.
            </p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <EventsSection />

      {/* Consultation Section */}
      <ConsultationSection />
    </div>
  );
};
