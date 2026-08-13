import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Images,
  Calendar,
  Users,
  Bell,
  LogOut,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  Lock,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CarouselManager } from './CarouselManager';
import { EventManager } from './EventManager';
import { LeadsManager } from './LeadsManager';
import { TickerEditor } from './TickerEditor';

export const AdminDashboard: React.FC = () => {
  const {
    banners,
    events,
    leads,
    tickerMessage,
    logoutAdmin,
    activeAdminTab,
    setActiveAdminTab
  } = useApp();

  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const activeEventsCount = events.filter(e => e.active).length;

  const tabs = [
    { id: 'overview', label: 'Overview Metrics', icon: LayoutDashboard },
    { id: 'banners', label: `Hero Carousel (${banners.length})`, icon: Images },
    { id: 'events', label: `Events & Webinars (${events.length})`, icon: Calendar },
    { id: 'leads', label: `Inquiry Leads (${leads.length})`, badge: newLeadsCount > 0 ? `${newLeadsCount} New` : undefined, icon: Users },
    { id: 'ticker', label: 'Ticker Broadcast', icon: Bell }
  ];

  return (
    <section id="admin" className="py-12 px-4 lg:px-8 font-sans bg-slate-950 min-h-screen border-t-2 border-cyan-500/40">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Dashboard Header Bar */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white font-heading">Admission Suggestion</h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                  Admin Panel Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Head Office Control Desk • Sohrab Hall, Pune
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <a
              href="#hero"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              View Public Site
            </a>
            <button
              onClick={logoutAdmin}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <motion.div
          key={activeAdminTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeAdminTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-cyan-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Total Leads</span>
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{leads.length}</div>
                  <p className="text-xs text-emerald-400 font-medium">+{newLeadsCount} New inquiries pending response</p>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-blue-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Hero Banners</span>
                    <Images className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{banners.length}</div>
                  <p className="text-xs text-slate-400 font-medium">{banners.filter(b => b.active).length} Active on homepage</p>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-indigo-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Active Events</span>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{activeEventsCount}</div>
                  <p className="text-xs text-cyan-400 font-medium">Scheduled webinars & drives</p>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-amber-400">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">Office Hours</span>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-extrabold font-heading text-white">Sohrab Hall</div>
                  <p className="text-xs text-slate-400 font-medium">+91 9860 777 069</p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white font-heading">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveAdminTab('banners')}
                    className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <Images className="w-5 h-5 text-cyan-400 mb-2" />
                    <h4 className="font-bold text-white text-xs font-heading">Manage Hero Banners</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Add promos, update slides</p>
                  </button>

                  <button
                    onClick={() => setActiveAdminTab('events')}
                    className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-blue-400 mb-2" />
                    <h4 className="font-bold text-white text-xs font-heading">Schedule Webinars</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Publish live event details</p>
                  </button>

                  <button
                    onClick={() => setActiveAdminTab('leads')}
                    className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <Users className="w-5 h-5 text-emerald-400 mb-2" />
                    <h4 className="font-bold text-white text-xs font-heading">View Student Inquiries</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Contact new leads ({newLeadsCount})</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeAdminTab === 'banners' && <CarouselManager />}
          {activeAdminTab === 'events' && <EventManager />}
          {activeAdminTab === 'leads' && <LeadsManager />}
          {activeAdminTab === 'ticker' && <TickerEditor />}
        </motion.div>

      </div>
    </section>
  );
};
