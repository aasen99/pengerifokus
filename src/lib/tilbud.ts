import type { Tilbud } from "@/types/content";
import { getFordelName } from "@/lib/fordeler";
import { matchesSearchTokens, normalizeSearchText } from "@/lib/normalize-search";
import { matchesTilbudCategoryGroup } from "@/lib/tilbud-categories";
import {
  isTilbudOptInProgram,
  type TilbudSortOption,
} from "@/lib/tilbud-ui";

export { getFordelName } from "@/lib/fordeler";
export { normalizeSearchText as normalizeTilbudSearchText } from "@/lib/normalize-search";
export {
  formatTilbudDate,
  getTilbudSourceLinkLabel,
  isTilbudOptInProgram,
  TILBUD_OPT_IN_PROGRAMS,
  TILBUD_SORT_OPTIONS,
  type TilbudSortOption,
} from "@/lib/tilbud-ui";

function matchesTilbudQuery(entry: Tilbud, query: string): boolean {
  const fordelName = getFordelName(entry.fordelSlug);

  return matchesSearchTokens(
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
    query,
  );
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
  fordelName: string;
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
        fordelName: getFordelName(entry.fordelSlug),
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

export const TILBUD_PAGE_SIZE = 30;

export function parseTilbudPage(raw?: string | string[] | null): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function paginateGruppertTilbud<T>(
  items: T[],
  page: number,
  pageSize = TILBUD_PAGE_SIZE,
): { items: T[]; page: number; pageCount: number } {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageCount,
  };
}

/**
 * Ca. kroneverdi per poeng brukt ved sortering på «Høyest rabatt».
 * EuroBonus: Trumf oppgir 1 kr = 10 poeng; bonuskalkulatoren bruker 0,10 kr som målverdi.
 * Spenn: ingen fast kurs – samme tomelfingerregel for sammenlignbarhet med prosent.
 */
const POENG_KRONEVERDI: Record<string, number> = {
  eurobonus: 0.1,
  spenn: 0.1,
};

function parseOfferNumber(raw: string): number {
  return parseFloat(raw.replace(/\s/g, "").replace(",", "."));
}

/** Trekker ut sammenlignbart tall fra offerLabel, f.eks. «15–20 %» → 20 eller «3,8 Spenn / 10 kr» → 3,8 (ca. kr-verdi ved Spenn) */
export function parseOfferRate(
  offerLabel: string,
  fordelSlug?: string,
): number | null {
  const krPerPoeng = fordelSlug ? POENG_KRONEVERDI[fordelSlug] : undefined;

  const poengPerKronerMatch = offerLabel.match(
    /(?:opptil\s+)?([\d\s,.]+)(?:\s*[–-]\s*([\d\s,.]+))?\s*(?:poeng|spenn)\s*\/\s*(10|100)\s*kr?/i,
  );
  if (poengPerKronerMatch) {
    const low = parseOfferNumber(poengPerKronerMatch[1]);
    const high = poengPerKronerMatch[2]
      ? parseOfferNumber(poengPerKronerMatch[2])
      : low;
    const points = Math.max(low, high);
    const divisor = parseInt(poengPerKronerMatch[3], 10);
    const pointsPer100Kr = points * (100 / divisor);

    if (krPerPoeng) {
      // Poeng/Spenn per X kr → ca. kr-verdi per 100 kr, sammenlignbart med prosent rabatt
      return pointsPer100Kr * krPerPoeng;
    }

    return pointsPer100Kr;
  }

  if (krPerPoeng && /\d[\d\s,.]*\s*(?:poeng|spenn)/i.test(offerLabel)) {
    // Fast poengsum uten kjøpsbeløp – kan ikke sammenlignes rettferdig med prosent/kroneverdi
    return null;
  }

  const matches = offerLabel.match(/\d+[,.]?\d*/g);
  if (!matches?.length) return null;

  return Math.max(...matches.map((match) => parseOfferNumber(match)));
}

function getGroupBestRate(group: GruppertTilbud): number {
  const rates = group.offers
    .map((offer) => parseOfferRate(offer.offerLabel, offer.fordelSlug))
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
  includeOptIn = false,
): Tilbud[] {
  const normalizedQuery = query.trim();

  return entries.filter((entry) => {
    const isOptIn = isTilbudOptInProgram(entry.fordelSlug);

    if (includeOptIn) {
      // Vis studenttilbud. Hvis et medlemsprogram også er valgt, vis det i tillegg.
      const isSelectedProgram =
        Boolean(fordelSlug) && entry.fordelSlug === fordelSlug;
      if (!isOptIn && !isSelectedProgram) return false;
    } else {
      if (isOptIn) return false;
      if (fordelSlug && entry.fordelSlug !== fordelSlug) return false;
    }

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
