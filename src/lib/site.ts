/**
 * Offentlig ruteoversikt for sitemap.
 * Ikke importer denne filen i Client Components — den laster hele innholdskatalogen.
 * Bruk @/lib/site-config for navn, URL og Analytics.
 */
import { getEmneSlugs } from "@/data/emner";
import { getFordelArticleSlugs } from "@/data/fordel-articles";
import { getGuideArticleSlugs } from "@/data/guide-articles";
import { getFormuesbyggerSlugs } from "@/data/formuesbygger-articles";
import { fordeler } from "@/data/fordeler";
import { guider } from "@/data/guider";
import { ordbok } from "@/data/ordbok";
import { verktoy } from "@/data/verktoy";
import { formuesbyggere } from "@/data/formuesbyggere";
import { tilbud } from "@/data/tilbud";

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

const emneRoutes: PublicRoute[] = [
  {
    path: "/emner",
    priority: 0.85,
    changeFrequency: "weekly",
  },
  ...getEmneSlugs().map((slug) => ({
    path: `/emner/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
];

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
  ...emneRoutes,
];
