"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, Folder } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
    );
  };

  const reset = () => setTransform("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ transform, transition: "transform 0.15s ease-out" }}
        className="cursor-interactive group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card"
      >
        {/* glow on hover */}
        <div className="pointer-events-none absolute -inset-px z-0 rounded-2xl bg-gradient-to-br from-neon-cyan/0 to-neon-purple/0 opacity-0 transition-opacity duration-300 group-hover:from-neon-cyan/10 group-hover:to-neon-purple/10 group-hover:opacity-100" />

        {/* Banner */}
        <div className={`relative z-10 h-32 w-full overflow-hidden bg-gradient-to-br ${project.accent}`}>
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="absolute -right-4 -top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono text-5xl font-black tracking-tighter text-white/90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                {project.monogram}
              </span>
              <Folder
                size={26}
                className="absolute right-5 top-5 text-white/80"
                strokeWidth={2.2}
              />
            </>
          )}
          {project.featured && (
            <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
              <Star size={10} /> Featured
            </span>
          )}
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <span className="mb-2 font-mono text-[11px] uppercase tracking-wider text-neon-cyan/80">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-fg transition-colors group-hover:text-neon-cyan">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-fg-muted">{project.tagline}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-overlay px-2 py-1 font-mono text-[11px] text-fg-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {project.links && (
            <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-interactive inline-flex items-center gap-1.5 text-sm font-medium text-neon-cyan hover:underline"
                >
                  {link.label} <ExternalLink size={13} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading index="03" subtitle="Things I've built" title="Featured Projects" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <h3 className="mb-6 mt-16 text-center font-mono text-sm text-fg-muted">
        Other noteworthy projects
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {others.map((p, i) => (
          <TiltCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
