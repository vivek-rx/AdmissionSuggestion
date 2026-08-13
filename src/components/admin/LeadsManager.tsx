import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Calendar, Trash2, CheckCircle2, UserCheck, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InquiryLead } from '../../types';

export const LeadsManager: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

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
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
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

  return (
    <div className="space-y-6">
      {/* Top Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">Student & Parent Inquiry Leads ({leads.length})</h3>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inquiries captured from public consultation forms and webinar seat registrations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="w-full sm:w-auto bg-slate-950 border border-slate-800 text-white text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-cyan-400"
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
              className="w-full bg-slate-950 border border-slate-800 text-white text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

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
                    <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a href={`tel:${lead.phone}`} className="hover:text-cyan-400 font-semibold">{lead.phone}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Location: {lead.targetLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Branch: {lead.preferredBranch}</span>
                  </div>
                </div>

                {lead.message && (
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <strong className="text-cyan-400 font-heading">Message / Query:</strong> {lead.message}
                  </div>
                )}
              </div>

              {/* Status Selector & Actions */}
              <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                <select
                  value={lead.status}
                  onChange={e => updateLeadStatus(lead.id, e.target.value as InquiryLead['status'])}
                  className="bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-bold px-3 py-2 rounded-xl outline-none"
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
