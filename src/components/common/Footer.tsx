import React from 'react';
import { Shield, Phone, Mail, MapPin, Globe, ArrowUpRight, GraduationCap, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import trustedLogo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { SkritaBadge } from './SkritaBadge';

const FacebookIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-100 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-4">
            <Link to="/" className="bg-white p-2.5 rounded-2xl inline-block shadow-md">
              <img
                src={trustedLogo}
                alt="Admission Suggestion"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              With 20+ years of expertise, Admission Suggestion provides premier educational counselling for MHT-CET, JEE, NEET, CAP Rounds, and Direct Admissions across top engineering, medical & management institutes in Maharashtra and India.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[#00ADEF] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 20+ Years Legacy
              </span>

              {/* Official Facebook Page Button */}
              <a
                href="https://www.facebook.com/p/admission-suggestion-61573146525304/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1877F2]/15 hover:bg-[#1877F2]/30 border border-[#1877F2]/40 text-[#4599FF] hover:text-white text-xs font-bold transition-all shadow-xs"
                title="Follow Admission Suggestion on Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Facebook Page</span>
              </a>
            </div>
          </div>

          {/* Column 2: Student Corner & Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#00ADEF] pl-3">
              Student Corner 🎓
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/student-corner" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5 font-bold text-slate-200">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> Student Portal Hub
                </Link>
              </li>
              <li>
                <Link to="/cap-generator" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> CAP Option Form Generator
                </Link>
              </li>
              <li>
                <Link to="/marks-vs-percentile" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> Marks vs Percentile Estimator
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> 19-Point Document Checklist
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> Colleges Directory & Cutoffs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Counselling & Leadership */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#00ADEF] pl-3">
              Counselling & Mentorship
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/services" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> CAP Services & Roadmap
                </Link>
              </li>
              <li>
                <Link to="/counsellors" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> Leadership & Mentors
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> Live Webinars & Workshops
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#00ADEF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00ADEF]" /> About Us & Pune Head Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Pune Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#00ADEF] pl-3">
              Pune Head Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00ADEF] shrink-0 mt-0.5" />
                <span>Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00ADEF] shrink-0" />
                <a href="tel:+919860777069" className="hover:text-white transition-colors">
                  +91 9860 777 069
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00ADEF] shrink-0" />
                <a href="mailto:info@admissionsuggestion.com" className="hover:text-white transition-colors">
                  info@admissionsuggestion.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00ADEF] shrink-0" />
                <a href="https://admissionsuggestion.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  admissionsuggestion.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FacebookIcon className="w-4 h-4 text-[#1877F2] shrink-0" />
                <a
                  href="https://www.facebook.com/p/admission-suggestion-61573146525304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4599FF] transition-colors"
                >
                  facebook.com/admission-suggestion
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Admission Suggestion. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/about" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#00A3FF] transition-colors py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800"
            >
              <Lock className="w-3 h-3 text-[#00A3FF]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Skrita Credit — very bottom */}
        <div className="pt-5 flex justify-center">
          <SkritaBadge />
        </div>
      </div>
    </footer>
  );
};
