import type { Tilbud, ShoppingDetails } from "@/types/content";
import { normalizePartnerKey } from "./partner-key";
import { calculateShoppingBonus, hasCurrentVerifiedRate, DEFAULT_BONUS_SETTINGS, type BonusSettings } from "./netthandel";
export { normalizePartnerKey } from "./partner-key";
import { getFordelName } from "@/lib/fordeler";
import { matchesSearchTokens, normalizeSearchText } from "@/lib/normalize-search";
import { matchesTilbudCategoryGroup, isStudentTilbudCategory } from "@/lib/tilbud-categories";
import {
  isTilbudOptInProgram,
  getTilbudProgramSourceUrl,
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

export function getTilbudSearchText(entry: Tilbud, fordelName: string): string {
  return [
    entry.title,
    entry.description,
    entry.offerLabel,
    entry.partner,
    entry.category,
    entry.terms ?? "",
    entry.warning ?? "",
    ...(entry.searchTags ?? []),
    fordelName,
  ].join(" ");
}

function matchesTilbudQuery(entry: Tilbud, query: string): boolean {
  return matchesSearchTokens(
    getTilbudSearchText(entry, getFordelName(entry.fordelSlug)),
    query,
  );
}

/** Normaliserer partnernavn for å finne like tilbud på tvers av programmer */

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
  searchText: string;
  shopping?: ShoppingDetails;
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
      offers: sorted.map((entry) => {
        const fordelName = getFordelName(entry.fordelSlug);
        return {
          tilbudId: entry.id,
          fordelSlug: entry.fordelSlug,
          fordelName,
          offerLabel: entry.offerLabel,
          description: entry.description,
          category: entry.category,
          terms: entry.terms,
          sourceUrl: entry.sourceUrl ?? getTilbudProgramSourceUrl(entry.fordelSlug),
          warning: entry.warning,
          shopping: entry.shopping,
          searchText: getTilbudSearchText(entry, fordelName),
        };
      }),
      categories: [...new Set(sorted.map((entry) => entry.category))].sort((a, b) =>
        a.localeCompare(b, "nb"),
      ),
    });
  }

  return groups;
}

export const TILBUD_PAGE_SIZE = 30;

export function filterShoppingGroups(groups: GruppertTilbud[], flags: { online: boolean; multiple: boolean; verified: boolean }, settings: BonusSettings, now: string): GruppertTilbud[] {
  return groups.map(group => ({ ...group, offers: group.offers.filter(offer =>
    (!flags.online || Boolean(offer.shopping)) && (!flags.verified || Boolean(offer.shopping && hasCurrentVerifiedRate(offer.shopping, settings, now))))
  })).filter(group => group.offers.length > 0 && (!flags.multiple || new Set(group.offers.filter(o => o.shopping).map(o => o.fordelSlug)).size >= 2));
}

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

/** Prosentfordel eller anslått poengverdi per 100 kr. Priser og faste beløp er ikke sammenlignbare. */
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

  if (/øre/i.test(offerLabel)) {
    return null;
  }

  const percentages = [...offerLabel.matchAll(
    /(\d+(?:[,.]\d+)?)(?:\s*[–-]\s*(\d+(?:[,.]\d+)?))?\s*%/g,
  )];
  if (percentages.length) {
    return Math.max(...percentages.flatMap((match) =>
      [match[1], match[2]].filter(Boolean).map(parseOfferNumber),
    ));
  }

  if (/halv\s*pris|2\s+for\s+1/i.test(offerLabel)) return 50;

  return null;
}

function getGroupBestRate(group: GruppertTilbud, settings: BonusSettings, today: string): number {
  const rates = group.offers
    .map((offer) => offer.shopping ? calculateShoppingBonus(offer.shopping, settings, today)?.minPct ?? null : parseOfferRate(offer.offerLabel, offer.fordelSlug))
    .filter((rate): rate is number => rate !== null);

  return rates.length ? Math.max(...rates) : -1;
}

export function sortGruppertTilbud(
  groups: GruppertTilbud[],
  sort: TilbudSortOption,
  settings: BonusSettings = DEFAULT_BONUS_SETTINGS,
  today = new Date().toISOString().slice(0, 10),
): GruppertTilbud[] {
  const sorted = [...groups];

  switch (sort) {
    case "rate-desc":
      return sorted.sort((a, b) => {
        const diff = getGroupBestRate(b, settings, today) - getGroupBestRate(a, settings, today);
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

function getStudentSortTier(entry: Tilbud): number {
  if (entry.expiresAt) return 1;
  if (/gratis/i.test(`${entry.offerLabel} ${entry.description}`)) return 2;
  if (/%/.test(entry.offerLabel)) return 3;
  if (/studentpris|kr/i.test(entry.offerLabel)) return 4;
  return 5;
}

/** Standard sortering for studentfilteret: tidsbegrenset, gratis, prosent, pris, lokalt. */
export function sortStudentTilbud(entries: Tilbud[]): Tilbud[] {
  return [...entries].sort((a, b) => {
    const tierDiff = getStudentSortTier(a) - getStudentSortTier(b);
    if (tierDiff !== 0) return tierDiff;
    return a.partner.localeCompare(b.partner, "nb");
  });
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
      !matchesTilbudCategoryGroup(entry.category, categoryGroup) &&
      !(isStudentTilbudCategory(entry.category) && entry.category === categoryGroup)
    ) {
      return false;
    }
    if (!normalizedQuery) return true;

    return matchesTilbudQuery(entry, normalizedQuery);
  });
}
