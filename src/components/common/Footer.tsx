import React from 'react';
import { Shield, Phone, Mail, MapPin, Globe, ArrowUpRight, GraduationCap, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import trustedLogo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { SkritaBadge } from './SkritaBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-100 pt-16 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
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

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[#00A3FF] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 20+ Years Ground Legacy
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#00A3FF] pl-3">
              Dedicated Pages
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> Home Overview
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> CAP Round Services & Roadmap
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> Colleges Directory & Comparison
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> Mandatory Documents Checklist
                </Link>
              </li>
              <li>
                <Link to="/counsellors" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> Counsellors & Allotment Proofs
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> Live Webinars & Drives
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#00A3FF] transition-colors flex items-center gap-1.5">
                  <ArrowUpRight className="w-3 h-3 text-[#00A3FF]" /> About Us & Pune Head Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Counselling Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#00A3FF] pl-3">
              Our Core Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shrink-0" />
                <span>CAP Round Option Form Strategy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shrink-0" />
                <span>1-on-1 Personalized Guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shrink-0" />
                <span>Autonomous & Private University Seats</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shrink-0" />
                <span>Direct 2nd Year (DSE) Admissions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shrink-0" />
                <span>Institute Level (IL) & Management Quota</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shrink-0" />
                <span>E-Scrutiny & Document Verification</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Pune Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading border-l-2 border-[#00A3FF] pl-3">
              Pune Head Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00A3FF] shrink-0 mt-0.5" />
                <span>Office No. 312, 3rd Floor, Sohrab Hall, Tadiwala Road, Behind Pune Railway Station, Pune - 411001</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <a href="tel:+919860777069" className="hover:text-white transition-colors">
                  +91 9860 777 069
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <a href="mailto:info@admissionsuggestion.com" className="hover:text-white transition-colors">
                  info@admissionsuggestion.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#00A3FF] shrink-0" />
                <a href="https://admissionsuggestion.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  admissionsuggestion.com
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
