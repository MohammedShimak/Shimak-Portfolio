"use client";

import { motion } from "framer-motion";
import { Clock, Cpu, Database, Wallet } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import SectionHeader from "./SectionHeader";

const categoryIcon: Record<string, React.ReactNode> = {
  "AI / Computer Vision": <Cpu size={20} />,
  "Data / AI": <Database size={20} />,
  "AI / FinTech": <Wallet size={20} />,
};

const categoryColor: Record<string, string> = {
  "AI / Computer Vision": "text-violet-600 bg-violet-50 border-violet-200",
  "Data / AI": "text-sky-600 bg-sky-50 border-sky-200",
  "AI / FinTech": "text-emerald-600 bg-emerald-50 border-emerald-200",
};

export default function UpcomingProjects() {
  const { upcomingProjects } = usePortfolio();

  return (
    <section
      id="upcoming"
      className="section-padding-standard bg-indigo-50/25 border-t-2 border-dashed border-indigo-100/80 relative overflow-hidden scroll-mt-24"
      aria-label="Upcoming projects section"
    >
      <div className="container-portfolio relative z-10">
        {/* Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="UPCOMING PROJECTS"
          eyebrowIcon={<Clock size={12} />}
          eyebrowVariant="accent"
          title="What's"
          titleGradient="Coming Next"
          subtitle="Projects currently in the idea & planning phase — building toward more complex AI-driven solutions."
        />

        {/* Upcoming projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {upcomingProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white p-6 card-hover"
              aria-label={`Upcoming project: ${project.name}`}
            >
              {/* Coming soon ribbon */}
              <div className="absolute top-4 right-4">
                <span className="badge badge-coming-soon">
                  Coming Soon
                </span>
              </div>

              {/* Category icon */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${
                  categoryColor[project.category] ??
                  "text-indigo-600 bg-indigo-50 border-indigo-200"
                }`}
              >
                {categoryIcon[project.category] ?? <Cpu size={20} />}
              </div>

              {/* Category label */}
              <p
                className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  (categoryColor[project.category] ?? "text-indigo-600")
                    .split(" ")[0]
                }`}
              >
                {project.category}
              </p>

              {/* Title */}
              <h3 className="font-display font-bold text-xl text-slate-900 mb-3 leading-tight">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                {project.shortDesc}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="badge badge-tech opacity-70">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">
                  In planning phase
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Disclaimer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-400 mt-8"
        >
          These projects are in the planning stage. Technical details and
          implementation are not yet finalized.
        </motion.p>
      </div>
    </section>
  );
}
