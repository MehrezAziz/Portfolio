"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import Counter from "./Counter";
import CvDownload from "./CvDownload";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const { profile, stats } = useSiteContent();
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24"
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-neon-cyan/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-neon-purple/20 blur-[120px]" />
      <div className="grid-bg noise-mask pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-overlay px-4 py-1.5 text-sm text-fg-muted"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          {profile.availabilityText}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 font-mono text-neon-cyan"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient animate-gradient-x">{profile.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex min-h-[2.5rem] items-center justify-center text-xl font-medium text-fg sm:text-2xl md:text-3xl"
        >
          <span className="font-mono">{typed}</span>
          <span className="ml-1 inline-block h-6 w-[3px] animate-blink bg-neon-purple sm:h-7 md:h-8" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg"
        >
          {profile.bioShort}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-fg-subtle"
        >
          <MapPin size={15} className="text-neon-purple" />
          {profile.location}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-interactive group relative overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-7 py-3 font-semibold text-black transition-transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="cursor-interactive rounded-full border border-line bg-overlay px-7 py-3 font-semibold text-fg transition-all hover:border-neon-cyan/50 hover:bg-overlay-strong"
          >
            Get in Touch
          </a>
          <CvDownload variant="hero" />
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, url: profile.github, label: "GitHub" },
            { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
            { icon: Mail, url: `mailto:${profile.email}`, label: "Email" },
          ].map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="cursor-interactive text-fg-muted transition-all hover:-translate-y-1 hover:text-neon-cyan"
            >
              <Icon size={22} />
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass glass-hover cursor-interactive rounded-2xl p-4"
            >
              <div className="text-2xl font-bold text-fg sm:text-3xl">
                {s.prefix}
                <Counter to={s.value} />
                {s.suffix}
              </div>
              <div className="mt-1 text-xs text-fg-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="cursor-interactive absolute bottom-8 left-1/2 -translate-x-1/2 text-fg-subtle hover:text-neon-cyan"
        aria-label="Scroll down"
      >
        <ArrowDown size={26} />
      </motion.a>
    </section>
  );
}
