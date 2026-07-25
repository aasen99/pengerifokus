import type { Verktoy } from "@/types/content";

/**
 * CMS/ADMIN: Verktøy kan markeres som published, draft eller coming-soon.
 * Senere kan admin koble på faktiske kalkulator-komponenter per verktøy.
 */
export const verktoy: Verktoy[] = [
  {
    id: "verktoy-1",
    slug: "tid-er-penger",
    status: "published",
    name: "Tid er penger-kalkulator",
    description:
      "Se hva du faktisk tjener per time når du regner med reisetid, skatt og faste kostnader.",
    category: "Lønn",
    createdAt: "2025-01-05",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-2",
    slug: "rentekalkulator",
    status: "published",
    name: "Rentekalkulator",
    description:
      "Ett lån (annuitet): beregn terminbeløp, rentekostnad, og hva du sparer med ekstra eller engangsinnbetaling.",
    category: "Gjeld",
    createdAt: "2025-01-05",
    updatedAt: "2026-07-01",
  },
  {
    id: "verktoy-3",
    slug: "nedbetalingskalkulator",
    status: "published",
    featured: true,
    name: "Nedbetalingskalkulator",
    description:
      "Flere lån: angi månedsbudsjett, sammenlign lavine og snøball, og se tid og renter spart.",
    category: "Gjeld",
    createdAt: "2025-01-08",
    updatedAt: "2026-07-01",
  },
  {
    id: "verktoy-6",
    slug: "sparekalkulator",
    status: "published",
    name: "Sparekalkulator",
    description:
      "Se hvor mye sparingen vokser, og sammenlign hva som skjer med ekstra månedlig sparing.",
    category: "Sparing",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-8",
    slug: "dopenge-kalkulator",
    status: "published",
    name: "Dopengekalkulator",
    description:
      "Hvor mye tjener du på do på jobben? Regn ut dopenge basert på lønn og arbeidstid.",
    category: "Lønn",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-7",
    slug: "regel-72",
    status: "published",
    name: "Regel 72",
    description:
      "Hvor lang tid tar det å doble pengene? Del 72 på avkastningen og få et raskt svar.",
    category: "Sparing",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-11",
    slug: "lanets-reelle-verdi",
    status: "published",
    featured: true,
    name: "Lånets reelle verdi",
    description:
      "Se hvordan inflasjon reduserer gjeldens reelle verdi, og valgfritt effekten av å øke innbetalingen med lønnsveksten.",
    category: "Gjeld",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-10",
    slug: "eie-leie-kalkulator",
    status: "published",
    featured: true,
    name: "Eie vs. leie-kalkulator",
    description:
      "Sammenlign kjøp og leie over tid, med nettoformue, break-even og månedlig beregning.",
    category: "Bolig",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-9",
    slug: "okonomisk-rontgen",
    status: "published",
    featured: true,
    name: "Økonomisk røntgen",
    description:
      "10 spørsmål som gir deg en økonomisk score fra 0 til 100, med delresultater og tre konkrete prioriteringer.",
    category: "Økonomi",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-12",
    slug: "bonuskalkulator",
    status: "published",
    featured: true,
    name: "Bonuskalkulator",
    description:
      "Regn ut kostnad per bonuspoeng og om hotell-, fly- eller annen innløsning slår å betale kontant.",
    category: "Fordeler",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-4",
    slug: "luksusfelle-tavle",
    status: "published",
    name: "Luksusfellen-tavle",
    description:
      "Lag din egen pengetavle: inntekt, utgifter, gjeld og sparing samlet med overskudd eller underskudd.",
    category: "Budsjett",
    createdAt: "2025-01-10",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-5",
    slug: "bsu-kalkulator",
    status: "published",
    name: "BSU-kalkulator",
    description:
      "Regn ut skattefordelen og se hvor mye du kan spare med BSU-sparing.",
    category: "Sparing",
    createdAt: "2025-01-12",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-13",
    slug: "utleiebolig-kalkulator",
    status: "published",
    name: "Utleiebolig-kalkulator",
    description:
      "Regn ut kontantstrøm, leieavkastning og break-even leie for en utleiebolig.",
    category: "Bolig",
    createdAt: "2026-07-04",
    updatedAt: "2026-07-04",
  },
  {
    id: "verktoy-14",
    slug: "millionkalkulator",
    status: "published",
    name: "Millionkalkulator",
    description:
      "Se hvor lang tid det tar å spare til 1 million, hvor mye du må sette av per måned, eller hvilken avkastning som trengs.",
    category: "Sparing",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
  },
  {
    id: "verktoy-15",
    slug: "prosentkalkulator",
    status: "published",
    featured: true,
    name: "Prosentkalkulator",
    description:
      "Gratis prosentkalkulator uten reklame: prosentandel, økning, nedgang og prosentendring med formel.",
    category: "Økonomi",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
  },
  {
    id: "verktoy-16",
    slug: "feriepenge-kalkulator",
    status: "published",
    name: "Feriepengekalkulator",
    description:
      "Regn ut feriepenger med 10,2 %, 12 %, 12,5 % eller 14,3 % ut fra grunnlag eller månedslønn.",
    category: "Lønn",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
  },
  {
    id: "verktoy-17",
    slug: "prosentokning",
    status: "published",
    name: "Prosentøkning-kalkulator",
    description:
      "Regn ut prosentøkning mellom to verdier, for lønn, pris og portefølje, uten reklame.",
    category: "Økonomi",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
  },
  {
    id: "verktoy-18",
    slug: "prosentnedgang",
    status: "published",
    name: "Prosentnedgang-kalkulator",
    description:
      "Regn ut prosentnedgang eller ny pris etter rabatt, raskt og uten reklame.",
    category: "Økonomi",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
  },
];
