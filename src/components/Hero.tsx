"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Download, ArrowRight, MapPin, GraduationCap, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./SocialIcons";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function Hero() {
  const { profile } = usePortfolio();

  const socialLinks = [
    { icon: GithubIcon, href: profile.socialLinks?.github || "https://github.com/shimak", label: "GitHub" },
    { icon: LinkedinIcon, href: profile.socialLinks?.linkedin || "https://www.linkedin.com/in/mohammed-shimak-a", label: "LinkedIn" },
    { icon: LeetcodeIcon, href: profile.socialLinks?.leetcode || "https://leetcode.com/shimak", label: "LeetCode" },
  ];

  const firstName = profile.name ? profile.name.split(" ")[0] : "Mohammed";
  const restName = profile.name ? profile.name.split(" ").slice(1).join(" ") : "Shimak A";

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center overflow-hidden py-20 sm:py-28 lg:py-32 scroll-mt-24"
      style={{ background: "var(--gradient-hero)" }}
      aria-label="Hero section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-violet-200/20 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-portfolio relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Text content */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 text-left">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold tracking-wide"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              OPEN TO OPPORTUNITIES
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-slate-900 break-words"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text block sm:inline">
                {firstName}
              </span>{" "}
              <span className="text-slate-900">{restName}</span>
            </motion.h1>

            {/* Role Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              <span className="badge badge-primary text-xs py-1 px-3">IT Student</span>
              <span className="badge badge-secondary text-xs py-1 px-3">Aspiring Developer</span>
              <span className="badge badge-accent text-xs py-1 px-3">AI/ML Enthusiast</span>
            </motion.div>

            {/* Tagline / Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed break-words"
            >
              {profile.tagline || "Building meaningful software — one project at a time."}{" "}
              Studying{" "}
              <span className="font-semibold text-indigo-600">
                {profile.degree || "Information Technology"}
              </span>{" "}
              at {profile.college || "Velalar College of Engineering & Technology"}.
            </motion.p>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-500"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-indigo-500 flex-shrink-0" />
                <span>{profile.location || "Erode, Tamil Nadu"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={15} className="text-indigo-500 flex-shrink-0" />
                <span>{profile.degree ? profile.degree.split("–")[0] : "B.Tech IT"} · {profile.graduationYear ? `2023–${profile.graduationYear}` : "2023–2027"}</span>
              </span>
              {profile.cgpa && (
                <span className="inline-flex items-center gap-1.5 text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  <Sparkles size={13} className="text-indigo-500 flex-shrink-0" />
                  <span>CGPA: {profile.cgpa}</span>
                </span>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
                id="hero-view-projects"
              >
                <span>View My Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={profile.resumeUrl || "/resume/Mohammed_Shimak_A_Resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                id="hero-download-resume"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-3 flex items-center gap-3"
            >
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Find me on
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Profile visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex flex-col items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative flex flex-col items-center">
              {/* Photo Avatar */}
              <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl relative bg-slate-100 flex-shrink-0">
                <Image
                  src={profile.photo || "/images/profile.png"}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 640px) 240px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Clean Highlight Badges in Flow */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{profile.degree ? profile.degree.split("–")[0] : "B.Tech IT"} · CGPA {profile.cgpa || "7.73"}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
                  <Code2 size={13} className="text-indigo-500" />
                  <span>Java · Python · SQL</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
