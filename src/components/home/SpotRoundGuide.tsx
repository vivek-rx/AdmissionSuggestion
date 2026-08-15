import React, { useState } from 'react';
import { HelpCircle, AlertCircle, ShieldAlert, Award, FileText, CheckCircle2, Phone, ArrowRight, Building2, Sparkles } from 'lucide-react';

export const SpotRoundGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'acap' | 'il' | 'rules'>('acap');

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md font-sans">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Insider Guidance • Autonomous & Private Seats</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
              Against CAP (ACAP) & Institutional Level (IL) Vacancy Round Guide
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every year, 15% to 20% of seats in top Pune & Mumbai autonomous colleges remain open after CAP Round 3. Here is how merit-based spot admissions work.
            </p>
          </div>

          <a
            href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20want%20guidance%20for%20ACAP%20and%20Institutional%20Quota%20vacancy%20rounds%20in%20Pune."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#00ADEF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shrink-0 font-heading"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Consult on Vacancy Seats</span>
          </a>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-xl">
          <button
            type="button"
            onClick={() => setActiveTab('acap')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold font-heading transition-all ${
              activeTab === 'acap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Against-CAP (ACAP) Seats
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('il')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold font-heading transition-all ${
              activeTab === 'il' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Institutional Level (IL) Quota
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold font-heading transition-all ${
              activeTab === 'rules' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Mandatory Rules & Documents
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'acap' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 font-heading">What are ACAP Vacancy Seats?</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                After CAP Round 3, students who get allotted IITs, NITs, BITS, or medical seats cancel their state engineering admissions. These vacant seats are converted to <strong>Against-CAP (ACAP)</strong> seats.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conducted purely on MHT-CET / JEE Main State General Merit Rank.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No category reservations apply in ACAP — all vacant seats open for General Merit.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 font-heading">Key Pune Colleges with ACAP Rounds:</span>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                PICT Pune, VIT Pune, PCCOE Akurdi, Cummins College of Engg, Walchand College of Engg (Sangli), D.Y. Patil Akurdi, AISSMS COE.
              </p>
              <div className="p-2.5 rounded-lg bg-sky-50 text-[#00ADEF] text-xs font-bold mt-2">
                Note: Cutoffs in ACAP rounds frequently drop by 1.5% to 4.0% compared to CAP Round 1.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'il' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 font-heading">Institutional Level (IL / Management) Quota (20%)</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Private un-aided institutes in Maharashtra have up to 20% sanctioned seats reserved as Institutional Quota under DTE Guidelines.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Candidate MUST have a valid DTE Application ID (EN26xxxxxx).</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent merit lists published on institute websites under ARA supervision.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 font-heading">Strategic Counselling Advantage:</span>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We track the individual merit application deadlines and vacancy announcements across all 35+ private institutes in Pune & Mumbai to ensure timely form submissions.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs text-slate-700">
            <h4 className="font-bold text-sm text-slate-900 font-heading">Rules for Participating in Spot & Vacancy Rounds:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 font-heading block">1. Retention Certificate</strong>
                <p className="text-slate-600">If already admitted in a college, carry the Original College Admission Fee Receipt & Document Retention Letter.</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 font-heading block">2. Physical Presence</strong>
                <p className="text-slate-600">Candidate or parent with authorization letter must be physically present at the institute auditorium during call of merit.</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 font-heading block">3. Immediate Demand Draft</strong>
                <p className="text-slate-600">Full annual college fee via Demand Draft (DD) / Online RTGS is mandatory on the spot to confirm seat.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
