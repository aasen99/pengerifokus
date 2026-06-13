import type { Tilbud } from "@/types/content";

const coopTerms =
  "Krever Coop-medlemskap. Sjekk gjeldende vilkår og bestilling hos Coop.";

/** Coop-medlemsfordeler */
export const coopTilbud: Tilbud[] = [
  {
    id: "tilbud-coop-1",
    slug: "coop-riksteatret-voksen",
    status: "published",
    title: "Riksteatret – voksenforestillinger",
    description:
      "100 kr rabatt på voksenforestillinger for Coop-medlemmer hos Riksteatret.",
    offerLabel: "100 kr rabatt",
    partner: "Riksteatret",
    fordelSlug: "coop",
    category: "Kultur",
    terms: coopTerms,
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "tilbud-coop-2",
    slug: "coop-riksteatret-barn",
    status: "published",
    title: "Riksteatret – barne- og danseforestillinger",
    description:
      "50 kr rabatt på barne- og danseforestillinger for Coop-medlemmer hos Riksteatret.",
    offerLabel: "50 kr rabatt",
    partner: "Riksteatret",
    fordelSlug: "coop",
    category: "Kultur",
    terms: coopTerms,
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "tilbud-coop-3",
    slug: "coop-eliteserien",
    status: "published",
    title: "Eliteserien",
    description:
      "Kampbilletter til maks 100 kr for voksne og 50 kr for barn for Coop-medlemmer i Eliteserien.",
    offerLabel: "Maks 100 kr / 50 kr",
    partner: "Eliteserien",
    fordelSlug: "coop",
    category: "Sport og event",
    terms: coopTerms,
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "tilbud-coop-4",
    slug: "coop-toppserien",
    status: "published",
    title: "Toppserien",
    description:
      "Kampbilletter til maks 100 kr for voksne og 50 kr for barn for Coop-medlemmer i Toppserien.",
    offerLabel: "Maks 100 kr / 50 kr",
    partner: "Toppserien",
    fordelSlug: "coop",
    category: "Sport og event",
    terms: coopTerms,
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
];
