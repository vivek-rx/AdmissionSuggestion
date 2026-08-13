import React, { useState } from 'react';
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CarouselManager: React.FC = () => {
  const { banners, addBanner, deleteBanner, toggleBannerActive } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);

  const [newBanner, setNewBanner] = useState({
    badge: '⚡ CAP Round Special Guidance',
    title: '',
    subtitle: '',
    ctaText: 'Book Free Counselling',
    ctaLink: '#consultation',
    secondaryCtaText: 'View Options',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    active: true,
    order: banners.length + 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanner.title || !newBanner.subtitle) return;
    addBanner(newBanner);
    setNewBanner({
      badge: '⚡ CAP Round Special Guidance',
      title: '',
      subtitle: '',
      ctaText: 'Book Free Counselling',
      ctaLink: '#consultation',
      secondaryCtaText: 'View Options',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
      active: true,
      order: banners.length + 2
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Hero Banners & Carousel Manager</h3>
          <p className="text-xs text-slate-400 mt-1">
            Control high-visibility homepage slides, promos, and call-to-action announcements.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add New Hero Banner'}</span>
        </button>
      </div>

      {/* Add New Banner Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 border border-cyan-500/30 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white text-sm font-heading">Create New Carousel Slide</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                required
                placeholder="e.g. 🏆 Top Preferred Counsellors"
                value={newBanner.badge}
                onChange={e => setNewBanner({ ...newBanner, badge: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slide Image URL (Optional background/preview)</label>
              <input
                type="url"
                placeholder="https://..."
                value={newBanner.imageUrl}
                onChange={e => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Main Banner Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Master Your CAP Round Option Form Strategy 2026"
              value={newBanner.title}
              onChange={e => setNewBanner({ ...newBanner, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Description *</label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Get 1-on-1 guidance to lock preference list for COEP, VJTI, SPIT & VIT Pune."
              value={newBanner.subtitle}
              onChange={e => setNewBanner({ ...newBanner, subtitle: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs p-3.5 rounded-xl outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary CTA Button Label</label>
              <input
                type="text"
                placeholder="Book Counselling"
                value={newBanner.ctaText}
                onChange={e => setNewBanner({ ...newBanner, ctaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary CTA Label</label>
              <input
                type="text"
                placeholder="View Options"
                value={newBanner.secondaryCtaText}
                onChange={e => setNewBanner({ ...newBanner, secondaryCtaText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
              />
            </div>
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
              Save Slide to Carousel
            </button>
          </div>
        </form>
      )}

      {/* Banners List Grid */}
      <div className="space-y-4">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`glass-card rounded-2xl p-5 border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              banner.active ? 'border-slate-800 bg-slate-900/60' : 'border-slate-800/40 opacity-60 bg-slate-950/40'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                0{index + 1}
              </span>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {banner.badge}
                  </span>
                  {!banner.active && (
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Hidden from Site
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-base text-white font-heading">{banner.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-1">{banner.subtitle}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <button
                onClick={() => toggleBannerActive(banner.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  banner.active
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                {banner.active ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Activate</span>
                  </>
                )}
              </button>

              <button
                onClick={() => deleteBanner(banner.id)}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                title="Delete Slide"
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
