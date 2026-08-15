import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart3, FileCheck, School, Calculator, Sparkles, ArrowRight, ShieldCheck, Download, HelpCircle } from 'lucide-react';
import { ConsultationSection } from '../components/home/ConsultationSection';
import { AdmissionDeadlineTracker } from '../components/home/AdmissionDeadlineTracker';
import { DocumentValidityChecker } from '../components/home/DocumentValidityChecker';
import { MahaDbtFeeCalculator } from '../components/home/MahaDbtFeeCalculator';

export const StudentCornerPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const studentTools = [
    {
      id: 'cap-gen',
      title: '3-Tier CAP Option Form Generator',
      badge: 'Preference Strategy',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: FileText,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
      desc: 'Build your customized Dream, Target & Safe college preference list with 9-digit DTE Choice Codes and export a printable PDF.',
      cta: 'Generate Option Form',
      link: '/cap-generator'
    },
    {
      id: 'marks-est',
      title: 'MHT-CET & JEE Marks vs Percentile Normalizer',
      badge: 'Shift-Wise Model',
      badgeColor: 'bg-sky-50 text-[#00ADEF] border-sky-200',
      icon: BarChart3,
      iconBg: 'bg-sky-50 text-[#00ADEF] border-sky-200',
      desc: 'Calculate your estimated percentile and General Merit Rank (GMR) adjusted for shift difficulty curves (Easy, Moderate, Tough).',
      cta: 'Calculate Percentile & Rank',
      link: '/marks-vs-percentile'
    },
    {
      id: 'docs',
      title: '19-Point FC Scrutiny Document Checklist',
      badge: 'Zero-Rejection Guarantee',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: FileCheck,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      desc: 'Interactive certificate validity scanner for Non-Creamy Layer (NCL), Caste Validity receipts, EWS Proforma V, and Domicile certificates.',
      cta: 'Verify My Documents',
      link: '/documents'
    },
    {
      id: 'colleges',
      title: 'Maharashtra College Directory & Cut-Off Trends',
      badge: '350+ Institutes',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: School,
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200',
      desc: 'Search genuine closing cutoffs across SPPU Home University (GOPENH), Other University (OHU), TFWS, and State-Level quotas.',
      cta: 'Browse Colleges & Cutoffs',
      link: '/colleges'
    }
  ];

  return (
    <div className="space-y-16 py-6 font-sans">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ADEF]/20 border border-[#00ADEF]/30 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <Sparkles className="w-4 h-4" />
              <span>Student Self-Service Portal</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Student Corner & <span className="text-[#00ADEF]">CAP Decision Tools</span>
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              All official admission utilities in one place: build your 3-Tier option form, normalize shift-wise exam marks, check document validity, and calculate scholarship fee waivers.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Student Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-lg hover:border-[#00ADEF] transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xs ${tool.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-heading border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading group-hover:text-[#00ADEF] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <Link
                  to={tool.link}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-900 group-hover:bg-[#00ADEF] text-white text-xs font-bold transition-all flex items-center justify-between font-heading shadow-xs"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Admission Deadline Tracker */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <AdmissionDeadlineTracker />
      </div>

      {/* Embedded Document Validity Scanner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <DocumentValidityChecker />
      </div>

      {/* Embedded MahaDBT Fee & Scholarship Calculator */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <MahaDbtFeeCalculator />
      </div>

      {/* Free Callback Consultation */}
      <ConsultationSection />

    </div>
  );
};
