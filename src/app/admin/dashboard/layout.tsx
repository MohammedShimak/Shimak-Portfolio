"use client";

import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  User,
  Code2,
  FolderKanban,
  Clock,
  GraduationCap,
  Award,
  BadgeCheck,
  Link2,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/admin/dashboard/profile", icon: User },
  { label: "Skills", href: "/admin/dashboard/skills", icon: Code2 },
  { label: "Projects", href: "/admin/dashboard/projects", icon: FolderKanban },
  { label: "Upcoming", href: "/admin/dashboard/upcoming", icon: Clock },
  { label: "Education", href: "/admin/dashboard/education", icon: GraduationCap },
  { label: "Certifications", href: "/admin/dashboard/certifications", icon: BadgeCheck },
  { label: "Achievements", href: "/admin/dashboard/achievements", icon: Award },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div
          className="w-8 h-8 rounded-full border-2 border-transparent border-t-indigo-600 animate-spin"
          aria-label="Loading…"
        />
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin sidebar navigation"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 relative bg-white/10 flex-shrink-0">
              <Image
                src="/images/profile.png"
                alt="Mohammed Shimak"
                width={36}
                height={36}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div>
              <p className="text-white font-display font-bold text-sm leading-tight">
                Mohammed Shimak
              </p>
              <p className="text-indigo-300 text-xs">Portfolio Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10"
            title="Collapse Sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin navigation">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`admin-nav-item ${pathname === href ? "active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon size={17} />
              <span>{label}</span>
              {pathname === href && (
                <ChevronRight size={14} className="ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="admin-nav-item"
            aria-label="View public portfolio"
          >
            <Link2 size={17} />
            <span>View Portfolio</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="admin-nav-item text-red-300 hover:text-red-200 hover:bg-red-500/20"
            id="admin-signout-btn"
            aria-label="Sign out of admin dashboard"
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 w-full ${
          sidebarOpen ? "lg:pl-64" : "pl-0"
        }`}
        style={{ paddingLeft: sidebarOpen ? "16rem" : "0rem" }}
      >
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-2 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
              aria-label="Toggle sidebar"
              id="toggle-sidebar-btn"
            >
              {sidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
              <span>{sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <h1 className="font-display font-bold text-slate-800 text-base sm:text-lg tracking-tight">
              {navItems.find((item) => item.href === pathname)?.label || "Portfolio Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-800">
                {user.email}
              </p>
              <p className="text-[11px] text-slate-400">Administrator</p>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs"
              style={{ background: "var(--gradient-primary)" }}
            >
              A
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

