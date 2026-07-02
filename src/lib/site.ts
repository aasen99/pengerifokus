import { getFordelArticleSlugs } from "@/data/fordel-articles";
import { getGuideArticleSlugs } from "@/data/guide-articles";
import { getFormuesbyggerSlugs } from "@/data/formuesbygger-articles";
import { fordeler } from "@/data/fordeler";
import { ordbok } from "@/data/ordbok";
import { verktoy } from "@/data/verktoy";

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

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface PublicRoute {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: string;
}

/** Sentral konfigurasjon for SEO og metadata. */
export const siteConfig = {
  name: "Penger i Fokus",
  tagline: "Forstå, spare og bruke penger smartere.",
  description:
    "Praktiske guider, fordelsprogrammer, tilbud, verktøy, ordbok og formuesbyggere for personlig økonomi i Norge. Lær å spare, investere og bruke penger smartere, uten bankjargong.",
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

const guideArticleRoutes: PublicRoute[] = getGuideArticleSlugs().map((slug) => ({
  path: `/guider/${slug}`,
  priority: 0.85,
  changeFrequency: "monthly",
}));

const fordelArticleSlugs = new Set(getFordelArticleSlugs());

const fordelRoutes: PublicRoute[] = fordeler
  .filter((fordel) => fordel.status === "published")
  .map((fordel) => ({
    path: `/fordeler/${fordel.slug}`,
    priority: fordelArticleSlugs.has(fordel.slug) ? 0.85 : 0.8,
    changeFrequency: "monthly" as const,
    lastModified: fordel.updatedAt,
  }));

const formuesbyggerRoutes: PublicRoute[] = getFormuesbyggerSlugs().map(
  (slug) => ({
    path: `/formuesbyggere/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }),
);

const ordbokRoutes: PublicRoute[] = ordbok
  .filter((entry) => entry.status === "published")
  .map((entry) => ({
    path: `/ordbok/${entry.slug}`,
    priority: 0.75,
    changeFrequency: "monthly",
    lastModified: entry.updatedAt,
  }));

const verktoyRoutes: PublicRoute[] = verktoy
  .filter((tool) => tool.status === "published")
  .map((tool) => ({
    path: `/verktoy/${tool.slug}`,
    priority: tool.featured ? 0.85 : 0.8,
    changeFrequency: "monthly",
    lastModified: tool.updatedAt,
  }));

export const publicRoutes: PublicRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/guider", priority: 0.9, changeFrequency: "weekly" },
  ...guideArticleRoutes,
  { path: "/fordeler", priority: 0.9, changeFrequency: "weekly" },
  ...fordelRoutes,
  { path: "/tilbud", priority: 0.9, changeFrequency: "daily" },
  { path: "/verktoy", priority: 0.9, changeFrequency: "weekly" },
  ...verktoyRoutes,
  { path: "/ordbok", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ordbok/sitater", priority: 0.85, changeFrequency: "monthly" },
  ...ordbokRoutes,
  { path: "/formuesbyggere", priority: 0.85, changeFrequency: "weekly" },
  ...formuesbyggerRoutes,
];
