"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./SocialIcons";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-200/80 py-12 sm:py-16 bg-white relative z-10"
      role="contentinfo"
    >
      <div className="container-portfolio">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-200 relative bg-indigo-50 flex-shrink-0">
              <Image
                src={profile.photo || "/images/profile.png"}
                alt={profile.name}
                width={32}
                height={32}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <span className="font-display font-bold text-slate-800 text-base">
              {profile.name}
            </span>
          </div>

          {/* Copyright */}
          <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1 font-medium">
            &copy; {year} {profile.name}. Built with{" "}
            <Heart
              size={12}
              className="text-red-500 fill-red-500 mx-0.5"
              aria-hidden="true"
            />{" "}
          </p>

          {/* Socials */}
          <div className="flex gap-2.5">
            <a
              href={profile.socialLinks?.github || "https://github.com/shimak"}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profile.socialLinks?.linkedin || "https://www.linkedin.com/in/mohammed-shimak-a"}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.socialLinks?.leetcode || "https://leetcode.com/shimak"}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LeetCode profile"
            >
              <LeetcodeIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
