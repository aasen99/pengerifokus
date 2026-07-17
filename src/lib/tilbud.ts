import type { Tilbud } from "@/types/content";
import { getFordeler } from "@/lib/content";
import { matchesTilbudCategoryGroup } from "@/lib/tilbud-categories";

/**
 * Programmer som ikke vises i «Alle programmer».
 * Brukeren må velge programmet eksplisitt i filteret.
 */
export const TILBUD_OPT_IN_PROGRAMS = ["student"] as const;

export function isTilbudOptInProgram(fordelSlug: string): boolean {
  return (TILBUD_OPT_IN_PROGRAMS as readonly string[]).includes(fordelSlug);
}

/** Normaliserer søketekst for treff uten hensyn til aksenter */
export function normalizeTilbudSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a");
}

function matchesTilbudQuery(entry: Tilbud, query: string): boolean {
  const fordelName =
    getFordeler().find((f) => f.slug === entry.fordelSlug)?.name ?? "";

  const searchable = normalizeTilbudSearchText(
    [
      entry.title,
      entry.description,
      entry.offerLabel,
      entry.partner,
      entry.category,
      entry.terms ?? "",
      entry.warning ?? "",
      fordelName,
    ].join(" "),
  );

  const tokens = normalizeTilbudSearchText(query)
    .split(/\s+/)
    .filter(Boolean);

  return tokens.every((token) => searchable.includes(token));
}

/** Normaliserer partnernavn for å finne like tilbud på tvers av programmer */
export function normalizePartnerKey(partner: string): string {
  return partner
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.(com|no|se|dk)$/i, "")
    .replace(/[^a-z0-9]/g, "");
}

export interface TilbudProgramOffer {
  tilbudId: string;
  fordelSlug: string;
  offerLabel: string;
  description: string;
  category: string;
  terms?: string;
  sourceUrl?: string;
  warning?: string;
}

export interface GruppertTilbud {
  key: string;
  partner: string;
  offers: TilbudProgramOffer[];
  categories: string[];
}

function pickDisplayPartner(entries: Tilbud[]): string {
  return entries.reduce(
    (best, entry) => (entry.partner.length < best.length ? entry.partner : best),
    entries[0].partner,
  );
}

export function groupTilbudByPartner(entries: Tilbud[]): GruppertTilbud[] {
  const map = new Map<string, Tilbud[]>();

  for (const entry of entries) {
    const key = normalizePartnerKey(entry.partner);
    const list = map.get(key) ?? [];
    list.push(entry);
    map.set(key, list);
  }

  const groups: GruppertTilbud[] = [];

  for (const [key, items] of map) {
    const sorted = [...items].sort((a, b) =>
      getFordelName(a.fordelSlug).localeCompare(getFordelName(b.fordelSlug), "nb"),
    );

    groups.push({
      key,
      partner: pickDisplayPartner(sorted),
      offers: sorted.map((entry) => ({
        tilbudId: entry.id,
        fordelSlug: entry.fordelSlug,
        offerLabel: entry.offerLabel,
        description: entry.description,
        category: entry.category,
        terms: entry.terms,
        sourceUrl: entry.sourceUrl,
        warning: entry.warning,
      })),
      categories: [...new Set(sorted.map((entry) => entry.category))].sort((a, b) =>
        a.localeCompare(b, "nb"),
      ),
    });
  }

  return groups;
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

/** Trekker ut sammenlignbart tall fra offerLabel, f.eks. «15–20 %» → 20 eller «50 poeng / 100 kr» → 50 */
export function parseOfferRate(offerLabel: string): number | null {
  const poengMatch = offerLabel.match(
    /(?:opptil\s+)?(\d+[,.]?\d*)(?:\s*[–-]\s*(\d+[,.]?\d*))?\s*poeng\s*\/\s*100/i,
  );
  if (poengMatch) {
    const low = parseFloat(poengMatch[1].replace(",", "."));
    const high = poengMatch[2]
      ? parseFloat(poengMatch[2].replace(",", "."))
      : low;
    return Math.max(low, high);
  }

  const matches = offerLabel.match(/\d+[,.]?\d*/g);
  if (!matches?.length) return null;

  return Math.max(...matches.map((match) => parseFloat(match.replace(",", "."))));
}

function getGroupBestRate(group: GruppertTilbud): number {
  const rates = group.offers
    .map((offer) => parseOfferRate(offer.offerLabel))
    .filter((rate): rate is number => rate !== null);

  return rates.length ? Math.max(...rates) : -1;
}

export function sortGruppertTilbud(
  groups: GruppertTilbud[],
  sort: TilbudSortOption,
): GruppertTilbud[] {
  const sorted = [...groups];

  switch (sort) {
    case "rate-desc":
      return sorted.sort((a, b) => {
        const diff = getGroupBestRate(b) - getGroupBestRate(a);
        return diff !== 0 ? diff : a.partner.localeCompare(b.partner, "nb");
      });
    case "programs-desc":
      return sorted.sort((a, b) => {
        const diff = b.offers.length - a.offers.length;
        return diff !== 0 ? diff : a.partner.localeCompare(b.partner, "nb");
      });
    case "category-asc":
      return sorted.sort((a, b) => {
        const diff = (a.categories[0] ?? "").localeCompare(b.categories[0] ?? "", "nb");
        return diff !== 0 ? diff : a.partner.localeCompare(b.partner, "nb");
      });
    case "name-asc":
    default:
      return sorted.sort((a, b) => a.partner.localeCompare(b.partner, "nb"));
  }
}

export function filterTilbud(
  entries: Tilbud[],
  query: string,
  fordelSlug: string | null,
  categoryGroup: string | null,
): Tilbud[] {
  const normalizedQuery = query.trim();

  return entries.filter((entry) => {
    if (fordelSlug && entry.fordelSlug !== fordelSlug) return false;
    if (!fordelSlug && isTilbudOptInProgram(entry.fordelSlug)) return false;
    if (
      categoryGroup &&
      !matchesTilbudCategoryGroup(entry.category, categoryGroup)
    ) {
      return false;
    }
    if (!normalizedQuery) return true;

    return matchesTilbudQuery(entry, normalizedQuery);
  });
}

export function getFordelName(slug: string): string {
  return getFordeler().find((f) => f.slug === slug)?.name ?? slug;
}

export function formatTilbudDate(isoDate: string): string {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
