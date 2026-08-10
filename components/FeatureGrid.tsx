import { type ReactNode } from "react";

import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";

export interface FeatureItem {
  /** Rendered icon element, e.g. <ShieldCheck className="h-6 w-6" />. */
  icon: ReactNode;
  title: string;
  body: string;
}

/**
 * The one feature / value card pattern for the whole site (Pattern B).
 * Light card (hairline border + soft shadow, hover-lift), coloured icon tile
 * top-left with the title beside it, description below. Flex-wrap + centered so
 * grids stay balanced with no orphan (4-up, 5→3+2 centered, 6→3+3); items in a
 * row share height. Staggered fade-up reveal (via RevealGroup).
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
      ? "sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
      : "sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]";
  const maxWidth = columns === 3 ? "max-w-5xl" : "max-w-6xl";

  return (
    <RevealGroup as="ul" className={`mx-auto flex ${maxWidth} flex-wrap justify-center gap-6`}>
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item.title}
          className={`w-full rounded-card border border-black/5 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${widthClass}`}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange/10 text-orange">
              {item.icon}
            </span>
            <h3 className="text-lg font-semibold text-navy [text-wrap:balance]">{item.title}</h3>
          </div>
          <p className="mt-3 text-grey">{item.body}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
