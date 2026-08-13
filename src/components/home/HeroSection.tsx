import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Users,
  Building2,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Star,
  GraduationCap,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PillMarkPro } from '../ui/pillmark-pro';
import { collegeBrochureLogos } from '../../data/initialData';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const { banners } = useApp();
  const activeBanners = banners.filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto slide carousel
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const stats = [
    {
      icon: Award,
      value: '20+',
      label: 'Years in Pune',
      sublabel: 'Trusted Counselling Legacy',
      color: 'bg-blue-50 text-[#00A3FF] border-blue-200'
    },
    {
      icon: Users,
      value: '15,000+',
      label: 'Students Guided',
      sublabel: 'In Top Maharashtra Institutes',
      color: 'bg-slate-50 text-slate-800 border-slate-200'
    },
    {
      icon: Building2,
      value: '100+',
      label: 'Associate Colleges',
      sublabel: 'Autonomous & Universities',
      color: 'bg-sky-50 text-[#0284C7] border-sky-200'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'CAP Round Success',
      sublabel: 'Target College Allotment',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    }
  ];

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-16 px-4 lg:px-8 font-sans overflow-hidden bg-slate-50 border-b border-slate-200">
      {/* Premium SVG Dot Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#00A3FF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      {/* Background ambient lighting */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#00A3FF]/20 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-40 right-[-10%] w-[600px] h-[400px] bg-sky-300/15 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-slate-900 font-extrabold font-heading">4.9 / 5</span>
              <span className="text-slate-500 font-normal">| 20+ Years Trusted Educational Consulting in Pune</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner?.id || currentIndex}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
                  <span>{currentBanner?.badge || 'Centralized Admission Process (CAP) Specialist'}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-heading leading-[1.15] tracking-tight">
                  {currentBanner?.title || 'Securing Your Best College Seat In Maharashtra'}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                  {currentBanner?.subtitle || 'Get personalized 1-on-1 guidance for MHT-CET, JEE Main, NEET UG & DSE CAP Rounds. We build strategic option forms to ensure maximum rank utilization.'}
                </p>

                {/* CTA Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={onOpenConsultation}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group font-heading"
                  >
                    <span>{currentBanner?.ctaText || 'Book In-Person Counselling'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigate('/cap-generator')}
                    className="px-7 py-4 rounded-xl bg-white hover:bg-sky-50 text-slate-800 hover:text-[#00A3FF] border border-slate-300 hover:border-[#00A3FF]/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs font-heading"
                  >
                    <span>⚡ Build CAP Option Form</span>
                    <ChevronRight className="w-4 h-4 text-[#00A3FF]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Indicators */}
            {activeBanners.length > 1 && (
              <div className="flex items-center gap-2.5 pt-2">
                {activeBanners.map((banner, index) => (
                  <button
                    key={banner.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-[#00A3FF]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Genuine Counsellor Consultation Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#00A3FF]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base font-heading">CAP Round Counselling Desk</h3>
                    <p className="text-xs text-slate-500 font-medium">Head Office: Sohrab Hall, Pune Station</p>
                  </div>
                </div>
              </div>

              {/* Counselling Guarantees */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct Option Form sequencing by experienced counsellors</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Category Benefits, TFWS & EWS Fee Waiver Guidance</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cut-off analysis for COEP, VJTI, PICT, SPIT & VIT Pune</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero-rejection Document Scrutiny Center verification check</span>
                </div>
              </div>

              {/* Call & Direct Appointment buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 font-heading"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Schedule In-Person Consultation</span>
                </button>

                <a
                  href="tel:+919860777069"
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-heading"
                >
                  <PhoneCall className="w-4 h-4 text-[#00A3FF]" />
                  <span>Call Helpline: +91 9860 777 069</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,163,255,0.12)] transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium group-hover:text-slate-600 transition-colors">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Framer-Powered Draggable College Logos Pillmark Pro Marquee */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#00A3FF] text-[10px] font-bold uppercase tracking-wider font-heading">
                <span>Associated Top Institutes & DTE Codes</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mt-1">
                Top Autonomous, Government & Private Engineering Colleges
              </h3>
            </div>
            <button
              onClick={() => navigate('/colleges')}
              className="text-xs font-bold text-[#00A3FF] hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto transition-colors font-heading"
            >
              <span>Explore Cut-offs & Fees</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/60 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <PillMarkPro
              logos={collegeBrochureLogos}
              rowSplit="shifted"
              showSecondRow={true}
              oppositeDirection={true}
              direction="left"
              speed={34}
              hoverBehavior="slow"
              hoverSpeed={0.15}
              dragEnabled={true}
              momentum={true}
              friction={0.05}
              secondRowOffset={140}
              rowGap={14}
              itemGap={16}
              pillPadX={20}
              pillPadY={12}
              pillRadius={16}
              pillColor="#FFFFFF"
              borderWidth={1}
              borderColor="rgba(226, 232, 240, 0.9)"
              shadow={true}
              shadowColor="rgba(15, 23, 42, 0.04)"
              shadowBlur={12}
              shadowY={3}
              hoverLift={3}
              fadeEdges={true}
              fadeWidth={80}
              onItemClick={(item) => navigate('/colleges')}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
