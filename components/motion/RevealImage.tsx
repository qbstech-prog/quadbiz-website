"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

import { MOTION, VIEWPORT } from "@/lib/motion";

/**
 * Cinematic image reveal. "wipe" = clip-path opens from the bottom (for
 * feature/hero-adjacent images); "scale" = subtle zoom-out + fade (for grid
 * tiles). The outer wrapper holds the final size so there is zero layout shift;
 * only clip-path / transform / opacity animate. Static under reduced motion.
 */
export default function RevealImage({
  children,
  variant = "scale",
  className,
}: {
  children: ReactNode;
  variant?: "wipe" | "scale";
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const hidden =
    variant === "wipe"
      ? { clipPath: "inset(100% 0 0 0)", opacity: 0 }
      : { scale: MOTION.imageScaleFrom, opacity: 0 };
  const visible =
    variant === "wipe"
      ? { clipPath: "inset(0% 0 0 0)", opacity: 1, transition: { ...MOTION.spring, opacity: { duration: 0.4 } } }
      : { scale: 1, opacity: 1, transition: MOTION.spring };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={VIEWPORT}
      style={{ willChange: "transform, clip-path, opacity" }}
    >
      {children}
    </motion.div>
  );
}
