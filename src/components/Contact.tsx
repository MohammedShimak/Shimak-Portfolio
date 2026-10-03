"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Sparkles, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./SocialIcons";
import { usePortfolio } from "@/lib/PortfolioContext";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const { profile } = usePortfolio();

  const profiles = [
    {
      platform: "GitHub",
      icon: GithubIcon,
      url: profile.socialLinks?.github || "https://github.com/shimak",
      handle: "@shimak",
      description: "Source code, projects & repositories",
      badgeBg: "bg-slate-100 text-slate-700",
      accentBorder: "border-slate-200 hover:border-indigo-300",
      bgHover: "hover:bg-slate-50/80",
    },
    {
      platform: "LinkedIn",
      icon: LinkedinIcon,
      url: profile.socialLinks?.linkedin || "https://www.linkedin.com/in/mohammed-shimak-a",
      handle: profile.name,
      description: "Professional profile & career updates",
      badgeBg: "bg-blue-50 text-blue-700",
      accentBorder: "border-blue-100 hover:border-blue-300",
      bgHover: "hover:bg-blue-50/40",
    },
    {
      platform: "LeetCode",
      icon: LeetcodeIcon,
      url: profile.socialLinks?.leetcode || "https://leetcode.com/shimak",
      handle: "@shimak",
      description: "Algorithms & data structures practice",
      badgeBg: "bg-amber-50 text-amber-700",
      accentBorder: "border-amber-100 hover:border-amber-300",
      bgHover: "hover:bg-amber-50/40",
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding-cta bg-gradient-to-b from-slate-50/80 via-indigo-50/30 to-white relative overflow-hidden border-t-2 border-dashed border-indigo-100/90 scroll-mt-24"
      aria-label="Contact section"
    >
      <div className="container-portfolio relative z-10">
        {/* Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="LET'S CONNECT"
          title="Have an Opportunity or Want to"
          titleGradient="Connect?"
          subtitle="I'm open to software development internships, AI/ML collaborations, and technical discussions."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left — Refined Light Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between w-full h-full">
              <div>
                {/* Header Block */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="text-left">
                    <h3 className="font-display font-bold text-xl text-slate-900">
                      Let&apos;s Connect
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                      Direct contact &amp; current status
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                </div>

                {/* Info Items List */}
                <div className="py-6 space-y-5">
                  {/* Email Address */}
                  <div className="flex items-start gap-3.5 text-left">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        EMAIL ADDRESS
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-semibold text-indigo-600 hover:text-indigo-700 text-sm sm:text-base break-all transition-colors block"
                        id="contact-email"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5 text-left">
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                      <MapPin size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        LOCATION
                      </p>
                      <p className="font-semibold text-slate-800 text-sm sm:text-base">
                        {profile.location}
                      </p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-start gap-3.5 text-left">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                      <Sparkles size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        AVAILABILITY
                      </p>
                      <div className="inline-flex items-center gap-2 mt-0.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold text-slate-800 text-sm sm:text-base">
                          Open to Opportunities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Email Button */}
              <div className="pt-5 border-t border-slate-100">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-xs hover:shadow-sm transition-all duration-200"
                  id="contact-send-email"
                >
                  <Send size={15} />
                  <span>Send an Email</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Compact Social Link Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-4"
          >
            {profiles.map(({ platform, icon: Icon, url, handle, description, badgeBg, accentBorder, bgHover }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white border ${accentBorder} ${bgHover} rounded-2xl p-5 shadow-xs transition-all duration-200 flex items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-slate-900 text-base">
                        {platform}
                      </h4>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${badgeBg}`}>
                        {handle}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 group-hover:text-indigo-600 border border-slate-200 group-hover:border-indigo-200 flex items-center justify-center text-slate-400 transition-all flex-shrink-0">
                  <ArrowUpRight size={15} />
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
