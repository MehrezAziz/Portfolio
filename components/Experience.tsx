"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { experiences } = useSiteContent();
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading index="02" subtitle="Where I've worked" title="Experience" />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent md:left-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${
                  left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                {/* Dot */}
                <span
                  className={`absolute top-1.5 left-2.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-neon-cyan glow-cyan md:left-auto ${
                    left ? "md:-right-2" : "md:-left-2"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-bg" />
                </span>

                <div className="glass glass-hover cursor-interactive rounded-2xl p-6">
                  <div className={`mb-2 flex items-center gap-2 ${left ? "md:justify-end" : ""}`}>
                    <Briefcase size={15} className="text-neon-purple" />
                    <span className="font-mono text-xs text-neon-cyan">{exp.period}</span>
                    <span className="rounded-full bg-neon-purple/15 px-2 py-0.5 text-[10px] font-medium text-neon-purple">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-fg">{exp.role}</h3>
                  <p className="mb-3 text-sm text-fg-muted">{exp.company}</p>

                  <ul className={`space-y-2 text-sm text-fg-muted ${left ? "md:text-right" : ""}`}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-4 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-overlay px-2 py-1 font-mono text-[11px] text-fg-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {exp.links && (
                    <div className={`mt-4 flex flex-wrap gap-3 ${left ? "md:justify-end" : ""}`}>
                      {exp.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-interactive inline-flex items-center gap-1 text-xs font-medium text-neon-cyan hover:underline"
                        >
                          {link.label} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
