import type { Tilbud } from "@/types/content";
import { getFordeler } from "@/lib/content";

export function filterTilbud(
  entries: Tilbud[],
  query: string,
  fordelSlug: string | null,
  category: string | null,
): Tilbud[] {
  const normalizedQuery = query.trim().toLowerCase();

  return entries.filter((entry) => {
    if (fordelSlug && entry.fordelSlug !== fordelSlug) return false;
    if (category && entry.category !== category) return false;
    if (!normalizedQuery) return true;

    const fordelName =
      getFordeler().find((f) => f.slug === entry.fordelSlug)?.name ?? "";

    const searchable = [
      entry.title,
      entry.description,
      entry.offerLabel,
      entry.partner,
      entry.category,
      entry.terms ?? "",
      fordelName,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function getTilbudCategories(entries: Tilbud[]): string[] {
  return [...new Set(entries.map((entry) => entry.category))].sort((a, b) =>
    a.localeCompare(b, "nb"),
  );
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
