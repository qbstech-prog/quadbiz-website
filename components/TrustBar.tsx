import { BadgeCheck } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

const TRUST_POINTS = [
  "MNRE Registered",
  "25-Yr Panel Warranty",
  "10-Yr Inverter Warranty",
  "End-to-End In-House",
  "Serving All Tamil Nadu",
] as const;

/**
 * Row of "verified fact" chips. Rendered inside the hero over the photo, so the
 * pills stay lightly frosted white (never transparent) to keep the near-black
 * text and orange check icons legible against the installation image.
 * Chips spring in with a light stagger when they enter view.
 */
export default function TrustBar({ className = "" }: { className?: string }) {
  return (
    <RevealGroup
      as="ul"
      className={`flex flex-wrap items-center justify-center gap-2.5 ${className}`}
    >
      {TRUST_POINTS.map((point) => (
        <RevealItem
          as="li"
          key={point}
          className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-3.5 py-1.5 text-sm font-medium text-navy shadow-soft backdrop-blur-sm"
        >
          <BadgeCheck className="h-4 w-4 flex-shrink-0 text-orange" aria-hidden="true" />
          {point}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
