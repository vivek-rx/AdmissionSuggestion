import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, AlertTriangle, Bell, ArrowRight, X, Smartphone, ShieldCheck, Download, Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdmissionDeadlineTracker: React.FC = () => {
  const { addLead, showToast } = useApp();
  const [activeStageId, setActiveStageId] = useState<number>(2);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [selectedStageName, setSelectedStageName] = useState<string>('All Deadlines');

  // Reminder Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedStages, setSelectedStages] = useState<string[]>([
    'Option Form Opening (Aug 18)',
    'FC Document Verification (3 Days Remaining)',
    'Final State Merit List SML',
    'ACAP Spot Rounds Vacancies'
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const stages = [
    {
      id: 1,
      title: 'Online CAP Registration & Profiling',
      status: 'Open',
      statusType: 'open',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold',
      period: 'July 10 – July 22',
      badgeText: 'Open Now',
      desc: 'Candidate registration on State CET Cell portal and uploading academic marksheet certificates.',
      actionNote: 'Receipts of Caste Validity / NCL uploaded during registration are marked provisional.'
    },
    {
      id: 2,
      title: 'Physical & E-Scrutiny FC Document Verification',
      status: '3 Days Remaining',
      statusType: 'urgent',
      statusColor: 'bg-rose-50 text-rose-700 border-rose-300 font-bold',
      period: 'Closing July 22 (5:00 PM)',
      badgeText: 'Closing Soon',
      desc: 'Mandatory verification of original certificates at designated Facilitation Centers (FC) across Maharashtra.',
      actionNote: 'Must obtain physical stamped Acknowledgement Slip (ARC copy) to become eligible for Merit List.'
    },
    {
      id: 3,
      title: 'Provisional & Final State Merit List (SML)',
      status: 'Releasing Aug 12',
      statusType: 'upcoming-soon',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-300 font-bold',
      period: 'August 08 – August 12',
      badgeText: 'Merit Generation',
      desc: 'Release of General Merit Rank (GMR), Category Rank, Home University (SPPU/Mumbai) Status and Grievance redressal.',
      actionNote: 'Check your merit rank against previous 3-year cutoff benchmarks to plan Choice Codes.'
    },
    {
      id: 4,
      title: 'CAP Round 1: Option Form Submission & Choice Locking',
      status: 'Opens Aug 18',
      statusType: 'upcoming-action',
      statusColor: 'bg-sky-50 text-[#00ADEF] border-sky-300 font-bold',
      period: 'August 18 – August 22',
      badgeText: 'High Stakes',
      desc: 'Submission and locking of 1 to 300 Choice Codes. Auto-Freeze rules apply if Choice No. 1 is allotted.',
      actionNote: 'Our Pune counsellors build your customized Dream, Target & Safe sequence to eliminate seat loss.'
    },
    {
      id: 5,
      title: 'Round 1 Allotment Result & Betterment Reporting',
      status: 'Upcoming (Aug 24)',
      statusType: 'neutral',
      statusColor: 'bg-slate-100 text-slate-700 border-slate-300 font-semibold',
      period: 'August 24 – August 28',
      badgeText: 'Seat Acceptance',
      desc: 'Seat allotment confirmation, ₹1,000 seat acceptance fee payment, and Float / Betterment selection for Round 2.',
      actionNote: 'Do not surrender allotted seat without guaranteed better choices in subsequent rounds.'
    },
    {
      id: 6,
      title: 'Institutional (IL) & Against-CAP (ACAP) Spot Rounds',
      status: 'Upcoming (Sept 02)',
      statusType: 'neutral',
      statusColor: 'bg-purple-50 text-purple-700 border-purple-300 font-semibold',
      period: 'September 02 – September 10',
      badgeText: 'Final Window',
      desc: 'Direct merit-based offline rounds for vacant seats at autonomous institutes like COEP, VJTI, PICT, VIT, and PCCOE.',
      actionNote: 'Cutoffs frequently drop by 1.5% to 4.0% in ACAP spot rounds compared to CAP Round 1.'
    }
  ];

  const handleOpenReminder = (stageTitle?: string) => {
    if (stageTitle) {
      setSelectedStageName(stageTitle);
    } else {
      setSelectedStageName('All Deadlines');
    }
    setIsReminderOpen(true);
    setIsSubscribed(false);
  };

  const toggleStage = (stageName: string) => {
    if (selectedStages.includes(stageName)) {
      setSelectedStages(selectedStages.filter(s => s !== stageName));
    } else {
      setSelectedStages([...selectedStages, stageName]);
    }
  };

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      phone,
      email: email || 'N/A',
      exam: 'MHT-CET (Engineering)',
      scorePercentile: 'Deadline Alert Request',
      preferredBranch: `Deadline Reminder: ${selectedStages.join(', ')}`,
      targetLocation: 'Pune / Maharashtra',
      message: `User requested WhatsApp & SMS reminder alerts for CAP 2026 deadlines: [${selectedStages.join(' | ')}]`
    });

    setIsSubscribed(true);
    showToast('Reminder alerts configured! You will receive timely WhatsApp notifications before every deadline.');
  };

  // Google Calendar Integration Link Generator
  const generateGoogleCalendarUrl = (title: string, dateStr: string, details: string) => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(`MHT-CET CAP 2026: ${title}`);
    const detailsEncoded = encodeURIComponent(`${details}\n\nAssistance by Admission Suggestion Pune (Helpline: +91 9860 777 069)`);
    return `${baseUrl}&text=${text}&details=${detailsEncoded}`;
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs font-sans space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
            <Clock className="w-3.5 h-3.5 text-[#00ADEF]" />
            <span>Official State CET Cell Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
            MHT-CET CAP 2026 <span className="text-[#00ADEF]">Admission Deadline Tracker</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Track official DTE Maharashtra cut-off dates, document verification windows, and choice locking timelines in real time.
          </p>
        </div>

        <button
          onClick={() => handleOpenReminder()}
          className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-[#00ADEF] text-white text-xs font-bold font-heading transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 group"
        >
          <Bell className="w-4 h-4 text-[#00ADEF] group-hover:text-white transition-colors" />
          <span>Remind Me About Deadlines</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Deadlines List / Stage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stages.map((stg) => {
          const isSelected = activeStageId === stg.id;
          return (
            <div
              key={stg.id}
              onClick={() => setActiveStageId(stg.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-[#00ADEF] bg-sky-50/30 shadow-md ring-1 ring-[#00ADEF]/40'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                {/* Status Badge & Period */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs border font-heading ${stg.statusColor}`}>
                    {stg.status}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 font-mono">
                    Stage {stg.id}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                    {stg.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mt-1 font-heading">
                    <Calendar className="w-3.5 h-3.5 text-[#00ADEF]" />
                    <span>{stg.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {stg.desc}
                </p>

                {/* Advisory Tip */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 font-normal leading-relaxed">
                  <span className="font-bold text-slate-800 block mb-0.5">Crucial Rule:</span>
                  {stg.actionNote}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenReminder(stg.title);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#00ADEF] hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-heading"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Set Alert</span>
                </button>

                <a
                  href={generateGoogleCalendarUrl(stg.title, stg.period, stg.desc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                  title="Add to Google Calendar"
                >
                  <Calendar className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Helper Note */}
      <div className="p-5 rounded-2xl bg-[#0F172A] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center shrink-0 border border-[#00ADEF]/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold font-heading">Need Option Form Assistance Before Aug 18?</h4>
            <p className="text-xs text-slate-300 font-normal">Our senior counsellors in Pune prepare your 1-to-300 Choice Code sequence in advance.</p>
          </div>
        </div>
        <a
          href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20want%20to%20prepare%20my%20Option%20Form%20Choice%20Code%20list%20before%20the%20Aug%2018%20deadline."
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white text-xs font-bold font-heading transition-all shrink-0"
        >
          Prepare Preference List
        </a>
      </div>

      {/* Reminder Subscription Modal */}
      {isReminderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsReminderOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            {!isSubscribed ? (
              <form onSubmit={handleReminderSubmit} className="space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
                    <Bell className="w-3.5 h-3.5" />
                    <span>Free WhatsApp & SMS Reminders</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                    Never Miss a CAP Round Deadline
                  </h3>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    We will send you 24-hour and 6-hour WhatsApp countdown alerts before choice locking, merit releases, and spot round announcements.
                  </p>
                </div>

                {/* Deadlines Checklist */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                    Select Alerts You Want:
                  </label>
                  <div className="space-y-2">
                    {[
                      'FC Document Verification (3 Days Remaining)',
                      'Final State Merit List SML',
                      'Option Form Opening (Aug 18)',
                      'Round 1 Seat Allotment (Aug 24)',
                      'ACAP Spot Rounds Vacancies'
                    ].map((stg) => {
                      const active = selectedStages.includes(stg);
                      return (
                        <div
                          key={stg}
                          onClick={() => toggleStage(stg)}
                          className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                            active
                              ? 'bg-sky-50 border-[#00ADEF] text-slate-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span>{stg}</span>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            active ? 'bg-[#00ADEF] border-[#00ADEF] text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Student / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Sanjay Kulkarni"
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
                      placeholder="10-digit WhatsApp number"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider transition-all font-heading shadow-md"
                >
                  Activate My Deadline Alerts
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Deadline Reminders Activated!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal leading-relaxed">
                    You are now subscribed to MHT-CET CAP 2026 alerts for <strong>{phone}</strong>. We will notify you before each stage closes.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsReminderOpen(false)}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider font-heading"
                  >
                    Done & Return to Tracker
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
