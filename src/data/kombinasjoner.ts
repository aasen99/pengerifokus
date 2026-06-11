import type { Kombinasjon } from "@/types/content";

/**
 * CMS/ADMIN: Kombinasjoner er kjernen i konseptet – admin kan opprette anbefalte oppsett
 * med koblede produkter, guider og fordeler.
 */
export const kombinasjoner: Kombinasjon[] = [
  {
    id: "komb-1",
    slug: "beste-startoppsett-nybegynnere",
    status: "published",
    featured: true,
    title: "Beste startoppsett for nybegynnere",
    description:
      "Bufferkonto, enkel fondssparing og riktig kredittkort – tre byggesteiner for en trygg start.",
    items: ["Bufferkonto", "Indeksfond", "Bonuskort uten årsavgift"],
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
  },
  {
    id: "komb-2",
    slug: "smart-hverdagsokonomi",
    status: "published",
    featured: true,
    title: "Smart oppsett for hverdagsøkonomi",
    description:
      "Kombiner dagligvarebonus, cashback-kort og budsjettverktøy for maksimal effekt i hverdagen.",
    items: ["Trumf", "Cashback-kort", "Budsjettapp"],
    createdAt: "2025-01-22",
    updatedAt: "2025-01-22",
  },
  {
    id: "komb-3",
    slug: "bonusoppsett-reise",
    status: "published",
    title: "Bonusoppsett for reise",
    description:
      "Samle poeng via Spenn og EuroBonus, og bruk reisekort for valuta og forsikring.",
    items: ["EuroBonus", "Spenn", "Reisekredittkort"],
    createdAt: "2025-01-25",
    updatedAt: "2025-01-25",
  },
  {
    id: "komb-4",
    slug: "gjeldsnedbetalingsoppsett",
    status: "published",
    title: "Gjeldsnedbetalingsoppsett",
    description:
      "Prioriter dyr gjeld, refinansier der det lønner seg, og bygg buffer underveis.",
    items: ["Nedbetalingsplan", "Refinansiering", "Nødfond"],
    createdAt: "2025-01-28",
    updatedAt: "2025-01-28",
  },
  {
    id: "komb-5",
    slug: "buffer-fond-kredittkort",
    status: "published",
    title: "Buffer + fond + kredittkort-strategi",
    description:
      "Tre lag med økonomisk trygghet: nødfond for kortsikt, fond for langsikt, og kort for hverdag.",
    items: ["3–6 mnd buffer", "Månedlig fondssparing", "Bonuskort med forsikring"],
    createdAt: "2025-02-01",
    updatedAt: "2025-02-01",
  },
];
