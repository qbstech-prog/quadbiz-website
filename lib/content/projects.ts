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

// PLACEHOLDER ENTRIES — these point at neutral placeholder tiles in
// public/installations/. To use your real photos, overwrite installation-0N.jpg
// with the same filename (JPG/WebP, landscape 4:3) and edit the matching entry
// below (title, location, category, systemSizeKw, alt, shortDescription).
export const projects: Project[] = [
  {
    slug: "sample-01",
    title: "Rooftop Solar Installation",
    location: "Madurai, Tamil Nadu",
    category: "Residential",
    systemSizeKw: 3,
    image: "/installations/installation-01.jpg",
    alt: "Rooftop solar installation on a home in Madurai",
    shortDescription: "Sample project — replace with real details.",
    dateCompleted: "2026-01-01",
  },
  {
    slug: "sample-02",
    title: "Rooftop Solar Installation",
    location: "Madurai, Tamil Nadu",
    category: "Residential",
    systemSizeKw: 5,
    image: "/installations/installation-02.jpg",
    alt: "5 kW rooftop solar installation on a home in Tamil Nadu",
    shortDescription: "Sample project — replace with real details.",
    dateCompleted: "2026-01-01",
  },
  {
    slug: "sample-03",
    title: "Commercial Solar Installation",
    location: "Madurai, Tamil Nadu",
    category: "Commercial",
    systemSizeKw: 10,
    image: "/installations/installation-03.jpg",
    alt: "Commercial rooftop solar installation on a building in Tamil Nadu",
    shortDescription: "Sample project — replace with real details.",
    dateCompleted: "2026-01-01",
  },
  {
    slug: "sample-04",
    title: "Commercial Solar Installation",
    location: "Tamil Nadu",
    category: "Commercial",
    systemSizeKw: 20,
    image: "/installations/installation-04.jpg",
    alt: "Ground-mount commercial solar installation in Tamil Nadu",
    shortDescription: "Sample project — replace with real details.",
    dateCompleted: "2026-01-01",
  },
  {
    slug: "sample-05",
    title: "Agricultural Solar Water Pump",
    location: "Tamil Nadu",
    category: "Agricultural",
    systemSizeKw: 5,
    image: "/installations/installation-05.jpg",
    alt: "Solar water pump installation on a farm in Tamil Nadu",
    shortDescription: "Sample project — replace with real details.",
    dateCompleted: "2026-01-01",
  },
  {
    slug: "sample-06",
    title: "Agricultural Solar Installation",
    location: "Tamil Nadu",
    category: "Agricultural",
    systemSizeKw: 7,
    image: "/installations/installation-06.jpg",
    alt: "Agricultural solar installation powering a farm in Tamil Nadu",
    shortDescription: "Sample project — replace with real details.",
    dateCompleted: "2026-01-01",
  },
];

/** Lightweight source for image-only galleries (Contact landing page). */
export const installationImages = projects.map((p) => ({ src: p.image, alt: p.alt }));
