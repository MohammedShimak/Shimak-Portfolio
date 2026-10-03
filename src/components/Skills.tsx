"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio } from "@/lib/PortfolioContext";
import SectionHeader from "./SectionHeader";

const categoryConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Programming: {
    color: "text-indigo-700",
    bg: "bg-indigo-50 border-indigo-200",
    dot: "bg-indigo-500",
  },
  "Web Technologies": {
    color: "text-sky-700",
    bg: "bg-sky-50 border-sky-200",
    dot: "bg-sky-500",
  },
  Database: {
    color: "text-cyan-700",
    bg: "bg-cyan-50 border-cyan-200",
    dot: "bg-cyan-500",
  },
  "Core Concepts": {
    color: "text-violet-700",
    bg: "bg-violet-50 border-violet-200",
    dot: "bg-violet-500",
  },
  Tools: {
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
  },
  "AI / ML": {
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
    dot: "bg-purple-500",
  },
};

const levelWidth: Record<string, string> = {
  Beginner: "w-1/3",
  Intermediate: "w-2/3",
  Advanced: "w-5/6",
  Expert: "w-full",
};

const levelColor: Record<string, string> = {
  Beginner: "from-sky-400 to-cyan-500",
  Intermediate: "from-indigo-500 to-violet-500",
  Advanced: "from-violet-500 to-purple-600",
  Expert: "from-purple-600 to-fuchsia-600",
};

export default function Skills() {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const allCategories = ["All", ...categories];

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="section-padding-standard bg-slate-50/70 border-t border-b border-slate-200/60 relative overflow-hidden scroll-mt-24"
      aria-label="Skills section"
    >
      <div className="container-portfolio relative z-10">
        {/* Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="TECHNICAL SKILLS"
          title="What I Work With"
          subtitle="Skills developed through coursework, self-learning, and hands-on project development."
          className="mb-12 sm:mb-16"
        />

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 mb-12 sm:mb-16"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {allCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => {
              const cfg = categoryConfig[skill.category] || {
                color: "text-indigo-700",
                bg: "bg-indigo-50 border-indigo-200",
                dot: "bg-indigo-500",
              };
              const widthClass = levelWidth[skill.level] || "w-1/2";
              const barGradient =
                levelColor[skill.level] || "from-indigo-500 to-violet-500";

              return (
                <motion.div
                  key={skill.id || skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-display font-bold text-slate-900 text-base">
                        {skill.name}
                      </h3>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${cfg.bg} ${cfg.color} inline-flex items-center gap-1.5`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {skill.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
                      <span>Proficiency</span>
                      <span className="font-semibold text-slate-700">{skill.level}</span>
                    </div>
                  </div>

                  {/* Level bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${barGradient} rounded-full transition-all duration-500 ${widthClass}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
