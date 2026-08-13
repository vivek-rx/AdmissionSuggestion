import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  Award,
  Search,
  ExternalLink,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Scale,
  ShieldCheck
} from 'lucide-react';
import { initialColleges } from '../../data/initialData';

interface CollegeDirectoryProps {
  onOpenConsultation: () => void;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({ onOpenConsultation }) => {
  const [selectedCity, setSelectedCity] = useState<'All' | 'Pune' | 'Mumbai'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColleges = initialColleges.filter(col => {
    const matchesCity = selectedCity === 'All' || col.city === selectedCity;
    const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          col.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (col.code && col.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          col.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  return (
    <section id="colleges" className="py-20 px-4 lg:px-8 relative font-sans bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>100+ Associate Institutes Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Explore Top Colleges <span className="text-[#00A3FF]">In Pune & Mumbai</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Review detailed cut-off percentiles, official DTE codes, fee structures, and branch options across Autonomous and University colleges.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* City Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl border border-slate-300 w-full md:w-auto">
            {(['All', 'Pune', 'Mumbai'] as const).map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all font-heading ${
                  selectedCity === city
                    ? 'bg-[#00A3FF] text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {city === 'All' ? 'All Campuses' : `${city} Institutes`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search college, DTE code, or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-[#00A3FF] text-slate-900 text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none font-semibold shadow-sm"
            />
          </div>

        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((col) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 flex flex-col justify-between border border-slate-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all relative overflow-hidden group will-change-[transform,opacity]"
            >
              <div className="space-y-4">
                {/* Header Badge & Official Logo */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {col.logoUrl ? (
                      <div className="h-10 px-2 py-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0">
                        <img
                          src={col.logoUrl}
                          alt={`${col.name} logo`}
                          className="max-h-7 max-w-[100px] w-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A3FF] to-blue-700 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                        {col.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0284C7] border border-blue-200 text-[10px] font-extrabold uppercase tracking-wider">
                      {col.badge || col.type}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    DTE: {col.dteCode}
                  </span>
                </div>

                {/* College Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#00A3FF] transition-colors leading-snug">
                    {col.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00A3FF]" />
                    <span>{col.location}, {col.city}</span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Avg CAP Cutoff:</span>
                    <span className="font-extrabold text-emerald-700">{col.cutoffPercentile}%ile</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Highest CTC:</span>
                    <span className="font-extrabold text-[#0284C7]">{col.highestPackage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Annual Fees:</span>
                    <span className="font-bold text-slate-800">{col.fees}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Average CTC:</span>
                    <span className="font-bold text-slate-800">{col.averagePackage}</span>
                  </div>
                </div>

                {/* Popular Branches */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">
                    Popular Branches:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {col.courses.slice(0, 3).map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-heading">
                  {col.ranking}
                </span>
                <button
                  onClick={onOpenConsultation}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 group-hover:bg-[#00A3FF] text-slate-800 group-hover:text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 font-heading shadow-sm"
                >
                  <span>Admission Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
