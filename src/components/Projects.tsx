"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { Project } from "@/lib/types";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const { projects } = usePortfolio();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="section-padding-standard bg-white relative overflow-hidden scroll-mt-24"
      aria-label="Projects section"
    >
      <div className="container-portfolio relative z-10">
        {/* Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="COMPLETED PROJECTS"
          title="What I've"
          titleGradient="Built"
          subtitle="Real projects built to solve real problems — each one a learning milestone."
        />

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card-strong overflow-hidden card-hover flex flex-col"
              aria-label={`Project: ${project.name}`}
            >
              {/* Card top gradient bar */}
              <div
                className="h-1 w-full"
                style={{ background: "var(--gradient-primary)" }}
                aria-hidden="true"
              />

              <div className="p-7 flex flex-col h-full">
                {/* Status + Category */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge badge-completed">
                    ✓ Completed
                  </span>
                  <span className="badge badge-primary">{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3 leading-tight">
                  {project.name}
                </h3>

                {/* Short description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">
                  {project.shortDesc}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="badge badge-tech">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelected(project)}
                    className="btn-primary text-sm py-2.5 px-5"
                    id={`project-details-${project.id}`}
                    aria-label={`View details for ${project.name}`}
                  >
                    View Details
                    <ChevronRight size={15} />
                  </button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm py-2.5"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <GithubIcon size={15} />
                      GitHub
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost text-sm py-2.5"
                      aria-label={`View live demo for ${project.name}`}
                    >
                      <ExternalLink size={15} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${selected.name}`}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="p-6 border-b border-slate-100"
                style={{ background: "var(--gradient-hero)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex gap-2 mb-3">
                      <span className="badge badge-completed">✓ Completed</span>
                      <span className="badge badge-primary">
                        {selected.category}
                      </span>
                    </div>
                    <h2 className="font-display font-bold text-2xl text-slate-900">
                      {selected.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                    aria-label="Close project details"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide">
                    Overview
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {selected.description}
                  </p>
                </div>

                {/* Problem */}
                {selected.problem && (
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide">
                      Problem Solved
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {selected.problem}
                    </p>
                  </div>
                )}

                {/* Features */}
                {selected.features && selected.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selected.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-slate-600 text-sm"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-indigo-500 mt-0.5 flex-shrink-0"
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span key={tech} className="badge badge-primary text-xs py-1.5 px-3">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-sm"
                    >
                      <GithubIcon size={15} />
                      View on GitHub
                    </a>
                  )}
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      <ExternalLink size={15} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
