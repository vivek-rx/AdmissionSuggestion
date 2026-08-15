import React, { createContext, useContext, useState, useEffect } from 'react';
import { Banner, EventItem, InquiryLead, DocumentRequirement, College } from '../types';
import {
  initialBanners,
  initialEvents,
  initialDocuments,
  initialColleges,
  initialLeads
} from '../data/initialData';
import { dispatchLeadNotification } from '../utils/leadNotifier';

interface AppContextType {
  banners: Banner[];
  events: EventItem[];
  leads: InquiryLead[];
  documents: DocumentRequirement[];
  colleges: College[];
  tickerMessage: string;
  isAdminLoggedIn: boolean;
  
  // Auth
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  // Banner Management
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  deleteBanner: (id: string) => void;
  toggleBannerActive: (id: string) => void;
  
  // Event Management
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  deleteEvent: (id: string) => void;
  updateEventStatus: (id: string, status: EventItem['status']) => void;
  updateEventMeetingLink: (id: string, meetingLink: string) => void;
  updateEvent: (id: string, updatedEvent: Partial<EventItem>) => void;
  
  // Leads Management
  addLead: (lead: Omit<InquiryLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: InquiryLead['status']) => void;
  deleteLead: (id: string) => void;
  
  // Ticker Management
  updateTickerMessage: (msg: string) => void;

  // Active Admin Tab
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;
  
  // Toast Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'admission_suggestion_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_banners`);
    return saved ? JSON.parse(saved) : initialBanners;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_events`);
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [leads, setLeads] = useState<InquiryLead[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_leads`);
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [tickerMessage, setTickerMessageState] = useState<string>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY}_ticker`) ||
      'CAP Round 2026-27 Option Form Assistance Open: Call our Expert Counsellors at +91 9860 777 069 | Office No. 312, Sohrab Hall, Pune';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY}_admin_session`) === 'true';
  });

  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to Local Storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_banners`, JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_leads`, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_ticker`, tickerMessage);
  }, [tickerMessage]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_admin_session`, String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const loginAdmin = (pass: string): boolean => {
    if (pass === 'admin123' || pass === 'admin' || pass === 'demo') {
      setIsAdminLoggedIn(true);
      showToast('Welcome back, Admin!');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out of Admin Portal');
  };

  const addBanner = (bannerData: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...bannerData,
      id: `b-${Date.now()}`
    };
    setBanners(prev => [newBanner, ...prev]);
    showToast('Hero Carousel Banner added successfully!');
  };

  const deleteBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    showToast('Banner removed');
  };

  const toggleBannerActive = (id: string) => {
    setBanners(prev =>
      prev.map(b => (b.id === id ? { ...b, active: !b.active } : b))
    );
    showToast('Banner visibility updated');
  };

  const addEvent = (eventData: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `ev-${Date.now()}`
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast('New Event / Webinar scheduled!');
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event removed');
  };

  const updateEventStatus = (id: string, status: EventItem['status']) => {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, status } : e))
    );
    showToast(`Event status set to ${status}`);
  };

  const updateEventMeetingLink = (id: string, meetingLink: string) => {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, meetingLink } : e))
    );
    showToast('Meeting / Stream link updated successfully!');
  };

  const updateEvent = (id: string, updatedEvent: Partial<EventItem>) => {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, ...updatedEvent } : e))
    );
    showToast('Event updated successfully!');
  };

  const addLead = (leadData: Omit<InquiryLead, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newLead: InquiryLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      createdAt: formattedDate
    };

    setLeads(prev => [newLead, ...prev]);
    
    // Dispatch webhook / email alert asynchronously
    dispatchLeadNotification(newLead).catch(console.error);

    showToast('Inquiry submitted! Our counsellor will call you shortly.');
  };

  const updateLeadStatus = (id: string, status: InquiryLead['status']) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, status } : l))
    );
    showToast(`Lead status updated to ${status}`);
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Lead entry removed');
  };

  const updateTickerMessage = (msg: string) => {
    setTickerMessageState(msg);
    showToast('Top announcement ticker broadcasted live!');
  };

  return (
    <AppContext.Provider
      value={{
        banners,
        events,
        leads,
        documents: initialDocuments,
        colleges: initialColleges,
        tickerMessage,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addBanner,
        deleteBanner,
        toggleBannerActive,
        addEvent,
        deleteEvent,
        updateEventStatus,
        updateEventMeetingLink,
        updateEvent,
        addLead,
        updateLeadStatus,
        deleteLead,
        updateTickerMessage,
        activeAdminTab,
        setActiveAdminTab,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
