import type { OrdbokEntry } from "@/types/content";

/** CMS/ADMIN: Søk og filtrering kan senere flyttes til server/database */
export function filterOrdbok(
  entries: OrdbokEntry[],
  query: string,
  category: string | null,
): OrdbokEntry[] {
  const normalizedQuery = query.trim().toLowerCase();

  return entries.filter((entry) => {
    if (category && entry.category !== category) return false;
    if (!normalizedQuery) return true;

    const searchable = [
      entry.term,
      entry.definition,
      entry.category,
      ...(entry.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
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
