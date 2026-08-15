import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Building2, CheckCircle2, FileText, PhoneCall, HelpCircle, ArrowRight, DollarSign, BookOpen, Clock, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InstitutionalQuotaGuideProps {
  onOpenConsultation?: () => void;
}

export const InstitutionalQuotaGuide: React.FC<InstitutionalQuotaGuideProps> = ({ onOpenConsultation }) => {
  const { addLead, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'engineering' | 'medical' | 'management'>('engineering');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('B.Tech / Engineering');
  const [preferredCollege, setPreferredCollege] = useState('VIT Pune / PCCOE');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email: 'N/A',
      exam: 'Institutional Quota Assessment',
      scorePercentile: 'Institutional Query',
      preferredBranch: `${course} (${preferredCollege})`,
      targetLocation: 'Pune / Mumbai',
      message: `Inquiry for Institutional & Management Quota Guidance for [${course}] in [${preferredCollege}].`
    });

    setIsSubmitted(true);
    showToast('Inquiry registered! Our senior admissions advisor will call you with authentic vacancy & eligibility details.');
  };

  return (
    <section id="institutional-quota" className="py-16 px-4 lg:px-8 bg-slate-50 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ADEF]" />
            <span>Ethical & DTE-Compliant Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Institutional & Management <span className="text-[#00ADEF]">Quota Guidance</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Transparent, merit-grounded admission advisory for sanctioned 20% institutional seats in Maharashtra private autonomous colleges and deemed universities.
          </p>
        </div>

        {/* Prominent Statutory & Ethical Disclaimer */}
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-800">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider font-heading block text-amber-900">
              Important Regulatory Notice & Disclaimer
            </span>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-amber-950">
              Admission is subject to candidate eligibility, seat availability, and applicable regulatory rules. No admission is guaranteed. All admissions are conducted strictly as per State CET Cell Maharashtra, DTE, and University guidelines.
            </p>
          </div>
        </div>

        {/* 2-Column Core Architecture: Comprehensive Breakdown + Direct Inquiry Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 6 Clear Structural Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pillar 1: Applicable Institutions */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00ADEF] flex items-center justify-center border border-sky-200">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    1. Which Colleges Offer Applicable Routes?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">As per DTE Maharashtra 20% Sanctioned Quota</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Under Government of Maharashtra and DTE rules, private un-aided autonomous colleges and private universities are permitted to fill up to <strong>20% sanctioned seats</strong> as Institutional Quota, plus post-Round 3 vacant seats (Against-CAP / ACAP).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 font-bold block mb-1">Engineering:</strong>
                  <span className="text-slate-600">VIT Pune, PCCOE, Cummins, DY Patil, MIT-WPU, Somaiya, AISSMS.</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 font-bold block mb-1">Medical (MCC):</strong>
                  <span className="text-slate-600">Bharati Vidyapeeth, DY Patil Medical, MGM, Krishna Karad.</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <strong className="text-slate-900 font-bold block mb-1">Management:</strong>
                  <span className="text-slate-600">Symbiosis, NMIMS, MIT-WPU, Balaji University, Indira.</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Eligibility Criteria */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    2. Mandatory Eligibility Criteria
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Compliance with DTE / Regulatory Norms</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Valid DTE Application ID:</strong> Candidate must be registered on the mahacet.org portal with a verified Application ID (e.g. <code>EN26xxxxxx</code> or <code>MB26xxxxxx</code>).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Qualifying Marks:</strong> Minimum 45% aggregate in 12th standard (Physics, Mathematics + Chemistry/CS) for General category (40% for MH reserved categories).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Non-Zero Score:</strong> Must have appeared for MHT-CET 2026, JEE Main Paper-1, NEET UG, or relevant state/national entrance exam.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Fee Structure & Transparency */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    3. Approximate Fee Structure & Transparency
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Shikshan Shulka Samiti & Approved University Slabs</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">
                Fees for institutional seats are regulated by the <strong>Fee Regulating Authority (FRA) Maharashtra</strong> or respective private university governing bodies. Slabs typically range from 1.5x to approved institutional rates. We provide complete, transparent payment receipts with <strong>zero undocumented charges</strong>.
              </p>
            </div>

            {/* Pillar 4: Step-by-Step Admission Process */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    4. Official Step-by-Step Admission Process
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">From Vacancy Tracking to Campus Enrollment</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-600 font-normal">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">1</span>
                  <span><strong>Profiling & Seat Availability Audit:</strong> Identifying real-time branch vacancies in Round 3 and institutional spot rounds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">2</span>
                  <span><strong>Separate Institutional Application:</strong> Filling dedicated institutional round application forms at respective colleges.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 font-mono">3</span>
                  <span><strong>Merit Verification & Reporting:</strong> Physical reporting at college campus on merit round dates with verified document sets.</span>
                </div>
              </div>
            </div>

            {/* Pillar 5: What Admission Suggestion Actually Helps With */}
            <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center border border-[#00ADEF]/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                    What Our Senior Consultants Actually Help With
                  </h3>
                  <p className="text-xs text-slate-300 font-normal">Our role is advisory, analytical, and process-management</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-white font-bold block">1. Vacancy Tracking</strong>
                  <span className="text-slate-400">Continuous monitoring of Round 3 ACAP cancellations across colleges.</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-white font-bold block">2. Branch Optimization</strong>
                  <span className="text-slate-400">Evaluating cutoff drops in CSE, AI/DS, IT vs ENTC across campuses.</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-white font-bold block">3. Document Scrubbing</strong>
                  <span className="text-slate-400">Zero-rejection review of original certificates before spot round reporting.</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <strong className="text-white font-bold block">4. Direct Department Coordination</strong>
                  <span className="text-slate-400">Assisting parents through official university registrar counters.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Consultation & Official Advisor Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Inquiry Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00ADEF] font-heading block">
                  Institutional Quota Assessment
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading mt-1">
                  Request Vacancy & Seat Assessment
                </h3>
                <p className="text-xs text-slate-600 font-normal mt-1">
                  Get authentic cutoff, seat availability, and fee details from our senior Pune advisory desk.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Student / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Rajesh Patil"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      WhatsApp Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Target Course Stream *
                    </label>
                    <select
                      value={course}
                      onChange={e => setCourse(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-bold cursor-pointer"
                    >
                      <option value="B.Tech / Engineering (CSE, AI, IT)">B.Tech / Engineering (CSE, AI, IT)</option>
                      <option value="Direct 2nd Year Engineering (DSE)">Direct 2nd Year Engineering (DSE)</option>
                      <option value="MBBS / BDS / Medical (NEET)">MBBS / BDS / Medical (NEET)</option>
                      <option value="BBA / BCA (UG Programs)">BBA / BCA (UG Programs)</option>
                      <option value="MBA / MMS (Postgraduate)">MBA / MMS (Postgraduate)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Target College Preference
                    </label>
                    <input
                      type="text"
                      value={preferredCollege}
                      onChange={e => setPreferredCollege(e.target.value)}
                      placeholder="e.g. VIT Pune, PCCOE, DY Patil, Symbiosis"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider transition-all font-heading shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Request Institutional Seat Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Assessment Request Received
                    </h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto font-normal">
                      Our senior admissions director will contact you directly at <strong>{phone}</strong> with authentic seat matrices.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Who to Contact Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-heading border-b border-slate-100 pb-2">
                Who To Contact Directly:
              </h4>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#00ADEF] flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Pune Head Office Desk:</strong>
                    <span className="text-slate-600">Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-bold block">Senior Helpline:</strong>
                    <a href="tel:+919860777069" className="text-[#00ADEF] font-bold hover:underline">
                      +91 9860 777 069
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20need%20urgent%20guidance%20regarding%20Institutional%20%2F%20Management%20Quota%20seats%20in%20Pune."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading"
                >
                  <span>Chat on WhatsApp Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
