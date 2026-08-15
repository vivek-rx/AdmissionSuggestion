import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  UserCheck,
  ExternalLink,
  Link2,
  Edit2,
  Save,
  X,
  Radio,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EventItem } from '../../types';

export const EventManager: React.FC = () => {
  const { events, addEvent, deleteEvent, updateEventStatus, updateEventMeetingLink, updateEvent } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingMeetingLink, setEditingMeetingLink] = useState('');

  const [newEvent, setNewEvent] = useState({
    title: '',
    category: 'Webinar' as EventItem['category'],
    date: 'August 18, 2026',
    time: '06:00 PM IST',
    venueOrUrl: 'Google Meet / Online Stream',
    meetingLink: '',
    speaker: 'Er. Akshaykumar Bhandari (Director)',
    status: 'Upcoming' as EventItem['status'],
    active: true,
    description: ''
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description) return;
    
    addEvent({
      ...newEvent,
      meetingLink: newEvent.meetingLink.trim() || undefined
    });

    setNewEvent({
      title: '',
      category: 'Webinar',
      date: 'August 18, 2026',
      time: '06:00 PM IST',
      venueOrUrl: 'Google Meet / Online Stream',
      meetingLink: '',
      speaker: 'Er. Akshaykumar Bhandari (Director)',
      status: 'Upcoming',
      active: true,
      description: ''
    });
    setShowAddForm(false);
  };

  const handleStartEditLink = (event: EventItem) => {
    setEditingEventId(event.id);
    setEditingMeetingLink(event.meetingLink || event.venueOrUrl || '');
  };

  const handleSaveLink = (eventId: string) => {
    updateEventMeetingLink(eventId, editingMeetingLink.trim());
    setEditingEventId(null);
    setEditingMeetingLink('');
  };

  const setMeetingPreset = (presetType: 'gmeet' | 'zoom' | 'yt' | 'office') => {
    if (presetType === 'gmeet') {
      setNewEvent({
        ...newEvent,
        category: 'Webinar',
        venueOrUrl: 'Live on Google Meet',
        meetingLink: 'https://meet.google.com/adm-sugg-live'
      });
    } else if (presetType === 'zoom') {
      setNewEvent({
        ...newEvent,
        category: 'Webinar',
        venueOrUrl: 'Live on Zoom Webinar',
        meetingLink: 'https://zoom.us/j/9860777069'
      });
    } else if (presetType === 'yt') {
      setNewEvent({
        ...newEvent,
        category: 'Webinar',
        venueOrUrl: 'YouTube Live Stream',
        meetingLink: 'https://youtube.com/live/admission-suggestion'
      });
    } else if (presetType === 'office') {
      setNewEvent({
        ...newEvent,
        category: '1-on-1 Drive',
        venueOrUrl: 'Office No. 312, 3rd Floor, Sohrab Hall, Near Pune Station',
        meetingLink: 'https://maps.google.com/?q=Sohrab+Hall+Pune'
      });
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADEF]/20 text-[#00ADEF] text-xs font-bold font-heading">
            <Radio className="w-3.5 h-3.5 text-[#00ADEF]" />
            <span>Live Webinar & Meeting Control</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Event & Live Meeting Links Manager
          </h3>
          <p className="text-xs text-slate-400 font-normal">
            Add or update Google Meet, Zoom, YouTube Live links. Setting status to <strong>"Live"</strong> displays the active join button on the website.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 rounded-2xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0 font-heading"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Scheduler' : 'Schedule New Live Event'}</span>
        </button>
      </div>

      {/* Add New Event Form Modal / Accordion */}
      {showAddForm && (
        <form onSubmit={handleCreateSubmit} className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-[#00ADEF]/40 shadow-2xl space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h4 className="font-extrabold text-white text-base font-heading">
                Schedule New Live Webinar or Offline Drive
              </h4>
              <p className="text-xs text-slate-400">Fill details and paste your Google Meet or Zoom URL below.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Presets Buttons */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading block">
              1-Click Meeting Templates:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMeetingPreset('gmeet')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 border border-slate-700 flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>+ Google Meet Template</span>
              </button>
              <button
                type="button"
                onClick={() => setMeetingPreset('zoom')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-blue-400 border border-slate-700 flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>+ Zoom Webinar Template</span>
              </button>
              <button
                type="button"
                onClick={() => setMeetingPreset('yt')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-400 border border-slate-700 flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>+ YouTube Live Stream</span>
              </button>
              <button
                type="button"
                onClick={() => setMeetingPreset('office')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-emerald-400 border border-slate-700 flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>+ Sohrab Hall Pune Office</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Event Category
              </label>
              <select
                value={newEvent.category}
                onChange={e => setNewEvent({ ...newEvent, category: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF] font-semibold"
              >
                <option value="Webinar">Webinar (Live Online Session)</option>
                <option value="1-on-1 Drive">1-on-1 Offline Drive (Pune Office)</option>
                <option value="CAP Round Guidance">CAP Round Guidance Masterclass</option>
                <option value="Offline Seminar">Offline Seminar / Workshop</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Live Status Badge
              </label>
              <select
                value={newEvent.status}
                onChange={e => setNewEvent({ ...newEvent, status: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF] font-bold"
              >
                <option value="Live">🟢 Live Now (Students Can Join Immediately)</option>
                <option value="Upcoming">🟡 Upcoming (Registration Open)</option>
                <option value="Registration Full">🔴 Registration Full</option>
                <option value="Completed">⚪ Completed / Concluded</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
              Event Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Live Option Form Sequencing Masterclass for MHT-CET 2026"
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF] font-medium"
            />
          </div>

          {/* Dedicated Live Meeting Link Input */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#00ADEF] uppercase tracking-wider font-heading flex items-center gap-1.5">
                <Link2 className="w-4 h-4" />
                <span>Live Meeting / Webinar URL (Google Meet / Zoom / YouTube) *</span>
              </label>
              {newEvent.meetingLink && (
                <a
                  href={newEvent.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 font-mono font-bold"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <input
              type="url"
              placeholder="https://meet.google.com/xxx-yyyy-zzz or https://zoom.us/j/..."
              value={newEvent.meetingLink}
              onChange={e => setNewEvent({ ...newEvent, meetingLink: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF] font-mono"
            />
            <p className="text-[11px] text-slate-400">
              When students click "Join Live Event" on the website, they will be redirected to this meeting URL.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Date
              </label>
              <input
                type="text"
                placeholder="August 18, 2026"
                value={newEvent.date}
                onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Time
              </label>
              <input
                type="text"
                placeholder="06:00 PM IST"
                value={newEvent.time}
                onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Speaker / Mentor Name
              </label>
              <input
                type="text"
                placeholder="Er. Akshaykumar Bhandari"
                value={newEvent.speaker}
                onChange={e => setNewEvent({ ...newEvent, speaker: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
              Display Venue / Platform Label
            </label>
            <input
              type="text"
              placeholder="e.g. Live on Google Meet or Office No. 312, Sohrab Hall, Pune"
              value={newEvent.venueOrUrl}
              onChange={e => setNewEvent({ ...newEvent, venueOrUrl: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl outline-none focus:border-[#00ADEF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
              Session Description *
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Master CAP round preference list strategy with live Q&A session."
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs p-3.5 rounded-xl outline-none focus:border-[#00ADEF] resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white font-bold text-xs uppercase tracking-wider font-heading shadow-md"
            >
              Publish Live Event
            </button>
          </div>
        </form>
      )}

      {/* Existing Events List with Direct Inline Meeting Link Editor */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-heading">
          Active Scheduled Events ({events.length})
        </h4>

        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => {
            const isEditingLink = editingEventId === event.id;
            const hasMeetingLink = Boolean(event.meetingLink);

            return (
              <div
                key={event.id}
                className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-md space-y-4 hover:border-slate-700 transition-all"
              >
                {/* Event Header: Title + Status Dropdown */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#00ADEF]/20 text-[#00ADEF] text-[10px] font-bold uppercase font-heading">
                        {event.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                      {event.title}
                    </h4>
                  </div>

                  {/* Status Toggle Dropdown */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <select
                      value={event.status}
                      onChange={(e) => updateEventStatus(event.id, e.target.value as any)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold font-heading border outline-none cursor-pointer ${
                        event.status === 'Live'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : event.status === 'Upcoming'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <option value="Live">🟢 Live Now</option>
                      <option value="Upcoming">🟡 Upcoming</option>
                      <option value="Registration Full">🔴 Full</option>
                      <option value="Completed">⚪ Completed</option>
                    </select>

                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Speaker & Description */}
                <div className="text-xs text-slate-300 space-y-1">
                  <div><strong>Speaker:</strong> {event.speaker}</div>
                  <p className="text-slate-400">{event.description}</p>
                </div>

                {/* Direct Inline Meeting Link Box */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 w-full">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-[#00ADEF]" />
                      <span>Live Meeting / Join URL:</span>
                    </span>

                    {!isEditingLink ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        {event.meetingLink ? (
                          <a
                            href={event.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[#00ADEF] hover:underline break-all"
                          >
                            {event.meetingLink}
                          </a>
                        ) : (
                          <span className="text-xs text-slate-500 italic">No direct meeting URL added yet</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 pt-1 w-full">
                        <input
                          type="url"
                          value={editingMeetingLink}
                          onChange={(e) => setEditingMeetingLink(e.target.value)}
                          placeholder="https://meet.google.com/xxx or Zoom URL"
                          className="w-full bg-slate-900 border border-[#00ADEF] text-white text-xs px-3 py-2 rounded-xl outline-none font-mono"
                        />
                        <button
                          onClick={() => handleSaveLink(event.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shrink-0 flex items-center gap-1"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingEventId(null)}
                          className="px-3 py-2 rounded-xl bg-slate-800 text-slate-400 text-xs shrink-0"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {!isEditingLink && (
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      <button
                        onClick={() => handleStartEditLink(event)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#00ADEF]" />
                        <span>{hasMeetingLink ? 'Edit URL' : 'Add URL'}</span>
                      </button>

                      {hasMeetingLink && (
                        <a
                          href={event.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#00ADEF]/20 text-[#00ADEF] hover:bg-[#00ADEF] hover:text-white text-xs font-bold border border-[#00ADEF]/30 flex items-center gap-1.5 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Test URL</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
