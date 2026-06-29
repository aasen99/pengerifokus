import type {
  FormuesbyggerBuildType,
  FormuesbyggerIndustry,
  FormuesbyggerRegion,
} from "@/types/formuesbygger";
import type { Formuesbygger } from "@/types/formuesbygger";
import { formatWealthEstimate } from "@/lib/wealth-estimate";

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
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function sortFormuesbyggere(entries: Formuesbygger[]): Formuesbygger[] {
  return [...entries].sort((a, b) => a.name.localeCompare(b.name, "nb"));
}
