"use client";

import { type ElementType, type ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms (e.g. index * 60 for grid cascades). */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Fade-in + gentle rise when scrolled into view (once). GPU-friendly
 * (opacity/transform only). Fully disabled under prefers-reduced-motion via CSS
 * (see .reveal in globals.css); content is visible by default for no-JS users.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
