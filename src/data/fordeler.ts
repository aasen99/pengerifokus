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
    id: "fordel-13",
    slug: "usbl",
    status: "published",
    name: "Usbl",
    description:
      "Boligbyggelag på Østlandet med forkjøpsrett, bonus via Bonabo og medlemsrabatter på blant annet forsikring, byggevare, strøm og fritid.",
    type: "Medlemsfordel",
    useCase: "Bolig, ansiennitet og hverdagsrabatter",
    createdAt: "2026-07-16",
    updatedAt: "2026-07-16",
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
    id: "fordel-14",
    slug: "student",
    status: "published",
    name: "Student",
    description:
      "Generell oversikt over studentrabatter: studentbevis, bank, forsikring, fagforening, netthandel og hvordan du vurderer om rabatten lønner seg.",
    type: "Studentrabatt",
    useCase: "Studier, bank og hverdagsrabatter",
    createdAt: "2026-07-17",
    updatedAt: "2026-07-17",
  },
  {
    id: "fordel-3",
    slug: "spenn",
    status: "published",
    name: "Spenn",
    description:
      "Felles poengvaluta hos Norwegian, Strawberry og REMA 1000. Slik tjener og bruker du Spenn, og hvorfor verdien varierer.",
    type: "Lojalitetsprogram",
    useCase: "Reise, hotell og dagligvarer",
    createdAt: "2025-01-12",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-11",
    slug: "norwegian-reward",
    status: "published",
    name: "Norwegian Reward",
    description:
      "Norwegians flymedlemskap med Spenn-opptjening, valgbare flyfordeler og Priority etter mange flyvninger på 12 måneder.",
    type: "Flybonus",
    useCase: "Flyreiser med Norwegian og Widerøe",
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
  },
  {
    id: "fordel-12",
    slug: "strawberry",
    status: "published",
    name: "Strawberry",
    description:
      "Hotellmedlemskap med nivåene Blue, Silver, Gold og Platinum. Tjen Spenn med tier booster og få hotellfordeler ved direktebooking.",
    type: "Hotellmedlemskap",
    useCase: "Hotell og reise",
    createdAt: "2026-07-10",
    updatedAt: "2026-07-10",
  },
  {
    id: "fordel-4",
    slug: "eurobonus",
    status: "published",
    name: "EuroBonus",
    description:
      "EuroBonus forklart med offisielle kilder: poeng, nivåer, SkyTeam, Widerøe-endringen, Trumf og når poeng gir verdi for vanlige reisende.",
    type: "Flybonus",
    useCase: "Flyreiser og reise",
    createdAt: "2025-01-12",
    updatedAt: "2026-07-10",
  },
  {
    id: "fordel-5",
    slug: "revolut",
    status: "published",
    name: "Revolut",
    description:
      "Oversikt over Revolut: planer, valutaveksling, RevPoints, reiseforsikring og når betalt abonnement lønner seg.",
    type: "Fintech",
    useCase: "Reise, valuta og dagligbank",
    createdAt: "2025-01-15",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-10",
    slug: "bankfordeler",
    status: "published",
    name: "Bankfordeler",
    description:
      "Oversikt over bankenes kundeprogrammer: DNB Ung, Pluss, SAGA, Nordea Premium og fagforeningsavtaler.",
    type: "Bank",
    useCase: "Lønnskonto, kort og kundeprogram",
    createdAt: "2026-07-02",
    updatedAt: "2026-07-02",
  },
  {
    id: "fordel-6",
    slug: "kredittkortfordeler",
    status: "published",
    name: "Kredittkortfordeler",
    description:
      "Oversikt over kredittkortfordeler: bonus, forsikring, gebyrer og når kortet faktisk lønner seg.",
    type: "Kredittkort",
    useCase: "Hverdagskjøp, reise og forsikring",
    createdAt: "2025-01-18",
    updatedAt: "2026-07-02",
  },
];
