import type { OrdbokEntry } from "@/types/content";
import { normalizeTilbudSearchText } from "@/lib/tilbud";

function matchesOrdbokQuery(entry: OrdbokEntry, query: string): boolean {
  const searchable = normalizeTilbudSearchText(
    [
      entry.term,
      entry.definition,
      entry.category,
      ...(entry.tags ?? []),
    ].join(" "),
  );

  const tokens = normalizeTilbudSearchText(query)
    .split(/\s+/)
    .filter(Boolean);

  return tokens.every((token) => searchable.includes(token));
}

/** CMS/ADMIN: Søk og filtrering kan senere flyttes til server/database */
export function filterOrdbok(
  entries: OrdbokEntry[],
  query: string,
  category: string | null,
): OrdbokEntry[] {
  const normalizedQuery = query.trim();

  return entries.filter((entry) => {
    if (category && entry.category !== category) return false;
    if (!normalizedQuery) return true;

    return matchesOrdbokQuery(entry, normalizedQuery);
  });
}

export function getOrdbokCategories(entries: OrdbokEntry[]): string[] {
  return [...new Set(entries.map((entry) => entry.category))].sort((a, b) =>
    a.localeCompare(b, "nb"),
  );
}

export function sortOrdbokEntries(entries: OrdbokEntry[]): OrdbokEntry[] {
  return [...entries].sort((a, b) => a.term.localeCompare(b.term, "nb"));
}
