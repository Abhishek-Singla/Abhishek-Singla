export interface SocialLinks {
  linkedin: string;
  email: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Metric {
  label: string;
  value: string;
  detail: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  timeline: string;
  category: "fintech" | "core-pm" | "growth" | "all";
  metrics: Metric[];
  bullets: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  timeline: string;
  bullets?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  subtitle: string;
  bioSummary: string;
  aboutMarkdown: string;
  socials: SocialLinks;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillGroup[];
  hasCustomized?: boolean;
}

export interface TeardownSlide {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  points: {
    title: string;
    description: string;
    badge?: string;
  }[];
  insight: string;
}
