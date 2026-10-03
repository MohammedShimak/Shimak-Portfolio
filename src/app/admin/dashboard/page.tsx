"use client";

import { useAuth } from "@/lib/AuthContext";
import {
  FolderKanban,
  Clock,
  Code2,
  BadgeCheck,
  Award,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import {
  projectsData,
  upcomingProjectsData,
  skillsData,
  certificationsData,
  achievementsData,
  educationData,
} from "@/lib/data";
import Link from "next/link";

const stats = [
  {
    label: "Completed Projects",
    value: projectsData.length,
    icon: FolderKanban,
    href: "/admin/dashboard/projects",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Upcoming Projects",
    value: upcomingProjectsData.length,
    icon: Clock,
    href: "/admin/dashboard/upcoming",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "Skills",
    value: skillsData.length,
    icon: Code2,
    href: "/admin/dashboard/skills",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Certifications",
    value: certificationsData.length,
    icon: BadgeCheck,
    href: "/admin/dashboard/certifications",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    label: "Achievements",
    value: achievementsData.length,
    icon: Award,
    href: "/admin/dashboard/achievements",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Education",
    value: educationData.length,
    icon: GraduationCap,
    href: "/admin/dashboard/education",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

const quickActions = [
  { label: "Edit Profile", href: "/admin/dashboard/profile" },
  { label: "Add Skill", href: "/admin/dashboard/skills" },
  { label: "Add Project", href: "/admin/dashboard/projects" },
  { label: "Add Certification", href: "/admin/dashboard/certifications" },
  { label: "Add Achievement", href: "/admin/dashboard/achievements" },
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div>
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-6 text-white mb-8"
        style={{ background: "var(--gradient-primary)" }}
      >
        <h2 className="font-display font-bold text-2xl mb-1">
          Welcome back! 👋
        </h2>
        <p className="text-white/75 text-sm">
          Logged in as <strong>{user?.email}</strong>. Manage your portfolio
          content from here.
        </p>
      </div>

      {/* Stats grid */}
      <h3 className="font-display font-bold text-slate-800 mb-4">
        Portfolio Overview
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, href, color, bg }) => (
          <Link
            key={label}
            href={href}
            className="stat-card hover:shadow-md transition-all flex flex-col gap-2 group"
            aria-label={`View ${label}`}
          >
            <div
              className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}
            >
              <Icon size={18} className={color} />
            </div>
            <span className="stat-value text-2xl">{value}</span>
            <span className="stat-label text-xs leading-tight">{label}</span>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h3 className="font-display font-bold text-slate-800 mb-4">
        Quick Actions
      </h3>
      <div className="flex flex-wrap gap-3">
        {quickActions.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-all shadow-sm"
          >
            {label}
            <ArrowRight size={13} />
          </Link>
        ))}
      </div>

      {/* Note */}
      <div className="mt-10 p-5 rounded-xl bg-amber-50 border border-amber-200">
        <p className="text-sm text-amber-800 font-medium">
          ⚙️ Firebase not connected yet?
        </p>
        <p className="text-sm text-amber-700 mt-1">
          Add your Firebase credentials to{" "}
          <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">
            .env.local
          </code>{" "}
          to enable live editing. Until then, the portfolio uses static seed
          data.
        </p>
      </div>
    </div>
  );
}
