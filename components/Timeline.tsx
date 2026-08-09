"use client";

import { type ComponentType, useEffect, useRef, useState } from "react";

export interface TimelineStep {
  title: string;
  body: string;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

/**
 * Connected process timeline. Horizontal on desktop, vertical on mobile.
 * On scroll-in the connecting line "draws" and steps stagger in (CSS-driven via
 * the .timeline-in class + globals.css). Progressive-enhancement + reduced-motion
 * safe: without JS or with reduced motion, the full line and all steps show.
 */
export default function Timeline({ steps }: { steps: TimelineStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={ref} className={`timeline relative ${inView ? "timeline-in" : ""}`}>
      {/* Connecting line — horizontal (desktop) */}
      <span aria-hidden="true" className="timeline-line-h">
        <span className="timeline-fill-h" />
      </span>
      {/* Connecting line — vertical (mobile) */}
      <span aria-hidden="true" className="timeline-line-v">
        <span className="timeline-fill-v" />
      </span>

      <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="timeline-step flex items-start gap-4 md:flex-col md:items-center md:gap-3 md:text-center"
            style={inView ? { transitionDelay: `${i * 120}ms` } : undefined}
          >
            <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-black/5 bg-white font-display text-xl font-bold text-orange shadow-soft">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="md:mt-1">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-navy md:justify-center">
                {step.title}
                {step.icon ? (
                  <step.icon className="h-4 w-4 text-navy/40" aria-hidden={true} />
                ) : null}
              </h3>
              <p className="mt-1 text-grey">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
