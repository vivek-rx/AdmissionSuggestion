import React, { useState } from 'react';
import {
  X,
  FileCheck,
  Upload,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  Phone,
  HelpCircle,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ApplicationAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStream?: string;
}

export const ApplicationAssistanceModal: React.FC<ApplicationAssistanceModalProps> = ({
  isOpen,
  onClose,
  initialStream = 'Engineering (B.E. / B.Tech)'
}) => {
  const { addLead, showToast } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stream, setStream] = useState(initialStream);
  const [category, setCategory] = useState('OPEN');
  const [appId, setAppId] = useState('');
  const [filesUploaded, setFilesUploaded] = useState<string[]>([]);
  const [trackingId, setTrackingId] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'DTE Form Verification & Error Scrubbing',
    'Option Form Choice Code 1-to-300 Sequencing'
  ]);

  if (!isOpen) return null;

  const handleNextToDocs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setStep(2);
  };

  const handleFileSimulate = (docName: string) => {
    if (filesUploaded.includes(docName)) {
      setFilesUploaded(filesUploaded.filter(d => d !== docName));
    } else {
      setFilesUploaded([...filesUploaded, docName]);
    }
  };

  const handleNextToReview = () => {
    setStep(3);
  };

  const handleFinalSubmit = () => {
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
      message: `[APPLICATION FORM ASSISTANCE REQUEST] Tracking ID: ${generatedId} | Services: [${selectedServices.join(', ')}] | Uploaded: [${filesUploaded.join(', ') || 'Self-Verification Requested'}]`
    });

    setStep(4);
    showToast(`Form assistance registered! Assigned to Senior DTE Verification Desk. Tracking ID: ${generatedId}`);
  };

  const requiredDocs = [
    '10th (SSC) & 12th (HSC) Marksheets',
    'Entrance Scorecard (MHT-CET / JEE / NEET)',
    'Maharashtra Domicile & Nationality Certificate',
    'Caste Certificate & Validity (if Reserved)',
    'Non-Creamy Layer (NCL) Certificate (OBC/VJNT/SBC)',
    'Tahsildar Income Certificate (for TFWS / EBC)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Step Progress */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Dedicated Form Assistance Desk</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            DTE & CAP Application Form Assistance
          </h3>

          {/* Stepper Bar */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {[
              { num: 1, label: 'Candidate Info' },
              { num: 2, label: 'Documents' },
              { num: 3, label: 'Counsellor Review' },
              { num: 4, label: 'Ready Submission' }
            ].map((s) => {
              const active = step === s.num;
              const completed = step > s.num;
              return (
                <div key={s.num} className="space-y-1">
                  <div className={`h-1.5 rounded-full transition-all ${
                    completed ? 'bg-emerald-500' : active ? 'bg-[#00ADEF]' : 'bg-slate-200'
                  }`} />
                  <span className={`text-[10px] font-bold block truncate font-heading ${
                    active ? 'text-[#00ADEF]' : completed ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {s.num}. {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Student Information */}
        {step === 1 && (
          <form onSubmit={handleNextToDocs} className="space-y-4 pt-2">
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
                  placeholder="As per 10th marksheet"
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
                  <option value="Direct 2nd Year Engineering (DSE)">Direct 2nd Year Engineering (DSE - Diploma to Degree)</option>
                  <option value="Medical & Dental (NEET UG / MBBS / BDS)">Medical & Dental (NEET UG / MBBS / BDS)</option>
                  <option value="Management (BBA / BCA / MBA)">Management (BBA / BCA / MBA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                  Candidate Category & Quota *
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

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                State CET Cell Application ID (If generated, optional)
              </label>
              <input
                type="text"
                value={appId}
                onChange={e => setAppId(e.target.value)}
                placeholder="e.g. EN26123456 or leave blank if not yet registered"
                className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider transition-all font-heading shadow-md flex items-center justify-center gap-2"
            >
              <span>Next: Document Scrutiny Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Document Upload & Scrutiny */}
        {step === 2 && (
          <div className="space-y-5 pt-2">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 font-heading">
                Select Available Documents for Scrutiny:
              </h4>
              <p className="text-xs text-slate-500 font-normal">
                Our counsellors will review each certificate for spelling errors, validity dates, and issuing authority compliance.
              </p>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {requiredDocs.map((doc) => {
                const isSelected = filesUploaded.includes(doc);
                return (
                  <div
                    key={doc}
                    onClick={() => handleFileSimulate(doc)}
                    className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50 border-[#00ADEF] text-slate-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className={`w-4 h-4 ${isSelected ? 'text-[#00ADEF]' : 'text-slate-400'}`} />
                      <span>{doc}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isSelected ? 'bg-[#00ADEF] border-[#00ADEF] text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-normal flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>You can bring physical originals to our Pune Office (Office No. 312, Sohrab Hall) or send scans via WhatsApp for verification.</span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold font-heading hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextToReview}
                className="py-3 px-6 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white text-xs font-bold font-heading transition-all shadow-md flex items-center gap-2"
              >
                <span>Proceed to Counsellor Assignment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Counsellor Assignment */}
        {step === 3 && (
          <div className="space-y-5 pt-2">
            <div className="p-5 rounded-2xl bg-[#0F172A] text-white border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#00ADEF]" />
                  <h4 className="text-sm font-bold font-heading">Assigning Senior Scrutiny Desk</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold">
                  Desk Available
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 font-mono pt-1">
                <div>Candidate: <strong className="text-white font-sans">{name}</strong></div>
                <div>Stream: <strong className="text-white font-sans">{stream.split(' ')[0]}</strong></div>
                <div>Category: <strong className="text-white font-sans">{category}</strong></div>
                <div>Documents Ready: <strong className="text-white font-sans">{filesUploaded.length} of 6</strong></div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-heading">
                Form Assistance Services Included:
              </label>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Zero-Rejection FC Scrutiny Verification Assistance</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized 300-Choice Option Form Sequencing</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Physical & Online Guidance for Choice Locking & Auto-Freeze Rules</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold font-heading hover:bg-slate-50 transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="py-3.5 px-6 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white text-xs font-bold uppercase tracking-wider font-heading transition-all shadow-md flex items-center gap-2"
              >
                <span>Confirm & Activate Form Assistance</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Submission Confirmation & Tracking Status */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-heading uppercase">
                Status: Ready for Counsellor Verification
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                Form Assistance Request Activated!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal leading-relaxed">
                Your file has been queued at the Senior DTE Verification Desk in Sohrab Hall, Pune.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xs mx-auto text-left space-y-1.5 font-mono text-xs">
              <div className="text-slate-500 text-[11px] font-sans">Official Tracking ID:</div>
              <div className="text-base font-extrabold text-[#00ADEF]">{trackingId}</div>
              <div className="text-slate-600 text-[11px] font-sans pt-1">Assigned Helpline: <strong>+91 9860 777 069</strong></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20have%20submitted%20my%20application%20assistance%20request%20with%20Tracking%20ID%3A%20${trackingId}%20for%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading"
              >
                <Smartphone className="w-4 h-4 text-[#00ADEF]" />
                <span>Connect with Assigned Counsellor</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider font-heading hover:bg-slate-100 transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
