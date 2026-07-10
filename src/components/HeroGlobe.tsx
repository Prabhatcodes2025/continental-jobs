"use client";

import { motion, useReducedMotion } from "framer-motion";

const points = [
  ["India", "18%", "58%"],
  ["Dubai", "52%", "44%"],
  ["Europe", "42%", "27%"],
  ["Singapore", "69%", "63%"],
  ["Australia", "79%", "72%"],
  ["Nepal", "66%", "49%"]
];

export function HeroGlobe() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px] overflow-hidden rounded-full border border-gold/25 bg-[#081421] shadow-glow">
      <div className="absolute inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-12 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
      <motion.div
        className="absolute inset-0 opacity-80"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-[8%] top-[28%] h-[46%] w-[84%] rounded-[50%] border border-gold/25" />
        <div className="absolute left-[22%] top-[8%] h-[84%] w-[56%] rounded-[50%] border border-gold/20" />
        <div className="absolute left-[12%] top-[16%] h-[68%] w-[76%] rounded-[50%] border border-white/10 rotate-45" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_30%,rgba(217,164,65,0.32),transparent_28%),radial-gradient(circle_at_65%_62%,rgba(255,255,255,0.12),transparent_24%)]" />
      {points.map(([label, left, top], index) => (
        <motion.div
          key={label}
          className="absolute"
          style={{ left, top }}
          animate={reduceMotion ? undefined : { y: [0, -5, 0], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.2, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="block h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_rgba(217,164,65,0.9)]" />
          <span className="mt-1 block rounded-full bg-navy/70 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white backdrop-blur">
            {label}
          </span>
        </motion.div>
      ))}
      <div className="absolute bottom-8 left-1/2 w-max -translate-x-1/2 rounded-full border border-gold/30 bg-navy/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-gold backdrop-blur">
        Worldwide Recruitment Network
      </div>
    </div>
  );
}
