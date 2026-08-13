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

      {/* 2. Interactive CAP Predictor Widget */}
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
