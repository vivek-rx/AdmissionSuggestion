import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, FileCheck, HelpCircle, ArrowRight, Phone } from 'lucide-react';

export const DocumentValidityChecker: React.FC = () => {
  const [category, setCategory] = useState<string>('OBC');
  const [nclValid, setNclValid] = useState<string>('valid');
  const [casteValidityStatus, setCasteValidityStatus] = useState<string>('original');
  const [incomeCertYear, setIncomeCertYear] = useState<string>('current');
  const [domicileType, setDomicileType] = useState<string>('typeA');

  // Calculation of rejection risk
  const getRiskReport = () => {
    const issues: string[] = [];
    const passes: string[] = [];

    // Domicile Check
    if (domicileType === 'typeA') {
      passes.push('Maharashtra State Candidate (Type A: Domicile / Birth Certificate in MH). Full Home University & State quota benefits applicable.');
    } else {
      issues.push('Outside Maharashtra (OMS) candidates are eligible strictly for All India (AI) JEE Main seats, not state quota reservation.');
    }

    // Category Specific Checks
    if (category === 'OBC' || category === 'VJ/NT' || category === 'SBC' || category === 'SEBC') {
      if (nclValid === 'valid') {
        passes.push(`Non-Creamy Layer (NCL) Certificate is valid up to 31st March 2026. Eligible for 50% tuition fee waiver and category cutoff seats.`);
      } else if (nclValid === 'receipt') {
        issues.push(`⚠️ ATTENTION: Submitting only an NCL Receipt at FC is provisional. Original NCL must be submitted before CAP Round 3 reporting, or your seat will convert to OPEN/General.`);
      } else {
        issues.push(`🚨 CRITICAL: Without a valid Non-Creamy Layer Certificate, you CANNOT claim ${category} reservation and will be treated as OPEN category.`);
      }

      if (casteValidityStatus === 'original') {
        passes.push('Original Caste Validity Certificate verified. Zero risk of seat cancellation at ARC / Institute reporting.');
      } else if (casteValidityStatus === 'receipt') {
        issues.push('⚠️ Proforma H / Caste Validity Receipt allows CAP registration, but final admission requires Original Validity before reporting cutoff.');
      } else {
        issues.push('🚨 Missing Caste Validity leads to instant forfeiture of reserved category seat during document verification.');
      }
    }

    // EWS Check
    if (category === 'EWS') {
      if (incomeCertYear === 'current') {
        passes.push('EWS Eligibility Certificate in Proforma V issued by competent Revenue Authority (Tahsildar/SDO) for financial year 2025-26 verified.');
      } else {
        issues.push('🚨 Expired or Central Government EWS certificate is NOT accepted for Maharashtra State CAP. Must be Proforma V format issued by MH Govt.');
      }
    }

    // SC / ST Check
    if (category === 'SC' || category === 'ST') {
      if (casteValidityStatus === 'original') {
        passes.push('Caste Certificate + Caste Validity in order. 100% Tuition & Development fee waiver under Social Welfare Dept applicable.');
      } else {
        issues.push('⚠️ Original Caste Validity certificate is strictly mandatory for SC/ST seat claim.');
      }
    }

    // Income Certificate
    if (incomeCertYear === 'current') {
      passes.push('Income Certificate valid for FY 2025-26 from Tahsildar verified for MahaDBT / TFWS eligibility.');
    } else {
      issues.push('⚠️ Income Certificate must reflect family income for the preceding financial year ending 31st March 2026.');
    }

    return { issues, passes, isClean: issues.length === 0 };
  };

  const report = getRiskReport();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md font-sans">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider font-heading">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Zero-Rejection Guarantee</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
            FC Center Document Validity & Scrutiny Scanner
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Simulate your Facilitation Centre (FC) e-scrutiny before physical reporting. Detect expired NCL, missing validity receipts, or proforma errors early.
          </p>
        </div>

        {/* Input Interactive Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
              Candidate Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-medium"
            >
              <option value="Open">Open / General</option>
              <option value="OBC">OBC (Other Backward Class)</option>
              <option value="EWS">EWS (Economically Weaker Section)</option>
              <option value="VJ/NT">VJ / NT (DT-A, NT-B, NT-C, NT-D)</option>
              <option value="SEBC">SEBC (Socially & Edu Backward)</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
            </select>
          </div>

          {/* Non Creamy Layer */}
          {(category === 'OBC' || category === 'VJ/NT' || category === 'SBC' || category === 'SEBC') && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                Non-Creamy Layer (NCL)
              </label>
              <select
                value={nclValid}
                onChange={e => setNclValid(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-medium"
              >
                <option value="valid">Valid up to 31 March 2026</option>
                <option value="receipt">Only Application Receipt Available</option>
                <option value="expired">Expired (March 2025 or older)</option>
                <option value="none">Not Applied / None</option>
              </select>
            </div>
          )}

          {/* Caste Validity */}
          {category !== 'Open' && category !== 'EWS' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                Caste Validity Status
              </label>
              <select
                value={casteValidityStatus}
                onChange={e => setCasteValidityStatus(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-medium"
              >
                <option value="original">Original Validity Certificate Available</option>
                <option value="receipt">Proforma H / Scrutiny Receipt Available</option>
                <option value="none">Not Applied / Pending</option>
              </select>
            </div>
          )}

          {/* Domicile */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
              Domicile / Candidature Type
            </label>
            <select
              value={domicileType}
              onChange={e => setDomicileType(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-medium"
            >
              <option value="typeA">Type A (MH Domicile & SSC+HSC in MH)</option>
              <option value="typeB">Type B (Candidate/Parent Domicile in MH)</option>
              <option value="typeC">Type C (Govt of India Employee Posted in MH)</option>
              <option value="oms">OMS (Outside Maharashtra State)</option>
            </select>
          </div>

          {/* Income Certificate */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
              Tahsildar Income Certificate
            </label>
            <select
              value={incomeCertYear}
              onChange={e => setIncomeCertYear(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-[#00ADEF] font-medium"
            >
              <option value="current">Current FY (Valid for 2025-26)</option>
              <option value="expired">Older than March 2025</option>
              <option value="none">Salary Slip only (No Tahsildar Cert)</option>
            </select>
          </div>

        </div>

        {/* Live Diagnostic Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          {/* Passed Checks */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider font-heading">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Eligibility & Quota Clearance ({report.passes.length})</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-900 font-medium">
              {report.passes.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Warnings / Action Items */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            report.isClean
              ? 'bg-slate-50 border-slate-200 text-slate-600'
              : 'bg-rose-50/70 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider font-heading">
              <AlertTriangle className={`w-4 h-4 ${report.isClean ? 'text-slate-400' : 'text-rose-600'}`} />
              <span className={report.isClean ? 'text-slate-700' : 'text-rose-800'}>
                {report.isClean ? 'Zero Disqualification Risks Detected' : `Action Required Before FC Scrutiny (${report.issues.length})`}
              </span>
            </div>

            {report.isClean ? (
              <p className="text-xs text-slate-600 leading-relaxed">
                🎉 Your document readiness is optimal! Carry 3 self-attested sets of Xerox copies along with your original documents to the FC center.
              </p>
            ) : (
              <ul className="space-y-2 text-xs font-medium">
                {report.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-rose-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            )}

            {!report.isClean && (
              <div className="pt-2">
                <a
                  href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20have%20an%20urgent%20query%20regarding%20my%20Caste%20Validity%20%2F%20NCL%20documents%20for%20FC%20Scrutiny."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 underline font-heading"
                >
                  <span>Talk to Document Scrutiny Expert on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
