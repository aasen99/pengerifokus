import type { MetadataRoute } from "next";
import { publicRoutes } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    ...(route.lastModified
      ? { lastModified: new Date(route.lastModified) }
      : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
