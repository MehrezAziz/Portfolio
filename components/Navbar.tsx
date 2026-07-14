"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cvFiles } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import CvDownload from "./CvDownload";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <Link
            href="/profile"
            aria-label="About Ahmed Aziz Mehrez"
            className="cursor-interactive font-mono text-lg font-bold tracking-tight"
          >
            <span className="text-gradient animate-gradient-x">{"<AM/>"}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`cursor-interactive relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active === l.id
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:block">
              <CvDownload variant="nav" />
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="cursor-interactive text-fg md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        <motion.div
          className="absolute bottom-0 left-0 h-0.5 origin-left bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink"
          style={{ scaleX: progress, width: "100%" }}
        />
      </motion.header>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass fixed inset-x-0 top-[60px] z-40 mx-4 rounded-2xl p-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`w-full rounded-lg px-4 py-3 text-left text-base ${
                    active === l.id
                      ? "bg-overlay text-neon-cyan"
                      : "text-fg-muted"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-2">
              <p className="px-4 py-1 text-[11px] uppercase tracking-wider text-fg-subtle">
                Download CV
              </p>
              <div className="flex gap-2 px-2">
                {cvFiles.map((cv) => (
                  <a
                    key={cv.short}
                    href={cv.file}
                    download
                    onClick={() => setOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/5 px-3 py-2.5 text-sm font-medium text-neon-cyan"
                  >
                    <span className="text-base leading-none">{cv.flag}</span> {cv.short}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
}
