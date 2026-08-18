import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Penger i Fokus",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#292524",
    lang: "nb",
    categories: ["finance", "education"],
  };
}
