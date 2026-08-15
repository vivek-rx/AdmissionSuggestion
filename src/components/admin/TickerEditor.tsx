import React, { useState } from 'react';
import { Sparkles, Send, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TickerEditor: React.FC = () => {
  const { tickerMessage, updateTickerMessage } = useApp();
  const [inputMsg, setInputMsg] = useState(tickerMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    updateTickerMessage(inputMsg);
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Top Announcement Marquee Broadcast</h3>
          <p className="text-xs text-slate-400">
            Edit the scrolling broadcast text at the top header of the website in real time.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Live Broadcast Message</label>
          <textarea
            rows={3}
            value={inputMsg}
            onChange={e => setInputMsg(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white text-xs p-4 rounded-xl outline-none transition-colors resize-none font-sans"
            placeholder="Enter announcement text to broadcast..."
          />
        </div>

        {/* Preset quick templates */}
        <div className="space-y-2">
          <span className="text-[11px] text-slate-400 font-semibold block">Quick Templates:</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInputMsg('CAP Round 2026-27 Option Form Assistance Open: Call our Expert Counsellors at +91 9860 777 069 | Office No. 312, Sohrab Hall, Pune')}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 text-sky-300 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              CAP Round Alert
            </button>
            <button
              type="button"
              onClick={() => setInputMsg('Special 1-on-1 Offline Counselling Sessions ongoing at Office No. 312, Sohrab Hall, Pune. Walk-ins Welcome.')}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 text-sky-300 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              Pune Office Drive
            </button>
            <button
              type="button"
              onClick={() => setInputMsg('Direct 2nd Year (DSE Engineering) & Institute Level Seat Guidance Available. Contact +91 9860 777 069')}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 text-sky-300 px-3 py-1.5 rounded-lg border border-slate-800"
            >
              DSE Engineering Alert
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Message Live</span>
        </button>
      </form>
    </div>
  );
};
