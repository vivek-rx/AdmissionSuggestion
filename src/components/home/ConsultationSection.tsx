import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  UserCheck,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConsultationSection: React.FC = () => {
  const { addLead } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    exam: 'MHT-CET',
    scorePercentile: '',
    preferredBranch: 'Computer Engg / AI & DS',
    targetLocation: 'Pune',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    addLead({
      name: form.name,
      phone: form.phone,
      email: form.email || 'N/A',
      exam: form.exam,
      scorePercentile: form.scorePercentile || 'Awaiting Result',
      preferredBranch: form.preferredBranch,
      targetLocation: form.targetLocation,
      message: form.message
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // fallback
    }

    setSubmitted(true);
  };

  return (
    <section id="consultation" className="py-20 px-4 lg:px-8 relative font-sans bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>1-on-1 Personalized Mentorship</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
              Get Your Custom <span className="text-[#00A3FF]">College Option List</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Don't risk your college allotment with improper choice ordering. Schedule an in-person session at Sohrab Hall, Pune or book an online video consultation.
            </p>

            {/* Quick Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#00ADEF] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                      Pune Head Office
                    </h4>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed mt-0.5">
                      Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Sohrab+Hall+Tadiwala+Road+Pune+Station+Pune+Maharashtra+411001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 hover:border-[#00ADEF]/40 text-[#00ADEF] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors font-heading shadow-2xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions in Google Maps</span>
                </a>
              </div>

              <a
                href="tel:+919860777069"
                className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-sky-300 transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#00ADEF] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                    Direct Helpline Phone
                  </h4>
                  <p className="text-sm font-bold text-[#00ADEF] mt-0.5">+91 9860 777 069</p>
                </div>
              </a>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#00ADEF] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                    Consultation Hours
                  </h4>
                  <p className="text-xs text-slate-600 font-normal mt-0.5">Mon - Sat: 10:00 AM to 07:30 PM (In-Person & Online)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Inquiry Received Successfully!
                  </h3>

                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you, <strong className="text-[#0284C7]">{form.name}</strong>. Our senior admission counsellor will call you on <strong className="text-slate-900">{form.phone}</strong> within 2 hours to evaluate your option form choices.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/919860777069?text=${encodeURIComponent(`Hi Admission Suggestion, I just submitted an inquiry for ${form.name} (${form.exam} - ${form.scorePercentile || 'Awaiting Result'}). Please review my profile.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md font-heading"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Instant WhatsApp Follow-up</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          phone: '',
                          email: '',
                          exam: 'MHT-CET',
                          scorePercentile: '',
                          preferredBranch: 'Computer Engg / AI & DS',
                          targetLocation: 'Pune',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors font-heading"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                      Request Option Form Consultation
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Fill out your details to receive an initial merit rank assessment and callback.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        Candidate Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Atharva Joshi"
                        className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-4 py-3 rounded-xl outline-none font-medium shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        Exam Appeared
                      </label>
                      <select
                        value={form.exam}
                        onChange={e => setForm({ ...form, exam: e.target.value })}
                        className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-3 rounded-xl outline-none font-semibold shadow-sm"
                      >
                        <option value="MHT-CET">MHT-CET (Engineering)</option>
                        <option value="JEE Main">JEE Main (Engineering / All India)</option>
                        <option value="DSE">Direct 2nd Year Engineering (DSE - Diploma to B.Tech)</option>
                        <option value="NEET UG">NEET UG (Medical)</option>
                        <option value="CAT / CMAT">MBA / Management (CAT/CMAT/CET)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        Score / %ile (Approx)
                      </label>
                      <input
                        type="text"
                        value={form.scorePercentile}
                        onChange={e => setForm({ ...form, scorePercentile: e.target.value })}
                        placeholder="e.g. 96.40 %ile"
                        className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-3 rounded-xl outline-none font-semibold shadow-sm font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        Preferred City
                      </label>
                      <select
                        value={form.targetLocation}
                        onChange={e => setForm({ ...form, targetLocation: e.target.value })}
                        className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-3 rounded-xl outline-none font-semibold shadow-sm"
                      >
                        <option value="Pune">Pune Only</option>
                        <option value="Mumbai">Mumbai Region</option>
                        <option value="Pune & Mumbai">Both Pune & Mumbai</option>
                        <option value="Maharashtra / Pan-India">Pan India / Out of State</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                      Preferred Branch / Specific Queries
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. Interested in Computer Engg / AI in PICT or VIT Pune. Also want to know about TFWS fee waiver criteria."
                      className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs p-3.5 rounded-xl outline-none font-medium shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 font-heading"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Counsellor Callback</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Privacy. Your details are never shared with third-party agents.</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
