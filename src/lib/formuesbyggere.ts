import {
  BUILD_TYPE_LABELS,
  INDUSTRY_LABELS,
  REGION_LABELS,
} from "@/data/formuesbyggere-labels";
import type {
  FormuesbyggerBuildType,
  FormuesbyggerIndustry,
  FormuesbyggerRegion,
} from "@/types/formuesbygger";
import type { Formuesbygger } from "@/types/formuesbygger";
import { formatWealthEstimate, getWealthSortValue } from "@/lib/wealth-estimate";
import {
  formatLifecycleCompact,
  formatLifecycleFull,
} from "@/lib/formuesbygger-lifecycle";

export type FormuesbyggerSortOption =
  | "wealth-desc"
  | "wealth-asc"
  | "name-asc"
  | "surname-asc"
  | "region-asc"
  | "industry-asc"
  | "build-type-asc";

export const FORMUESBYGGER_SORT_OPTIONS: {
  value: FormuesbyggerSortOption;
  label: string;
}[] = [
  { value: "wealth-desc", label: "Formue (høyest først)" },
  { value: "wealth-asc", label: "Formue (lavest først)" },
  { value: "name-asc", label: "Navn A–Å" },
  { value: "surname-asc", label: "Etternavn A–Å" },
  { value: "region-asc", label: "Region" },
  { value: "industry-asc", label: "Bransje" },
  { value: "build-type-asc", label: "Byggetype" },
];

export function getFormuesbyggerSurname(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] ?? name;
}

export function filterFormuesbyggere(
  entries: Formuesbygger[],
  query: string,
  region: FormuesbyggerRegion | null,
  industry: FormuesbyggerIndustry | null,
  buildType: FormuesbyggerBuildType | null,
): Formuesbygger[] {
  const normalizedQuery = query.trim().toLowerCase();

  return entries.filter((entry) => {
    if (region && entry.region !== region) return false;
    if (industry && entry.industry !== industry) return false;
    if (buildType && entry.buildType !== buildType) return false;

    if (!normalizedQuery) return true;

    const haystack = [
      entry.name,
      entry.tagline,
      entry.wealthContext,
      formatWealthEstimate(entry.wealthEstimate),
      entry.industry,
      entry.buildType,
      entry.region,
      formatLifecycleFull(entry) ?? "",
      formatLifecycleCompact(entry) ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

function compareByName(a: Formuesbygger, b: Formuesbygger): number {
  return a.name.localeCompare(b.name, "nb");
}

function compareBySurname(a: Formuesbygger, b: Formuesbygger): number {
  const diff = getFormuesbyggerSurname(a.name).localeCompare(
    getFormuesbyggerSurname(b.name),
    "nb",
  );
  return diff !== 0 ? diff : compareByName(a, b);
}

export function sortFormuesbyggere(
  entries: Formuesbygger[],
  sort: FormuesbyggerSortOption = "wealth-desc",
): Formuesbygger[] {
  const sorted = [...entries];

  switch (sort) {
    case "wealth-asc":
      return sorted.sort((a, b) => {
        const diff = getWealthSortValue(a.wealthEstimate) - getWealthSortValue(b.wealthEstimate);
        return diff !== 0 ? diff : compareBySurname(a, b);
      });
    case "name-asc":
      return sorted.sort(compareByName);
    case "surname-asc":
      return sorted.sort(compareBySurname);
    case "region-asc":
      return sorted.sort((a, b) => {
        const diff = REGION_LABELS[a.region].localeCompare(REGION_LABELS[b.region], "nb");
        return diff !== 0 ? diff : compareBySurname(a, b);
      });
    case "industry-asc":
      return sorted.sort((a, b) => {
        const diff = INDUSTRY_LABELS[a.industry].localeCompare(
          INDUSTRY_LABELS[b.industry],
          "nb",
        );
        return diff !== 0 ? diff : compareBySurname(a, b);
      });
    case "build-type-asc":
      return sorted.sort((a, b) => {
        const diff = BUILD_TYPE_LABELS[a.buildType].localeCompare(
          BUILD_TYPE_LABELS[b.buildType],
          "nb",
        );
        return diff !== 0 ? diff : compareBySurname(a, b);
      });
    case "wealth-desc":
    default:
      return sorted.sort((a, b) => {
        const diff = getWealthSortValue(b.wealthEstimate) - getWealthSortValue(a.wealthEstimate);
        return diff !== 0 ? diff : compareBySurname(a, b);
      });
  }
}
