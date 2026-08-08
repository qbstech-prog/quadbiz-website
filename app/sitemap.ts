import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/** All planned routes for the marketing site. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services/residential-rooftop-solar", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/commercial-solar", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/agricultural-solar", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pm-surya-ghar-subsidy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
