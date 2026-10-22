export type LetterTone = 'gracious' | 'direct' | 'heartfelt' | 'micdrop';

export interface AuthorProfile {
  id: string;
  fullName: string;
  role: string;
  company: string;
  department: string;
  managerName: string;
  managerRole: string;
  startDate: string;
  submissionDate: string;
  lastWorkingDay: string;
  noticePeriodDays: number;
  location: string;
  avatarUrl: string;
  nextChapterHeadline: string;
  nextChapterBio: string;
  contactEmail: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
  signatureText?: string;
  hasDrawnSignature?: boolean;
}

export interface MetricStat {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  role: string;
  imageUrl?: string;
  metric: string;
  metricContext: string;
  summary: string;
  detailedDescription: string;
  technologies: string[];
  handoffOwner: string;
  handoffDocLink: string;
  impactBullets: string[];
}

export interface HandoffTask {
  id: string;
  title: string;
  category: 'Core Systems' | 'Documentation' | 'Access & Keys' | 'Ongoing Initiatives';
  assignee: string;
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Ready for Review';
  dueDate: string;
  notes: string;
  resourceLink?: string;
}

export interface RunbookFAQ {
  id: string;
  question: string;
  answer: string;
  emergencyContact: string;
}

export interface ColleagueTribute {
  id: string;
  recipientName: string;
  recipientRole: string;
  message: string;
  tag: string;
}

export interface GuestbookNote {
  id: string;
  authorName: string;
  roleOrTeam: string;
  message: string;
  timestamp: string;
  emoji: string;
}
