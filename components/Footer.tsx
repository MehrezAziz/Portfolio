"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <span className="text-gradient animate-gradient-x font-mono text-lg font-bold">
            {"<AM/>"}
          </span>
          <p className="mt-1 text-sm text-fg-subtle">
            Designed & built by {profile.name}.
          </p>
          <p className="text-xs text-fg-subtle">
            Next.js · TypeScript · Tailwind · Framer Motion
          </p>
        </div>

        <div className="flex items-center gap-5">
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
              <Icon size={20} />
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="cursor-interactive inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-overlay text-fg-muted transition-all hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-fg-subtle">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  );
}
