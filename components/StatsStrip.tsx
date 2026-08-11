import Counter from "@/components/Counter";
import Section from "@/components/Section";

/** Honest current figures — do not inflate. Shared by Home and About. */
const stats = [
  { value: 15, suffix: "+", label: "Installations" },
  { value: 50, suffix: " kW+", label: "Installed" },
  { value: 5, suffix: "+", label: "Years of Team Experience" },
  { value: 100, suffix: "%", label: "MNRE Compliant" },
];

/**
 * Dark punctuation band (near-black) — white numbers, muted labels, thin orange
 * dividers between stats. One strong break between the sections above and below.
 * Counts up on view. Shared by Home and About.
 */
export default function StatsStrip() {
  return (
    <Section surface="dark">
      <dl className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0 sm:divide-x sm:divide-glow/25">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse px-2 text-center sm:px-6"
          >
            {/* dt precedes dd in the DOM; flex-col-reverse shows the number on top. */}
            <dt className="mt-2 text-sm text-muted-dark">{stat.label}</dt>
            <dd className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
