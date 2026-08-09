/**
 * Continuously scrolling, full-colour brand logo marquee.
 *
 * Pure CSS: the track holds the logo list twice back-to-back and animates
 * translateX(0 → -50%) for a seamless loop (see .marquee in globals.css).
 * Pauses on hover; falls back to a static, centred, wrapping row when the user
 * prefers reduced motion.
 *
 * Placeholder logos live in /public/brands — swap in the real colour files with
 * the same filenames (adani.svg, waaree.svg, vikram-solar.svg, goodwe.svg,
 * sungrow.svg, polycab.svg) and nothing else needs to change.
 */

const brands = [
  { name: "Adani", logo: "/brands/adani.svg" },
  { name: "Waaree", logo: "/brands/waaree.svg" },
  { name: "Vikram Solar", logo: "/brands/vikram-solar.svg" },
  { name: "Goodwe", logo: "/brands/goodwe.svg" },
  { name: "Sungrow", logo: "/brands/sungrow.svg" },
  { name: "Polycab", logo: "/brands/polycab.svg" },
];

function LogoSet({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={clone ? "true" : undefined}
      data-marquee-clone={clone ? "true" : undefined}
    >
      {brands.map((brand) => (
        <li key={brand.name} className="flex items-center">
          {/* Full colour — no grayscale filter. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brand.logo} alt={brand.name} className="h-11 w-auto" loading="lazy" />
        </li>
      ))}
    </ul>
  );
}

export default function BrandMarquee() {
  return (
    <div className="marquee relative">
      {/* Edge fade masks in the section background colour (bg-soft). */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-soft to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-soft to-transparent sm:w-24" />

      <div className="marquee-track">
        <LogoSet />
        <LogoSet clone />
      </div>
    </div>
  );
}
