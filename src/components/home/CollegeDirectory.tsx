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
  ShieldCheck,
  Filter,
  Stethoscope,
  Cpu,
  Briefcase
} from 'lucide-react';
import { initialColleges } from '../../data/initialData';

interface CollegeDirectoryProps {
  onOpenConsultation: () => void;
}

export const CollegeDirectory: React.FC<CollegeDirectoryProps> = ({ onOpenConsultation }) => {
  const [selectedStream, setSelectedStream] = useState<'All' | 'Engineering' | 'Medical' | 'Management'>('All');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Pune' | 'Mumbai'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColleges = initialColleges.filter(col => {
    // Default legacy colleges without stream attribute to 'Engineering'
    const colStream = col.stream || 'Engineering';
    const matchesStream = selectedStream === 'All' || colStream === selectedStream;
    const matchesCity = selectedCity === 'All' || col.city === selectedCity;
    const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          col.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (col.code && col.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (col.dteCode && col.dteCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          col.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStream && matchesCity && matchesSearch;
  });

  return (
    <section id="colleges" className="py-16 px-4 lg:px-8 relative font-sans bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#00ADEF] text-xs font-bold uppercase tracking-wider font-heading">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ADEF]" />
            <span>350+ Maharashtra Institutes Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Explore Colleges & <span className="text-[#00ADEF]">Cut-Off Benchmarks</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Review detailed cut-off percentiles, official DTE/DMER codes, fee structures, and course options across Engineering, Medical, and Management.
          </p>
        </div>

        {/* Multi-Level Stream & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            
            {/* Stream Selector Dropdown */}
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                Academic Stream / Domain:
              </label>
              <div className="relative">
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs px-4 py-3 rounded-2xl outline-none font-bold shadow-xs appearance-none pr-10 cursor-pointer"
                >
                  <option value="All">All Streams (Engineering, Medical, Management)</option>
                  <option value="Engineering">Engineering (B.E. / B.Tech / DSE)</option>
                  <option value="Medical">Medical & Dental (MBBS / BDS / AYUSH)</option>
                  <option value="Management">Management & UG (BBA / BCA / MBA)</option>
                </select>
                <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* City Selector Pills */}
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                Campus Location:
              </label>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                {(['All', 'Pune', 'Mumbai'] as const).map(city => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all font-heading ${
                      selectedCity === city
                        ? 'bg-[#00ADEF] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {city === 'All' ? 'All MH' : city}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Box */}
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                Search Institute or Code:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. COEP, 6006, MBBS, BBA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#00ADEF] text-slate-900 text-xs pl-10 pr-4 py-2.5 rounded-2xl outline-none font-medium shadow-xs"
                />
              </div>
            </div>

          </div>

          {/* Quick Stream Filter Pills */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto text-xs pb-1">
            <span className="text-slate-400 font-semibold shrink-0 text-[11px]">Quick Filters:</span>
            {[
              { label: 'All Disciplines', stream: 'All' as const },
              { label: 'Engineering (B.Tech)', stream: 'Engineering' as const, icon: Cpu },
              { label: 'Medical (MBBS/BDS)', stream: 'Medical' as const, icon: Stethoscope },
              { label: 'Management (BBA/MBA)', stream: 'Management' as const, icon: Briefcase }
            ].map(item => {
              const active = selectedStream === item.stream;
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedStream(item.stream)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 font-heading ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
            <span className="text-slate-400 text-xs font-mono ml-auto shrink-0 font-medium">
              Showing {filteredColleges.length} Institutes
            </span>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((col) => {
            const streamName = col.stream || 'Engineering';
            const isMedical = streamName === 'Medical';
            const isManagement = streamName === 'Management';

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 flex flex-col justify-between border border-slate-200 shadow-xs hover:shadow-md hover:border-[#00ADEF] transition-all space-y-4 group"
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Logo + DTE Code & Stream Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {col.logoUrl ? (
                        <div className="h-12 w-12 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                          <img
                            src={col.logoUrl}
                            alt={`${col.name} logo`}
                            className="max-h-9 max-w-9 object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm font-heading shrink-0">
                          {col.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500 block">
                          {col.dteCode ? `CODE: ${col.dteCode}` : (col.code || 'MAH DTE')}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase font-heading ${
                            isMedical
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isManagement
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-sky-50 text-[#00ADEF] border border-sky-200'
                          }`}>
                            {streamName}
                          </span>
                          <span className="text-[10px] font-medium text-slate-500">
                            {col.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold font-heading shrink-0">
                      {col.city}
                    </span>
                  </div>

                  {/* College Name & Ranking */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-[#00ADEF] transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{col.location}, {col.city}</span>
                    </p>
                  </div>

                  {/* Cut-off & Package Highlights */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-sans text-slate-400 block font-semibold">Cutoff Benchmark</span>
                      <span className="font-bold text-slate-900 text-[11px]">
                        {col.cutoffRange || `${col.cutoffPercentile}%ile`}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-sans text-slate-400 block font-semibold">Annual Tuition</span>
                      <span className="font-bold text-slate-900 text-[11px]">
                        {col.fees || '₹1,25,000 / yr'}
                      </span>
                    </div>
                  </div>

                  {/* Key Courses */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading block">
                      Featured Programs:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {col.courses.slice(0, 4).map((crs, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
                        >
                          {crs}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Action Button */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#00ADEF] text-white text-xs font-bold transition-all flex items-center justify-between font-heading shadow-xs"
                  >
                    <span>Check {col.name.split(' ')[0]} Cutoff</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-sm font-bold text-slate-700 font-heading">
              No institutions found matching your current filter.
            </p>
            <button
              onClick={() => {
                setSelectedStream('All');
                setSelectedCity('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#00ADEF] text-white rounded-xl text-xs font-bold font-heading"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
