"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const frames = 38;
    const id = window.setInterval(() => {
      frame += 1;
      setDisplay(Math.round((value * frame) / frames));
      if (frame >= frames) window.clearInterval(id);
    }, 24);

    return () => window.clearInterval(id);
  }, [inView, reduceMotion, value]);

  return (
    <motion.span ref={ref} initial={false}>
      {display}
      {suffix}
    </motion.span>
  );
}

