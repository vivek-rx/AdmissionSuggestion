import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Clock, FileCheck, Calculator, Sparkles, School, ShieldCheck } from 'lucide-react';
import { CollegePredictorWidget } from './CollegePredictorWidget';
import { AdmissionDeadlineTracker } from './AdmissionDeadlineTracker';
import { DocumentValidityChecker } from './DocumentValidityChecker';
import { MahaDbtFeeCalculator } from './MahaDbtFeeCalculator';
import { SpotRoundGuide } from './SpotRoundGuide';

interface InteractiveAdmissionSuiteProps {
  onOpenConsultation: () => void;
}

export const InteractiveAdmissionSuite: React.FC<InteractiveAdmissionSuiteProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'predictor' | 'tracker' | 'documents' | 'fees' | 'spot'>('predictor');

  const tabs = [
    {
      id: 'predictor' as const,
      label: 'CAP College Predictor',
      shortLabel: 'Predictor',
      icon: Compass,
      badge: 'Interactive'
    },
    {
      id: 'tracker' as const,
      label: 'Deadline Tracker & Alerts',
      shortLabel: 'Deadlines',
      icon: Clock,
      badge: 'Live Dates'
    },
    {
      id: 'documents' as const,
      label: 'Document Scrutiny Scanner',
      shortLabel: 'FC Scanner',
      icon: FileCheck,
      badge: 'Zero-Rejection'
    },
    {
      id: 'fees' as const,
      label: 'MahaDBT Fee Calculator',
      shortLabel: 'Scholarships',
      icon: Calculator,
      badge: 'TFWS / EBC'
    },
    {
      id: 'spot' as const,
      label: 'ACAP & Spot Round Guide',
      shortLabel: 'Spot Rounds',
      icon: Sparkles,
      badge: 'Insider'
    }
  ];

  return (
    <section className="space-y-6">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Interactive DTE Admission Suite</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
          Everything You Need for Maharashtra CAP Round 2026-27
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          Switch between verified engineering cutoffs, FC center document audits, fee concession calculators, and live DTE schedules — all in one unified command center.
        </p>
      </div>

      {/* Segmented Controller Tabs Bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none px-2">
        <div className="inline-flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 shadow-inner max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap font-heading ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#00ADEF]' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>

                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isSelected ? 'bg-[#00ADEF] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content with Smooth Transition */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait">
          {activeTab === 'predictor' && (
            <motion.div
              key="predictor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CollegePredictorWidget onOpenConsultation={onOpenConsultation} />
            </motion.div>
          )}

          {activeTab === 'tracker' && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <AdmissionDeadlineTracker />
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DocumentValidityChecker />
            </motion.div>
          )}

          {activeTab === 'fees' && (
            <motion.div
              key="fees"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <MahaDbtFeeCalculator />
            </motion.div>
          )}

          {activeTab === 'spot' && (
            <motion.div
              key="spot"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SpotRoundGuide />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};
