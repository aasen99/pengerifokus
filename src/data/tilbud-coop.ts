import type { Tilbud } from "@/types/content";

const coopTerms =
  "Krever Coop-medlemskap. Sjekk gjeldende vilkår og bestilling hos Coop.";

/** Coop-medlemsfordeler */
export const coopTilbud: Tilbud[] = [
  {
    id: "tilbud-coop-1",
    slug: "coop-riksteatret-voksen",
    status: "published",
    title: "Riksteatret, voksenforestillinger",
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
    title: "Riksteatret, barne- og danseforestillinger",
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
  {
    id: "tilbud-coop-5",
    slug: "coop-drivstoff-circle-k",
    status: "published",
    title: "Circle K",
    description:
      "Coop-medlemmer får 45 øre per liter på betjent Circle K og 25 øre per liter på ubetjent Circle K. Rabatten trekkes på pumpa når medlemskapet er koblet i appen eller du betaler med Coop Mastercard.",
    offerLabel: "45 / 25 øre/l",
    partner: "Circle K",
    fordelSlug: "coop",
    category: "Drivstoff",
    searchTags: ["bensin", "diesel", "drivstoff", "pumpe"],
    terms:
      "Krever Coop-medlemskap koblet i Coop-appen eller betaling med Coop Mastercard. 45 øre/l på betjent Circle K, 25 øre/l på ubetjent. Er du også Circle K Extra-medlem, kan du få ekstra rabatt hos Circle K. Sjekk gjeldende sats i appen.",
    sourceUrl: "https://www.coop.no/medlemsfordeler/",
    warning:
      "Sammenlign nettopris: skiltpris minus rabatt. En dyr toppdag med Coop-rabatt kan fortsatt tape mot lav skiltpris et annet sted.",
    createdAt: "2026-08-28",
    updatedAt: "2026-08-28",
  },
  {
    id: "tilbud-coop-6",
    slug: "coop-drivstoff-yx",
    status: "published",
    title: "YX",
    description:
      "Coop-medlemmer får 45 øre per liter på betjent YX. Rabatten trekkes på pumpa når medlemskapet er koblet i appen eller du betaler med Coop Mastercard.",
    offerLabel: "45 øre/l",
    partner: "YX",
    fordelSlug: "coop",
    category: "Drivstoff",
    searchTags: ["bensin", "diesel", "drivstoff", "pumpe"],
    terms:
      "Krever Coop-medlemskap koblet i Coop-appen eller betaling med Coop Mastercard. Gjelder betjent YX. Sjekk gjeldende vilkår hos Coop.",
    sourceUrl: "https://www.coop.no/medlemsfordeler/",
    warning:
      "Sammenlign nettopris: skiltpris minus rabatt. En dyr toppdag med Coop-rabatt kan fortsatt tape mot lav skiltpris et annet sted.",
    createdAt: "2026-08-28",
    updatedAt: "2026-08-28",
  },
];
