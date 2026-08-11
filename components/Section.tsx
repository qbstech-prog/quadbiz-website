import { type ElementType, type ReactNode } from "react";

/** The three section surfaces that create vertical rhythm down a page. */
export type SectionSurface = "white" | "grey" | "dark";

/** Legacy variant names still used by some call sites, mapped onto surfaces. */
type SectionVariant = "default" | "soft" | "navy";

interface SectionProps {
  children: ReactNode;
  /** Rendered wrapper element — use "section", "header", "footer" etc. */
  as?: ElementType;
  /**
   * Background surface. Alternate down a page so no two adjacent sections match.
   * Use "dark" for at most one high-impact punctuation (stats / CTA) per page.
   */
  surface?: SectionSurface;
  /** @deprecated Legacy prop — mapped onto `surface` (soft → grey, navy → dark). */
  variant?: SectionVariant;
  /** Extra classes on the outer element (background band). */
  className?: string;
  /** Extra classes on the inner constrained container. */
  innerClassName?: string;
  id?: string;
}

// Surface treatments. White carries a hairline top border so two touching
// whites stay separated; grey/dark separate themselves by colour, so no border.
const surfaceClasses: Record<SectionSurface, string> = {
  white: "border-t border-line bg-white text-ink",
  grey: "bg-panel text-ink",
  dark: "surface-dark bg-navy text-white",
};

const variantToSurface: Record<SectionVariant, SectionSurface> = {
  default: "white",
  soft: "grey",
  navy: "dark",
};

/**
 * Consistent section wrapper: caps content at ~1200px, applies horizontal
 * padding and vertical rhythm, and paints one of three surfaces. Use everywhere
 * to avoid margin/padding drift and to keep the surface rhythm consistent.
 */
export default function Section({
  children,
  as: Tag = "section",
  surface,
  variant = "default",
  className = "",
  innerClassName = "",
  id,
}: SectionProps) {
  const resolved: SectionSurface = surface ?? variantToSurface[variant];
  return (
    <Tag id={id} className={`${surfaceClasses[resolved]} ${className}`}>
      <div
        className={`mx-auto w-full max-w-container px-4 py-20 sm:px-6 md:py-[110px] lg:px-8 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
