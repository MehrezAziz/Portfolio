"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    let raf = 0;

    const isLight = () => document.documentElement.classList.contains("light");
    let dotColor = isLight() ? "rgba(14, 116, 144, 0.55)" : "rgba(34, 211, 238, 0.7)";
    let lineRGB = () => (isLight() ? "22, 78, 99" : "168, 85, 247");
    const onThemeChange = () => {
      dotColor = isLight() ? "rgba(14, 116, 144, 0.55)" : "rgba(34, 211, 238, 0.7)";
    };
    window.addEventListener("themechange", onThemeChange);

    const density = window.innerWidth < 768 ? 42 : 90;

    const init = () => {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.6,
      }));
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // subtle attraction to mouse
        const dxm = mouse.current.x - p.x;
        const dym = mouse.current.y - p.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 140) {
          p.x += dxm * 0.0016;
          p.y += dym * 0.0016;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${lineRGB()}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    init();
    if (prefersReduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("themechange", onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
