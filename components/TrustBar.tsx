const TRUST_POINTS = [
  "MNRE Registered",
  "25-Yr Panel Warranty",
  "10-Yr Inverter Warranty",
  "End-to-End In-House",
  "Serving All Tamil Nadu",
] as const;

interface TrustBarProps {
  /** Colour treatment: "light" on soft/white bands, "dark" on navy. */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Thin strip of trust signals. Reusable across pages.
 */
export default function TrustBar({ variant = "light", className = "" }: TrustBarProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`${isDark ? "bg-navy text-white/90" : "bg-white text-grey"} ${className}`}
      role="list"
      aria-label="Why choose Quadbiz Solar"
    >
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-3 text-center text-sm font-medium sm:px-6 lg:px-8">
        {TRUST_POINTS.map((point, index) => (
          <span key={point} role="listitem" className="inline-flex items-center gap-3">
            {index > 0 && (
              <span aria-hidden="true" className={isDark ? "text-amber" : "text-orange"}>
                ·
              </span>
            )}
            <span>{point}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
