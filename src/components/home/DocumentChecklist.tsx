import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Search,
  Printer,
  Copy,
  Info,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { initialDocuments } from '../../data/initialData';
import { useApp } from '../../context/AppContext';

export const DocumentChecklist: React.FC = () => {
  const { showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'mandatory' | 'category'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const filteredDocs = initialDocuments.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = initialDocuments.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleCopyChecklist = () => {
    const text = initialDocuments
      .map(d => `[${checkedIds[d.id] ? 'X' : ' '}] ${d.title} (${d.category.toUpperCase()})`)
      .join('\n');
    navigator.clipboard.writeText(`ADMISSION SUGGESTION - MAHARASHTRA DTE DOCUMENT CHECKLIST:\n\n${text}`);
    showToast('Checklist copied to clipboard!');
  };

  return (
    <section id="documents" className="py-20 px-4 lg:px-8 relative font-sans bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Verification Readiness Checklist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            DTE Mandatory & Category <span className="text-[#00A3FF]">Document Checklist</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Ensure zero discrepancies during Scrutiny Center verification and college reporting. Keep these original certificates ready.
          </p>
        </div>

        {/* Progress Bar & Copy Actions */}
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-2/3 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold font-heading">
              <span className="text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#00A3FF]" />
                <span>Your Verification Preparedness</span>
              </span>
              <span className="text-[#0284C7] font-mono">{completedCount} of {totalCount} Ready ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div
                className="h-full bg-gradient-to-r from-[#00A3FF] to-[#0284C7] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyChecklist}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-2 transition-colors shadow-sm font-heading"
            >
              <Copy className="w-4 h-4 text-[#00A3FF]" />
              <span>Copy Checklist</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0284C7] border border-blue-200 text-xs font-bold flex items-center gap-2 transition-colors font-heading"
            >
              <Printer className="w-4 h-4 text-[#00A3FF]" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all font-heading ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Documents ({initialDocuments.length})
            </button>
            <button
              onClick={() => setActiveCategory('mandatory')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all font-heading ${
                activeCategory === 'mandatory'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              General Mandatory
            </button>
            <button
              onClick={() => setActiveCategory('category')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all font-heading ${
                activeCategory === 'category'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reserved / Quota
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search document name..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#00A3FF] text-slate-900 text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none font-medium"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const isChecked = !!checkedIds[doc.id];
            return (
              <div
                key={doc.id}
                onClick={() => toggleCheck(doc.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                  isChecked
                    ? 'bg-blue-50/50 border-[#00A3FF] shadow-md shadow-sky-500/10'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      doc.category === 'mandatory'
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.category === 'mandatory' ? 'Mandatory for All' : 'Category / Quota'}
                    </span>

                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#00A3FF] text-white'
                        : 'border-2 border-slate-300 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`text-sm font-bold font-heading ${
                    isChecked ? 'text-[#0284C7]' : 'text-slate-900'
                  }`}>
                    {doc.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>Issued By: {doc.issuedBy}</span>
                  {doc.mandatory && <span className="text-rose-600 font-extrabold">Required</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pro-Tip Box */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 font-medium leading-relaxed">
            <strong className="font-bold">Important Notice:</strong> Non-Creamy Layer Certificate (NCL) must be valid up to <strong>31st March 2026</strong>. If you do not produce Caste Validity or NCL at the time of scrutiny, your category will automatically be converted to Open General.
          </p>
        </div>

      </div>
    </section>
  );
};
