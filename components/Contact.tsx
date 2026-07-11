"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";

export default function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: "aziz-mehrez", href: profile.linkedin },
    { icon: Github, label: "GitHub", value: "MehrezAziz", href: profile.github },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
      <SectionHeading index="06" subtitle="Let's build together" title="Get In Touch" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-line bg-card p-8 md:p-12"
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-neon-cyan/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-neon-purple/15 blur-[100px]" />

        <div className="relative z-10">
          <p className="mx-auto max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
            I&apos;m currently{" "}
            <span className="font-semibold text-neon-cyan">open to new opportunities</span> —
            full-stack, mobile, or DevOps roles. Whether you have a question, a role in mind,
            or just want to connect, my inbox is always open.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs uppercase tracking-widest text-fg-subtle">
              or reach me directly
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="cursor-interactive group flex items-center gap-4 rounded-xl border border-line bg-overlay p-4 text-left transition-all hover:border-neon-cyan/40 hover:bg-overlay-strong"
              >
                <div className="inline-flex rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-3 text-neon-cyan">
                  <item.icon size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-fg-subtle">{item.label}</div>
                  <div className="truncate font-medium text-fg group-hover:text-neon-cyan">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-1.5 text-sm text-fg-subtle">
            <MapPin size={15} className="text-neon-purple" /> {profile.location}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
