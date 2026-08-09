"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

import { MOTION, VIEWPORT } from "@/lib/motion";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * Staggered reveal for card grids. Wrap the grid in <RevealGroup as="ul"> and
 * each cell in <RevealItem as="li">. Children fade + rise + slightly scale in,
 * staggered ~90ms. Static under reduced motion.
 */

interface GroupProps {
  children: ReactNode;
  as?: "ul" | "div" | "ol";
  className?: string;
}

export function RevealGroup({ children, as = "div", className }: GroupProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: MOTION.stagger } },
  };

  return (
    <MotionTag className={className} variants={container} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
      {children}
    </MotionTag>
  );
}

interface ItemProps {
  children: ReactNode;
  as?: "li" | "div";
  className?: string;
}

export function RevealItem({ children, as = "div", className }: ItemProps) {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  const y = isMobile ? MOTION.travelMobile : MOTION.travelDesktop;
  const item: Variants = {
    hidden: { opacity: 0, y, scale: MOTION.scaleFrom },
    visible: { opacity: 1, y: 0, scale: 1, transition: MOTION.spring },
  };

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
