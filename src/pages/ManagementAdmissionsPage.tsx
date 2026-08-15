import React, { useEffect } from 'react';
import { Briefcase, ShieldCheck, CheckCircle2, ArrowRight, TrendingUp, Laptop, Award, School, Building2 } from 'lucide-react';
import { ConsultationSection } from '../components/home/ConsultationSection';

export const ManagementAdmissionsPage: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const managementRoutes = [
    {
      id: 'bba',
      title: 'BBA (Bachelor of Business Administration)',
      badge: 'Premier Business UG',
      badgeColor: 'bg-sky-50 text-[#00ADEF] border-sky-200',
      desc: 'Top undergraduate business degree offering specializations in International Business, Marketing, Fintech, Entrepreneurship, and Business Analytics.',
      points: [
        'Institutes: Symbiosis (SET), NMIMS (NPAT), MIT-WPU Pune, Bharati Vidyapeeth, FLAME University, Indira Institute',
        'Entrance exam prep & profile evaluation advisory',
        'Direct institutional admission guidance for private universities in Pune & Mumbai',
        'Placement reality, internship modules, and global exchange accreditation'
      ]
    },
    {
      id: 'bca',
      title: 'BCA (Bachelor of Computer Applications)',
      badge: 'Tech & Software UG',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: '3-Year and 4-Year (NEP) software & technology undergraduate program for 12th Science, Commerce, and Arts students targeting IT/software careers.',
      points: [
        'Curriculum focus: Full-Stack Development, Cloud Computing, Python, AI/ML basics',
        'MAH-BCA CET and university level entrance test guidance',
        'Top Pune colleges: MIT-WPU, Bharati Vidyapeeth, DY Patil, Modern College, Symbiosis',
        'Direct career pathway to MCA and top software MNC campus hiring'
      ]
    },
    {
      id: 'mba-mms',
      title: 'MBA & MMS (Postgraduate Management Admissions)',
      badge: 'Postgraduate Programs',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      desc: 'CAP counseling and institutional seats across MAH-MBA CET, CAT, CMAT, XAT, MAT, and ATMA for top business schools in Maharashtra.',
      points: [
        'Top state institutes: JBIMS Mumbai, SIMSREE, PUMBA Pune, Welingkar, Indira Pune',
        'DTE MBA CAP Round option form preference sequencing',
        'Specialization advisory: Finance, Marketing, Operations, HR, Business Analytics',
        'GD/PI preparation and university institutional quota seats'
      ]
    },
    {
      id: 'other-ug',
      title: 'Other Professional UG Programs (B.Sc Data Science • B.Des • B.Com Hons)',
      badge: 'Emerging Programs',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      desc: 'High-growth emerging professional degrees aligned with National Education Policy (NEP 2020) and modern industry recruiter demands.',
      points: [
        'B.Sc in Data Science & Artificial Intelligence',
        'B.Sc in Cyber Security & Digital Forensics',
        'B.Des (Bachelor of Design) in UI/UX & Product Design',
        'B.Com (Honours with ACCA / Fintech specialization)'
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
              <Briefcase className="w-4 h-4" />
              <span>Management & UG Admissions 2026-27</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              BBA, BCA & MBA Admissions in <span className="text-[#00ADEF]">Pune & Mumbai</span>
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Strategic guidance for business, computer application, and professional undergraduate degrees across Maharashtra's premier universities and autonomous business schools.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
              <TrendingUp className="w-5 h-5 text-[#00ADEF]" />
              <span>Career & ROI Assessment</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              We analyze real average packages, internship recruitments, and corporate industry tie-ups before recommending any BBA or MBA program.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
              <Laptop className="w-5 h-5 text-[#00ADEF]" />
              <span>Tech & Software Pathway</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Guiding 12th Commerce & Science students into BCA / B.Sc Data Science to build software careers without JEE/CET engineering pressures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
              <Building2 className="w-5 h-5 text-[#00ADEF]" />
              <span>Direct University Merit Seats</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Direct institutional admission assistance for Symbiosis, NMIMS, MIT-WPU, Bharati Vidyapeeth, DY Patil, and Balaji University.
            </p>
          </div>
        </div>
      </div>

      {/* Management Routes Detail Cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="border-l-2 border-[#00ADEF] pl-4">
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Management & UG Professional Pathways</h2>
          <p className="text-xs text-slate-600 font-normal">Select your program to explore eligibility, entrance exams, and top university seats.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {managementRoutes.map((r) => (
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
                    Key Highlights:
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
                  <span>Book Management Counselling Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Callback Consultation */}
      <ConsultationSection />

    </div>
  );
};
