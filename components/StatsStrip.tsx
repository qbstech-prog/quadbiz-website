import Counter from "@/components/Counter";
import Section from "@/components/Section";

/** Honest current figures — do not inflate. Shared by Home and About. */
const stats = [
  { value: 15, suffix: "+", label: "Installations" },
  { value: 50, suffix: " kW+", label: "Installed" },
  { value: 5, suffix: "+", label: "Years of Team Experience" },
  { value: 100, suffix: "%", label: "MNRE Compliant" },
];

/** Navy stats band used on the Home and About pages. Numbers count up on view. */
export default function StatsStrip() {
  return (
    <Section variant="navy">
      <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            {/* dt precedes dd in the DOM; flex-col-reverse shows the number on top. */}
            <dt className="mt-1 text-sm text-white/80">{stat.label}</dt>
            <dd className="font-display text-4xl font-bold text-amber md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
