"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import SectionHeader from "./SectionHeader";

const achievementTypeColor: Record<string, string> = {
  Research: "bg-indigo-50 border-indigo-200 text-indigo-700",
  Competition: "bg-violet-50 border-violet-200 text-violet-700",
};

export default function Achievements() {
  const { certifications, achievements } = usePortfolio();

  return (
    <section
      id="achievements"
      className="section-padding-standard bg-slate-50/70 border-t border-b border-slate-200/60 relative overflow-hidden scroll-mt-24"
      aria-label="Certifications and achievements section"
    >
      <div className="container-portfolio relative z-10">
        {/* Certifications Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="CERTIFICATIONS"
          title="Learning &"
          titleGradient="Certifications"
          subtitle="Continuous learning through courses, technical workshops, and professional certifications."
          className="mb-14 sm:mb-18 lg:mb-20"
        />

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-28 sm:mb-32 lg:mb-36">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between"
              aria-label={`Certification: ${cert.name}`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <BadgeCheck size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-slate-900 text-sm leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium mb-1.5">
                    {cert.issuer}
                  </p>
                  {cert.year && (
                    <span className="badge badge-primary text-[11px]">
                      {cert.year}
                    </span>
                  )}
                </div>
              </div>
              {cert.url && (
                <div className="pt-4 mt-3 border-t border-slate-100">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    aria-label={`View certificate: ${cert.name}`}
                  >
                    <ExternalLink size={13} />
                    View Certificate
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Achievements Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="ACHIEVEMENTS"
          eyebrowVariant="accent"
          title="Milestones &"
          titleGradient="Recognitions"
          subtitle="Academic and technical achievements that mark my growth as a developer."
          className="mb-14 sm:mb-18 lg:mb-20"
        />

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:border-indigo-200 transition-all"
              aria-label={`Achievement: ${achievement.title}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                  <Award size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-slate-900 text-base leading-snug">
                      {achievement.title}
                    </h3>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border ${
                        achievementTypeColor[achievement.type] ||
                        "bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      {achievement.type}
                    </span>
                  </div>
                  <p className="text-indigo-600 text-xs font-semibold mb-2">
                    {achievement.event} {achievement.year && `· ${achievement.year}`}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
