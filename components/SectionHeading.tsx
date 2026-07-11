"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-3 font-mono text-sm text-neon-cyan"
      >
        <span className="text-neon-purple">{index}.</span> {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "5rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-4 h-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
      />
    </div>
  );
}
