import { matchesSearchTokens } from "@/lib/normalize-search";
import type { GruppertTilbud } from "@/lib/tilbud";
import { normalizePartnerKey } from "./partner-key";

/** Filtrerer ferdig grupperte tilbud uten å gå via serveren. */
export function filterGruppertTilbudByQuery(
  groups: GruppertTilbud[],
  query: string,
): GruppertTilbud[] {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return groups;
  // A merchant name (including a known alias) returns every channel together.
  const exact = groups.filter(group => group.key === normalizePartnerKey(normalizedQuery));
  if (exact.length) return exact;

  const next: GruppertTilbud[] = [];

  for (const group of groups) {
    const offers = group.offers.filter((offer) =>
      matchesSearchTokens(offer.searchText, normalizedQuery),
    );
    if (offers.length === 0) continue;

    next.push({
      ...group,
      offers,
      categories: [...new Set(offers.map((offer) => offer.category))].sort(
        (a, b) => a.localeCompare(b, "nb"),
      ),
    });
  }

  return next;
}
