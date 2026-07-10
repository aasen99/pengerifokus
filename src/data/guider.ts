import type { Guide } from "@/types/content";

/**
 * CMS/ADMIN: Erstatt denne statiske listen med data fra database/API.
 * Admin kan opprette, redigere og sette status (published/draft) på guider.
 */
export const guider: Guide[] = [
  {
    id: "guide-1",
    slug: "bygg-bufferkonto",
    status: "published",
    featured: true,
    title: "Bygg bufferkonto",
    description:
      "Lær hvordan du bygger en nødfond som tåler uforutsette utgifter uten å måtte ta opp lån.",
    category: "Sparing",
    tags: ["buffer", "nødfond", "grunnmur"],
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "guide-2",
    slug: "kom-i-gang-med-fond",
    status: "published",
    featured: true,
    title: "Kom i gang med fond",
    description:
      "En enkel introduksjon til fondssparing, fra første krone til langsiktig vekst.",
    category: "Investering",
    tags: ["fond", "aksjesparing", "langsiktig"],
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20",
  },
  {
    id: "guide-11",
    slug: "bankenes-fordelsprogrammer",
    status: "published",
    title: "Bankenes fordelsprogrammer",
    description:
      "Bankfordeler er lojalitetsprogrammer, ikke veldedighet. Slik vurderer du DNB, Nordea og fagforeningsavtaler.",
    category: "Bank",
    tags: ["bank", "dnb", "nordea", "premium", "fagforening"],
    createdAt: "2026-07-02",
    updatedAt: "2026-07-02",
  },
  {
    id: "guide-10",
    slug: "kredittkort-eller-debetkort",
    status: "published",
    title: "Kredittkort får konkurranse fra betalte debetkort",
    description:
      "Trenger du egentlig kredittkort? Slik sammenligner du betalte debetkort og premium-kredittkort på reise, bonus og pris.",
    category: "Kredittkort",
    tags: ["kredittkort", "debetkort", "revolut", "klarna", "reiseforsikring"],
    createdAt: "2026-07-02",
    updatedAt: "2026-07-02",
  },
  {
    id: "guide-3",
    slug: "velg-riktig-kredittkort",
    status: "published",
    title: "Velg riktig kredittkort",
    description:
      "Enkel bruker eller bonusjeger? Slik velger du kort etter forbruk, mål og om du betaler hele fakturaen.",
    category: "Kredittkort",
    tags: ["kredittkort", "bonus", "cashback", "trumf", "eurobonus"],
    createdAt: "2025-02-01",
    updatedAt: "2026-07-02",
  },
  {
    id: "guide-4",
    slug: "kutt-faste-kostnader",
    status: "published",
    title: "Kutt faste kostnader",
    description:
      "Gå systematisk gjennom abonnementer og faste utgifter for å frigjøre penger hver måned.",
    category: "Budsjett",
    tags: ["budsjett", "abonnement", "sparing"],
    createdAt: "2025-02-10",
    updatedAt: "2025-02-10",
  },
  {
    id: "guide-5",
    slug: "betal-ned-dyr-gjeld",
    status: "published",
    title: "Betal ned dyr gjeld",
    description:
      "Prioriter gjeld med høy rente og lag en plan som faktisk fungerer i hverdagen.",
    category: "Gjeld",
    tags: ["gjeld", "rente", "nedbetaling"],
    createdAt: "2025-02-15",
    updatedAt: "2025-02-15",
  },
  {
    id: "guide-7",
    slug: "forstaa-okonomisk-helse",
    status: "published",
    featured: true,
    title: "Forstå økonomisk helse",
    description:
      "Hva er økonomisk helse, og hvordan kan en rask sjekk vise hvor robust privatøkonomien din er?",
    category: "Økonomi",
    tags: ["økonomisk helse", "buffer", "gjeld", "sparing"],
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "guide-8",
    slug: "eie-eller-leie-bolig",
    status: "published",
    featured: true,
    title: "Eie eller leie bolig?",
    description:
      "Når lønner det seg å kjøpe, og hva bør du tenke på utover månedlig husleie og terminbeløp?",
    category: "Bolig",
    tags: ["eie", "leie", "boligkjøp", "egenkapital"],
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "guide-9",
    slug: "inflasjon-og-gjeld",
    status: "published",
    title: "Inflasjon og gjeld",
    description:
      "Hvorfor kan lån føles lettere over tid, og hvordan kan lønnsvekst brukes til raskere nedbetaling?",
    category: "Gjeld",
    tags: ["inflasjon", "realrente", "boliglån", "lønnsvekst"],
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "guide-6",
    slug: "funfacts",
    status: "published",
    title: "Funfacts",
    description:
      "Morsomme og overraskende fakta om penger, fra rentes rente til norske særtrekk.",
    category: "Innsikt",
    tags: ["funfacts", "sparing", "psykologi"],
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
];
