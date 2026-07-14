"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, ChevronDown, Check } from "lucide-react";
import { cvFiles } from "@/lib/data";

type Props = {
  /** "hero" = big gradient-outline button, "nav" = compact pill. */
  variant?: "hero" | "nav";
  className?: string;
};

export default function CvDownload({ variant = "nav", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const trigger =
    variant === "hero"
      ? "inline-flex items-center gap-2 rounded-full border border-neon-purple/40 bg-neon-purple/5 px-7 py-3 font-semibold text-neon-purple transition-all hover:bg-neon-purple/15 hover:glow-purple"
      : "inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/5 px-4 py-2 text-sm font-medium text-neon-cyan transition-all hover:bg-neon-cyan/15";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`cursor-interactive ${trigger}`}
      >
        <FileDown size={variant === "hero" ? 18 : 16} />
        {variant === "hero" ? "Download CV" : "CV"}
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className={`glass absolute z-50 mt-2 w-52 overflow-hidden rounded-xl p-1.5 shadow-xl ${
              variant === "hero" ? "left-1/2 -translate-x-1/2" : "right-0"
            }`}
          >
            <p className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-fg-subtle">
              Choose a language
            </p>
            {cvFiles.map((cv) => (
              <a
                key={cv.short}
                href={cv.file}
                download
                onClick={() => setOpen(false)}
                role="menuitem"
                className="cursor-interactive group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg transition-colors hover:bg-overlay-strong"
              >
                <span className="text-lg leading-none">{cv.flag}</span>
                <span className="flex-1 font-medium">{cv.lang}</span>
                <span className="rounded bg-overlay px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle group-hover:text-neon-cyan">
                  {cv.short} · PDF
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
