import React, { useState } from 'react';
import { ExternalLink, Sparkles, Image as ImageIcon, Heart, MessageCircle, Share2 } from 'lucide-react';

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const FacebookLiveFeed: React.FC = () => {
  const fbPageUrl = "https://www.facebook.com/p/admission-suggestion-61573146525304/";
  const [embedMode, setEmbedMode] = useState<'interactive' | 'feed'>('interactive');

  // Official Facebook Iframe Plugin URL
  const fbIframeSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    fbPageUrl
  )}&tabs=timeline&width=500&height=550&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  const highlights = [
    {
      title: "CAP Round 2026-27 Seminar & Option Form Workshop",
      location: "Pune Head Office • Sohrab Hall",
      desc: "Live guidance on COEP & PICT branch choice sequence optimization with Er. Akshaykumar Bhandari.",
      date: "Live Update"
    },
    {
      title: "Facilitation Centre (FC) Document Scrutiny Desk",
      location: "Pune Scrutiny Camp",
      desc: "Over 250+ parents assisted with zero-rejection Caste Validity & NCL verification receipts.",
      date: "Recent Activity"
    },
    {
      title: "Direct Second Year (DSE) & TFWS Counseling Session",
      location: "Pune Center",
      desc: "Comprehensive seat matrix strategy for diploma-to-degree admissions with Akash Bhandari.",
      date: "Community Highlight"
    }
  ];

  return (
    <section className="py-16 px-4 lg:px-8 font-sans bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] text-xs font-bold uppercase tracking-wider font-heading">
              <FacebookIcon className="w-3.5 h-3.5" />
              <span>Official Facebook Community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Live Activities, Seminar Photos & Updates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Stay connected with our daily counselling sessions, campus seminars, and student achievements in Pune.
            </p>
          </div>

          <a
            href={fbPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shrink-0 font-heading"
          >
            <FacebookIcon className="w-4 h-4" />
            <span>Follow on Facebook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 2-Column Grid: Live Facebook Widget + Photo Activity Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Official Facebook Embed */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-heading text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Facebook Page Stream</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">@admission-suggestion</span>
            </div>

            <div className="w-full flex justify-center bg-slate-100/60 rounded-2xl p-2 border border-slate-200 overflow-hidden min-h-[500px]">
              <iframe
                src={fbIframeSrc}
                width="500"
                height="520"
                style={{ border: 'none', overflow: 'hidden', width: '100%', borderRadius: '12px' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Admission Suggestion Facebook Live Feed"
              />
            </div>
          </div>

          {/* Right Column: High-Trust Activity Highlights & Photo Albums */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-[#00ADEF] text-xs font-bold font-heading uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Ground Presence in Pune</span>
              </div>
              <h3 className="text-lg font-bold font-heading">
                Direct Snapshots from Sohrab Hall & Engineering Seminars
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Visit our Facebook gallery to see real student counselling sessions, option form workshops, and direct interactions with senior college directors.
              </p>
            </div>

            <div className="space-y-3">
              {highlights.map((h, idx) => (
                <a
                  key={idx}
                  href={fbPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#1877F2] transition-all shadow-xs flex items-start justify-between gap-4 group block"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1877F2] border border-blue-200 font-heading">
                        {h.date}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">{h.location}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 font-heading group-hover:text-[#1877F2] transition-colors">
                      {h.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {h.desc}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#1877F2] text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-1">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            <a
              href={fbPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1877F2] hover:text-[#166fe5] font-bold text-xs flex items-center justify-center gap-2 transition-all font-heading shadow-xs"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Browse All Facebook Photos & Live Videos</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
