import {
  FORBES_BILLIONAIRES_SOURCE,
  FORBES_BILLIONAIRES_URL,
  KAPITAL_400_SOURCE,
  KAPITAL_400_URL,
} from "@/data/formuesbyggere-labels";
import type { FormuesbyggerSource, FormuesbyggerSourceTier } from "@/types/formuesbygger";

/** Sorteringsrekkefølge — lavere tall vises først */
export const SOURCE_TIER_ORDER: Record<FormuesbyggerSourceTier, number> = {
  primary: 0,
  secondary: 1,
  tertiary: 2,
  quaternary: 3,
  trace: 99,
};

/** Visningsetiketter i UI */
export const SOURCE_TIER_LABELS: Record<
  Exclude<FormuesbyggerSourceTier, "trace">,
  string
> = {
  primary: "Primærkilder",
  secondary: "Børsmeldinger og oppkjøp",
  tertiary: "Kapital, Forbes, Reuters, DN, E24",
  quaternary: "Intervjuer",
};

export const SOURCE_TIER_DESCRIPTIONS: Record<
  Exclude<FormuesbyggerSourceTier, "trace">,
  string
> = {
  primary: "Årsrapport, SEC, Brønnøysund",
  secondary: "Børsmelding eller oppkjøpsmelding",
  tertiary: "Kapital, Forbes, Reuters, DN, E24",
  quaternary: "Intervju",
};

/** Kildehierarki: Wikipedia og formueblogger brukes kun til å finne spor — aldri som hovedkilde. */
export function kapital400Source(): FormuesbyggerSource {
  return {
    label: KAPITAL_400_SOURCE,
    url: KAPITAL_400_URL,
    tier: "tertiary",
  };
}

export function forbesBillionairesSource(): FormuesbyggerSource {
  return {
    label: FORBES_BILLIONAIRES_SOURCE,
    url: FORBES_BILLIONAIRES_URL,
    tier: "tertiary",
  };
}

export function normalizeArticleSources(
  sources: FormuesbyggerSource[],
): FormuesbyggerSource[] {
  return sources
    .filter((source) => source.tier !== "trace")
    .sort(
      (a, b) => SOURCE_TIER_ORDER[a.tier] - SOURCE_TIER_ORDER[b.tier],
    );
}

export function groupSourcesByTier(
  sources: FormuesbyggerSource[],
): Partial<
  Record<Exclude<FormuesbyggerSourceTier, "trace">, FormuesbyggerSource[]>
> {
  const grouped: Partial<
    Record<Exclude<FormuesbyggerSourceTier, "trace">, FormuesbyggerSource[]>
  > = {};

  for (const source of normalizeArticleSources(sources)) {
    const tier = source.tier as Exclude<FormuesbyggerSourceTier, "trace">;
    grouped[tier] = grouped[tier] ?? [];
    grouped[tier]!.push(source);
  }

  return grouped;
}

export const SOURCE_TIER_DISPLAY_ORDER: Exclude<
  FormuesbyggerSourceTier,
  "trace"
>[] = ["primary", "secondary", "tertiary", "quaternary"];
