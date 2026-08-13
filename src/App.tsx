import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LogoPreloader } from './components/common/LogoPreloader';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { StickyConsultationWidget } from './components/common/StickyConsultationWidget';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CollegesPage } from './pages/CollegesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { CounsellorsPage } from './pages/CounsellorsPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { MessageSquare } from 'lucide-react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

const MainAppLayout: React.FC = () => {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const scrollToConsultation = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#00A3FF] selection:text-white">
      <ScrollToTop />

      {/* Framer-inspired Logo Preloader Animation */}
      {!preloaderDone && (
        <LogoPreloader duration={2.2} onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Header with Resizable Navbar */}
      <Header
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        onOpenConsultation={scrollToConsultation}
      />

      {/* Multi-Page Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/services" element={<ServicesPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/colleges" element={<CollegesPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/counsellors" element={<CounsellorsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer with Page Links */}
      <Footer />

      {/* Global Toast Notification */}
      <Toast />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
      />

      {/* WhatsApp Floating Action Button */}
      <div className="fixed bottom-20 right-6 md:bottom-6 md:left-6 z-40 flex flex-col gap-3">
        <a
          href="https://wa.me/919860777069?text=Hi%20Admission%20Suggestion%2C%20I%20need%20assistance%20regarding%20CAP%20Round%20and%20College%20Cutoffs."
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-full bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          title="Chat on WhatsApp (+91 9860 777 069)"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-[10px] font-bold uppercase font-heading opacity-90 group-hover:opacity-100">
            WhatsApp
          </span>
        </a>
      </div>

      {/* Global Sticky 1:1 Consultation Widget */}
      <StickyConsultationWidget />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainAppLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
