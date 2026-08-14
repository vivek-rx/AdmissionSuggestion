import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Calendar, Trash2, CheckCircle2, UserCheck, MessageSquare, Bell, Zap, ExternalLink, Save, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InquiryLead } from '../../types';
import {
  getWebhookUrl,
  setWebhookUrl,
  getFormspreeId,
  setFormspreeId,
  getCounsellorWhatsAppUrl,
  dispatchLeadNotification
} from '../../utils/leadNotifier';

export const LeadsManager: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead, showToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Webhook / Formspree Settings State
  const [showConfig, setShowConfig] = useState(false);
  const [webhookInput, setWebhookInput] = useState(getWebhookUrl());
  const [formspreeInput, setFormspreeInput] = useState(getFormspreeId());
  const [isTesting, setIsTesting] = useState(false);

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.exam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: InquiryLead['status']) => {
    switch (status) {
      case 'New':
        return 'bg-sky-500/20 text-[#00ADEF] border-sky-500/40';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Enrolled':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const handleSaveIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookUrl(webhookInput.trim());
    setFormspreeId(formspreeInput.trim());
    showToast('Lead alert notification settings saved!');
  };

  const handleSendTestAlert = async () => {
    setIsTesting(true);
    const testLead: InquiryLead = {
      id: `test-${Date.now()}`,
      name: 'Sample Student (Test Alert)',
      phone: '+91 9860 777 069',
      email: 'info@admissionsuggestion.com',
      exam: 'MHT-CET',
      scorePercentile: '98.50 %ile',
      preferredBranch: 'Computer Engg',
      targetLocation: 'Pune (COEP / PICT)',
      message: 'Testing instant webhook & email alert dispatch.',
      status: 'New',
      createdAt: new Date().toLocaleString()
    };

    const res = await dispatchLeadNotification(testLead);
    setIsTesting(false);
    showToast(`Test alert dispatched via ${res.channel}! Check your inbox / webhook.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-bold text-white font-heading">Inquiry Leads ({leads.length})</h3>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-[#00ADEF] border border-sky-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors font-heading"
            >
              <Bell className="w-3 h-3" />
              <span>{showConfig ? 'Hide Alert Settings' : 'Email/Webhook Alerts'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inquiries captured from public consultation forms and option list generators.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF]"
          >
            <option value="All">All Lead Statuses</option>
            <option value="New">New ({leads.filter(l => l.status === 'New').length})</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Enrolled">Enrolled 🎉</option>
            <option value="Archived">Archived</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-[#00ADEF]"
            />
          </div>
        </div>
      </div>

      {/* Webhook & Email Notification Settings Panel */}
      {showConfig && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-sky-500/30 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold font-heading text-sm">
            <Zap className="w-4 h-4 text-[#00ADEF]" />
            <span>Instant Lead Alert Dispatches (Email & Webhook)</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Configure where leads should be forwarded immediately when a parent or student submits an inquiry on the website.
          </p>

          <form onSubmit={handleSaveIntegration} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Formspree Endpoint ID (Direct Email)
              </label>
              <input
                type="text"
                placeholder="e.g. xpwzgkqq (from formspree.io)"
                value={formspreeInput}
                onChange={e => setFormspreeInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Sends lead alerts to your counsellors' email.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-heading">
                Custom Webhook URL (Zapier / Make / Telegram / Discord)
              </label>
              <input
                type="url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={webhookInput}
                onChange={e => setWebhookInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-mono"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Triggers instant SMS or CRM lead capture.</span>
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendTestAlert}
                disabled={isTesting}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 font-heading"
              >
                <Send className="w-3.5 h-3.5 text-[#00ADEF]" />
                <span>{isTesting ? 'Dispatching...' : 'Send Test Alert'}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white text-xs font-bold transition-colors flex items-center gap-1.5 font-heading shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notification Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leads Table Grid */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
            No inquiry leads found matching your criteria.
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 w-full lg:w-2/3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-extrabold text-lg text-white font-heading">{lead.name}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(lead.status)}`}>
                    {lead.status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Exam: {lead.exam} ({lead.scorePercentile})</span>
                  <span className="text-[10px] text-slate-400 font-mono ml-auto lg:ml-0">{lead.createdAt}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#00ADEF] shrink-0" />
                    <a href={`tel:${lead.phone}`} className="hover:text-[#00ADEF] font-semibold">{lead.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#00ADEF] shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#00ADEF] shrink-0" />
                    <span>Location: {lead.targetLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-[#00ADEF] shrink-0" />
                    <span>Branch: {lead.preferredBranch}</span>
                  </div>
                </div>

                {lead.message && (
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-[#00ADEF] font-heading">Message / Query:</strong> {lead.message}
                  </div>
                )}
              </div>

              {/* Status Selector, WhatsApp Alert & Remove Actions */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end lg:self-center">
                {/* 1-Tap WhatsApp Alert Button */}
                <a
                  href={getCounsellorWhatsAppUrl(lead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors font-heading"
                  title="Forward Lead to Counsellor WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Lead</span>
                </a>

                <select
                  value={lead.status}
                  onChange={e => updateLeadStatus(lead.id, e.target.value as InquiryLead['status'])}
                  className="bg-slate-950 border border-slate-700 text-[#00ADEF] text-xs font-bold px-3 py-2 rounded-xl outline-none"
                >
                  <option value="New">Status: New</option>
                  <option value="Contacted">Status: Contacted</option>
                  <option value="In Progress">Status: In Progress</option>
                  <option value="Enrolled">Status: Enrolled</option>
                  <option value="Archived">Status: Archived</option>
                </select>

                <button
                  onClick={() => deleteLead(lead.id)}
                  className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                  title="Remove Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
