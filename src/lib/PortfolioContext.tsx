"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  profileData as seedProfile,
  skillsData as seedSkills,
  projectsData as seedProjects,
  upcomingProjectsData as seedUpcoming,
  educationData as seedEducation,
  certificationsData as seedCertifications,
  achievementsData as seedAchievements,
} from "./data";
import type {
  Project,
  UpcomingProject,
  Skill,
  Education,
  Certification,
  Achievement,
} from "./types";
import {
  getProfile,
  updateProfile,
  getSkills,
  setDocument,
  deleteDocument,
  getProjects,
  getUpcomingProjects,
  getCollection,
} from "./firestore";

export interface ProfileType {
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

interface PortfolioContextType {
  profile: ProfileType;
  skills: Skill[];
  projects: Project[];
  upcomingProjects: UpcomingProject[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  loading: boolean;
  updateProfileData: (data: Partial<ProfileType>) => Promise<void>;
  saveSkill: (skill: Skill) => Promise<void>;
  deleteSkillItem: (id: string) => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  deleteProjectItem: (id: string) => Promise<void>;
  saveUpcomingProject: (item: UpcomingProject) => Promise<void>;
  deleteUpcomingProjectItem: (id: string) => Promise<void>;
  saveEducationItem: (item: Education) => Promise<void>;
  deleteEducationItem: (id: string) => Promise<void>;
  saveCertificationItem: (item: Certification) => Promise<void>;
  deleteCertificationItem: (id: string) => Promise<void>;
  saveAchievementItem: (item: Achievement) => Promise<void>;
  deleteAchievementItem: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal(key: string, data: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore localstorage errors
  }
}

const isFirebaseReal =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "placeholder";

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>(() =>
    getLocal("portfolio_profile", seedProfile as ProfileType)
  );
  const [skills, setSkills] = useState<Skill[]>(() =>
    getLocal("portfolio_skills", seedSkills as Skill[])
  );
  const [projects, setProjects] = useState<Project[]>(() =>
    getLocal("portfolio_projects", seedProjects as Project[])
  );
  const [upcomingProjects, setUpcomingProjects] = useState<UpcomingProject[]>(() =>
    getLocal("portfolio_upcoming", seedUpcoming as UpcomingProject[])
  );
  const [education, setEducation] = useState<Education[]>(() =>
    getLocal("portfolio_education", seedEducation as Education[])
  );
  const [certifications, setCertifications] = useState<Certification[]>(() =>
    getLocal("portfolio_certifications", seedCertifications as Certification[])
  );
  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    getLocal("portfolio_achievements", seedAchievements as Achievement[])
  );
  const [loading, setLoading] = useState(false);

  // Sync from Firestore if available
  useEffect(() => {
    if (!isFirebaseReal) return;
    async function syncFromFirestore() {
      try {
        const p = await getProfile();
        if (p) setProfile((prev) => ({ ...prev, ...(p as ProfileType) }));

        const sk = await getSkills();
        if (sk && sk.length > 0) setSkills(sk as Skill[]);

        const pr = await getProjects();
        if (pr && pr.length > 0) setProjects(pr as Project[]);

        const up = await getUpcomingProjects();
        if (up && up.length > 0) setUpcomingProjects(up as UpcomingProject[]);

        const ed = await getCollection<Education>("education");
        if (ed && ed.length > 0) setEducation(ed);

        const ce = await getCollection<Certification>("certifications");
        if (ce && ce.length > 0) setCertifications(ce);

        const ac = await getCollection<Achievement>("achievements");
        if (ac && ac.length > 0) setAchievements(ac);
      } catch {
        // fallback silently
      }
    }
    syncFromFirestore();
  }, []);

  // Update Profile
  const updateProfileData = async (data: Partial<ProfileType>) => {
    const updated = { ...profile, ...data };
    setProfile(updated);
    setLocal("portfolio_profile", updated);
    if (isFirebaseReal) {
      await updateProfile(data);
    }
  };

  // Skill CRUD
  const saveSkill = async (skill: Skill) => {
    let updated: Skill[];
    const idx = skills.findIndex((s) => s.id === skill.id);
    if (idx >= 0) {
      updated = [...skills];
      updated[idx] = skill;
    } else {
      updated = [...skills, skill];
    }
    setSkills(updated);
    setLocal("portfolio_skills", updated);
    if (isFirebaseReal) {
      await setDocument("skills", skill.id, skill);
    }
  };

