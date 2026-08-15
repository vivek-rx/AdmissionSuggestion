import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Building2,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  Zap,
  Target,
  FileCheck,
  CheckCircle2,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collegeBrochureLogos } from '../../data/initialData';
import { PillMarkPro } from '../ui/pillmark-pro';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  const navigate = useNavigate();
  const [quickPercentile, setQuickPercentile] = useState<number>(93.5);

  const stats = [
    {
      value: '350+',
      label: 'CAP Institutes',
      sublabel: 'DTE Maharashtra Codes',
      icon: Building2,
      color: 'bg-sky-50 text-[#00ADEF] border-sky-200'
    },
    {
      value: '20+ Yrs',
      label: 'Pune Mentorship',
      sublabel: 'Er. Akshaykumar Bhandari',
      icon: Award,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      value: '100%',
      label: 'Zero-Rejection FC',
      sublabel: 'Document Scrutiny Check',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      value: '₹50.5L',
      label: 'Highest Package',
      sublabel: 'Top Autonomous Tier',
      icon: Zap,
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  return (
    <section id="hero" className="relative pt-6 sm:pt-10 pb-16 px-4 lg:px-8 font-sans overflow-hidden bg-slate-50 border-b border-slate-200">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#00ADEF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Main Grid: Left Value Proposition + Right Live Admission OS Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Typography & Core OS Value (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Duolingo-style Live Readiness Meter */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-bold text-slate-800 font-heading">CAP 2026 Live Status:</span>
              <span className="text-slate-600 font-medium font-mono">FC Scrutiny Window Active</span>
              <span className="text-[11px] font-bold text-[#00ADEF] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                85% Seats Open
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 font-heading leading-[1.12] tracking-tight">
                Your Modern <span className="text-[#00ADEF]">Admission OS</span> For Maharashtra
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                Precision cut-off analytics, shift normalizers, and senior 1-on-1 CAP Option Form sequencing by <strong>Er. Akshaykumar Bhandari</strong>. Built for Maharashtra students & parents.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-4 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 group font-heading"
              >
                <span>Book In-Person Counselling</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/form-assistance')}
                className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs font-heading"
              >
                <span>Need help filling your admission form?</span>
                <ChevronRight className="w-4 h-4 text-[#00ADEF]" />
              </button>
            </div>

            {/* Quick Feature Micro-Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> SPPU vs Mumbai Quota
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 100% TFWS / EBC Guidance
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 3-Tier Option Strategy
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Admission OS Cockpit (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center border border-[#00ADEF]/30">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-heading text-white">Live Merit Engine</h3>
                    <p className="text-[11px] text-slate-400 font-mono">DTE 2026-27 Cutoff Slabs</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  ● REALTIME
                </span>
              </div>

              {/* Interactive Percentile Slider (Zerodha Precision Feel) */}
              <div className="space-y-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Test Candidate Percentile:</span>
                  <span className="text-lg font-black text-[#00ADEF] font-mono">{quickPercentile.toFixed(1)}%ile</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="99.8"
                  step="0.5"
                  value={quickPercentile}
                  onChange={(e) => setQuickPercentile(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00ADEF]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>60.0%</span>
                  <span>80.0%</span>
                  <span>95.0%</span>
                  <span>99.8%</span>
                </div>
              </div>

              {/* Live Matched Tiers */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-emerald-400 font-bold block font-sans">🟢 High Probability Match:</span>
                    <span className="text-slate-200">
                      {quickPercentile >= 95 ? 'VIT Pune (Bibwewadi) — IT / AI-DS' : quickPercentile >= 88 ? 'PCCOE Akurdi — AI / Data Science' : 'AISSMS IOIT — Computer Engg'}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold">96% Chance</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-bold block font-sans">🟡 Competitive Target:</span>
                    <span className="text-slate-200">
                      {quickPercentile >= 95 ? 'PICT Pune — E&TC / Data Science' : quickPercentile >= 88 ? 'VIT Pune — Mechanical / Robotics' : 'Modern COE — Computer Engg'}
                    </span>
                  </div>
                  <span className="text-amber-400 font-bold">Round 2</span>
                </div>
              </div>

              {/* Direct Strategy Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/cap-generator')}
                  className="w-full py-3.5 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider transition-all font-heading shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build Full 300-Choice Option Form</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Big Numbers & Zerodha Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4 hover:-translate-y-1 hover:border-[#00ADEF] transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Draggable College Logos Pillmark Pro Marquee */}
        <div className="pt-8 border-t border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#00ADEF] text-[10px] font-bold uppercase tracking-wider font-heading">
                <span>Associated Top Institutes & DTE Codes</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading mt-1">
                Top Autonomous, Government & Private Engineering Colleges
              </h3>
            </div>
            <button
              onClick={() => navigate('/colleges')}
              className="text-xs font-bold text-[#00ADEF] hover:text-[#0098D4] flex items-center gap-1 self-start sm:self-auto transition-colors font-heading"
            >
              <span>Explore Cut-offs & Fees</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
            <PillMarkPro
              logos={collegeBrochureLogos}
              rowSplit="shifted"
              showSecondRow={true}
              oppositeDirection={true}
              direction="left"
              speed={28}
              hoverBehavior="slow"
              hoverSpeed={0.15}
              dragEnabled={true}
              itemGap={16}
              rowGap={12}
              pillPadX={20}
              pillPadY={12}
              pillRadius={16}
              borderWidth={1}
              borderColor="rgba(226, 232, 240, 0.9)"
              shadow={true}
              shadowColor="rgba(15, 23, 42, 0.04)"
              fadeEdges={true}
              fadeWidth={80}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
