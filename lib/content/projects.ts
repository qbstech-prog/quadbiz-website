/**
 * Project content model.
 *
 * Hardcoded empty for now — populate as real installations are documented.
 * Structured so a Sanity query can replace the `projects` array later without
 * changing the Projects page component. Do NOT add stock photos or invented
 * projects here; the page shows an honest empty state until real work exists.
 */

export type ProjectCategory = "Residential" | "Commercial" | "Agricultural";

export interface Project {
  slug: string;
  title: string;
  location: string; // e.g. "Vandiyur, Madurai"
  category: ProjectCategory;
  systemSizeKw: number;
  image: string; // /public path or Sanity URL later
  shortDescription: string;
  dateCompleted: string; // ISO date
}

export const projects: Project[] = [];

/*
  To add a real project, append an object like:

  {
    slug: "vandiyur-3kw-home",
    title: "3 kW Rooftop Home System",
    location: "Vandiyur, Madurai",
    category: "Residential",
    systemSizeKw: 3,
    image: "/projects/vandiyur-3kw.jpg", // real photo in /public/projects
    shortDescription: "On-grid rooftop system cutting the home's TANGEDCO bill to near zero.",
    dateCompleted: "2026-07-15",
  }
*/
