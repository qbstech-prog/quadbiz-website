import type { Transition } from "motion/react";

/**
 * Central motion config — tune the whole site's scroll-animation intensity from
 * here. Bigger numbers = more dramatic. All values are GPU-friendly
 * (transform / opacity / blur / clip-path only) so they never cause layout shift.
 */
export const MOTION = {
  /** Vertical rise distance (px). */
  travelDesktop: 30,
  travelMobile: 18,
  /** Horizontal drift for alternating sections (px, desktop only). */
  xDrift: 32,
  /** Stagger between grid children (seconds). */
  stagger: 0.09,
  /** Cap how many children stagger so long lists don't crawl. */
  maxStaggerItems: 8,
  /** Heading focus-in blur amount (px). */
  blur: 10,
  /** Card scale-in start. */
  scaleFrom: 0.94,
  /** Feature-image scale-in start. */
  imageScaleFrom: 1.06,
  /** Lively-but-controlled spring (no visible overshoot on text). */
  spring: { type: "spring", stiffness: 130, damping: 18, mass: 0.9 } as Transition,
  /** Slightly slower, confident spring for CTA bands / form blocks. */
  springConfident: { type: "spring", stiffness: 90, damping: 20, mass: 1 } as Transition,
} as const;

/** whileInView viewport config — fire slightly before fully in view, once. */
export const VIEWPORT = { once: true, margin: "-12% 0px" } as const;
