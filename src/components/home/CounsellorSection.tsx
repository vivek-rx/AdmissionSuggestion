import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Star, ShieldCheck, CheckCircle2, Quote, UserCheck, Briefcase, Phone } from 'lucide-react';

interface CounsellorSectionProps {
  onOpenConsultation: () => void;
}

export const CounsellorSection: React.FC<CounsellorSectionProps> = ({ onOpenConsultation }) => {
  const counsellors = [
    {
      name: 'Er. Akshaykumar Bhandari',
      role: 'Director, Admission Suggestion',
      experience: '20+ Years in Engineering Admissions',
      specialty: 'COEP, VJTI, PICT, VIT Pune & Institutional Strategy',
      bio: 'Visionary education mentor who has steered over 15,000+ Maharashtra students into top engineering, medical & management institutes through precise CAP choice sequencing.',
      tag: 'Director & Founder',
      badgeColor: 'bg-sky-50 text-[#00ADEF] border-sky-200'
    },
    {
      name: 'Akash Bhandari',
      role: 'Senior Admissions Advisor & Operations Head',
      experience: '12+ Years in Maharashtra DTE & Centralized Admissions',
      specialty: 'Choice Code Sequencing, TFWS Quotas, DSE & Category Matrix',
      bio: 'Expert strategist specializing in 3-Tier Option Form risk optimization, spot/ACAP round conversions, and 1-on-1 personalized candidate counseling.',
      tag: 'Core Leadership',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      name: 'Prof. Sneha Kulkarni',
      role: 'Document Scrutiny & FC Center Specialist',
      experience: '14+ Years in Technical Education',
      specialty: 'Caste Validity, NCL Compliance, EWS Proforma V & ARC Scrutiny',
      bio: 'Authority in pre-scrutiny document audits ensuring candidates achieve zero-rejection at Facilitation Centers (FC) across Maharashtra.',
      tag: 'Scrutiny Specialist',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  const testimonials = [
    {
      student: 'Rohit Patil',
      allotted: 'COEP Tech, Pune — Computer Engineering',
      rank: 'MHT-CET Merit Rank: 412 (99.64 %ile)',
      comment: 'I was confused between VJTI IT and COEP Comp. Akshaykumar Bhandari Sir sat with my parents at Sohrab Hall, showed previous 3-year branch movements, and structured our Option Form. Got COEP Comp in CAP Round 1!',
      initials: 'RP'
    },
    {
      student: 'Tanvi Deshpande',
      allotted: 'PICT Pune — AI & Data Science (TFWS 100% Waiver)',
      rank: 'MHT-CET Score: 98.42 %ile',
      comment: 'Thanks to Akash Bhandari Sir, we applied under the TFWS scheme correctly with full document validation. Saved 100% tuition fees throughout all 4 years of engineering!',
      initials: 'TD'
    },
    {
      student: 'Atharva Kulkarni',
      allotted: 'VIT Pune — Electronics & Computer Engineering',
      rank: 'MHT-CET Score: 96.10 %ile',
      comment: 'In Round 1 I did not get my preferred branch. The team advised me not to freeze and gave a precision float strategy for Round 2. Secured VIT Pune in Round 2 easily.',
      initials: 'AK'
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 font-sans bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section 1: Senior Leadership & Mentors */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Leadership & Mentorship Panel • Pune</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Meet Our Senior <span className="text-[#00ADEF]">Educational Leadership</span>
            </h2>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Real human mentors with 20+ years of ground expertise at Sohrab Hall, Pune guiding candidates through DTE and CET Cell admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counsellors.map((c) => (
              <div
                key={c.name}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#00ADEF] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#00ADEF] shadow-2xs">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-heading border ${c.badgeColor}`}>
                      {c.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {c.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#00ADEF] mt-0.5 font-heading">
                      {c.role}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">
                      {c.experience}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 space-y-1 text-xs shadow-2xs">
                    <span className="font-bold text-slate-900 block font-heading text-[11px]">Core Specialization:</span>
                    <p className="text-slate-600 leading-relaxed font-normal">{c.specialty}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {c.bio}
                  </p>
                </div>

                <a
                  href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20would%20like%20to%20book%20a%201-on-1%20counselling%20session%20with%20your%20leadership%20team."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 font-heading shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Book Consultation with Team</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Verified Student Allotment Proof Cards */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
            <span className="text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              Proven Track Record
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Verified Student Allotment Proofs (CAP Rounds)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Authentic feedback from students and parents who secured their top college choices through our strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.student}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00ADEF] text-white flex items-center justify-center font-bold text-xs font-heading shrink-0 shadow-xs">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{t.student}</h4>
                      <span className="text-[11px] text-[#00ADEF] font-mono block">{t.rank}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t.allotted}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-1 text-amber-500 pt-2 border-t border-slate-200/80 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] text-slate-500 font-bold ml-1 font-heading">Verified Allotment</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
