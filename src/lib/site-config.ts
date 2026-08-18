/** Kanonisk produksjonsdomene – brukes for sitemap, canonical, OG og JSON-LD. */
export const CANONICAL_SITE_URL = "https://www.pengerifokus.no";

/**
 * CMS/DEPLOY: Sett NEXT_PUBLIC_SITE_URL eller SITE_URL for override.
 * Bruk aldri VERCEL_URL – det gir midlertidige deployment-URLer i sitemap/SEO.
 */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();

  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  return CANONICAL_SITE_URL;
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
