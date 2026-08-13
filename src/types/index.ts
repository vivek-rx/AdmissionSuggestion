export interface Banner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  imageUrl?: string;
  active: boolean;
  order: number;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Webinar' | 'Offline Seminar' | 'CAP Round Guidance' | '1-on-1 Drive';
  date: string;
  time: string;
  venueOrUrl: string;
  speaker: string;
  status: 'Live' | 'Upcoming' | 'Registration Full' | 'Completed';
  active: boolean;
  description: string;
}

export interface InquiryLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  exam: string; // MHT-CET, JEE Main, NEET, Direct 2nd Year, MBA, Other
  scorePercentile: string;
  preferredBranch: string;
  targetLocation: string;
  message?: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Enrolled' | 'Archived';
  createdAt: string;
  notes?: string;
}

export interface DocumentRequirement {
  id: string;
  title: string;
  category: 'mandatory' | 'category';
  description: string;
  issuingAuthority?: string;
  issuedBy?: string;
  mandatory?: boolean;
  notes?: string;
}

export interface College {
  id: string;
  name: string;
  code?: string;
  dteCode?: string;
  location: string;
  city: string;
  type: 'Autonomous' | 'Government' | 'Private University' | 'Aided';
  courses: string[];
  cutoffRange?: string;
  cutoffPercentile?: string | number;
  highestPackage?: string;
  averagePackage?: string;
  fees?: string;
  ranking?: string;
  autonomous?: boolean;
  badge?: string;
  website?: string;
  logoUrl?: string;
}

export interface CollegeLogoItem {
  name: string;
  subText?: string;
  badge?: string;
  link?: string;
  logoUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
}

