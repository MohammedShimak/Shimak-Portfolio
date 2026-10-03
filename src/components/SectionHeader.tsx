"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  eyebrowVariant?: "primary" | "secondary" | "accent";
  title: React.ReactNode;
  titleGradient?: React.ReactNode;
  subtitle: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  eyebrowIcon,
  eyebrowVariant = "primary",
  title,
  titleGradient,
  subtitle,
  className = "mb-16 sm:mb-20 lg:mb-24",
}: SectionHeaderProps) {
  const badgeClass =
    eyebrowVariant === "accent"
      ? "badge-accent"
      : eyebrowVariant === "secondary"
      ? "badge-secondary"
      : "badge-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-3xl mx-auto flex flex-col items-center text-center ${className}`}
    >
      {/* 1. Small Section Label */}
      <div className="flex justify-center w-full mb-4">
        <span
          className={`badge ${badgeClass} px-3.5 py-1 text-xs tracking-widest uppercase inline-flex items-center gap-1.5`}
        >
          {eyebrowIcon}
          {eyebrow}
        </span>
      </div>

      {/* 2. Main Heading */}
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mt-1 w-full text-center">
        {title}{" "}
        {titleGradient && (
          <span className="gradient-text">{titleGradient}</span>
        )}
      </h2>

      {/* 3. Short Description */}
      <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-5 sm:mt-6 leading-relaxed w-full text-center">
        {subtitle}
      </p>
    </motion.div>
  );
}
