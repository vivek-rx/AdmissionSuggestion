import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { LiveCutoffTicker } from '../components/home/LiveCutoffTicker';
import { CapStageTracker } from '../components/home/CapStageTracker';
import { CollegePredictorWidget } from '../components/home/CollegePredictorWidget';
import { DocumentValidityChecker } from '../components/home/DocumentValidityChecker';
import { MahaDbtFeeCalculator } from '../components/home/MahaDbtFeeCalculator';
import { SpotRoundGuide } from '../components/home/SpotRoundGuide';
import { ServicesSection } from '../components/home/ServicesSection';
import { CounsellorSection } from '../components/home/CounsellorSection';
import { EventsSection } from '../components/home/EventsSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, School, FileCheck, Users, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface HomePageProps {
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="space-y-12">
      {/* 1. Hero Banner Carousel */}
      <HeroSection onOpenConsultation={onOpenConsultation} />

      {/* 3. CAP Round Timeline & Stage Tracker */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <CapStageTracker />
      </div>

      {/* 4. Featured Tool: CAP Option Form Generator Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0F172A] text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADEF]/15 border border-[#00ADEF]/30 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              Official CAP Round Tool
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-heading">
              Plan Your 3-Tier CAP Round Preference Form (2026-27)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
              Organize your Dream, Target & Safe college preferences with official 9-digit DTE Choice Codes and download an instant option form PDF to copy into mahacet.org.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              to="/cap-generator"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-heading"
            >
              <span>Option Form Generator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/marks-vs-percentile"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 font-heading"
            >
              <span>Marks Estimator</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Interactive DTE CAP Predictor Widget */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <CollegePredictorWidget onOpenConsultation={onOpenConsultation} />
      </div>

      {/* 6. Document Scrutiny & Zero-Rejection Scanner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <DocumentValidityChecker />
      </div>

      {/* 7. Maharashtra College Fee & MahaDBT Scholarship Calculator */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <MahaDbtFeeCalculator />
      </div>

      {/* 8. ACAP & Institutional Quota Guide */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <SpotRoundGuide />
      </div>

      {/* 9. Direct Admission Pathways */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="max-w-2xl">
              <span className="text-[#00ADEF] text-xs font-bold uppercase tracking-widest block mb-2 font-heading">
                Counselling Services & Guidance
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                Explore Admission Mentorship Portals
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed font-normal">
                Select a dedicated section to review official cut-offs, verify required documents, or book 1-on-1 sessions with senior counsellors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/services"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00ADEF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] group-hover:bg-[#00ADEF] group-hover:text-white flex items-center justify-center transition-colors border border-sky-100 group-hover:border-[#00ADEF]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00ADEF] transition-colors">
                    CAP Process & Services
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    Option Form strategy, 5-Step Process & Category seat matrix.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00ADEF]">
                  <span>View Services</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/colleges"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00ADEF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] group-hover:bg-[#00ADEF] group-hover:text-white flex items-center justify-center transition-colors border border-sky-100 group-hover:border-[#00ADEF]">
                    <School className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00ADEF] transition-colors">
                    College Directory & Cutoffs
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    DTE Codes, NIRF Rankings, Cut-off trends & Comparison tool.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00ADEF]">
                  <span>Explore Colleges</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/documents"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00ADEF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] group-hover:bg-[#00ADEF] group-hover:text-white flex items-center justify-center transition-colors border border-sky-100 group-hover:border-[#00ADEF]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00ADEF] transition-colors">
                    19-Point Document Checklist
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    Interactive readiness tracker for FC Scrutiny & ARC confirmation.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00ADEF]">
                  <span>Check Documents</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/counsellors"
                className="group p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#00ADEF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] group-hover:bg-[#00ADEF] group-hover:text-white flex items-center justify-center transition-colors border border-sky-100 group-hover:border-[#00ADEF]">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading group-hover:text-[#00ADEF] transition-colors">
                    Senior Counsellors & Proofs
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    Meet senior advisors and review verified COEP/PICT student allotments.
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-[#00ADEF]">
                  <span>Meet Counsellors</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Core Services Snapshot */}
      <ServicesSection onOpenConsultation={onOpenConsultation} />

      {/* 11. Senior Mentors & Verified Student Allotments */}
      <CounsellorSection onOpenConsultation={onOpenConsultation} />

      {/* 12. Live Webinars & Workshops */}
      <EventsSection />

      {/* 13. Free Callback Consultation Form */}
      <ConsultationSection />
    </div>
  );
};
