"use client";

import { Award, Trophy, Users } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Achievements() {
  const { achievements, leadership } = useSiteContent();
  return (
    <section id="achievements" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading
        index="05"
        subtitle="Awards, certifications & impact"
        title="Achievements & Leadership"
      />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Certifications & awards */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-fg">
            <Trophy size={20} className="text-neon-cyan" />
            Achievements & Certifications
          </h3>
          <div className="space-y-3">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="glass glass-hover cursor-interactive flex items-start gap-4 rounded-xl p-4">
                  <div className="mt-0.5 inline-flex rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-2 text-neon-cyan">
                    <Award size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-fg">{a.title}</h4>
                      <span className="shrink-0 font-mono text-xs text-neon-purple">
                        {a.year}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-fg-muted">{a.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-fg">
            <Users size={20} className="text-neon-purple" />
            Leadership & Community
          </h3>
          <div className="relative space-y-6 pl-6">
            <div className="absolute left-1.5 top-2 h-full w-px bg-gradient-to-b from-neon-purple to-transparent" />
            {leadership.map((l, i) => (
              <Reveal key={l.role} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full bg-neon-purple glow-purple" />
                  <span className="font-mono text-xs text-neon-cyan">{l.period}</span>
                  <h4 className="mt-1 font-semibold text-fg">{l.role}</h4>
                  <p className="mt-1 text-sm text-fg-muted">{l.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
