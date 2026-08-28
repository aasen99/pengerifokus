import type { Tilbud } from "@/types/content";

const checkedAt = "2026-08-28";

/** Circle K Extra: drivstoff- og laderabatt etter besøk. */
export const circleKExtraTilbud: Tilbud[] = [
  {
    id: "tilbud-circle-k-extra-1",
    slug: "circle-k-extra-drivstoff",
    status: "published",
    title: "Circle K",
    description:
      "Circle K Extra gir 30 øre per liter fra start, 40 øre per liter etter 8 besøk og 45 øre per liter etter 15 besøk de siste 90 dagene. Samme nivå gjelder typisk drivstoff og lading.",
    offerLabel: "30–45 øre/l",
    partner: "Circle K",
    fordelSlug: "circle-k-extra",
    category: "Drivstoff",
    searchTags: ["bensin", "diesel", "lading", "elbil", "pumpe"],
    terms:
      "Gratis medlemskap via Circle K-appen. Besøk telles uansett kjøp – også is og kaffe. Registrer medlemskap eller betaling i appen, ellers telles ikke besøket. Sjekk gjeldende nivå i appen.",
    sourceUrl: "https://www.circlek.no/extra",
    warning:
      "Sammenlign nettopris: skiltpris minus Extra-rabatt. En dyr toppdag med høyt nivå kan fortsatt tape mot lav skiltpris et annet sted.",
    createdAt: checkedAt,
    updatedAt: checkedAt,
  },
];
