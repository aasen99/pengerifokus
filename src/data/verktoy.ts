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
      "Beregn hvor mye lånet ditt koster over tid – og hva du sparer ved ekstra innbetalinger.",
    category: "Gjeld",
    createdAt: "2025-01-05",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-6",
    slug: "sparekalkulator",
    status: "published",
    name: "Sparekalkulator",
    description:
      "Se hvor mye sparingen vokser – og sammenlign hva som skjer med ekstra månedlig sparing.",
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
    id: "verktoy-10",
    slug: "eie-leie-kalkulator",
    status: "published",
    featured: true,
    name: "Eie vs. leie-kalkulator",
    description:
      "Sammenlign kjøp og leie over tid – med nettoformue, break-even og månedlig beregning.",
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
      "10 spørsmål som gir deg en økonomisk score fra 0 til 100 – med delresultater og tre konkrete prioriteringer.",
    category: "Økonomi",
    createdAt: "2026-06-11",
    updatedAt: "2026-06-11",
  },
  {
    id: "verktoy-3",
    slug: "nedbetalingskalkulator",
    status: "coming-soon",
    name: "Nedbetalingskalkulator",
    description:
      "Planlegg nedbetaling av gjeld med snøball- eller lavine-metoden.",
    category: "Gjeld",
    createdAt: "2025-01-08",
    updatedAt: "2025-01-08",
  },
  {
    id: "verktoy-4",
    slug: "luksusfelle-tavle",
    status: "published",
    name: "Luksusfellen-tavle",
    description:
      "Lag din egen pengetavle – inntekt, utgifter, gjeld og sparing samlet med overskudd eller underskudd.",
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
];
