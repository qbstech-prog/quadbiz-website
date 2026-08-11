import { type ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export interface StepperStep {
  title: string;
  body?: string;
  icon?: ReactNode;
}

/**
 * Vertical numbered stepper (Pattern C) — a left-aligned list of numbered nodes
 * joined by a thin connector, laid out in two balanced columns on desktop.
 * Deliberately different in shape from the horizontal ProcessTimeline (Pattern
 * A), so long sequences (e.g. an 8-step commercial process) don't read as a
 * copy of the home timeline. Tone-aware so it works on light or dark surfaces.
 */
export default function ProcessStepper({
  steps,
  tone = "light",
}: {
  steps: StepperStep[];
  tone?: "light" | "dark";
}) {
  const mid = Math.ceil(steps.length / 2);
  const columns = [steps.slice(0, mid), steps.slice(mid)];

  const titleClass = tone === "dark" ? "text-white" : "text-navy";
  const bodyClass = tone === "dark" ? "text-muted-dark" : "text-grey";
  const lineClass = tone === "dark" ? "bg-orange/40" : "bg-orange/25";

  return (
    <div className="mx-auto grid max-w-4xl gap-x-14 gap-y-2 md:grid-cols-2">
      {columns.map((col, ci) => (
        <RevealGroup as="ol" key={ci} className="">
          {col.map((step, ri) => {
            const num = ci * mid + ri + 1;
            const lastInCol = ri === col.length - 1;
            return (
              <RevealItem as="li" key={step.title} className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white shadow-glow-node">
                    {String(num).padStart(2, "0")}
                  </span>
                  {!lastInCol && <span className={`my-1 w-px flex-1 ${lineClass}`} />}
                </div>
                <div className="pb-7 pt-1.5">
                  <h3 className={`flex items-center gap-2 text-base font-semibold ${titleClass}`}>
                    <span className="[text-wrap:balance]">{step.title}</span>
                    {step.icon ? (
                      <span className={tone === "dark" ? "text-white/40" : "text-navy/40"}>
                        {step.icon}
                      </span>
                    ) : null}
                  </h3>
                  {step.body ? <p className={`mt-1 text-sm ${bodyClass}`}>{step.body}</p> : null}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      ))}
    </div>
  );
}
