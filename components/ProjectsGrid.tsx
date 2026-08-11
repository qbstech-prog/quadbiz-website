"use client";

import Image from "next/image";
import { useState } from "react";

import RevealImage from "@/components/motion/RevealImage";
import { type Project, type ProjectCategory } from "@/lib/content/projects";

type Filter = "All" | ProjectCategory;
const FILTERS: Filter[] = ["All", "Residential", "Commercial", "Agricultural"];

/**
 * Filterable project card grid. Rendered only when there are real projects —
 * the Projects page shows an honest empty state otherwise.
 */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={[
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filter === f
                ? "border-navy bg-navy text-white"
                : "border-black/15 bg-white text-navy hover:border-navy",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li
            key={project.slug}
            className="overflow-hidden rounded-card border border-black/5 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <RevealImage variant="scale" className="relative aspect-[4/3] w-full bg-bg-soft">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </RevealImage>
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange">
                  {project.category}
                </span>
                <span className="text-xs font-medium text-grey">{project.systemSizeKw} kW</span>
              </div>
              <h3 className="text-lg font-semibold text-navy">{project.title}</h3>
              <p className="mt-1 text-sm text-grey">{project.location}</p>
              <p className="mt-2 text-grey">{project.shortDescription}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
