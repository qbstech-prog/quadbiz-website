import { type ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export interface ProcessCard {
  title: string;
  body?: string;
  icon?: ReactNode;
}

/**
 * Numbered cards grid (Pattern D) — each step is a self-contained card with an
 * orange numbered badge, arranged in a clean responsive grid. A third distinct
 * process shape (vs. the horizontal ProcessTimeline and vertical ProcessStepper)
 * so the three process sections across the site never feel templated.
 * Tone-aware for light or dark surfaces.
 */
export default function ProcessCards({
  steps,
  tone = "light",
}: {
  steps: ProcessCard[];
  tone?: "light" | "dark";
}) {
  const cardClass =
    tone === "dark"
      ? "border-white/10 bg-white/[0.04]"
      : "border-line bg-white shadow-card";
  const titleClass = tone === "dark" ? "text-white" : "text-navy";
  const bodyClass = tone === "dark" ? "text-muted-dark" : "text-grey";

  return (
    <RevealGroup
      as="ol"
      className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {steps.map((step, i) => (
        <RevealItem
          as="li"
          key={step.title}
          className={`relative flex flex-col rounded-2xl border p-6 ${cardClass}`}
        >
          <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white shadow-glow-node">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`flex items-center gap-2 text-base font-semibold ${titleClass}`}>
            <span className="[text-wrap:balance]">{step.title}</span>
            {step.icon ? (
              <span className={tone === "dark" ? "text-white/40" : "text-navy/40"}>{step.icon}</span>
            ) : null}
          </h3>
          {step.body ? <p className={`mt-1.5 text-sm ${bodyClass}`}>{step.body}</p> : null}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
