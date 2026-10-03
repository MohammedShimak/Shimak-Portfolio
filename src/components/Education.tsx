"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2 } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import SectionHeader from "./SectionHeader";

export default function Education() {
  const { education } = usePortfolio();

  return (
    <section
      id="education"
      className="section-padding-standard bg-white relative overflow-hidden scroll-mt-24"
      aria-label="Education section"
    >
      <div className="container-portfolio relative z-10">
        {/* Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="EDUCATION"
          title="Academic"
          titleGradient="Background"
          subtitle="Building a strong technical foundation through formal education."
        />

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative pl-12">
          {/* Timeline line */}
          <div className="timeline-line" aria-hidden="true" />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className="timeline-dot absolute -left-12"
                  aria-hidden="true"
                >
                  {edu.type === "University" ? (
                    <GraduationCap size={18} />
                  ) : (
                    <Building2 size={18} />
                  )}
                </div>

                {/* Card */}
                <div className="glass-card-strong p-6 ml-4">
                  {/* Current badge */}
                  {edu.current && (
                    <span className="badge badge-primary mb-3 inline-flex">
                      Currently Studying
                    </span>
                  )}

                  {/* Period */}
                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">
                    {edu.period}
                  </p>

                  {/* Degree */}
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-1 leading-tight">
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <p className="text-slate-600 font-medium mb-1">
                    {edu.institution}
                  </p>

                  {/* Location */}
                  <p className="text-slate-400 text-sm mb-3">{edu.location}</p>

                  {/* Grade */}
                  {edu.grade && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <span className="text-indigo-600 text-sm font-bold">
                        {edu.grade}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
