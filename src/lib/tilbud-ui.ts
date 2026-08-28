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

export interface TilbudFilterParams {
  q?: string;
  program?: string | null;
  kategori?: string | null;
  student?: boolean;
  sortering?: TilbudSortOption;
  side?: number;
}

/** Bygger /tilbud-URL med filter og paginering. */
export function buildTilbudHref(params: TilbudFilterParams): string {
  const search = new URLSearchParams();
  const q = params.q?.trim();
  if (q) search.set("q", q);
  if (params.program) search.set("program", params.program);
  if (params.kategori) search.set("kategori", params.kategori);
  if (params.student) search.set("student", "1");
  if (params.sortering && params.sortering !== "rate-desc") {
    search.set("sortering", params.sortering);
  }
  if (params.side && params.side > 1) search.set("side", String(params.side));
  const qs = search.toString();
  return qs ? `/tilbud?${qs}` : "/tilbud";
}

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
  if (sourceUrl?.includes("trumfnetthandel")) {
    return "Trumf Netthandel ↗";
  }
  if (fordelSlug === "trumf") {
    return "Trumf ↗";
  }
  if (fordelSlug === "student") return "Offisiell kilde ↗";
  return `${fordelName} ↗`;
}
