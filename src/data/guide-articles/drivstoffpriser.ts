import type { GuideArticleContent } from "@/types/guide-article";

const RATES_VERIFIED = "28. august 2026";

export const drivstoffpriser: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "drivstoffpriser",
  seoTitle: "Drivstoffpriser: slik sammenligner du nettoprisen",
  intro:
    "Bensin- og dieselprisen ved pumpa er en sum av internasjonal innkjøpspris, kjedens kostnader og norske avgifter. Når du forstår postene og sammenligner nettopris, blir det lettere å fylle rimeligere uten å spekulere i verdensmarkedet.",
  shortAnswer:
    "Sammenlign først skiltprisen. Trekk deretter fra rabatten eller bonusen du faktisk får. Den stasjonen som reklamerer med størst rabatt, er ikke nødvendigvis billigst totalt.",
  sections: [
    {
      heading: "Slik sammenligner du nettopris",
      paragraphs: [
        "Prisene i Drivstoffappen kan være brukerrapporterte. Sjekk alltid når prisen sist ble oppdatert før du kjører omvei for noen få øre.",
      ],
      bullets: [
        "1. Finn oppdatert skiltpris",
        "2. Kontroller om stasjonen er betjent eller ubetjent",
        "3. Trekk fra medlemsrabatt eller bonus",
        "4. Sammenlign nettoprisen",
        "5. Ikke kjør langt bare for en liten forskjell. Ekstra kilometer kan spise opp gevinsten",
      ],
      tip: "Eksempel: En stasjon tar 22,00 kr/l og gir 45 øre i bonus. Nettokostnaden er 21,55 kr/l. En annen stasjon uten bonus koster 21,40 kr/l og er fortsatt billigst.",
    },
    {
      heading: "Medlemsprogrammer",
      paragraphs: [
        "Programmene dekker ulike kjeder og kan normalt ikke kombineres uten dokumentasjon. Satser under er kontrollert per " +
          RATES_VERIFIED +
          ". Sjekk alltid kilden før du fyller.",
      ],
      table: {
        caption: `Satser per program (kontrollert ${RATES_VERIFIED})`,
        rows: [
          {
            label: "Coop hos Circle K/YX",
            value: "45 øre/l betjent · 25 øre/l ubetjent (medlemsbonus)",
          },
          {
            label: "Trumf hos Esso",
            value: "40 øre/l betjent · 20 øre/l Esso Express (bonus)",
          },
          {
            label: "Circle K EXTRA",
            value: "30–45 øre/l drivstoff · laderabatt i øre/kWh etter besøk",
          },
        ],
      },
      tip: "Coop beskriver 45/25 øre som medlemsbonus i fordelsregnskapet, ikke nødvendigvis direkte avslag på pumpa. Trumf-bonus hos Esso er Trumf-kroner, ikke alltid fratrekk på literprisen.",
    },
    {
      heading: "Hva betaler du egentlig for?",
      paragraphs: [
        "Drivkraft Norge deler pumpeprisen i avgifter, internasjonal innkjøpspris og selskapenes egne kostnader og margin. Andelene varierer kraftig over tid og mellom bensin og diesel.",
        "Ifølge Skatteetaten er veibruksavgiften midlertidig satt til 0 kr per liter fra 1. april til 1. september 2026. Ordinære satser gjelder igjen fra 1. september 2026. Artikkelen må oppdateres når avgiften endres.",
      ],
      bullets: [
        "Avgifter: veibruksavgift, CO₂-avgift og merverdiavgift",
        "Innkjøpspris: verdensmarkedspris, ofte i dollar",
        "Kjede/stasjon: transport, drift og margin",
      ],
    },
    {
      heading: "Drivstoffappen",
      paragraphs: [
        "Drivstoffappen viser skiltpris på stasjoner nær deg. Appen erstatter ikke medlemsbonus: bruk den til å finne lav skiltpris, og trekk deretter fra rabatt eller bonus du faktisk får.",
      ],
    },
    {
      heading: "Praktiske grep",
      bullets: [
        "Sjekk skiltpris før du kjører til vanlig stasjon",
        "Regn inn bonus eller rabatt før du velger kjede",
        "Planlegg reiser og kjør jevnt: færre kilometer sparer ofte mer enn noen øre per liter",
        "Sjekk dekktrykk: lavt trykk øker forbruket",
      ],
    },
  ],
  sources: [
    {
      label: "Skatteetaten: veibruksavgift",
      url: "https://www.skatteetaten.no/satser/veibruksavgift/",
    },
    {
      label: "Coop hos Circle K",
      url: "https://www.coop.no/medlem/fordeler/circlek",
    },
    {
      label: "Circle K EXTRA",
      url: "https://www.circlek.no/extra",
    },
    {
      label: "Trumf hos Esso",
      url: "https://www.trumf.no/fordeler/esso",
    },
    {
      label: "Drivstoffappen",
      url: "https://drivstoffappen.no/",
    },
  ],
  conclusion:
    "Les literprisen som avgifter, marked og kjede. Sammenlign nettopris etter bonus, og ikke kjør langt for små forskjeller.",
  relatedLinks: [
    {
      label: "Strømregning og Norgespris",
      href: "/guider/stromregning-og-norgespris",
    },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "Se drivstofftilbud", href: "/tilbud?kategori=Bil" },
  ],
};
