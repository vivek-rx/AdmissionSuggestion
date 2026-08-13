import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CollegePredictorWidget } from '../components/home/CollegePredictorWidget';
import { ServicesSection } from '../components/home/ServicesSection';
import { CounsellorSection } from '../components/home/CounsellorSection';
import { EventsSection } from '../components/home/EventsSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, School, FileCheck, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="space-y-12">
      {/* 1. Hero Banner Carousel */}
      <HeroSection onOpenConsultation={onOpenConsultation} />

      {/* 2. Featured Viral Tool: CAP Option Form Generator Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-sky-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#00A3FF]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/20 border border-[#00A3FF]/40 text-[#00A3FF] text-xs font-black uppercase tracking-wider font-heading">
              🔥 Free Maharashtra Student Tool
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading">
              Build Your 3-Tier CAP Round Option Form (2026-27)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
              Calculate personalized Dream, Target & Safe college preferences with 9-digit DTE Choice Codes and instant printable PDF preview.
            </p>
          </div>

          <Link
            to="/cap-generator"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-heading shrink-0 relative z-10"
          >
            <span>Launch Generator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3. Interactive CAP Predictor Widget */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <CollegePredictorWidget onOpenConsultation={onOpenConsultation} />
      </div>

      {/* 3. Quick Navigation Feature Cards (Multi-Page Pathways) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl">
              <span className="text-[#00A3FF] text-xs font-extrabold uppercase tracking-widest block mb-2 font-heading">
                Comprehensive Admission Modules
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Explore Dedicated Counselling Portals
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-medium">
                Choose a specialized section to inspect authentic cut-offs, scrutinize documents, or review senior mentors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/services"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00A3FF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white flex items-center justify-center transition-colors border border-blue-100 group-hover:border-[#00A3FF]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00A3FF] transition-colors">
                    CAP Process & Services
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Option Form sequencing, 5-Step Process & Category seat matrix.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00A3FF]">
                  <span>View Services</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/colleges"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00A3FF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white flex items-center justify-center transition-colors border border-blue-100 group-hover:border-[#00A3FF]">
                    <School className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00A3FF] transition-colors">
                    College Directory & Cutoffs
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    DTE Codes, NIRF Rankings, Placement records & Comparison tool.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00A3FF]">
                  <span>Explore Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/documents"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00A3FF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white flex items-center justify-center transition-colors border border-blue-100 group-hover:border-[#00A3FF]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00A3FF] transition-colors">
                    19-Point Document Checklist
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Interactive readiness tracker for FC Scrutiny & ARC confirmation.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00A3FF]">
                  <span>Check Documents</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/counsellors"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00A3FF] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white flex items-center justify-center transition-colors border border-blue-100 group-hover:border-[#00A3FF]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00A3FF] transition-colors">
                    Mentors & Allotment Proofs
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Meet senior advisors and read verified COEP/VJTI student stories.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00A3FF]">
                  <span>Meet Counsellors</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Services Snapshot */}
      <ServicesSection onOpenConsultation={onOpenConsultation} />

      {/* 5. Senior Mentors & Verified Student Allotments */}
      <CounsellorSection onOpenConsultation={onOpenConsultation} />

      {/* 6. Live Webinars & Workshops */}
      <EventsSection />

      {/* 7. Free Callback Consultation Form */}
      <ConsultationSection />
    </div>
  );
};
