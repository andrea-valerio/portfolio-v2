import type { MetadataRoute } from "next";
import { ALL_SLUGS } from "@/lib/projects";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andreavalerio.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...ALL_SLUGS.map((slug) => ({
      url: `${BASE_URL}/projects/${slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
