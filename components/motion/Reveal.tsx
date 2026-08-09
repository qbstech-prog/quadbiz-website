"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

import { MOTION, VIEWPORT } from "@/lib/motion";
import { useIsMobile } from "@/lib/useIsMobile";

type Kind = "fadeUp" | "blur" | "drift-left" | "drift-right" | "confident";

interface RevealProps {
  children: ReactNode;
  /** Motion feel. "blur" = heading focus-in; "drift-*" = alternating side drift. */
  kind?: Kind;
  /** Rendered element (maps to the matching motion.<tag>). */
  as?: "div" | "section" | "li" | "ul" | "span";
  className?: string;
  /** Extra delay (seconds) — e.g. for a light manual stagger. */
  delay?: number;
}

/**
 * Single spring-based scroll reveal. Fires once, slightly before fully in view.
 * Fully static under prefers-reduced-motion. Horizontal drift collapses to
 * fade-up on mobile to avoid horizontal scroll.
 */
export default function Reveal({
  children,
  kind = "fadeUp",
  as = "div",
  className,
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const y = isMobile ? MOTION.travelMobile : MOTION.travelDesktop;
  const transition = { ...(kind === "confident" ? MOTION.springConfident : MOTION.spring), delay };

  let hidden: Variants["hidden"] = { opacity: 0, y };
  if (kind === "blur") hidden = { opacity: 0, y, filter: `blur(${MOTION.blur}px)` };
  if (kind === "drift-left") hidden = isMobile ? { opacity: 0, y } : { opacity: 0, x: -MOTION.xDrift };
  if (kind === "drift-right") hidden = isMobile ? { opacity: 0, y } : { opacity: 0, x: MOTION.xDrift };

  const visible = { opacity: 1, x: 0, y: 0, filter: "blur(0px)", transition };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}
