import Section from "@/components/Section";

/** Honest current figures — do not inflate. Shared by Home and About. */
const stats = [
  { value: "15+", label: "Installations" },
  { value: "50 kW+", label: "Installed" },
  { value: "5+", label: "Years of Team Experience" },
  { value: "100%", label: "MNRE Compliant" },
];

/** Navy stats band used on the Home and About pages. */
export default function StatsStrip() {
  return (
    <Section variant="navy">
      <dl className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            {/* dt precedes dd in the DOM; flex-col-reverse shows the number on top. */}
            <dt className="mt-1 text-sm text-white/80">{stat.label}</dt>
            <dd className="font-display text-4xl font-bold text-amber md:text-5xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
