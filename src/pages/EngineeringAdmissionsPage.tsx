import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, CheckCircle2, ArrowRight, FileText, BarChart3, School, Compass, ChevronRight, HelpCircle } from 'lucide-react';
import { ConsultationSection } from '../components/home/ConsultationSection';

export const EngineeringAdmissionsPage: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const routes = [
    {
      id: 'mht-cet',
      title: 'MHT-CET (Maharashtra State Quota - 65% to 85%)',
      badge: 'State Merit List',
      badgeColor: 'bg-sky-50 text-[#00ADEF] border-sky-200',
      desc: 'The primary gateway for Maharashtra state candidates. Governs Home University (SPPU, Mumbai, DBATU), Other than Home University (OHU), and State Level (SL) seats.',
      points: [
        'PCM Group percentile score mapping',
        'SPPU (Pune) vs Mumbai vs Other University seat matrices',
        'Category benefits: OBC (50% fee), TFWS (100% tuition waiver), EWS, SC/ST',
        'Autonomous colleges like COEP, VJTI, PICT, VIT Pune & PCCOE'
      ]
    },
    {
      id: 'jee-main',
      title: 'JEE Main (All India Quota - 15%)',
      badge: 'All India Candidates',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: '15% sanctioned seats in all Maharashtra un-aided & autonomous engineering colleges are reserved for All India candidates through JEE Main Paper-1 score.',
      points: [
        'Maharashtra and Non-Maharashtra (OMS) student eligibility',
        'Separate All India Merit Rank list published by DTE CET Cell',
        'Top choices: PICT, SPIT Mumbai, DJSCE, MIT-WPU, VIT Pune',
        'No caste category reservations apply for 15% AI seats'
      ]
    },
    {
      id: 'cap-process',
      title: 'DTE Centralized Admission Process (CAP Rounds 1, 2 & 3)',
      badge: 'Choice Optimization',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      desc: 'The official 3-round counseling workflow. Strategy in Choice Code sequencing determines whether you secure a Dream, Target, or Safe college.',
      points: [
        'Auto-Freeze rules (Mandatory acceptance if Choice #1 allotted)',
        'Float & Betterment rules for Round 2 and Round 3',
        'ARC verification & ₹1,000 seat acceptance confirmation',
        '1-to-300 Choice Code sequence strategy formulated by our mentors'
      ]
    },
    {
      id: 'mgmt-spot',
      title: 'Management Quota (20%) & Against-CAP (ACAP) Spot Rounds',
      badge: 'Merit-Based Institutional',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      desc: 'Direct merit-based seats available under 20% Institutional Quota in private autonomous colleges and post-Round 3 vacancy spot rounds.',
      points: [
        '100% legal & DTE-compliant institutional round admissions',
        'Against-CAP vacancy rounds where cutoffs frequently drop by 2% to 4%',
        'Colleges: VIT Pune, PCCOE, Cummins, DY Patil, MIT-WPU, Somaiya',
        'Requires valid DTE Application ID (EN26xxxxxx)'
      ]
    },
    {
      id: 'dse',
      title: 'Direct Second Year Engineering (DSE - Diploma to Degree)',
      badge: 'Polytechnic Diploma',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      desc: 'Lateral entry directly into the 2nd Year (3rd Semester) of B.E. / B.Tech for MSBTE and AICTE-recognized polytechnic diploma holders.',
      points: [
        'Diploma aggregate percentage normalization',
        'Lateral branch conversion rules (Mechanical/Civil to CSE/AI/DS)',
        '10% lateral entry supernumerary seats in all colleges',
        'Document readiness: Diploma marksheet, Leaving Certificate, Equivalence'
      ]
    }
  ];

  return (
    <div className="space-y-16 py-6 font-sans">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ADEF]/20 border border-[#00ADEF]/30 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <Cpu className="w-4 h-4" />
              <span>Engineering Admissions 2026-27</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              B.E. & B.Tech Admission Routes in <span className="text-[#00ADEF]">Maharashtra</span>
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Complete, transparent pathway guidance across MHT-CET State Quotas, JEE Main All India Seats, DTE CAP Rounds, Direct 2nd Year (DSE), and Institutional Merit Quotas.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/cap-generator"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#00ADEF] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] flex items-center justify-center border border-sky-200">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 font-heading">Option Form Builder</h3>
                <p className="text-[11px] text-slate-500 font-medium">9-Digit Choice Codes</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00ADEF] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/marks-vs-percentile"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#00ADEF] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] flex items-center justify-center border border-sky-200">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 font-heading">Marks Normalizer</h3>
                <p className="text-[11px] text-slate-500 font-medium">Percentile & State Rank</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00ADEF] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/colleges"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#00ADEF] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] flex items-center justify-center border border-sky-200">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 font-heading">Colleges Directory</h3>
                <p className="text-[11px] text-slate-500 font-medium">COEP, PICT, VIT Cutoffs</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00ADEF] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Engineering Routes Detail Cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="border-l-2 border-[#00ADEF] pl-4">
          <h2 className="text-2xl font-bold text-slate-900 font-heading">5 Distinct Engineering Admission Routes</h2>
          <p className="text-xs text-slate-600 font-normal">Choose the route matching your score, domicile, and institutional preference.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {routes.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#00ADEF] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border font-heading ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {r.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-heading block">
                    Key Features:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600 font-normal">
                    {r.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00ADEF] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white text-xs font-bold transition-all flex items-center justify-between font-heading shadow-xs"
                >
                  <span>Book Engineering Counselling Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Section */}
      <ConsultationSection />

    </div>
  );
};
