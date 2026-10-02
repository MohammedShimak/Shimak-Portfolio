// TypeScript types for portfolio data

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  about: string;
  email: string;
  location: string;
  cgpa: string;
  college: string;
  degree: string;
  graduationYear: string;
  photo: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Project {
  id: string;
  name: string;
  category: string;
  status: "Completed" | "In Progress";
  shortDesc: string;
  description: string;
  problem: string;
  features: string[];
  technologies: string[];
  github: string;
  demo: string;
  image: string;
}

export interface UpcomingProject {
  id: string;
  name: string;
  category: string;
  status: string;
  shortDesc: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  period: string;
  grade: string;
  type: string;
  current: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer: string;
  year: string;
  description: string;
  type: string;
}
