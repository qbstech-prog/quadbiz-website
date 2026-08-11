import { type ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export interface FeatureItem {
  /** Rendered icon element, e.g. <ShieldCheck className="h-6 w-6" />. */
  icon: ReactNode;
  title: string;
  body: string;
}

/**
 * The one feature / value grid pattern for the whole site (Pattern B).
 * Borderless open columns — no card box, border, or shadow: a coloured icon
 * tile on top, bold navy title, a short orange underline accent, then the grey
 * description. Items are top-aligned so the icon/title/underline rows line up
 * regardless of description length. Only the icon tile lifts gently on hover.
 * Balanced flex-wrap centered rows (4-up, 5→3+2, 6→3+3) with a staggered
 * fade-up reveal (via RevealGroup).
 */
export default function FeatureGrid({
  items,
  columns = 4,
}: {
  items: FeatureItem[];
  columns?: 3 | 4;
}) {
  const widthClass =
    columns === 3
      ? "sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
      : "sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]";

  return (
    <RevealGroup as="ul" className="flex flex-wrap justify-center gap-x-8 gap-y-10">
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item.title}
          className={`group flex w-full flex-col items-start ${widthClass}`}
        >
          <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-peach-tile text-glow shadow-glow-tile transition-shadow duration-200 group-hover:shadow-[0_10px_24px_rgba(255,106,44,0.28)] motion-safe:transition-[box-shadow,transform] motion-safe:group-hover:-translate-y-0.5">
            {item.icon}
          </span>
          <h3 className="text-lg font-semibold text-navy [hyphens:none] [text-wrap:balance]">
            {item.title}
          </h3>
          <span className="mt-3 block h-[3px] w-10 rounded-full bg-glow" aria-hidden="true" />
          <p className="mt-3 text-grey">{item.body}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
