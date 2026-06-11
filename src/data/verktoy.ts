import type { Verktoy } from "@/types/content";

/**
 * CMS/ADMIN: Verktøy kan markeres som published, draft eller coming-soon.
 * Senere kan admin koble på faktiske kalkulator-komponenter per verktøy.
 */
export const verktoy: Verktoy[] = [
  {
    id: "verktoy-1",
    slug: "tid-er-penger",
    status: "coming-soon",
    name: "Tid er penger-kalkulator",
    description:
      "Se hva du faktisk tjener per time når du regner med reisetid, skatt og faste kostnader.",
    category: "Lønn",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-05",
  },
  {
    id: "verktoy-2",
    slug: "rentekalkulator",
    status: "coming-soon",
    name: "Rentekalkulator",
    description:
      "Beregn hvor mye lånet ditt koster over tid – og hva du sparer ved ekstra innbetalinger.",
    category: "Gjeld",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-05",
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
    slug: "budsjettverktoy",
    status: "coming-soon",
    name: "Budsjettverktøy",
    description:
      "Enkel oversikt over inntekter og utgifter for å få kontroll på økonomien.",
    category: "Budsjett",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
  {
    id: "verktoy-5",
    slug: "bsu-kalkulator",
    status: "coming-soon",
    name: "BSU-kalkulator",
    description:
      "Regn ut skattefordelen og se hvor mye du kan spare med BSU-sparing.",
    category: "Sparing",
    createdAt: "2025-01-12",
    updatedAt: "2025-01-12",
  },
];
