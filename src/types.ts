export type ProjectType = 
  | 'Website'
  | 'Web Application'
  | 'Software Application'
  | 'Mobile Application'
  | 'UI/UX Design'
  | 'Custom Project'
  | 'Other';

export type BudgetRange = 
  | 'Under ₹10,000'
  | '₹10,000 – ₹25,000'
  | '₹25,000 – ₹50,000'
  | '₹50,000 – ₹1,00,000'
  | '₹1,00,000+'
  | 'Not decided yet';

export type TimelineOption = 
  | 'ASAP'
  | '1–2 Weeks'
  | '1 Month'
  | '2–3 Months'
  | 'Flexible';

export type ContactMethod = 'Email' | 'Phone / WhatsApp' | 'Google Meet';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Closed';

export interface ProjectInquiry {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type: ProjectType;
  budget?: BudgetRange;
  timeline?: TimelineOption;
  project_title: string;
  project_description: string;
  required_features?: string;
  reference_url?: string;
  preferred_contact?: ContactMethod;
  status: InquiryStatus;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  projectType: ProjectType;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  techStack: string[];
  metrics: string;
  image: string;
  features: string[];
  livePreviewUrl?: string;
}
