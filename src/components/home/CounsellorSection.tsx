import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Star, ShieldCheck, CheckCircle2, Quote, UserCheck } from 'lucide-react';

interface CounsellorSectionProps {
  onOpenConsultation: () => void;
}

export const CounsellorSection: React.FC<CounsellorSectionProps> = ({ onOpenConsultation }) => {
  const counsellors = [
    {
      name: 'Prof. R. K. Sharma',
      role: 'Senior Chief Counsellor',
      experience: '22+ Years in DTE Admissions',
      specialty: 'COEP, VJTI, SPIT & Autonomous Engineering Options',
      bio: 'Former technical institute advisor who has personally designed over 8,000 successful CAP option forms across Maharashtra.',
      tag: 'Head Mentor'
    },
    {
      name: 'Mrs. Sneha Kulkarni',
      role: 'CAP Strategy & DSE Specialist',
      experience: '14+ Years in Engineering Counselling',
      specialty: 'Direct 2nd Year (DSE), TFWS & Category Matrix',
      bio: 'Expert in diploma-to-degree seat conversion strategies and TFWS tuition fee waiver quota allotment.',
      tag: 'Engineering Specialist'
    },
    {
      name: 'Dr. Amit Deshmukh',
      role: 'Medical & Healthcare Admissions Advisor',
      experience: '16+ Years in NEET Counselling',
      specialty: 'NEET UG / State Quota (MBBS, BDS, BAMS)',
      bio: 'Guidance through MCC All-India quota and Maharashtra State DMER counseling rounds with zero document rejections.',
      tag: 'Medical Advisor'
    }
  ];

  const testimonials = [
    {
      student: 'Rohit Patil',
      allotted: 'COEP Tech, Pune — Computer Engineering',
      rank: 'MHT-CET Merit Rank: 412 (99.64 %ile)',
      comment: 'I was confused between VJTI IT and COEP Comp. Sharma Sir sat with my parents at Sohrab Hall, showed the previous 3 years branch movement, and structured our Option Form. Got COEP Comp in CAP Round 1!',
      initials: 'RP'
    },
    {
      student: 'Tanvi Deshpande',
      allotted: 'PICT Pune — AI & Data Science (TFWS Seat)',
      rank: 'MHT-CET Score: 98.42 %ile',
      comment: 'Thanks to Admission Suggestion, we applied under the TFWS scheme correctly with full document validation. Saved 100% tuition fees throughout 4 years of engineering!',
      initials: 'TD'
    },
    {
      student: 'Atharva Kulkarni',
      allotted: 'VIT Pune — Electronics & Computer Engineering',
      rank: 'MHT-CET Score: 96.10 %ile',
      comment: 'In Round 1 I did not get my preferred branch. Sneha Ma’am advised me not to freeze and gave a better float strategy for Round 2. Secured VIT Pune in Round 2 easily.',
      initials: 'AK'
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 font-sans bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section 1: Senior Counsellors */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>Meet Your Mentors in Pune</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Experienced Senior <span className="text-[#00A3FF]">Admission Counsellors</span>
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Real human mentors with decades of ground experience in Maharashtra DTE and DMER counselling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {counsellors.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all group will-change-[transform,opacity] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-blue-100 text-[#0284C7] font-heading">
                      {c.tag}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{c.experience}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{c.name}</h3>
                    <p className="text-xs text-[#00A3FF] font-bold mt-0.5">{c.role}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {c.bio}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Key Expertise:
                    </span>
                    <span className="font-semibold text-slate-800">{c.specialty}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-[#00A3FF] text-slate-800 hover:text-white border border-slate-200 text-xs font-bold transition-all shadow-sm font-heading"
                  >
                    Book Session With {c.name.split(' ')[1]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Verified Student Allotments & Reviews */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Student Allotments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Real Students, Real Allotments Across Maharashtra
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={t.student}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow relative"
              >
                <Quote className="w-8 h-8 text-blue-100 absolute top-4 right-4" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00A3FF] to-[#0284C7] text-white flex items-center justify-center font-extrabold text-xs shrink-0 font-heading">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">{t.student}</h4>
                    <span className="text-[10px] text-slate-500 font-medium block">{t.rank}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-bold text-[#0284C7]">
                  {t.allotted}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "{t.comment}"
                </p>

                <div className="flex items-center gap-1 text-amber-400 pt-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[11px] font-bold text-slate-500 ml-1.5">Verified CAP Allotment</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
