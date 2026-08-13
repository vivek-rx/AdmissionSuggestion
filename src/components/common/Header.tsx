"use client";
import React, { useState } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarActions,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import { useApp } from '../../context/AppContext';
import trustedLogo from '../../assets/logo.png';
import { Phone, MapPin, Sparkles, User, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface HeaderProps {
  onOpenAdminLogin: () => void;
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdminLogin,
  onOpenConsultation,
}) => {
  const { tickerMessage, isAdminLoggedIn } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "CAP Generator 🔥",
      link: "/cap-generator",
    },
    {
      name: "CAP Services",
      link: "/services",
    },
    {
      name: "Colleges & Cutoffs",
      link: "/colleges",
    },
    {
      name: "Documents",
      link: "/documents",
    },
    {
      name: "Counsellors",
      link: "/counsellors",
    },
    {
      name: "Live Webinars",
      link: "/events",
    },
    {
      name: "About Us",
      link: "/about",
    },
  ];

  const handleNavClick = (link: string) => {
    setIsMobileMenuOpen(false);
    navigate(link);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookCall = () => {
    setIsMobileMenuOpen(false);
    const consultEl = document.getElementById('consultation');
    if (consultEl) {
      consultEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#consultation');
      setTimeout(() => {
        const el = document.getElementById('consultation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <header className="w-full font-sans sticky top-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-[#00A3FF]/20 text-[#00A3FF] font-bold px-2 py-0.5 rounded text-[10px] uppercase shrink-0 font-heading">
              Official
            </span>
            <p className="truncate text-slate-300 font-medium">
              {tickerMessage || '⚡ Direct 2nd Year & CAP Round Counselling 2026-27: Book Expert 1-on-1 Sessions at Sohrab Hall, Pune'}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400 shrink-0 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#00A3FF]" />
              <span>Sohrab Hall, Pune</span>
            </span>
            <a
              href="tel:+919860777069"
              className="flex items-center gap-1 font-bold text-white hover:text-[#00A3FF] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#00A3FF]" />
              <span>+91 9860 777 069</span>
            </a>
          </div>
        </div>
      </div>

      {/* Resizable Floating Navbar */}
      <div className="relative w-full py-2.5 px-3 lg:px-6">
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo
              logoSrc={trustedLogo}
              brandText="Admission Suggestion"
              onClick={() => handleNavClick('/')}
            />

            <NavItems
              items={navItems}
              activePath={location.pathname}
              onItemClick={handleNavClick}
            />

            {/* Right-side Action Buttons that smoothly glide off on scroll down and appear back on scroll up */}
            <NavbarActions>
              <NavbarButton
                onClick={() => navigate('/admin')}
                variant="secondary"
              >
                {isAdminLoggedIn ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Admin Panel</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </NavbarButton>
              <NavbarButton
                onClick={handleBookCall}
                variant="primary"
              >
                Book a call
              </NavbarButton>
            </NavbarActions>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo
                logoSrc={trustedLogo}
                brandText="Admission Suggestion"
                onClick={() => handleNavClick('/')}
              />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              <div className="grid grid-cols-2 gap-2 w-full pb-3 border-b border-slate-100">
                {navItems.map((item, idx) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <button
                      key={`mobile-link-${idx}`}
                      onClick={() => handleNavClick(item.link)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-left transition-colors font-heading ${
                        isActive
                          ? 'bg-blue-50 text-[#00A3FF]'
                          : 'text-slate-700 hover:text-[#00A3FF] hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              <div className="flex w-full flex-col sm:flex-row gap-2.5 pt-2">
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/admin');
                  }}
                  variant="secondary"
                  className="w-full justify-center py-2.5"
                >
                  {isAdminLoggedIn ? 'Admin Panel' : 'Sign In'}
                </NavbarButton>
                <NavbarButton
                  onClick={handleBookCall}
                  variant="primary"
                  className="w-full justify-center py-2.5"
                >
                  Book a call
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </div>
    </header>
  );
};
