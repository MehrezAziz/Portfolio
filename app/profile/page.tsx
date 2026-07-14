"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  GraduationCap,
  Globe,
  ArrowRight,
} from "lucide-react";
import { profile, education, languages, skillGroups } from "@/lib/data";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import ThemeToggle from "@/components/ThemeToggle";
import CvDownload from "@/components/CvDownload";

const details = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Github, label: "GitHub", value: "MehrezAziz", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", value: "aziz-mehrez", href: profile.linkedin },
];

export default function ProfilePage() {
  return (
    <>
      <ParticleBackground />
      <CustomCursor />

      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 glass py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5">
          <Link
            href="/"
            className="cursor-interactive inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-neon-cyan"
          >
            <ArrowLeft size={17} /> Back to portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-5 pb-24 pt-28">
        {/* Glow blobs */}
        <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-neon-cyan/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-neon-purple/15 blur-[120px]" />

        {/* Hero card */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-7 md:p-10"
        >
          <div className="flex flex-col items-center gap-7 text-center md:flex-row md:items-center md:text-left">
            {/* Photo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative shrink-0"
            >
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-neon-cyan via-neon-purple to-neon-pink opacity-80 blur-[2px]" />
              <div className="absolute -inset-1.5 animate-pulse-glow rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple opacity-40 blur-md" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.image}
                alt={profile.name}
                width={148}
                height={148}
                className="relative h-36 w-36 rounded-full border-2 border-white/20 object-cover md:h-40 md:w-40"
              />
            </motion.div>

            {/* Intro */}
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-overlay px-3 py-1 text-xs text-fg-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                {profile.availabilityText}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-gradient animate-gradient-x">{profile.name}</span>
              </h1>
              <p className="mt-2 font-mono text-sm text-neon-cyan sm:text-base">
                {profile.title}
              </p>
              <p className="mt-1 text-sm text-fg-subtle">{profile.subtitle}</p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a
                  href={`mailto:${profile.email}`}
                  className="cursor-interactive inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
                >
                  <Mail size={16} /> Contact Me
                </a>
                <CvDownload variant="nav" />
                {[
                  { icon: Github, url: profile.github, label: "GitHub" },
                  { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
                ].map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="cursor-interactive inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-overlay text-fg-muted transition-all hover:-translate-y-0.5 hover:text-neon-cyan"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Body grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* About + skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-3 font-mono text-sm text-neon-cyan">About me</h2>
              <p className="text-sm leading-relaxed text-fg-muted md:text-[15px]">
                {profile.bio}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted md:text-[15px]">
                {profile.bioShort}
              </p>
            </div>

            <div className="glass mt-6 rounded-2xl p-6">
              <h2 className="mb-4 font-mono text-sm text-neon-cyan">Core skills</h2>
              <div className="flex flex-wrap gap-2">
                {skillGroups.flatMap((g) => g.skills).slice(0, 22).map((s) => (
                  <span
                    key={s}
                    className="cursor-interactive rounded-lg border border-line bg-overlay px-2.5 py-1.5 text-xs font-medium text-fg transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details + education + languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-4 font-mono text-sm text-neon-cyan">Details</h2>
              <ul className="space-y-3">
                {details.map((d) => (
                  <li key={d.label} className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 text-neon-cyan">
                      <d.icon size={15} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] text-fg-subtle">{d.label}</div>
                      {d.href ? (
                        <a
                          href={d.href}
                          target={d.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="cursor-interactive truncate text-sm font-medium text-fg hover:text-neon-cyan"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <div className="truncate text-sm font-medium text-fg">{d.value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="mb-3 flex items-center gap-2 font-mono text-sm text-neon-cyan">
                <GraduationCap size={16} /> Education
              </h2>
              <p className="text-sm font-semibold text-fg">{education.degree}</p>
              <p className="mt-1 text-xs text-fg-muted">{education.school}</p>
              <p className="mt-1 text-xs text-neon-purple">{education.period}</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="mb-3 flex items-center gap-2 font-mono text-sm text-neon-cyan">
                <Globe size={16} /> Languages
              </h2>
              <ul className="space-y-1.5">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between text-sm">
                    <span className="text-fg">{l.name}</span>
                    <span className="text-fg-subtle">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/#projects"
            className="cursor-interactive inline-flex items-center gap-2 rounded-full border border-line bg-overlay px-6 py-3 font-semibold text-fg transition-all hover:border-neon-cyan/50 hover:bg-overlay-strong"
          >
            Explore my full portfolio <ArrowRight size={18} />
          </Link>
        </motion.div>
      </main>
    </>
  );
}
