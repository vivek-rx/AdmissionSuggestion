import React, { useState } from 'react';
import { Smartphone, Share2, Copy, Check, Sparkles, Send, Users, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WhatsAppShareToParentsProps {
  studentName?: string;
  exam?: string;
  percentile?: string | number;
  branch?: string;
  category?: string;
  colleges?: Array<{
    name: string;
    city: string;
    fees?: string;
    cutoff?: string | number;
    probability?: 'Safe' | 'Moderate' | 'Ambitious' | string;
    courses?: string[];
  }>;
}

export const WhatsAppShareToParents: React.FC<WhatsAppShareToParentsProps> = ({
  studentName = 'Student Candidate',
  exam = 'MHT-CET',
  percentile = '93.42',
  branch = 'CSE / IT / AI-DS',
  category = 'OPEN',
  colleges = []
}) => {
  const { showToast } = useApp();
  const [customName, setCustomName] = useState(studentName === 'Student Candidate' ? '' : studentName);
  const [copied, setCopied] = useState(false);

  const displayName = customName.trim() || 'Candidate Shortlist';
  const numericPct = typeof percentile === 'number' ? percentile : parseFloat(String(percentile)) || 93.42;

  // Categorize into Realistic, Competitive, and Ambitious
  const safeList = colleges.filter(c => c.probability === 'Safe').slice(0, 4);
  const moderateList = colleges.filter(c => c.probability === 'Moderate').slice(0, 4);
  const ambitiousList = colleges.filter(c => c.probability === 'Ambitious' || !c.probability).slice(0, 3);

  // Fallbacks if list is empty
  const defaultSafe = [
    { name: 'VIT Pune (Bibwewadi)', branch: 'Information Technology (IT)', cutoff: '~92.0% - 94.0%', fees: '₹1,85,000 / yr', city: 'Pune' },
    { name: 'PCCOE Akurdi Pune', branch: 'AI & Data Science', cutoff: '~91.5% - 93.8%', fees: '₹1,40,000 / yr', city: 'Pune' },
    { name: 'AISSMS IOIT Pune', branch: 'Computer Engineering', cutoff: '~89.5% - 92.5%', fees: '₹1,30,000 / yr', city: 'Pune' }
  ];

  const defaultModerate = [
    { name: 'PICT Pune', branch: 'Electronics & Telecom (ENTC)', cutoff: '~94.5% - 96.5%', fees: '₹1,15,000 / yr', city: 'Pune' },
    { name: 'SPIT Mumbai', branch: 'EXTC / Data Science', cutoff: '~95.0% - 97.0%', fees: '₹1,70,000 / yr', city: 'Mumbai' }
  ];

  const defaultAmbitious = [
    { name: 'COEP Technological University', branch: 'Robotics & AI / Instrumentation', route: 'CAP Round 3 & ACAP Spot Round', city: 'Pune' },
    { name: 'VJTI Mumbai', branch: 'Electronics & Telecom', route: 'Institutional Spot Round', city: 'Mumbai' }
  ];

  const generateWhatsAppMessage = () => {
    let msg = `🎓 *${displayName}'s Official College Shortlist*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📋 *Exam:* ${exam}\n`;
    msg += `📊 *Percentile / Score:* ${numericPct}%ile\n`;
    msg += `💡 *Target Branch:* ${branch}\n`;
    msg += `🏛️ *Category & Quota:* ${category}\n\n`;

    msg += `🟢 *REALISTIC OPTIONS (High Chance - Round 1/2)*\n`;
    if (safeList.length > 0) {
      safeList.forEach((c, idx) => {
        msg += `${idx + 1}. *${c.name}*\n   • Cutoff Band: ~${c.cutoff || (numericPct - 1).toFixed(1)}%ile\n   • Location: ${c.city} | Fees: ${c.fees || 'Approved SSS'}\n`;
      });
    } else {
      defaultSafe.forEach((c, idx) => {
        msg += `${idx + 1}. *${c.name}* — ${c.branch}\n   • Cutoff: ${c.cutoff}ile\n   • ${c.city} | Approx Fee: ${c.fees}\n`;
      });
    }
    msg += `\n`;

    msg += `🟡 *COMPETITIVE MATCHES (Target Round 2/3)*\n`;
    if (moderateList.length > 0) {
      moderateList.forEach((c, idx) => {
        msg += `${idx + 1}. *${c.name}*\n   • Location: ${c.city} | Cutoff: ~${c.cutoff || numericPct}%ile\n`;
      });
    } else {
      defaultModerate.forEach((c, idx) => {
        msg += `${idx + 1}. *${c.name}* — ${c.branch}\n   • Cutoff: ${c.cutoff}ile | ${c.city}\n`;
      });
    }
    msg += `\n`;

    msg += `🔴 *AMBITIOUS OPTIONS (Spot & ACAP Vacancy Rounds)*\n`;
    if (ambitiousList.length > 0) {
      ambitiousList.forEach((c, idx) => {
        msg += `${idx + 1}. *${c.name}* (${c.city})\n   • Strategy: ACAP Vacancy Round\n`;
      });
    } else {
      defaultAmbitious.forEach((c, idx) => {
        msg += `${idx + 1}. *${c.name}* — ${c.branch}\n   • Strategy: ${c.route}\n`;
      });
    }
    msg += `\n`;

    msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📍 *Strategy Prepared with:* Admission Suggestion Pune\n`;
    msg += `🏢 *Head Office:* Office No. 312, Sohrab Hall, Near Pune Station\n`;
    msg += `📞 *Helpline:* +91 9860 777 069\n`;
    msg += `🌐 *Verify Option Form:* https://admissionsuggestion.com\n`;

    return msg;
  };

  const handleShareToWhatsApp = () => {
    const rawText = generateWhatsAppMessage();
    const encodedText = encodeURIComponent(rawText);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    showToast('WhatsApp share window opened! Forward to Dad/Mom.');
  };

  const handleCopyText = () => {
    const rawText = generateWhatsAppMessage();
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    showToast('Summary copied to clipboard! Paste directly into WhatsApp.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-[#0F172A] text-white border border-slate-800 shadow-xl space-y-5 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ADEF]/20 text-[#00ADEF] text-xs font-bold font-heading">
            <Users className="w-3.5 h-3.5" />
            <span>Family Shortlist Forwarder</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
            Send This Shortlist to Dad / Mom
          </h3>
          <p className="text-xs text-slate-300 font-normal">
            Generate an organized WhatsApp summary with realistic options, fees, locations & admission routes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            {numericPct}%ile Match
          </span>
        </div>
      </div>

      {/* Candidate Name Input & Preview Box */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Enter Student Name (e.g. Vivek Kulkarni)"
            className="w-full sm:w-80 bg-slate-900 border border-slate-700 focus:border-[#00ADEF] text-white text-xs px-4 py-3 rounded-xl outline-none font-medium placeholder:text-slate-500"
          />
          <span className="text-xs text-slate-400 font-normal">
            Personalizes the title in the WhatsApp text.
          </span>
        </div>

        {/* Live Formatted Summary Box */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span className="text-[11px] font-bold font-sans">WhatsApp Preview:</span>
            <span className="text-[10px] text-emerald-400 font-bold">● Ready to Forward</span>
          </div>

          <div className="space-y-1 text-slate-200">
            <p className="font-bold text-[#00ADEF] font-sans">🎓 {displayName}'s College Shortlist</p>
            <p className="text-slate-400">Exam: {exam} | Score: {numericPct}%ile | Branch: {branch}</p>
            <div className="pt-2 text-xs space-y-1">
              <p className="text-emerald-400 font-sans font-bold">🟢 Realistic Options (High Probability Round 1/2)</p>
              <p className="text-amber-400 font-sans font-bold">🟡 Competitive Options (Target Round 2/3)</p>
              <p className="text-rose-400 font-sans font-bold">🔴 Ambitious Reach (ACAP & Spot Rounds)</p>
            </div>
            <p className="text-[10px] text-slate-500 pt-1 font-sans">Includes fees, location, DTE codes & Pune head office contact.</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleShareToWhatsApp}
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading shadow-md"
        >
          <Send className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>Share on WhatsApp with Parents</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Formatted Summary</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
