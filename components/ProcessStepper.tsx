import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export interface StepperStep {
  title: string;
}

/**
 * Two-column numbered list (Pattern C). Orange number badges carry the sequence
 * — no connector line, no icons — with steps 01..mid down the left column and
 * mid+1..n down the right, collapsing to a single 01..n column on mobile.
 * Titles are left-aligned and each row top-aligns to its badge, so the grid
 * stays tidy even when a title wraps to two lines. Tone-aware (light / dark).
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

  return (
    <div className="mx-auto grid max-w-4xl gap-x-12 md:grid-cols-2 md:gap-x-16">
      {columns.map((col, ci) => (
        <RevealGroup as="ol" key={ci}>
          {col.map((step, ri) => {
            const num = ci * mid + ri + 1;
            return (
              // Fixed row pitch keeps every badge an equal distance apart, even
              // when a title wraps to two lines.
              <RevealItem
                as="li"
                key={step.title}
                className="flex min-h-[4.75rem] items-start gap-4"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white shadow-glow-node">
                  {String(num).padStart(2, "0")}
                </span>
                <span className={`pt-1.5 text-base font-semibold leading-snug ${titleClass}`}>
                  {step.title}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>
      ))}
    </div>
  );
}
