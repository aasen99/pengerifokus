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
      "Oversikt over Trumf-bonus, Trumf Pay, Trippel-Trumf, uttak til bankkonto og fordeler hos dagligvarekjeder og partnere.",
    type: "Bonusprogram",
    useCase: "Dagligvarer og hverdagskjøp",
    createdAt: "2025-01-10",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-2",
    slug: "coop",
    status: "published",
    name: "Coop",
    description:
      "Oversikt over Coop Medlem, kjøpeutbytte, medlemskonto, samvirkelagssatser, Extra-fordeler og Coop Mastercard.",
    type: "Medlemsfordel",
    useCase: "Dagligvarer og medlemsrabatter",
    createdAt: "2025-01-10",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-7",
    slug: "obos",
    status: "published",
    featured: true,
    name: "OBOS",
    description:
      "Oversikt over OBOS-medlemskap: pris, forkjøpsrett, OBOS-appen og medlemsrabatter på reise, forsikring, byggevarer og kultur.",
    type: "Medlemsfordel",
    useCase: "Bolig, reise og hverdagsrabatter",
    createdAt: "2026-06-11",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-8",
    slug: "naf",
    status: "published",
    featured: true,
    name: "NAF",
    description:
      "Oversikt over NAF-medlemskap: veihjelp, nøkkelforsikring, pris og rabatter på bil, reise, hotell og hverdagstjenester.",
    type: "Medlemsfordel",
    useCase: "Bil, reise og medlemsrabatter",
    createdAt: "2026-06-11",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-9",
    slug: "klarna",
    status: "published",
    featured: true,
    name: "Klarna",
    description:
      "Slik fungerer Klarna cashback: opptjening i appen, Krav om Klarna-saldo, utbetalingstid og vanlige fallgruver.",
    type: "Cashback",
    useCase: "Netthandel",
    createdAt: "2026-06-11",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-3",
    slug: "spenn",
    status: "published",
    name: "Spenn",
    description:
      "Felles poengvaluta hos Norwegian, Strawberry og REMA 1000. Slik tjener og bruker du Spenn – og hvorfor verdien varierer.",
    type: "Lojalitetsprogram",
    useCase: "Reise, hotell og dagligvarer",
    createdAt: "2025-01-12",
    updatedAt: "2026-07-02",
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
