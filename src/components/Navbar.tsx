"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/lib/PortfolioContext";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { profile } = usePortfolio();
  const linkedinUrl = profile.socialLinks?.linkedin || "https://www.linkedin.com/in/mohammed-shimak-a";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="container-portfolio">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#hero")}
              className="flex items-center gap-2 font-display font-bold text-lg text-slate-900 hover:text-indigo-600 transition-colors"
              aria-label="Mohammed Shimak A — back to top"
            >
              <span className="w-8 h-8 rounded-full overflow-hidden border border-indigo-200 relative bg-indigo-50 flex-shrink-0">
                <Image
                  src="/images/profile.png"
                  alt="Mohammed Shimak"
                  width={32}
                  height={32}
                  className="object-cover object-top w-full h-full"
                />
              </span>
              <span className="hidden sm:block">Shimak</span>
            </button>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-7"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`nav-link bg-transparent border-none p-0 cursor-pointer ${
                    activeSection === item.href.slice(1) ? "active" : ""
                  }`}
                  aria-current={
                    activeSection === item.href.slice(1) ? "page" : undefined
                  }
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5"
                aria-label="Let's Connect"
              >
                Let&apos;s Connect
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-all"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-lg lg:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="container-portfolio py-6">
              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all bg-transparent border-none cursor-pointer ${
                      activeSection === item.href.slice(1)
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Let&apos;s Connect
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
