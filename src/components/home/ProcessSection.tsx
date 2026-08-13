import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ListOrdered,
  Layers,
  Edit3,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface ProcessSectionProps {
  onOpenConsultation: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Online Application & Verification',
      shortTitle: '1. Registration & FC Verification',
      icon: FileText,
      tagline: 'Initial Registration & E-Scrutiny',
      description: 'Fill out the online application form on the official State CET Cell website. Upload required mandatory certificates and choose E-Scrutiny or Physical Facilitation Center (FC) for document verification.',
      keyActions: [
        'Upload clear copies of 10th, 12th, CET/JEE scorecards',
        'Verify Caste Validity & Non-Creamy Layer (if applicable)',
        'Obtain FC Verification Acknowledgement Receipt'
      ],
      proTip: 'Double check candidate name, category and date of birth match your 10th mark sheet exactly to prevent application rejection.'
    },
    {
      num: '02',
      title: 'Display of Merit List',
      shortTitle: '2. Provisional & Final Merit Rank',
      icon: ListOrdered,
      tagline: 'Rank Calculation & Grievance',
      description: 'State CET Cell publishes the Provisional Merit List. Candidates check their State Rank, Category Rank, Home University Rank, and TFWS status. Submit grievances if marks or details are inaccurate before Final Merit List.',
      keyActions: [
        'Check Provisional Merit Rank & Category Rank',
        'Raise online grievance if any discrepancy in marks/reservation',
        'Download Final Merit List number for Option Form strategy'
      ],
      proTip: 'Always calculate your realistic seat chances using your State Merit Rank rather than raw percentile.'
    },
    {
      num: '03',
      title: 'CAP Round Strategy',
      shortTitle: '3. Seat Matrix & CAP Strategy',
      icon: Layers,
      tagline: 'Seat Matrix & Cut-off Analysis',
      description: 'Analyze category-wise Seat Matrix published by DTE/CET Cell. Match your merit rank with past 3 years opening and closing cutoffs across top engineering, pharmacy and management colleges in Pune, Mumbai & Rest of Maharashtra.',
      keyActions: [
        'Categorize choices: Dream Colleges, Realistic Colleges, Safe Backups',
        'Review Autonomous vs University Affiliated syllabus & placement record',
        'Analyze TFWS (Tuition Fee Waiver Scheme) 5% supernumerary seats'
      ],
      proTip: 'Do not put only top-tier dream colleges in CAP Round 1 without safe fallback options, or you risk getting no allotment.'
    },
    {
      num: '04',
      title: 'Filling the Option Form',
      shortTitle: '4. Option Form Filling & Lock',
      icon: Edit3,
      tagline: 'Preference Order & Locking',
      description: 'Enter up to 300 college choices in strict order of preference. Choice #1 is Auto-Freeze (mandatory seat acceptance if allotted). Submit and confirm option form online using OTP before the deadline.',
      keyActions: [
        'Place absolute top choice at Option #1',
        'Verify Option Codes (e.g. 600624510 for COEP Computer Engg)',
        'Lock and print confirmed Option Form receipt'
      ],
      proTip: 'Option #1 allotment automatically freezes your seat and disqualifies you from subsequent CAP rounds. Place your #1 preference with extreme care!'
    },
    {
      num: '05',
      title: 'Allotment & Institute Reporting',
      shortTitle: '5. Allotment & ARC Reporting',
      icon: CheckCircle,
      tagline: 'Seat Allotment & Final Admission',
      description: 'Check CAP Seat Allotment status. Select Freeze (accept seat), Float/Betterment (accept & apply for next round), or Reject. Pay Seat Acceptance Fee online, report to ARC & Institute with original documents.',
      keyActions: [
        'Download CAP Seat Allotment Letter',
        'Pay Seat Acceptance Fee online via portal',
        'Submit original documents & pay balance fees at allotted college'
      ],
      proTip: 'Failure to report to college within prescribed dates leads to automatic cancellation of seat allotment.'
    }
  ];

  return (
    <section id="process" className="py-20 px-4 lg:px-8 relative font-sans bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Step-By-Step Admission Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Maharashtra CAP Admission <span className="text-[#00A3FF]">Process Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Understand every stage of the Centralized Admission Process (CAP) to prevent costly option locking errors.
          </p>
        </div>

        {/* Top Process Step Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {steps.map((step, idx) => {
            const IconC = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isActive
                    ? 'bg-white border-[#00A3FF] shadow-lg shadow-sky-500/10 scale-105'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-[#00A3FF] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {step.num}
                  </span>
                  <IconC className={`w-5 h-5 ${isActive ? 'text-[#00A3FF]' : 'text-slate-400'}`} />
                </div>
                <h4 className={`text-xs font-bold font-heading line-clamp-2 ${
                  isActive ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {step.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Card */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-200 shadow-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Step Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#0284C7] uppercase tracking-wider">
                    Stage {steps[activeStep].num} of 05
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-bold text-slate-500 font-heading">
                    {steps[activeStep].tagline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {steps[activeStep].title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {steps[activeStep].description}
              </p>

              {/* Key Checklist Actions */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-heading">
                  Crucial Candidate Actions:
                </span>
                <div className="space-y-2.5">
                  {steps[activeStep].keyActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0284C7] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </div>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Counsellor Pro-Tip Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider font-heading">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Senior Counsellor Warning</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {steps[activeStep].proTip}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Worried About Filling Option Form?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Sit with our senior counsellors at Sohrab Hall, Pune. We review your merit number, categorize top colleges, and build your 300 choices error-free.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-xl bg-[#00A3FF] hover:bg-[#0284C7] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 font-heading"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Get 1-on-1 Assistance</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
