"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="cursor-interactive relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-overlay text-fg-muted transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
    >
      {mounted && (
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      )}
    </button>
  );
}