  const deleteSkillItem = async (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    setLocal("portfolio_skills", updated);
    if (isFirebaseReal) {
      await deleteDocument("skills", id);
    }
  };

  // Project CRUD
  const saveProject = async (project: Project) => {
    let updated: Project[];
    const idx = projects.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      updated = [...projects];
      updated[idx] = project;
    } else {
      updated = [...projects, project];
    }
    setProjects(updated);
    setLocal("portfolio_projects", updated);
    if (isFirebaseReal) {
      await setDocument("projects", project.id, project);
    }
  };

  const deleteProjectItem = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    setLocal("portfolio_projects", updated);
    if (isFirebaseReal) {
      await deleteDocument("projects", id);
    }
  };

  // Upcoming Projects CRUD
  const saveUpcomingProject = async (item: UpcomingProject) => {
    let updated: UpcomingProject[];
    const idx = upcomingProjects.findIndex((u) => u.id === item.id);
    if (idx >= 0) {
      updated = [...upcomingProjects];
      updated[idx] = item;
    } else {
      updated = [...upcomingProjects, item];
    }
    setUpcomingProjects(updated);
    setLocal("portfolio_upcoming", updated);
    if (isFirebaseReal) {
      await setDocument("upcomingProjects", item.id, item);
    }
  };

  const deleteUpcomingProjectItem = async (id: string) => {
    const updated = upcomingProjects.filter((u) => u.id !== id);
    setUpcomingProjects(updated);
    setLocal("portfolio_upcoming", updated);
    if (isFirebaseReal) {
      await deleteDocument("upcomingProjects", id);
    }
  };

  // Education CRUD
  const saveEducationItem = async (item: Education) => {
    let updated: Education[];
    const idx = education.findIndex((e) => e.id === item.id);
    if (idx >= 0) {
      updated = [...education];
      updated[idx] = item;
    } else {
      updated = [...education, item];
    }
    setEducation(updated);
    setLocal("portfolio_education", updated);
    if (isFirebaseReal) {
      await setDocument("education", item.id, item);
    }
  };

  const deleteEducationItem = async (id: string) => {
    const updated = education.filter((e) => e.id !== id);
    setEducation(updated);
    setLocal("portfolio_education", updated);
    if (isFirebaseReal) {
      await deleteDocument("education", id);
    }
  };

  // Certification CRUD
  const saveCertificationItem = async (item: Certification) => {
    let updated: Certification[];
    const idx = certifications.findIndex((c) => c.id === item.id);
    if (idx >= 0) {
      updated = [...certifications];
      updated[idx] = item;
    } else {
      updated = [...certifications, item];
    }
    setCertifications(updated);
    setLocal("portfolio_certifications", updated);
    if (isFirebaseReal) {
      await setDocument("certifications", item.id, item);
    }
  };

  const deleteCertificationItem = async (id: string) => {
    const updated = certifications.filter((c) => c.id !== id);
    setCertifications(updated);
    setLocal("portfolio_certifications", updated);
    if (isFirebaseReal) {
      await deleteDocument("certifications", id);
    }
  };

  // Achievement CRUD
  const saveAchievementItem = async (item: Achievement) => {
    let updated: Achievement[];
    const idx = achievements.findIndex((a) => a.id === item.id);
    if (idx >= 0) {
      updated = [...achievements];
      updated[idx] = item;
    } else {
      updated = [...achievements, item];
    }
    setAchievements(updated);
    setLocal("portfolio_achievements", updated);
    if (isFirebaseReal) {
      await setDocument("achievements", item.id, item);
    }
  };

  const deleteAchievementItem = async (id: string) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    setLocal("portfolio_achievements", updated);
    if (isFirebaseReal) {
      await deleteDocument("achievements", id);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
        upcomingProjects,
        education,
        certifications,
        achievements,
        loading,
        updateProfileData,
        saveSkill,
        deleteSkillItem,
        saveProject,
        deleteProjectItem,
        saveUpcomingProject,
        deleteUpcomingProjectItem,
        saveEducationItem,
        deleteEducationItem,
        saveCertificationItem,
        deleteCertificationItem,
        saveAchievementItem,
        deleteAchievementItem,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return ctx;
}
