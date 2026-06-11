import type { Fordel } from "@/types/content";

/**
 * CMS/ADMIN: Erstatt med database/API. Admin kan legge til og redigere fordelsprogrammer.
 */
export const fordeler: Fordel[] = [
  {
    id: "fordel-1",
    slug: "trumf",
    status: "published",
    featured: true,
    name: "Trumf",
    description:
      "Bonusprogram fra dagligvarekjeder. Samle poeng på mat og få rabatt på neste handel.",
    type: "Bonusprogram",
    useCase: "Dagligvarer og hverdagskjøp",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
  {
    id: "fordel-2",
    slug: "coop",
    status: "published",
    name: "Coop",
    description:
      "Medlemsfordeler og utbytte i Coop-kjeden. Bonus avhenger av medlemskap og kjøp.",
    type: "Medlemsfordel",
    useCase: "Dagligvarer og medlemsrabatter",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
  {
    id: "fordel-3",
    slug: "strawberry",
    status: "published",
    name: "Strawberry",
    description:
      "Hotellkjedens lojalitetsprogram med poeng på overnatting og fordeler for medlemmer.",
    type: "Lojalitetsprogram",
    useCase: "Hotell og reise",
    createdAt: "2025-01-12",
    updatedAt: "2025-01-12",
  },
  {
    id: "fordel-4",
    slug: "eurobonus",
    status: "published",
    name: "EuroBonus",
    description:
      "SAS sitt bonusprogram for flyreiser. Samle poeng og bruk dem på billetter og oppgraderinger.",
    type: "Flybonus",
    useCase: "Flyreiser og reise",
    createdAt: "2025-01-12",
    updatedAt: "2025-01-12",
  },
  {
    id: "fordel-5",
    slug: "revolut",
    status: "published",
    name: "Revolut",
    description:
      "Digital bank med valutaveksling, cashback og reisefordeler avhengig av abonnement.",
    type: "Fintech",
    useCase: "Reise, valuta og dagligbank",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "fordel-6",
    slug: "kredittkortfordeler",
    status: "published",
    name: "Kredittkortfordeler",
    description:
      "Oversikt over bonus, reiseforsikring og andre fordeler knyttet til kredittkort.",
    type: "Kredittkort",
    useCase: "Hverdagskjøp, reise og forsikring",
    createdAt: "2025-01-18",
    updatedAt: "2025-01-18",
  },
];
