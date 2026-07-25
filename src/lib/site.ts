import { getFordelArticleSlugs } from "@/data/fordel-articles";
import { getGuideArticleSlugs } from "@/data/guide-articles";
import { getFormuesbyggerSlugs } from "@/data/formuesbygger-articles";
import { fordeler } from "@/data/fordeler";
import { guider } from "@/data/guider";
import { ordbok } from "@/data/ordbok";
import { verktoy } from "@/data/verktoy";
import { formuesbyggere } from "@/data/formuesbyggere";
import { tilbud } from "@/data/tilbud";

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
    "prosentkalkulator",
    "prosentregning",
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

const guideBySlug = new Map(guider.map((guide) => [guide.slug, guide]));

const guideArticleRoutes: PublicRoute[] = getGuideArticleSlugs().map((slug) => {
  const guide = guideBySlug.get(slug);
  return {
    path: `/guider/${slug}`,
    priority: guide?.featured ? 0.85 : 0.8,
    changeFrequency: "monthly" as const,
    lastModified: guide?.updatedAt,
  };
});

const fordelArticleSlugs = new Set(getFordelArticleSlugs());

const fordelRoutes: PublicRoute[] = fordeler
  .filter((fordel) => fordel.status === "published")
  .map((fordel) => ({
    path: `/fordeler/${fordel.slug}`,
    priority: fordelArticleSlugs.has(fordel.slug) ? 0.85 : 0.8,
    changeFrequency: "monthly" as const,
    lastModified: fordel.updatedAt,
  }));

const formuesbyggerBySlug = new Map(
  formuesbyggere.map((entry) => [entry.slug, entry]),
);

const formuesbyggerRoutes: PublicRoute[] = getFormuesbyggerSlugs().map(
  (slug) => {
    const entry = formuesbyggerBySlug.get(slug);
    return {
      path: `/formuesbyggere/${slug}`,
      priority: entry?.featured ? 0.85 : 0.8,
      changeFrequency: "monthly" as const,
      lastModified: entry?.updatedAt,
    };
  },
);

const ordbokRoutes: PublicRoute[] = ordbok
  .filter((entry) => entry.status === "published")
  .map((entry) => ({
    path: `/ordbok/${entry.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
    lastModified: entry.updatedAt,
  }));

const verktoyRoutes: PublicRoute[] = verktoy
  .filter((tool) => tool.status === "published")
  .map((tool) => ({
    path: `/verktoy/${tool.slug}`,
    priority: tool.featured ? 0.85 : 0.8,
    changeFrequency: "monthly" as const,
    lastModified: tool.updatedAt,
  }));

function latestDate(dates: (string | undefined)[]): string | undefined {
  const valid = dates.filter((value): value is string => Boolean(value));
  if (valid.length === 0) return undefined;
  return valid.sort().at(-1);
}

const hubLastModified = {
  guider: latestDate(guider.map((g) => g.updatedAt)),
  fordeller: latestDate(fordeler.map((f) => f.updatedAt)),
  verktoy: latestDate(verktoy.map((t) => t.updatedAt)),
  ordbok: latestDate(ordbok.map((o) => o.updatedAt)),
  formuesbyggere: latestDate(formuesbyggere.map((f) => f.updatedAt)),
  tilbud: latestDate(tilbud.map((t) => t.updatedAt)),
};

export const publicRoutes: PublicRoute[] = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly",
    lastModified: latestDate(Object.values(hubLastModified)),
  },
  {
    path: "/guider",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: hubLastModified.guider,
  },
  ...guideArticleRoutes,
  {
    path: "/fordeler",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: hubLastModified.fordeller,
  },
  ...fordelRoutes,
  {
    path: "/tilbud",
    priority: 0.9,
    changeFrequency: "daily",
    lastModified: hubLastModified.tilbud,
  },
  {
    path: "/verktoy",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: hubLastModified.verktoy,
  },
  ...verktoyRoutes,
  {
    path: "/ordbok",
    priority: 0.9,
    changeFrequency: "weekly",
    lastModified: hubLastModified.ordbok,
  },
  {
    path: "/ordbok/sitater",
    priority: 0.85,
    changeFrequency: "monthly",
    lastModified: hubLastModified.formuesbyggere,
  },
  ...ordbokRoutes,
  {
    path: "/formuesbyggere",
    priority: 0.85,
    changeFrequency: "weekly",
    lastModified: hubLastModified.formuesbyggere,
  },
  ...formuesbyggerRoutes,
];
