import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LogoPreloader } from './components/common/LogoPreloader';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { StickyConsultationWidget } from './components/common/StickyConsultationWidget';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CollegesPage } from './pages/CollegesPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { CounsellorsPage } from './pages/CounsellorsPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { CapPreferenceGeneratorPage } from './pages/CapPreferenceGeneratorPage';
import { MarksEstimatorPage } from './pages/MarksEstimatorPage';
import { StudentCornerPage } from './pages/StudentCornerPage';
import { EngineeringAdmissionsPage } from './pages/EngineeringAdmissionsPage';
import { MedicalAdmissionsPage } from './pages/MedicalAdmissionsPage';
import { ManagementAdmissionsPage } from './pages/ManagementAdmissionsPage';
import { ApplicationAssistancePage } from './pages/ApplicationAssistancePage';
import { AdminPage } from './pages/AdminPage';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { LiveCutoffTicker } from './components/home/LiveCutoffTicker';

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#00ADEF] selection:text-white">
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

      {/* Top Bloomberg / Stock Market Continuous Live Cutoff Ticker */}
      <LiveCutoffTicker />

      {/* Multi-Page Routes */}
      <main className="flex-grow pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/services" element={<ServicesPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/colleges" element={<CollegesPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/counsellors" element={<CounsellorsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/student-corner" element={<StudentCornerPage />} />
          <Route path="/students" element={<StudentCornerPage />} />
          <Route path="/engineering" element={<EngineeringAdmissionsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/admissions/engineering" element={<EngineeringAdmissionsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/medical" element={<MedicalAdmissionsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/admissions/medical" element={<MedicalAdmissionsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/management" element={<ManagementAdmissionsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/admissions/management" element={<ManagementAdmissionsPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/cap-generator" element={<CapPreferenceGeneratorPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/preference-generator" element={<CapPreferenceGeneratorPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/marks-vs-percentile" element={<MarksEstimatorPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/estimator" element={<MarksEstimatorPage onOpenConsultation={scrollToConsultation} />} />
          <Route path="/form-assistance" element={<ApplicationAssistancePage />} />
          <Route path="/apply-help" element={<ApplicationAssistancePage />} />
          <Route path="/application-assistance" element={<ApplicationAssistancePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer with Page Links */}
      <Footer />

      {/* Mobile-First Sticky App Bottom Hub */}
      <MobileBottomBar onOpenConsultation={scrollToConsultation} />

      {/* Global Toast Notification */}
      <Toast />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
      />

      {/* WhatsApp Aesthetic Floating Action Button */}
      <WhatsAppButton />

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
