import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/content/blog";

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
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries];
}
