import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Clock, MapPin, Video, CheckCircle2, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';

export const EventManager: React.FC = () => {
  const { events, addEvent, deleteEvent, updateEventStatus } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Webinar' as EventItem['category'],
    date: 'August 20, 2026',
    time: '06:00 PM IST',
    venueOrUrl: 'Zoom Webinar Link',
    speaker: 'Senior Counsellor',
    status: 'Upcoming' as EventItem['status'],
    active: true,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description) return;
    addEvent(newEvent);
    setNewEvent({
      title: '',
      category: 'Webinar',
      date: 'August 20, 2026',
      time: '06:00 PM IST',
      venueOrUrl: 'Zoom Webinar Link',
      speaker: 'Senior Counsellor',
      status: 'Upcoming',
      active: true,
      description: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Webinaring & Events Schedule Manager</h3>
          <p className="text-xs text-slate-400 mt-1">
            Schedule live webinars, offline counseling drives at Sohrab Hall Pune, and set live session badges.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Schedule New Event'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-4 animate-in fade-in">
          <h4 className="font-bold text-white text-sm font-heading border-b border-slate-800 pb-3">
            Schedule Live / Offline Event
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Event Category</label>
              <select
                value={newEvent.category}
                onChange={e => setNewEvent({ ...newEvent, category: e.target.value as EventItem['category'] })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              >
                <option value="Webinar">Webinar (Online)</option>
                <option value="1-on-1 Drive">1-on-1 Offline Drive</option>
                <option value="CAP Round Guidance">CAP Round Guidance Drive</option>
                <option value="Offline Seminar">Offline Seminar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Status Badge</label>
              <select
                value={newEvent.status}
                onChange={e => setNewEvent({ ...newEvent, status: e.target.value as EventItem['status'] })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              >
                <option value="Live">🔴 Live Now</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Registration Full">Registration Full</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Pune Cutoff & Option Form Strategy Session 2026"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
              <input
                type="text"
                placeholder="August 15, 2026"
                value={newEvent.date}
                onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
              <input
                type="text"
                placeholder="06:00 PM IST"
                value={newEvent.time}
                onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Speaker Name</label>
              <input
                type="text"
                placeholder="Er. Rahul Deshmukh"
                value={newEvent.speaker}
                onChange={e => setNewEvent({ ...newEvent, speaker: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Venue / Online Link</label>
            <input
              type="text"
              placeholder="Office No. 333, Sohrab Hall, Pune or Zoom URL"
              value={newEvent.venueOrUrl}
              onChange={e => setNewEvent({ ...newEvent, venueOrUrl: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description *</label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Master CAP round preference list strategy with live Q&A session."
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-3.5 rounded-xl outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Publish Event
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                  {evt.category}
                </span>
                <span className="text-xs text-slate-400">{evt.date} • {evt.time}</span>
              </div>
              <h4 className="font-bold text-base text-white font-heading">{evt.title}</h4>
              <p className="text-xs text-slate-300">{evt.description}</p>
              <div className="text-[11px] text-cyan-400 font-mono">
                Venue: {evt.venueOrUrl} | Speaker: {evt.speaker}
              </div>
            </div>

            {/* Status Switcher & Delete */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <select
                value={evt.status}
                onChange={e => updateEventStatus(evt.id, e.target.value as EventItem['status'])}
                className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold px-3 py-2 rounded-xl outline-none"
              >
                <option value="Live">🔴 Live</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Registration Full">Registration Full</option>
                <option value="Completed">Completed</option>
              </select>

              <button
                onClick={() => deleteEvent(evt.id)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
