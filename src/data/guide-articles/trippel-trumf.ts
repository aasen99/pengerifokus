import type { GuideArticleContent } from "@/types/guide-article";
import {
  TRIPPEL_TRUMF_CHECKED_AT,
  buildTrippelTrumfTableRows,
  getNextTrippelTrumfDate,
  getUpcomingTrippelTrumfDates,
  trippelTrumfDates2026,
} from "@/data/trippel-trumf-dates";

function formatCheckedAt(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "januar",
    "februar",
    "mars",
    "april",
    "mai",
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "november",
    "desember",
  ];
  return `${day}. ${months[month - 1]} ${year}`;
}

const next = getNextTrippelTrumfDate();
const upcoming = getUpcomingTrippelTrumfDates();
const checkedLabel = formatCheckedAt(TRIPPEL_TRUMF_CHECKED_AT);

const shortAnswer = next
  ? next.status === "expected"
    ? `Neste forventede Trippel-Trumf er ${next.label}. Datoen er basert på historisk mønster og er ikke offisielt bekreftet av Trumf ennå. Sjekk alltid [Trumfs egen side](https://www.trumf.no/trippel-trumf) før du planlegger storhandelen.`
    : `Neste Trippel-Trumf er ${next.label}. Bekreft alltid på [trumf.no/trippel-trumf](https://www.trumf.no/trippel-trumf) før du handler.`
  : "Ingen kommende Trippel-Trumf-dato er registrert her akkurat nå. Følg [trumf.no/trippel-trumf](https://www.trumf.no/trippel-trumf) og Trumf-appen for neste kunngjøring.";

