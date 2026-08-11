"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export interface ProcessStep {
  title: string;
  body?: string;
  /** Optional secondary icon (rendered element, kept subtle beside the title). */
  icon?: ReactNode;
}

/** Choose a balanced column count so rows never leave an orphan node. */
function autoColumns(count: number): 3 | 4 {
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;
  return 4;
}

/**
 * The one numbered-sequence pattern for the whole site (Pattern A).
 * Desktop: balanced rows of circular numbered nodes on a connector line drawn
 * per node to the next in its row (row-height independent, so 4/6/8 all work).
 * Mobile: a single continuous vertical timeline. Line draws + nodes stagger on
 * scroll-in; static without JS or under prefers-reduced-motion.
 */
export default function ProcessTimeline({
  steps,
  columns,
}: {
  steps: ProcessStep[];
  columns?: 3 | 4;
}) {
  const cols = columns ?? autoColumns(steps.length);
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
    <div ref={ref} className={`relative ${inView ? "ptl-in" : ""}`}>
      {/* Mobile: single continuous vertical line. */}
      <span aria-hidden="true" className="ptl-line-v">
        <span className="ptl-fill-v" />
      </span>

      <ol className={`grid gap-8 md:gap-x-6 md:gap-y-12 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
        {steps.map((step, i) => {
          const isRowEnd = i % cols === cols - 1 || i === steps.length - 1;
          const delay = `${i * 80}ms`;
          return (
            <li
              key={step.title}
              className="ptl-step relative flex items-start gap-4 md:flex-col md:items-center md:gap-3 md:text-center"
              style={inView ? { transitionDelay: delay } : undefined}
            >
              {/* Desktop connector to the next node in this row. */}
              {!isRowEnd && (
                <span aria-hidden="true" className="ptl-connector">
                  <span className="ptl-connector-fill" style={inView ? { transitionDelay: delay } : undefined} />
                </span>
              )}
              <span className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-orange font-semibold text-xl text-white shadow-glow-node">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-1">
                <h3 className="flex items-center gap-2 text-base font-semibold text-navy md:flex-col md:gap-1">
                  <span className="[text-wrap:balance]">{step.title}</span>
                  {step.icon ? <span className="text-navy/40">{step.icon}</span> : null}
                </h3>
                {step.body ? <p className="mt-1 text-grey">{step.body}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
