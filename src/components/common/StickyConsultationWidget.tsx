import React, { useState } from 'react';
import { PhoneCall, Calendar, MapPin, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const StickyConsultationWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addLead } = useApp();
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    exam: 'MHT-CET',
    message: 'I would like to book a 1:1 consultation at the Pune Office.'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    addLead({
      name: form.name,
      phone: form.phone,
      email: 'N/A',
      exam: form.exam,
      scorePercentile: 'Pending',
      preferredBranch: 'N/A',
      targetLocation: 'Pune Office Visit',
      message: form.message
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setForm({ ...form, name: '', phone: '' });
    }, 3000);
  };

  return (
    <>
      {/* Desktop Sticky Vertical Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#00A3FF] hover:bg-[#0284C7] text-white py-4 px-3 rounded-l-xl shadow-[0_0_20px_rgba(0,163,255,0.4)] transition-all items-center justify-center group border-y border-l border-blue-400 hover:scale-105"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="flex items-center gap-2 font-extrabold text-[13px] tracking-wider uppercase font-heading">
          <Calendar className="w-4 h-4 rotate-90" />
          Book 1:1 Meeting
        </span>
      </button>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white border-t border-slate-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] flex items-center justify-between gap-3">
        <a 
          href="tel:+919860777069"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-50 text-[#00A3FF] font-bold text-xs uppercase tracking-wider border border-blue-200 font-heading"
        >
          <PhoneCall className="w-4 h-4" />
          Call Now
        </a>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00A3FF] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 font-heading"
        >
          <Calendar className="w-4 h-4" />
          Book Meeting
        </button>
      </div>

      {/* Slide-out / Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col border-l border-slate-200"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                <div>
                  <h3 className="font-extrabold text-slate-900 font-heading text-lg">Book a 1:1 Session</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Meet senior counsellors at Pune office</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {submitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 font-heading">Meeting Requested!</h3>
                    <p className="text-sm text-slate-600 font-medium">
                      Our desk team will call you within 15 minutes to confirm your physical meeting slot at Sohrab Hall, Pune.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3">
                      <MapPin className="w-5 h-5 text-[#00A3FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-xs font-bold text-slate-900 font-heading uppercase tracking-wider mb-1">Office Location</span>
                        <span className="block text-[11px] text-slate-600 leading-relaxed font-medium">
                          Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                          Student / Parent Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-sm px-4 py-3 rounded-xl outline-none font-semibold transition-colors"
                          placeholder="Enter full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-sm px-4 py-3 rounded-xl outline-none font-semibold transition-colors"
                          placeholder="+91"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                          Primary Exam
                        </label>
                        <select
                          value={form.exam}
                          onChange={e => setForm({ ...form, exam: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-sm px-4 py-3 rounded-xl outline-none font-semibold transition-colors appearance-none"
                        >
                          <option value="MHT-CET">MHT-CET (Engineering)</option>
                          <option value="JEE Main">JEE Main</option>
                          <option value="NEET">NEET (Medical)</option>
                          <option value="DSE">Direct Second Year (DSE)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 font-heading group"
                      >
                        <span>Schedule Office Visit</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
                        Secure your 30-min one-on-one session with our senior CAP round strategy experts.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
