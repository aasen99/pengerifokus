/** Sentral konfigurasjon for SEO og metadata. */
export const siteConfig = {
  name: "Penger i Fokus",
  tagline: "Forstå, spare og bruke penger smartere.",
  description:
    "Praktiske guider, fordeler, verktøy og ordbok for personlig økonomi i Norge. Lær å spare, investere og bruke penger smartere – uten bankjargong.",
  locale: "nb_NO",
  language: "no",
  keywords: [
    "personlig økonomi",
    "sparing",
    "budsjett",
    "guider økonomi",
    "rentekalkulator",
    "sparekalkulator",
    "økonomiordbok",
    "fordelsprogrammer",
    "gjeld",
    "investering",
    "Norge",
  ],
} as const;

export const googleAnalyticsId = "G-93NR8M8JND";

export function getGoogleAnalyticsId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? googleAnalyticsId;
}

import { getGuideArticleSlugs } from "@/data/guide-articles";

/** CMS/DEPLOY: Sett NEXT_PUBLIC_SITE_URL i produksjon (f.eks. https://pengerifokus.no) */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const guideArticleRoutes = getGuideArticleSlugs().map((slug) => ({
  path: `/guider/${slug}`,
  priority: 0.85,
  changeFrequency: "monthly" as const,
}));

export const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/guider", priority: 0.9, changeFrequency: "weekly" as const },
  ...guideArticleRoutes,
  { path: "/fordeler", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tilbud", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/verktoy", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/verktoy/rentekalkulator", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/verktoy/sparekalkulator", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/verktoy/bsu-kalkulator", priority: 0.8, changeFrequency: "monthly" as const },
  {
    path: "/verktoy/luksusfelle-tavle",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/verktoy/tid-er-penger",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/verktoy/regel-72",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/verktoy/dopenge-kalkulator",
    priority: 0.8,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/verktoy/okonomisk-rontgen",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/verktoy/eie-leie-kalkulator",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  { path: "/ordbok", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/kombinasjoner", priority: 0.9, changeFrequency: "weekly" as const },
];
