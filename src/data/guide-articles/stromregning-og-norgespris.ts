import type { GuideArticleContent } from "@/types/guide-article";

export const stromregningOgNorgespris: Omit<
  GuideArticleContent,
  "readTimeMinutes"
> = {
  slug: "stromregning-og-norgespris",
  seoTitle: "Norgespris eller strømstøtte?",
  intro:
    "Strømregningen består av strøm, nettleie og avgifter. Norgespris påvirker bare kraftprisen. Fremtidig lønnsomhet avhenger av prisområde, forbruk og hvordan spotprisene utvikler seg.",
  shortAnswer:
    "Norgespris gir en kraftpris på 50 øre/kWh inkludert merverdiavgift, eller 40 øre/kWh i områder uten merverdiavgift på strøm, ut 2026. Vanlig strømstøtte følger spotprisen og dekker 90 prosent av prisen over 96,25 øre/kWh inkludert merverdiavgift.",
  sections: [
    {
      heading: "Dette betaler du uansett",
      paragraphs: [
        "Norgespris er ikke en komplett strømavtale. Du må fortsatt betale påslag og eventuelt månedsbeløp til strømleverandøren, nettleie, offentlige avgifter og vanlig avtalepris for forbruk over forbrukstaket.",
      ],
    },
    {
      heading: "Forskjellen mellom ordningene",
      table: {
        caption: "Vanlig strømstøtte vs. Norgespris",
        rows: [
          {
            label: "Vanlig strømstøtte",
            value: "Du følger spotprisen",
          },
          {
            label: "Norgespris",
            value: "Kraftprisen settes til 50 øre/kWh inkl. mva.",
          },
          {
            label: "Støtte",
            value: "Staten dekker 90 % over 96,25 øre/kWh inkl. mva.",
          },
          {
            label: "Lav spotpris",
            value: "Du betaler også Norgespris når spotprisen er lavere",
          },
          {
            label: "Binding",
            value: "Dagens pris gjelder ut 2026; ordningen videreføres til 2029",
          },
          {
            label: "Pris fra 2027",
            value: "Ny pris fra 1. januar 2027; usikkerhet ved fornyelse",
          },
          {
            label: "Bolig",
            value: "Begge gjelder bolig; Norgespris også fritidsbolig",
          },
          {
            label: "Aktivering",
            value: "Strømstøtte er automatisk; Norgespris må bestilles",
          },
        ],
      },
    },
    {
      heading: "Hva skjer etter 2026?",
      paragraphs: [
        "Så langt har Norgespris vært svært lønnsom for mange, særlig i Sør-Norge. Dagens pris gjelder ut 2026. [Ordningen videreføres til 2029](https://www.regjeringen.no/no/tema/energi/strom/sporsmal-og-svar-om-norgespris/id3089310/), men prisen justeres fra 1. januar 2027.",
        "Usikkerheten gjelder derfor først og fremst om det blir like lønnsomt å fornye avtalen. Sjekk Elhub og offisielle kilder når du skal velge på nytt, ikke bare hva som har lønnet seg hittil.",
      ],
    },
    {
      heading: "Når Norgespris kan passe",
      bullets: [
        "Du bor i et område som ofte har høye strømpriser",
        "Du bruker mye strøm om vinteren",
        "Du vil vite kraftprisen på forhånd og godtar at spotprisen noen ganger kan bli lavere",
        "Du har sett på historikken for ditt eget målepunkt i Elhub",
      ],
    },
    {
      heading: "Når vanlig strømstøtte kan passe",
      bullets: [
        "Du bor i et område som ofte har lave spotpriser",
        "Du kan flytte mye forbruk til billige perioder",
        "Du vil beholde muligheten til å dra nytte av lave priser",
        "Du ønsker ikke å binde målepunktet til Norgespris ut perioden",
      ],
    },
    {
      heading: "Sjekk før du velger",
      paragraphs: [
        "Logg inn på [Elhub Min side](https://minside.elhub.no) og se hvordan Norgespris ville slått ut for ditt tidligere forbruk. Historikken er ikke en garanti for fremtidige priser, men den er mer relevant enn et generelt råd for hele Norge.",
      ],
    },
  ],
  sources: [
    {
      label: "Regjeringen: spørsmål og svar om Norgespris",
      url: "https://www.regjeringen.no/no/tema/energi/strom/sporsmal-og-svar-om-norgespris/id3089310/",
    },
    {
      label: "NVE: Bør jeg velge Norgespris?",
      url: "https://www.nve.no/reguleringsmyndigheten/kunde/stroem/dette-er-norgespris/boer-jeg-velge-norgespris/",
    },
    {
      label: "NVE: Dette er Norgespris",
      url: "https://www.nve.no/reguleringsmyndigheten/kunde/stroem/dette-er-norgespris/",
    },
    {
      label: "Elhub – Min side",
      url: "https://minside.elhub.no",
    },
  ],
  conclusion:
    "Norgespris har gitt mange forutsigbarhet og lavere kraftpris, særlig i Sør-Norge. Vanlig strømstøtte gir deg muligheten til å få hele gevinsten når spotprisen er lav. Velg ut fra eget prisområde og forbruk, og vurder på nytt før fornyelse når prisen endres fra 2027.",
  relatedLinks: [
    { label: "Drivstoffpriser", href: "/guider/drivstoffpriser" },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "SIFO-budsjett", href: "/guider/sifo-budsjett" },
  ],
};
