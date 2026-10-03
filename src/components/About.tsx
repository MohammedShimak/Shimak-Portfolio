"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Star,
  BookOpen,
  Code2,
  Cpu,
  Sparkles,
} from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { profile } = usePortfolio();

  const infoCards = [
    {
      icon: GraduationCap,
      label: "Degree",
      value: profile.degree || "B.Tech – Information Technology",
      sub: `${profile.graduationYear ? `Class of ${profile.graduationYear}` : "2023 – 2027"}`,
      color: "text-indigo-600",
      bg: "bg-indigo-50/80 border-indigo-100",
    },
    {
      icon: Star,
      label: "CGPA",
      value: profile.cgpa ? `CGPA: ${profile.cgpa}` : "CGPA: 7.73",
      sub: "Academic Standing",
      color: "text-violet-600",
      bg: "bg-violet-50/80 border-violet-100",
    },
    {
      icon: BookOpen,
      label: "College",
      value: profile.college || "Velalar College of Engg. & Tech.",
      sub: "Erode, Tamil Nadu",
      color: "text-sky-600",
      bg: "bg-sky-50/80 border-sky-100",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location || "Erode, Tamil Nadu",
      sub: "India",
      color: "text-emerald-600",
      bg: "bg-emerald-50/80 border-emerald-100",
    },
  ];

  const interests = [
    { icon: Code2, label: "Software Engineering" },
    { icon: Cpu, label: "AI / Machine Learning" },
    { icon: BookOpen, label: "Database Systems" },
  ];

  return (
    <section
      id="about"
      className="section-padding-standard bg-white relative overflow-hidden scroll-mt-24"
      aria-label="About section"
    >
      <div className="container-portfolio relative z-10">
        {/* Header - PROPERLY CENTERED */}
        <SectionHeader
          eyebrow="ABOUT ME"
          title="Who I Am &"
          titleGradient="What Drives Me"
          subtitle="An Information Technology student passionate about building clean, efficient, and reliable software applications."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left — About text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {(profile.about || "").split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg font-medium text-slate-800 leading-snug"
                      : "text-base text-slate-600"
                  }
                >
                  {para.trim()}
                </p>
              ))}
            </div>

            {/* Interest tags */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Core Tech Focus
              </p>
              <div className="flex flex-wrap gap-2.5">
                {interests.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
                  >
                    <Icon size={14} className="text-indigo-600" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Info cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {infoCards.map(({ icon: Icon, label, value, sub, color, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-200 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl border ${bg} flex items-center justify-center mb-3`}
                >
                  <Icon size={18} className={color} />
                </div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                <p className="font-display font-bold text-slate-900 text-sm leading-tight mb-0.5">
                  {value}
                </p>
                <p className="text-xs text-slate-500 font-medium">{sub}</p>
              </motion.div>
            ))}

            {/* Refined Light Pastel Current Focus Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2 bg-gradient-to-br from-indigo-50/70 via-violet-50/40 to-white border border-indigo-100/90 rounded-2xl p-6 shadow-xs relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2 text-indigo-700">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Current Focus
                </span>
              </div>
              <p className="font-display font-bold text-slate-900 text-lg leading-snug">
                Building Software That Solves Real-World Problems
              </p>
              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                Strengthening core foundations in Java, SQL databases, and web architectures while exploring AI and machine learning integration.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
