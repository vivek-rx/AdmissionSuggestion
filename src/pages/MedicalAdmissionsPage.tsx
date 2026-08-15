import React, { useEffect } from 'react';
import { Stethoscope, ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, Activity, School, FileCheck, PhoneCall } from 'lucide-react';
import { ConsultationSection } from '../components/home/ConsultationSection';

export const MedicalAdmissionsPage: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const medicalRoutes = [
    {
      id: 'neet-ug',
      title: 'NEET UG & Maharashtra State 85% DMER Quota',
      badge: 'State Merit Rank (SML)',
      badgeColor: 'bg-sky-50 text-[#00ADEF] border-sky-200',
      desc: 'Counseling conducted by Commissionerate of State CET Cell (DMER Maharashtra) for 85% state quota seats in government, municipal, and private unaided medical colleges.',
      points: [
        'Cutoff analysis across Open, OBC, EWS, SEBC, SC, ST & NT categories',
        'State Merit Rank (SML) vs All India Rank (AIR) probability calculation',
        'Bond policy & rural service undertaking advisory in Govt Medical Colleges',
        'Registration, document verification & choice filling strategy'
      ]
    },
    {
      id: 'mbbs',
      title: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
      badge: 'Premier Medical',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Comprehensive choice code guidance for Govt Medical Colleges (GMC Pune, KEM Mumbai, BJMC, GSMC) and Semi-Government Trust Medical Colleges.',
      points: [
        'Annual fee structure analysis (Govt ₹1.2L vs Semi-Govt ₹7L–₹14L vs Deemed)',
        'MahaDBT post-matric scholarship & EBC fee concession advisory',
        'Deemed Universities: Bharati Vidyapeeth, D.Y. Patil Medical, MGM Medical, Krishna Karad',
        'Round 1, Round 2, Mop-Up & Stray Vacancy Round tracking'
      ]
    },
    {
      id: 'bds',
      title: 'BDS (Bachelor of Dental Surgery)',
      badge: 'Dental Sciences',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      desc: 'Government & Private Dental Colleges admission route across Maharashtra for candidates with NEET scores seeking clinical healthcare careers.',
      points: [
        'Govt Dental College Mumbai (GDC), Nair Hospital Dental, Bharati Vidyapeeth Dental',
        'Clinical exposure & hospital patient-flow evaluation',
        'Lower cutoff thresholds compared to MBBS with strong clinical viability',
        'Category reservation & scholarship eligibility'
      ]
    },
    {
      id: 'ayush',
      title: 'AYUSH Programs (BAMS • BHMS • BUMS • BPTh)',
      badge: 'Ayurveda & Allied Health',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      desc: 'BAMS (Ayurveda), BHMS (Homeopathy), BUMS (Unani), and BPTh (Physiotherapy / Occupational Therapy) admissions through State CET Cell counseling.',
      points: [
        'Govt & Aided Ayurvedic colleges cutoff mapping',
        'Physiotherapy (BPTh) college selection for sports medicine & rehabilitation',
        'Mop-Up and Institutional Round guidance for border percentiles',
        'Complete registration and verification support at Facilitation Centers'
      ]
    },
    {
      id: 'nri-mgmt-med',
      title: 'Management & NRI Quota in Medical Universities',
      badge: 'Institutional Seats',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      desc: 'Direct merit counseling for 15% Management and NRI quota seats in premier Deemed Universities under MCC (Medical Counseling Committee) regulations.',
      points: [
        '100% compliant with National Medical Commission (NMC) regulations',
        'Deemed universities seat matrix monitoring in Stray Vacancy Rounds',
        'Fee structure transparency with complete payment schedule clarity',
        'Hostel, hospital accreditation, and clinical infrastructure verification'
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
              <Stethoscope className="w-4 h-4" />
              <span>Medical & Healthcare Admissions 2026-27</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              MBBS, BDS & AYUSH Admissions in <span className="text-[#00ADEF]">Maharashtra</span>
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Ethical, merit-grounded counseling for NEET UG aspirants. We guide students and parents across 85% DMER State Quota, 15% MCC All India Seats, Govt Medical Colleges, and Deemed Medical Universities.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Highlights */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
              <HeartPulse className="w-5 h-5 text-[#00ADEF]" />
              <span>SML Rank Mapping</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              We convert your NEET score into realistic State Merit List (SML) closing probabilities across Round 1, Round 2, and Mop-Up rounds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
              <FileCheck className="w-5 h-5 text-[#00ADEF]" />
              <span>Zero-Rejection Scrutiny</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Thorough verification of Domicile, Caste Validity, Non-Creamy Layer, and EWS Proforma V certificates to prevent seat cancellations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-[#00ADEF] font-bold text-sm font-heading">
              <School className="w-5 h-5 text-[#00ADEF]" />
              <span>Deemed University Advisory</span>
            </div>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Impartial guidance on fee structures, hospital bed capacity, and clinical patient loads across Bharati Vidyapeeth, DY Patil, and MGM.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Routes Detail Cards */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="border-l-2 border-[#00ADEF] pl-4">
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Medical & Healthcare Admission Pathways</h2>
          <p className="text-xs text-slate-600 font-normal">Select your program to explore eligibility, counseling authority, and cutoff expectations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {medicalRoutes.map((r) => (
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
                  <span>Book Medical Counselling Call</span>
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
