"use client";

import { motion } from "framer-motion";
import { skillGroups, marqueeSkills } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading index="04" subtitle="My toolbox" title="Skills & Tech Stack" />
      </div>

      {/* Marquee */}
      <div className="relative mb-16 flex overflow-hidden border-y border-line py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-mono text-lg font-semibold text-fg-subtle transition-colors hover:text-neon-cyan"
            >
              {s}
              <span className="ml-8 text-neon-purple/40">/</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={(i % 4) * 0.08}>
              <div className="glass glass-hover cursor-interactive h-full rounded-2xl p-5">
                <h3 className="mb-4 flex items-center gap-2 font-mono text-sm text-neon-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-purple" />
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="cursor-interactive rounded-lg border border-line bg-overlay px-2.5 py-1.5 text-xs font-medium text-fg transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
