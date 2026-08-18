/**
 * Små, klientsikre tilbudshjelpere. Ikke importer @/lib/tilbud eller @/data/tilbud herfra.
 */

/**
 * Programmer som ikke vises i «Alle programmer» eller programlisten.
 * Brukeren må huke av «Jeg er student» for å se dem.
 */
export const TILBUD_OPT_IN_PROGRAMS = ["student"] as const;

export function isTilbudOptInProgram(fordelSlug: string): boolean {
  return (TILBUD_OPT_IN_PROGRAMS as readonly string[]).includes(fordelSlug);
}

export type TilbudSortOption =
  | "name-asc"
  | "rate-desc"
  | "programs-desc"
  | "category-asc";

export const TILBUD_SORT_OPTIONS: { value: TilbudSortOption; label: string }[] = [
  { value: "name-asc", label: "Navn A–Å" },
  { value: "rate-desc", label: "Høyest rabatt" },
  { value: "programs-desc", label: "Flest medlemskap" },
  { value: "category-asc", label: "Kategori" },
];

export function formatTilbudDate(isoDate: string): string {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

/** Tekst for kildelenke på tilbudskort */
export function getTilbudSourceLinkLabel(
  fordelSlug: string,
  sourceUrl?: string,
  fordelName = fordelSlug,
): string {
  if (sourceUrl?.includes("onlineshopping.flysas.com")) {
    return "SAS Online Shopping ↗";
  }
  if (sourceUrl?.includes("trumfnetthandel") || fordelSlug === "trumf") {
    return "Trumf Netthandel ↗";
  }
  if (fordelSlug === "student") return "Offisiell kilde ↗";
  return `${fordelName} ↗`;
}
