import { type ElementType, type ReactNode } from "react";

type SectionVariant = "default" | "soft" | "navy";

interface SectionProps {
  children: ReactNode;
  /** Rendered wrapper element — use "section", "header", "footer" etc. */
  as?: ElementType;
  /** Background treatment. */
  variant?: SectionVariant;
  /** Extra classes on the outer element (background band). */
  className?: string;
  /** Extra classes on the inner constrained container. */
  innerClassName?: string;
  id?: string;
}

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-white text-ink",
  soft: "bg-bg-soft text-ink",
  navy: "bg-navy text-white",
};

/**
 * Consistent section wrapper: caps content at ~1200px, applies horizontal
 * padding and vertical rhythm. Use everywhere to avoid margin/padding drift
 * between sections.
 */
export default function Section({
  children,
  as: Tag = "section",
  variant = "default",
  className = "",
  innerClassName = "",
  id,
}: SectionProps) {
  return (
    <Tag id={id} className={`${variantClasses[variant]} ${className}`}>
      <div
        className={`mx-auto w-full max-w-container px-4 py-14 sm:px-6 md:py-20 lg:px-8 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
