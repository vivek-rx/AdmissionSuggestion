import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Upload,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Clock,
  PhoneCall,
  Search,
  Check,
  Smartphone,
  HelpCircle,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConsultationSection } from '../components/home/ConsultationSection';

export const ApplicationAssistancePage: React.FC = () => {
  const { addLead, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stream, setStream] = useState('Engineering (B.E. / B.Tech)');
  const [category, setCategory] = useState('OPEN');
  const [appId, setAppId] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([
    '10th (SSC) & 12th (HSC) Marksheets',
    'Entrance Scorecard (MHT-CET / JEE / NEET)',
    'Maharashtra Domicile & Nationality Certificate'
  ]);
  const [trackingId, setTrackingId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Status Lookup State
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const requiredDocs = [
    '10th (SSC) & 12th (HSC) Marksheets',
    'Entrance Scorecard (MHT-CET / JEE / NEET)',
    'Maharashtra Domicile & Nationality Certificate',
    'Caste Certificate & Validity (if Reserved)',
    'Non-Creamy Layer (NCL) Certificate (OBC/VJNT/SBC)',
    'Tahsildar Income Certificate (for TFWS / EBC)'
  ];

  const toggleDoc = (doc: string) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter(d => d !== doc));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const generatedId = `AS-DTE-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(generatedId);

    addLead({
      name,
      phone,
      email: email || 'N/A',
      exam: stream,
      scorePercentile: `DTE ID: ${appId || 'Pending'}`,
      preferredBranch: `Form Assistance (${category})`,
      targetLocation: 'Pune / Maharashtra',
      message: `[APPLICATION FORM ASSISTANCE REQUEST] Tracking ID: ${generatedId} | Category: ${category} | Selected Docs: [${selectedDocs.join(', ')}]`
    });

    setIsSubmitted(true);
    showToast(`Form assistance request generated! Assigned to Senior DTE Verification Desk.`);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery) return;

    // Simulate lookup response
    setLookupResult({
      trackingId: lookupQuery.toUpperCase(),
      status: 'Ready for Physical / FC Scrutiny',
      counsellor: 'Senior DTE Verification Desk (Office No. 312, Sohrab Hall, Pune)',
      stepCurrent: 3,
      verifiedDocs: ['10th Marks', '12th Marks', 'CET Scorecard', 'Domicile'],
      pendingDocs: ['Caste Validity Original ARC Slip']
    });
  };

  return (
    <div className="space-y-12 py-6 font-sans">
      
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ADEF]/20 border border-[#00ADEF]/30 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
              <FileCheck className="w-4 h-4" />
              <span>Zero-Rejection Guarantee</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Application Form <span className="text-[#00ADEF]">Assistance & Scrutiny</span>
            </h1>
            <p className="text-sm text-slate-300 font-normal leading-relaxed">
              Never risk losing your admission seat due to a spelling mismatch, missing certificate receipt, or faulty choice code. Our senior verification desk scrubs every field before final submission.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Step Process Ribbon */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#00ADEF] flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Upload / Enter Candidate Details
            </h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Submit your academic scores, category claim, and initial certificate scans.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Senior Consultant Scrutiny
            </h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Our Pune team cross-checks name spelling, issuing authority dates, and ARC slip validity.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Ready for DTE Submission
            </h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Lock your option form and confirmation with 100% peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Core Interactive Portal: Form Request + Status Lookup */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Assistance Intake (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#00ADEF] text-xs font-bold font-heading mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Candidate Intake</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                Request Professional Form Filling Assistance
              </h2>
              <p className="text-xs text-slate-600 font-normal mt-1">
                Fill the details below to assign your file to our senior DTE scrutiny team.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="As per SSC marksheet"
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      WhatsApp Mobile *
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Admission Stream *
                    </label>
                    <select
                      value={stream}
                      onChange={e => setStream(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-bold cursor-pointer"
                    >
                      <option value="Engineering (B.E. / B.Tech)">Engineering (B.E. / B.Tech - MHT CET & JEE)</option>
                      <option value="Direct 2nd Year Engineering (DSE)">Direct 2nd Year Engineering (DSE Lateral Entry)</option>
                      <option value="Medical & Dental (NEET UG / MBBS / BDS)">Medical & Dental (NEET UG / MBBS / BDS)</option>
                      <option value="Management (BBA / BCA / MBA)">Management (BBA / BCA / MBA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Candidate Category *
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-bold cursor-pointer"
                    >
                      <option value="OPEN">OPEN / General</option>
                      <option value="OBC">OBC (50% Fee Concession)</option>
                      <option value="EWS">EWS (Economically Weaker Section)</option>
                      <option value="TFWS">TFWS (100% Tuition Fee Waiver)</option>
                      <option value="SC">SC (100% Fee Concession)</option>
                      <option value="ST">ST (100% Fee Concession)</option>
                      <option value="VJ/NT">VJ / NT-A / NT-B / NT-C / NT-D</option>
                      <option value="SBC">SBC</option>
                    </select>
                  </div>
                </div>

                {/* Document Readiness Checklist */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                    Check Documents You Have Ready:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {requiredDocs.map((doc) => {
                      const active = selectedDocs.includes(doc);
                      return (
                        <div
                          key={doc}
                          onClick={() => toggleDoc(doc)}
                          className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                            active
                              ? 'bg-sky-50 border-[#00ADEF] text-slate-900 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <span className="truncate pr-2">{doc}</span>
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                            active ? 'bg-[#00ADEF] border-[#00ADEF] text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {active && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider transition-all font-heading shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit for Senior Consultant Scrutiny</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-slate-900 font-heading">
                    Application Queued for Scrutiny!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal">
                    Assigned Tracking ID: <strong className="font-mono text-[#00ADEF] text-sm">{trackingId}</strong>
                  </p>
                </div>

                <a
                  href={`https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20have%20submitted%20my%20form%20assistance%20request%20with%20Tracking%20ID%3A%20${trackingId}%20for%20${encodeURIComponent(name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white font-bold text-xs uppercase tracking-wider font-heading transition-all"
                >
                  <Smartphone className="w-4 h-4 text-[#00ADEF]" />
                  <span>Connect with Assigned Counsellor</span>
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Real-time Application Tracking & Status Lookup (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Lookup Widget */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00ADEF] font-heading block">
                  Real-time Lookup
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading mt-1">
                  Track Application Status
                </h3>
                <p className="text-xs text-slate-600 font-normal mt-1">
                  Enter your Tracking ID or Mobile Number to check verification progress.
                </p>
              </div>

              <form onSubmit={handleLookup} className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={lookupQuery}
                    onChange={e => setLookupQuery(e.target.value)}
                    placeholder="e.g. AS-DTE-123456 or Mobile"
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs pl-10 pr-4 py-3 rounded-xl outline-none font-medium font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white font-bold text-xs uppercase tracking-wider font-heading transition-all shadow-xs"
                >
                  Check Verification Status
                </button>
              </form>

              {lookupResult && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3 font-sans text-xs animate-fade-in">
                  <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                    <span className="font-bold text-slate-900 font-heading">
                      ID: {lookupResult.trackingId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {lookupResult.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <div><strong>Assigned Desk:</strong> {lookupResult.counsellor}</div>
                    <div><strong>Verified:</strong> {lookupResult.verifiedDocs.join(', ')}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Offline Office Walk-in Help */}
            <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00ADEF]/20 text-[#00ADEF] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading">Walk-in Offline Scrutiny</h4>
                  <p className="text-xs text-slate-300 font-normal">Sohrab Hall, Pune Head Office</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                Bring your physical original certificates for on-spot scanning and ARC slip stamping assistance before the DTE deadline closes.
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919860777069"
                  className="w-full py-3 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Pune Scrutiny Helpline</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Consultation Section */}
      <ConsultationSection />

    </div>
  );
};