export const trippelTrumf: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "trippel-trumf",
  seoTitle: "Trippel-Trumf 2026: datoer, bonus og tips",
  intro:
    "Trippel-Trumf er utvalgte torsdager der Trumf-medlemmer får 3 % Trumf-bonus på dagligvarer i stedet for 1 %. Her får du oversikt over kommende og gjennomførte datoer i 2026, hva bonusen faktisk er, og hva du bør sjekke før du handler.",
  shortAnswer,
  sections: [
    {
      heading: "Kommende Trippel-Trumf-dager",
      paragraphs: [
        upcoming.length > 0
          ? "Tabellen under viser kommende datoer. Forventede datoer følger historisk ukemønster. Trumf offentliggjør vanligvis den konkrete dagen med kort varsel."
          : "Det er ingen kommende datoer i oversikten vår akkurat nå. Oppdateringen skjer når Trumf bekrefter neste torsdag.",
        `Sist kontrollert ${checkedLabel}.`,
      ],
      table:
        upcoming.length > 0
          ? {
              caption: "Kommende Trippel-Trumf 2026",
              rows: buildTrippelTrumfTableRows(upcoming),
            }
          : undefined,
      tip: "Sett gjerne forventede datoer i kalenderen, men vent med å regne dem som sikre til Trumf har bekreftet dem i appen eller på trumf.no.",
    },
    {
      heading: "Alle Trippel-Trumf-datoer i 2026",
      paragraphs: [
        "Trippel-Trumf faller normalt på én torsdag i måneden, bortsett fra juli. Enkelte måneder har hatt ekstra torsdag. Status «forventet» betyr historisk mønster, ikke offisiell årsplan.",
      ],
      table: {
        caption: `Trippel-Trumf 2026 (kontrollert ${checkedLabel})`,
        rows: buildTrippelTrumfTableRows(trippelTrumfDates2026),
      },
    },
    {
      heading: "Hva er Trippel-Trumf?",
      paragraphs: [
        "Trippel-Trumf er en kampanje fra Trumf der medlemmer får 3 % Trumf-bonus: 1 % grunnbonus pluss 2 % ekstra Trippel-Trumf-bonus. Bonusen er Trumf-kroner, ikke direkte avslag i kassen.",
        "Les mer om programmet i oversikten over [Trumf og Trumf-bonus](/fordeler/trumf).",
      ],
      bullets: [
        "3 % med vanlig registrering (Trumf-kort, registrert bankkort eller app)",
        "4 % hvis du betaler med Trumf Pay på kvalifiserende kjeder",
        "Opptil 5 % hvis du kombinerer Trumf Kredittkort og Trumf Pay, etter Trumfs egne satser",
      ],
      tip: "Kredittkort lønner seg bare hvis du betaler hele fakturaen. Ellers kan renten spise opp bonusen. Se også [kredittkort eller debetkort](/guider/kredittkort-eller-debetkort).",
    },
    {
      heading: "Hvilke butikker gjelder?",
      paragraphs: [
        "På Trippel-Trumf-torsdag gjelder 3 % normalt hos dagligvarekjedene knyttet til Trumf. Trumf har også nevnt Trippel-Trumf i butikk hos Mester Grønn og Norli, med egne unntak.",
      ],
      bullets: [
        "KIWI, MENY, SPAR, Joker",
        "Jacob's, CC Mat, Lerøy Mat, Nærbutikken og Gigaboks",
        "Mester Grønn og Norli i butikk, med unntak Trumf oppgir for enkelte Norli-butikker og varetyper",
      ],
      tip: "Pant, spill, gavekort og post i butikk gir normalt ikke Trumf-bonus. Sjekk alltid unntakene på Trumfs kampanjeside for den aktuelle dagen.",
    },
    {
      heading: "Slik får du mest ut av dagen",
      bullets: [
        "Planlegg storhandelen til den bekreftede torsdagen, ikke til en forventet dato",
        "Aktiver Trumf Pay hvis du vil ha den ekstra prosenten",
        "Sjekk kjedespesifikke tillegg, som KIWI PLUSS på frukt og grønt",
        "Ikke kjøp mer enn du trenger bare for å «ta ut» bonusen",
        "Følg Trumf-appen, e-post eller [trumf.no/trippel-trumf](https://www.trumf.no/trippel-trumf) for bekreftelse",
      ],
    },
  ],
  faq: [
    {
      question: "Når er neste Trippel-Trumf?",
      answer: next
        ? next.status === "expected"
          ? `Neste forventede dato er ${next.label}. Trumf bekrefter vanligvis dagen med kort varsel, så sjekk trumf.no eller appen før du handler.`
          : `Neste registrerte dato er ${next.label}. Bekreft på trumf.no før du regner den som sikker.`
        : "Vi har ingen kommende dato i oversikten akkurat nå. Følg Trumf-appen og trumf.no.",
    },
    {
      question: "Er datoene offisielle?",
      answer:
        "Gjennomførte datoer er bekreftet. Kommende datoer merket «forventet» bygger på historisk ukemønster. Trumf publiserer ikke en offisiell årsplan på forhånd.",
    },
    {
      question: "Er det Trippel-Trumf i juli?",
      answer:
        "Normalt nei. Juli har vanligvis ikke Trippel-Trumf. Unntak har vært svært sjeldne.",
    },
    {
      question: "Får jeg 3 %, 4 % eller 5 %?",
      answer:
        "Standard på Trippel-Trumf er 3 %. Med Trumf Pay oppgir Trumf 4 % hos kvalifiserende kjeder. Med Trumf Kredittkort og Trumf Pay kan det bli opptil 5 %, etter gjeldende kortvilkår.",
    },
    {
      question: "Gjelder Trippel-Trumf på Trumf Netthandel?",
      answer:
        "Trippel-Trumf er en butikkampanje for utvalgte torsdager. Netthandel via Trumf Netthandel har egne bonussatser per butikk. Se [Trumf-tilbudene](/tilbud?program=trumf) for netthandelsbonus.",
    },
  ],
  sources: [
    {
      label: "Trumf: Trippel-Trumf-torsdag",
      url: "https://www.trumf.no/trippel-trumf",
    },
    {
      label: "Trumf Pay",
      url: "https://www.trumf.no/trumf-pay",
    },
    {
      label: "Trumf Kredittkort, fordeler",
      url: "https://www.trumf.no/trumf-kredittkort/fordeler-med-trumf-kredittkort",
    },
  ],
  conclusion:
    "Trippel-Trumf lønner seg mest når du uansett skal handle stort. Bruk forventede datoer til planlegging, og bekreftede datoer til selve handleturen.",
  relatedLinks: [
    { label: "Trumf og Trumf-bonus", href: "/fordeler/trumf" },
    { label: "Trumf-tilbud vi har samlet", href: "/tilbud?program=trumf" },
    { label: "Velg riktig kredittkort", href: "/guider/velg-riktig-kredittkort" },
    { label: "Drivstoffpriser", href: "/guider/drivstoffpriser" },
    { label: "Emne: bonus og fordeler", href: "/emner/bonus-og-fordeler" },
  ],
};
