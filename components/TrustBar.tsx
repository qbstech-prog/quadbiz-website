import { BadgeCheck } from "lucide-react";

import Reveal from "@/components/Reveal";

const TRUST_POINTS = [
  "MNRE Registered",
  "25-Yr Panel Warranty",
  "10-Yr Inverter Warranty",
  "End-to-End In-House",
  "Serving All Tamil Nadu",
] as const;

/**
 * Thin band of "verified fact" chips — quiet support under the hero.
 * Chips fade in + rise with a light stagger when the bar enters view.
 */
export default function TrustBar({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white ${className}`}>
      <ul
        className="mx-auto flex max-w-container flex-wrap items-center justify-center gap-2.5 px-4 py-6 sm:px-6 lg:px-8"
        aria-label="Why choose Quadbiz Solar"
      >
        {TRUST_POINTS.map((point, i) => (
          <Reveal
            as="li"
            key={point}
            delay={i * 60}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-sm font-medium text-navy shadow-soft"
          >
            <BadgeCheck className="h-4 w-4 flex-shrink-0 text-green" aria-hidden="true" />
            {point}
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
