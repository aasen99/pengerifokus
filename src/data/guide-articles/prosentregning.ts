import type { GuideArticleContent } from "@/types/guide-article";

export const prosentregning: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "prosentregning",
  intro:
    "Prosentregning dukker opp overalt: rabatt, lønn, budsjett, rente og prisendring. Her får du formlene, eksemplene og en prosentkalkulator du kan bruke underveis.",
  sections: [
    {
      heading: "Hva er prosent?",
      paragraphs: [
        "Prosent betyr «per hundre». 15 % er det samme som 15 av 100, eller 0,15 som desimaltall. Når du regner prosent, sammenligner du en del med et hele, eller en endring med utgangspunktet.",
        "I privatøkonomi bruker du prosentregning til blant annet rabatt, lønnsøkning, andel av inntekt, feriepenger og avkastning.",
      ],
    },
    {
      heading: "De viktigste formlene",
      bullets: [
        "Prosent av et tall: (prosent ÷ 100) × tall",
        "Hvor mange % er X av Y: (del ÷ hele) × 100",
        "Finn det hele: (del ÷ prosent) × 100",
        "Prosentendring: ((ny − gammel) ÷ gammel) × 100",
        "Øk med prosent: tall × (1 + prosent ÷ 100)",
        "Reduser med prosent: tall × (1 − prosent ÷ 100)",
      ],
      tip: "Bruk prosentkalkulatoren hvis du vil ha live svar med formelen under. Da slipper du å huske rekkefølgen.",
    },
    {
      heading: "Prosentøkning",
      paragraphs: [
        "Prosentøkning forteller hvor mye noe har steget i forhold til startverdien. Går lønnen fra 450 000 til 495 000 kroner, er differansen 45 000. Det er 10 % økning.",
        "Formelen er alltid den samme: differanse delt på gammel verdi, ganget med 100. Positivt svar betyr økning.",
      ],
    },
    {
      heading: "Prosentnedgang",
      paragraphs: [
        "Prosentnedgang bruker samme formel. Faller prisen fra 1 200 til 999 kroner, er differansen −201. Det tilsvarer 16,75 % nedgang.",
        "Pass på at du deler på den gamle verdien, ikke den nye. Ellers blir prosenten feil.",
      ],
    },
    {
      heading: "Vanlige feil",
      bullets: [
        "Å blande «15 % av 899» med «899 redusert med 15 %» (andel vs. ny pris)",
        "Å dele på ny verdi i stedet for gammel verdi ved endring",
        "Å legge sammen prosentpoeng feil (2 % + 3 % er ikke alltid 5 % effekt)",
        "Å glemme at feriepenger og lignende har egne satser, ikke bare «litt prosent»",
      ],
    },
    {
      heading: "Eksempler fra hverdagen",
      bullets: [
        "15 % rabatt på 899 kr = 134,85 kr i avslag",
        "15 000 kr tillegg på 500 000 kr lønn = 3 % lønnsøkning",
        "12 % feriepenger av 500 000 kr grunnlag = 60 000 kr",
        "Boligiutgift på 12 000 kr av 40 000 kr inntekt = 30 %",
      ],
    },
    {
      heading: "Oppsummert",
      paragraphs: [
        "Lær de seks formlene over, eller bruk kalkulatoren når du trenger et raskt og korrekt svar. Jo oftere du regner prosent i egen økonomi, jo lettere blir det å gjennomskue rabatter, lønnstilbud og prisendringer.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Prosentkalkulator", href: "/verktoy/prosentkalkulator" },
    { label: "Prosentøkning-kalkulator", href: "/verktoy/prosentokning" },
    { label: "Prosentnedgang-kalkulator", href: "/verktoy/prosentnedgang" },
    { label: "Feriepengekalkulator", href: "/verktoy/feriepenge-kalkulator" },
    { label: "Prosent i ordboken", href: "/ordbok/prosent" },
  ],
};
