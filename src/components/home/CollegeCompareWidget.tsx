import React, { useState } from 'react';
import { Scale, Check, X, ArrowRight, Building2, MapPin, Award, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';
import { initialColleges } from '../../data/initialData';
import { College } from '../../types';

interface CollegeCompareWidgetProps {
  onOpenConsultation: () => void;
}

export const CollegeCompareWidget: React.FC<CollegeCompareWidgetProps> = ({ onOpenConsultation }) => {
  const [college1Id, setCollege1Id] = useState<string>('col-1'); // COEP
  const [college2Id, setCollege2Id] = useState<string>('col-2'); // VJTI

  const col1 = initialColleges.find(c => c.id === college1Id) || initialColleges[0];
  const col2 = initialColleges.find(c => c.id === college2Id) || initialColleges[1];

  return (
    <section className="py-16 px-4 lg:px-8 font-sans relative bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>Interactive Comparison Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Compare Top Institutes <span className="text-[#00A3FF]">Side-By-Side</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Evaluate cut-offs, placements, autonomous status, and fees to build an optimal CAP option form.
          </p>
        </div>

        {/* Comparison Board */}
        <div className="bg-slate-50 rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-md space-y-6">
          
          {/* Selectors Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider font-heading">
                Select First College:
              </label>
              <select
                value={college1Id}
                onChange={e => setCollege1Id(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 font-bold text-xs p-3.5 rounded-xl outline-none focus:border-[#00A3FF] font-heading shadow-sm"
              >
                {initialColleges.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider font-heading">
                Select Second College:
              </label>
              <select
                value={college2Id}
                onChange={e => setCollege2Id(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 font-bold text-xs p-3.5 rounded-xl outline-none focus:border-[#00A3FF] font-heading shadow-sm"
              >
                {initialColleges.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.city})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* College 1 Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0284C7] text-[10px] font-bold uppercase border border-blue-200">
                  {col1.badge || col1.type}
                </span>
                <span className="text-xs font-mono text-slate-600 font-bold">DTE: {col1.dteCode}</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 font-heading">{col1.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#00A3FF]" /> {col1.location}, {col1.city}
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Cut-Off Percentile:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">{col1.cutoffPercentile}%ile</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Highest Package:</span>
                  <span className="font-extrabold text-[#0284C7] font-mono">{col1.highestPackage}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Average Package:</span>
                  <span className="font-bold text-slate-900 font-mono">{col1.averagePackage}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Annual Tuition Fee:</span>
                  <span className="font-bold text-slate-900">{col1.fees}</span>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-[#00A3FF] text-slate-800 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-heading"
              >
                <span>Consult for {col1.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* College 2 Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0284C7] text-[10px] font-bold uppercase border border-blue-200">
                  {col2.badge || col2.type}
                </span>
                <span className="text-xs font-mono text-slate-600 font-bold">DTE: {col2.dteCode}</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 font-heading">{col2.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#00A3FF]" /> {col2.location}, {col2.city}
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Cut-Off Percentile:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">{col2.cutoffPercentile}%ile</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Highest Package:</span>
                  <span className="font-extrabold text-[#0284C7] font-mono">{col2.highestPackage}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Average Package:</span>
                  <span className="font-bold text-slate-900 font-mono">{col2.averagePackage}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
                  <span className="text-slate-600">Annual Tuition Fee:</span>
                  <span className="font-bold text-slate-900">{col2.fees}</span>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-[#00A3FF] text-slate-800 hover:text-white font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-heading"
              >
                <span>Consult for {col2.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
