import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  Video,
  CheckCircle2,
  X,
  Send,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';

export const EventsSection: React.FC = () => {
  const { events, addLead } = useApp();
  const activeEvents = events.filter(e => e.active);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    exam: 'MHT-CET',
    scorePercentile: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      exam: formData.exam,
      scorePercentile: formData.scorePercentile || 'N/A',
      preferredBranch: `Event Seat: ${selectedEvent.title}`,
      targetLocation: selectedEvent.venueOrUrl,
      message: `Registered for workshop [${selectedEvent.title}] on ${selectedEvent.date}`
    });

    setSelectedEvent(null);
    setFormData({ name: '', phone: '', email: '', exam: 'MHT-CET', scorePercentile: '' });
  };

  return (
    <section id="events" className="py-20 px-4 lg:px-8 relative font-sans bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Senior Counsellor Workshops</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Live Webinars & <span className="text-[#00A3FF]">Counselling Drives</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Attend our in-person and online seminars in Pune to clarify doubts on CAP option sequencing, cut-offs, and seat reservation rules.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeEvents.map((evt) => {
            const isLive = evt.status === 'Live';
            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl p-7 flex flex-col justify-between border relative overflow-hidden shadow-md hover:shadow-lg transition-shadow will-change-[transform,opacity] ${
                  isLive ? 'border-[#00A3FF] ring-2 ring-[#00A3FF]/20' : 'border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Category & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                      isLive
                        ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-rose-600 animate-ping' : 'bg-emerald-600'}`} />
                      {evt.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading leading-snug">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                      {evt.description}
                    </p>
                  </div>

                  {/* Event Details Box */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#00A3FF] shrink-0" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#00A3FF] shrink-0" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#00A3FF] shrink-0" />
                      <span className="truncate">{evt.venueOrUrl}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 font-heading"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Reserve Free Seat</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal for Event Registration */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative overflow-hidden"
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-blue-100 text-[#0284C7] font-heading">
                      Seat Reservation
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 font-heading mt-2">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedEvent.date} • {selectedEvent.time} • {selectedEvent.venueOrUrl}
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        Candidate Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                          WhatsApp Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                          Exam Appeared
                        </label>
                        <select
                          value={formData.exam}
                          onChange={e => setFormData({ ...formData, exam: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3 py-2.5 rounded-xl outline-none font-medium"
                        >
                          <option value="MHT-CET">MHT-CET</option>
                          <option value="JEE Main">JEE Main</option>
                          <option value="NEET UG">NEET UG</option>
                          <option value="DSE (Diploma)">DSE (Diploma)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full bg-slate-50 border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 font-heading mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm Workshop Booking</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
