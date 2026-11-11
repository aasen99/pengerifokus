import type { Tilbud } from "@/types/content";

const checkedAt = "2026-11-11";

/** Circle K Extra: drivstoff- og laderabatt etter besøk. */
export const circleKExtraTilbud: Tilbud[] = [
  {
    id: "tilbud-circle-k-extra-1",
    slug: "circle-k-extra-drivstoff",
    status: "published",
    title: "Circle K",
    description:
      "Circle K Extra gir 30 øre/l på nivå 1 (0–7 besøk), 40 øre/l på nivå 2 (8–14 besøk) og 45 øre/l på nivå 3 (15+ besøk). Nivået styres av tellende besøk siste 90 dager. Tilsvarende satser på lading: 30, 40 og 45 øre/kWh.",
    offerLabel: "30–45 øre/l",
    partner: "Circle K",
    fordelSlug: "circle-k-extra",
    category: "Drivstoff",
    searchTags: ["bensin", "diesel", "lading", "elbil", "pumpe"],
    terms:
      "Gratis medlemskap via Circle K-appen. Rabatten på drivstoff gjelder bemannede Circle K-stasjoner. Ett kjøp/én kvittering teller som ett besøk, maksimalt fem per kalenderdag. Besøk siste rullerende 90 dager bestemmer nivået. Velg en belønning etter hvert femte besøk. Sjekk sats, registrering og vilkår i appen.",
    sourceUrl: "https://www.circlek.no/extra",
    warning:
      "Sammenlign nettopris: skiltpris minus Extra-rabatt. Coop-medlemsbonus på drivstoff kan ikke uten videre kombineres med Extra-rabatt. En dyr stasjon med høy rabatt kan fortsatt tape mot lav skiltpris et annet sted.",
    createdAt: checkedAt,
    updatedAt: checkedAt,
  },
];
