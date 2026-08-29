/**
 * Overordnede kategorier for filtrering på tilbudssiden.
 * Enkelt-tilbud beholder sin spesifikke category i data.
 */
export const TILBUD_CATEGORY_GROUPS = {
  "Reise og hotell": ["Reise", "Hotell", "Transport"],
  "Bil": ["Bil", "Drivstoff"],
  "Helse og velvære": ["Helse", "Optikk"],
  "Bolig": ["Interiør", "Bolig", "Byggevare", "Strøm"],
  "Elektronikk": ["Elektronikk", "Programvare"],
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
    "Utdanning",
    "Abonnement",
  ],
  "Mobil og forsikring": ["Mobil", "Forsikring", "Bank"],
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
  entries: Array<{ category: string }>,
): TilbudCategoryGroupOption[] {
  const counts = new Map<TilbudCategoryGroup, number>();

  for (const entry of entries) {
    const group = getTilbudCategoryGroup(entry.category);
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

/** Kategorier brukt direkte på studenttilbud (filtrering på /tilbud?program=student). */
export const STUDENT_TILBUD_CATEGORIES = [
  "Mat og restaurant",
  "Transport",
  "Mobil og abonnement",
  "PC og elektronikk",
  "Programvare",
  "Pensum",
  "Trening og helse",
  "Bank og forsikring",
  "Medlemskap",
  "Rabattportaler",
  "Netthandel",
  "Underholdning",
] as const;

export type StudentTilbudCategory = (typeof STUDENT_TILBUD_CATEGORIES)[number];

export function isStudentTilbudCategory(
  category: string,
): category is StudentTilbudCategory {
  return (STUDENT_TILBUD_CATEGORIES as readonly string[]).includes(category);
}

export function getStudentTilbudCategoryOptions(
  entries: Array<{ category: string }>,
): { group: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    if (!isStudentTilbudCategory(entry.category)) continue;
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }
  return STUDENT_TILBUD_CATEGORIES.filter((category) => counts.has(category)).map(
    (group) => ({
      group,
      count: counts.get(group)!,
    }),
  );
}
