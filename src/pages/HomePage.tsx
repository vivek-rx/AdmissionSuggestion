import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { InteractiveAdmissionSuite } from '../components/home/InteractiveAdmissionSuite';
import { CounsellorSection } from '../components/home/CounsellorSection';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Stethoscope, Briefcase, ShieldCheck, Sparkles } from 'lucide-react';

interface HomePageProps {
  onOpenConsultation: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="space-y-16 font-sans">
      
      {/* 1. Clean Hero Section & Admission OS Terminal */}
      <HeroSection onOpenConsultation={onOpenConsultation} />

      {/* 2. Core Admission Streams Navigation (Engineering • Medical • Management) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00ADEF] font-heading block">
                Dedicated Pathways
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Choose Your Admission Stream
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Direct routes, quotas, and cut-off benchmarks for Maharashtra admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Engineering Card */}
            <Link
              to="/engineering"
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#00ADEF] transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#00ADEF] flex items-center justify-center border border-sky-200 group-hover:scale-105 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#00ADEF] transition-colors">
                    Engineering Admissions
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    MHT-CET State Quota (65-85%), JEE Main All India Quota, CAP Option Form sequencing, and DSE Lateral Entry.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00ADEF] font-heading">
                <span>Explore Engineering</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Medical Card */}
            <Link
              to="/medical"
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-rose-600 transition-colors">
                    Medical & Healthcare
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    NEET UG score analysis, 85% DMER State Quota, Govt MBBS, BDS, AYUSH (BAMS/BHMS), and Deemed Medical seats.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 font-heading">
                <span>Explore Medical</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Management Card */}
            <Link
              to="/management"
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-400 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-purple-700 transition-colors">
                    Management & UG
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                    BBA, BCA, MBA/MMS (MAH-CET & CAT), Data Science UG, and Deemed Business Schools across Pune & Mumbai.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 font-heading">
                <span>Explore Management</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Single Focused Interactive Admission Suite (Predictor, Deadlines, Scanner, Fees, Spot) */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <InteractiveAdmissionSuite onOpenConsultation={onOpenConsultation} />
      </div>

      {/* 4. Leadership & Verified Proven Results */}
      <CounsellorSection onOpenConsultation={onOpenConsultation} />

      {/* 5. In-Person Consultation Booking & Pune Head Office Location */}
      <ConsultationSection />

    </div>
  );
};
