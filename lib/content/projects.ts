/**
 * Installation content model — the single source for BOTH the Projects page
 * and the Contact landing page gallery. List each photo here once.
 *
 * To add a project: add a block below AND drop the matching image in
 * `public/installations/`. Hardcoded empty for now — do NOT add stock photos
 * or invented projects; the pages show an honest empty state until real work
 * exists. Structured so a Sanity query can replace this array later without
 * changing the page components.
 */

export type ProjectCategory = "Residential" | "Commercial" | "Agricultural";

export interface Project {
  slug: string;
  title: string; // e.g. "3 kW Rooftop Solar, Vandiyur"
  location: string; // e.g. "Vandiyur, Madurai"
  category: ProjectCategory;
  systemSizeKw: number;
  image: string; // "/installations/rooftop-solar-madurai-home-01.jpg"
  alt: string; // descriptive alt text for SEO + accessibility
  shortDescription: string;
  dateCompleted: string; // ISO date
}

export const projects: Project[] = [
  // === PLACEHOLDER — replace with real projects, one block per photo ===
  // {
  //   slug: "rooftop-solar-vandiyur-3kw",
  //   title: "3 kW Rooftop Solar, Vandiyur",
  //   location: "Vandiyur, Madurai",
  //   category: "Residential",
  //   systemSizeKw: 3,
  //   image: "/installations/rooftop-solar-madurai-home-01.jpg",
  //   alt: "3 kW rooftop solar installation on a home in Vandiyur, Madurai",
  //   shortDescription: "On-grid rooftop system with TANGEDCO net metering.",
  //   dateCompleted: "2026-07-01",
  // },
];

/** Lightweight source for image-only galleries (Contact landing page). */
export const installationImages = projects.map((p) => ({ src: p.image, alt: p.alt }));
