"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Server, Brain } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const pillars = [
  { icon: Code2, title: "Full-Stack", desc: "React, Next.js, NestJS, Spring Boot & more across the whole stack." },
  { icon: Smartphone, title: "Mobile", desc: "React Native apps shipped to the Google Play Store." },
  { icon: Server, title: "DevOps", desc: "CI/CD with GitHub Actions, Bitrise & Docker." },
  { icon: Brain, title: "AI / ML", desc: "LLM assistants (Groq) & ML microservices for verification." },
];

export default function About() {
  const { profile, education, languages } = useSiteContent();
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading index="01" subtitle="Get to know me" title="About Me" />

      <div className="grid gap-12 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="space-y-5 text-base leading-relaxed text-fg-muted md:text-lg">
            <p>{profile.bio}</p>
            <p>{profile.bioShort}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-overlay p-6">
            <h3 className="font-mono text-sm text-neon-cyan">Education</h3>
            <p className="mt-2 font-semibold text-fg">{education.degree}</p>
            <p className="text-sm text-fg-muted">{education.school}</p>
            <p className="mt-1 text-sm text-neon-purple">{education.period}</p>
            <p className="mt-2 text-sm text-fg-subtle">{education.detail}</p>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-mono text-sm text-neon-cyan">Languages</h3>
            {languages.map((lang) => (
              <div key={lang.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-fg">{lang.name}</span>
                  <span className="text-fg-subtle">{lang.level}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-overlay">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="glass glass-hover cursor-interactive h-full rounded-2xl p-5">
                <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-3 text-neon-cyan">
                  <p.icon size={22} />
                </div>
                <h4 className="font-semibold text-fg">{p.title}</h4>
                <p className="mt-1 text-sm text-fg-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
