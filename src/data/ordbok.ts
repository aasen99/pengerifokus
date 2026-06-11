import type { OrdbokEntry } from "@/types/content";

/**
 * CMS/ADMIN: Ordbokbegreper kan opprettes og redigeres via admin med kategorier og tags.
 */
export const ordbok: OrdbokEntry[] = [
  {
    id: "ord-1",
    slug: "effektiv-rente",
    status: "published",
    term: "Effektiv rente",
    definition:
      "Den totale årlige kostnaden for et lån, inkludert gebyrer og andre kostnader – ikke bare nominell rente.",
    category: "Lån",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "ord-2",
    slug: "ask",
    status: "published",
    term: "ASK",
    definition:
      "Aksjesparekonto – en skattegunstig sparekonto for aksjer og fond, med begrensninger på uttak.",
    category: "Investering",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "ord-3",
    slug: "inflasjon",
    status: "published",
    term: "Inflasjon",
    definition:
      "Når prisene på varer og tjenester stiger over tid, og pengenes kjøpekraft svekkes.",
    category: "Økonomi",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-02",
  },
  {
    id: "ord-4",
    slug: "utbytte",
    status: "published",
    term: "Utbytte",
    definition:
      "Utbetaling fra et selskap til sine aksjonærer, ofte basert på årets overskudd.",
    category: "Investering",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-03",
  },
  {
    id: "ord-5",
    slug: "kredittsjekk",
    status: "published",
    term: "Kredittsjekk",
    definition:
      "Bankens vurdering av din kredittverdighet basert på inntekt, gjeld og betalingshistorikk.",
    category: "Lån",
    createdAt: "2025-01-04",
    updatedAt: "2025-01-04",
  },
  {
    id: "ord-6",
    slug: "refinansiering",
    status: "published",
    term: "Refinansiering",
    definition:
      "Å flytte eksisterende gjeld til et nytt lån, ofte for å få lavere rente eller bedre vilkår.",
    category: "Lån",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-05",
  },
];
