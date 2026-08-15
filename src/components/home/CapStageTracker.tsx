import React, { useState } from 'react';
import { CheckCircle2, Clock, Calendar, AlertTriangle, ArrowRight, Bell, ShieldAlert, Sparkles, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const CapStageTracker: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(2);

  const stages = [
    {
      id: 1,
      title: 'Online Registration & Document Upload',
      status: 'Completed',
      statusColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-300',
      period: 'June 10 – July 08',
      desc: 'Candidate registration on mahacet.org portal and uploading academic certificates.',
      tips: 'Receipts of Caste Validity/NCL uploaded were marked provisional.'
    },
    {
      id: 2,
      title: 'Physical / E-Scrutiny & FC Verification',
      status: 'In Progress (Active)',
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
      period: 'July 10 – July 22',
      desc: 'Verification of original documents at Facilitation Centers (FC) across Maharashtra.',
      tips: '⚠️ Must obtain physical stamped Acknowledgement Slip (ARC copy).'
    },
    {
      id: 3,
      title: 'Provisional & Final State Merit List (SML)',
      status: 'Upcoming',
      statusColor: 'bg-blue-500/10 text-[#00ADEF] border-blue-200',
      period: 'July 24 – July 28',
      desc: 'Release of General Merit Rank (GMR), Category Rank & Home University Status.',
      tips: 'Check spelling, category, and gender in provisional list to raise grievances.'
    },
    {
      id: 4,
      title: 'CAP Round 1: Option Form Submission & Allotment',
      status: 'High Priority',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      period: 'July 30 – August 08',
      desc: 'Filling 1 to 300 Choice Codes. Auto-Freeze rules apply for Choice No. 1.',
      tips: 'Our counsellors build your Dream / Target / Safe sequence to maximize rank.'
    },
    {
      id: 5,
      title: 'CAP Round 2 & 3: Betterment & Seat Acceptance',
      status: 'Critical',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300',
      period: 'August 10 – August 24',
      desc: 'Betterment strategy, seat acceptance fee (₹1,000) & vacancy round seat claim.',
      tips: 'Do not surrender allotted seat without guaranteed better choice in Round 2.'
    },
    {
      id: 6,
      title: 'Institutional (IL) & Against-CAP (ACAP) Spot Rounds',
      status: 'Final Window',
      statusColor: 'bg-purple-500/10 text-purple-700 border-purple-300',
      period: 'August 26 – September 05',
      desc: 'Direct merit-based offline rounds for vacant seats at autonomous institutes.',
      tips: 'COEP, VJTI, PICT, VIT, PCCOE conduct separate offline rounds.'
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md font-sans">
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <Clock className="w-3.5 h-3.5" />
              <span>DTE Maharashtra • Admission Schedule 2026-27</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
              Maharashtra Engineering CAP Timeline & Stage Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Track live admission milestones, FC scrutiny status, and avoid missing mandatory reporting deadlines.
            </p>
          </div>

          {/* Direct WhatsApp Date Alert Button */}
          <a
            href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20please%20subscribe%20me%20for%20live%20DTE%20CAP%20Round%20date%20alerts%20and%20cutoff%20updates."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shrink-0 font-heading"
          >
            <Bell className="w-4 h-4" />
            <span>Get Live WhatsApp Date Alerts</span>
          </a>
        </div>

        {/* Stage Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((stage) => {
            const isSelected = activeStageId === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-800 shadow-lg scale-[1.01]'
                    : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 shadow-2xs hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-slate-800 text-[#00ADEF]' : 'bg-slate-200 text-slate-700'
                    }`}>
                      Stage 0{stage.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${stage.statusColor}`}>
                      {stage.status}
                    </span>
                  </div>

                  <h3 className={`font-bold text-sm font-heading ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {stage.title}
                  </h3>

                  <div className={`flex items-center gap-1.5 text-xs font-medium ${isSelected ? 'text-sky-300' : 'text-[#00ADEF]'}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{stage.period}</span>
                  </div>

                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {stage.desc}
                  </p>
                </div>

                <div className={`p-2.5 rounded-xl text-[11px] font-medium border ${
                  isSelected
                    ? 'bg-slate-800/80 border-slate-700 text-amber-300'
                    : 'bg-amber-50/80 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                    <span>{stage.tips}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
