import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Building2, CheckCircle2, MapPin, ShieldCheck, Phone } from 'lucide-react';
import trustedLogo from '../../assets/logo.png';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 lg:px-8 relative font-sans bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Brand Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl p-1 bg-gradient-to-br from-[#00A3FF] via-[#0284C7] to-[#0F172A] shadow-xl overflow-hidden">
              <div className="bg-white p-8 rounded-[22px] space-y-6">
                <div className="flex items-center justify-center pb-4 border-b border-slate-100">
                  <img
                    src={trustedLogo}
                    alt="Admission Suggestion - Your Trusted Counselling Partner"
                    className="h-16 w-auto object-contain"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-heading flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00ADEF]" /> Headquarter Location
                    </span>
                    <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                      Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-heading flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#00ADEF]" /> Direct Counselling Helpline
                    </span>
                    <a href="tel:+919860777069" className="text-sm font-extrabold text-[#00ADEF] block hover:underline">
                      +91 9860 777 069
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Serving students across Maharashtra & India for 20+ years</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00ADEF]" />
              <span>20+ Years Educational Excellence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
              Why 15,000+ Students Trust <span className="text-[#00ADEF]">Admission Suggestion</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Selecting the right college and branch defines your entire professional career. At <strong>Admission Suggestion</strong>, our senior mentors provide unbiased, transparent counseling for all <strong>350+ Government, Autonomous, and Private Engineering & Medical Institutes</strong> across Maharashtra.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
                  <Award className="w-5 h-5 text-[#00ADEF]" />
                  <span>20+ Years Ground Legacy</span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  In-depth mastery of DTE Maharashtra rules, percentile normalization curves, category seat matrices, and spot round dynamics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
                  <Users className="w-5 h-5 text-[#00ADEF]" />
                  <span>15,000+ Placed Students</span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Our alumni study in COEP Tech, VJTI Mumbai, SPIT, PICT Pune, VIT Pune, Walchand, Cummins & top state universities.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              We impartially analyze 3-year cutoff trends, TFWS 100% tuition waivers, EBC concessions, and placement records so you secure the absolute best college your rank qualifies for.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
