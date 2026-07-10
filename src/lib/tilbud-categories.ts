/**
 * Overordnede kategorier for filtrering på tilbudssiden.
 * Enkelt-tilbud beholder sin spesifikke category i data.
 */
export const TILBUD_CATEGORY_GROUPS = {
  "Reise og hotell": ["Reise", "Hotell", "Transport"],
  "Bil": ["Bil"],
  "Helse og velvære": ["Helse", "Optikk"],
  "Bolig": ["Interiør", "Bolig", "Byggevare"],
  "Elektronikk": ["Elektronikk"],
  "Shopping": ["Mote", "Netthandel"],
  "Fritid og opplevelser": [
    "Fritid",
    "Underholdning",
    "Opplevelser",
    "Kultur",
    "Sport",
    "Sport og event",
    "Restaurant",
    "Matlevering",
  ],
  "Mobil og forsikring": ["Mobil", "Forsikring"],
  Cashback: ["Cashback"],
} as const;

export type TilbudCategoryGroup = keyof typeof TILBUD_CATEGORY_GROUPS;

const categoryToGroup = new Map<string, TilbudCategoryGroup>();

for (const [group, categories] of Object.entries(TILBUD_CATEGORY_GROUPS)) {
  for (const category of categories) {
    categoryToGroup.set(category, group as TilbudCategoryGroup);
  }
}

export function getTilbudCategoryGroup(
  category: string,
): TilbudCategoryGroup | null {
  return categoryToGroup.get(category) ?? null;
}

export function matchesTilbudCategoryGroup(
  category: string,
  group: string,
): boolean {
  const members =
    TILBUD_CATEGORY_GROUPS[group as TilbudCategoryGroup] ?? [group];
  return (members as readonly string[]).includes(category);
}

export interface TilbudCategoryGroupOption {
  group: TilbudCategoryGroup;
  count: number;
}

export function getTilbudCategoryGroupOptions(
  categories: string[],
): TilbudCategoryGroupOption[] {
  const counts = new Map<TilbudCategoryGroup, number>();

  for (const category of categories) {
    const group = getTilbudCategoryGroup(category);
    if (!group) continue;
    counts.set(group, (counts.get(group) ?? 0) + 1);
  }

  return Object.keys(TILBUD_CATEGORY_GROUPS)
    .filter((group): group is TilbudCategoryGroup =>
      counts.has(group as TilbudCategoryGroup),
    )
    .map((group) => ({
      group,
      count: counts.get(group)!,
    }))
    .sort((a, b) => a.group.localeCompare(b.group, "nb"));
}
