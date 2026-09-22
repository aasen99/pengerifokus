import type { GuideArticleContent } from "@/types/guide-article";

export const rentemoteSeptember2026: Omit<
  GuideArticleContent,
  "readTimeMinutes"
> = {
  slug: "rentemote-september-2026",
  seoTitle: "Rentemøte 24. september 2026: Hva betyr det for lånet?",
  intro:
    "Norges Bank publiserer ny rentebeslutning og Pengepolitisk rapport torsdag 24. september 2026 klokken 10. Styringsrenten er 4,25 prosent før møtet. Her ser du hva en renteendring kan bety for boliglånet, og hva du bør sjekke når banken følger opp.",
  shortAnswer:
    "En renteendring på 0,25 prosentpoeng tilsvarer omtrent 2 500 kroner i endrede årlige renter per million i lån, eller rundt 163 kroner i måneden etter 22 prosent rentefradrag. Har du 3 millioner i lån, er den forenklede effekten cirka 488 kroner i måneden etter fradraget. Banken bestemmer boliglånsrenten din og kan bruke tid på å endre den.",
  topCta: {
    heading: "Regn på ditt eget lån",
    description:
      "Legg inn restgjeld, rente og løpetid for å se terminbeløp og samlet rentekostnad.",
    buttonText: "Åpne rentekalkulatoren",
    href: "/verktoy/rentekalkulator",
    analyticsEvent: "guide_rentemote_top_cta",
  },
  sections: [
    {
      heading: "Når kommer rentebeslutningen?",
      paragraphs: [
        "Rentebeslutningen og Pengepolitisk rapport 3/26 publiseres torsdag 24. september klokken 10. Rapportmøtene er ekstra interessante fordi Norges Bank samtidig legger frem nye prognoser for rente, prisvekst og norsk økonomi.",
        "På rentemøtet i august ble styringsrenten holdt uendret på 4,25 prosent. Det sier likevel ikke sikkert hva som skjer i september. Les selve beslutningen og rentebanen, ikke bare overskriften om opp, ned eller uendret rente.",
      ],
      factBox: [
        "Dato: torsdag 24. september 2026",
        "Tid: klokken 10.00",
        "Før møtet: styringsrente på 4,25 prosent",
        "Neste rentemøte etter september: 5. november 2026",
      ],
    },
    {
      heading: "Hva betyr 0,25 prosentpoeng for boliglånet?",
      paragraphs: [
        "Tabellen viser en enkel renteeffekt dersom hele endringen slår inn på lånet. Den viser ikke nøyaktig endring i terminbeløpet på et annuitetslån, fordi løpetid og avdragsprofil også påvirker betalingen.",
      ],
      table: {
        caption: "Forenklet effekt av 0,25 prosentpoeng renteendring",
        rows: [
          {
            label: "1 million kroner i lån",
            value: "2 500 kr/år · 208 kr/mnd før skatt · ca. 163 kr/mnd etter rentefradrag",
          },
          {
            label: "2 millioner kroner i lån",
            value: "5 000 kr/år · 417 kr/mnd før skatt · ca. 325 kr/mnd etter rentefradrag",
          },
          {
            label: "3 millioner kroner i lån",
            value: "7 500 kr/år · 625 kr/mnd før skatt · ca. 488 kr/mnd etter rentefradrag",
          },
          {
            label: "4 millioner kroner i lån",
            value: "10 000 kr/år · 833 kr/mnd før skatt · ca. 650 kr/mnd etter rentefradrag",
          },
          {
            label: "5 millioner kroner i lån",
            value: "12 500 kr/år · 1 042 kr/mnd før skatt · ca. 813 kr/mnd etter rentefradrag",
          },
        ],
      },
      tip: "Regnestykket forutsetter at du får full skatteverdi av rentefradraget på 22 prosent. En renteoppgang gir høyere kostnad; et rentekutt gir tilsvarende lavere kostnad.",
    },
    {
      heading: "Tre mulige utfall",
      subsections: [
        {
          subheading: "Styringsrenten holdes uendret",
          paragraphs: [
            "Boliglånsrenten trenger ikke endre seg med en gang. Se i stedet etter om rentebanen peker mot senere endringer, og om bankenes finansieringskostnader har flyttet seg.",
          ],
        },
        {
          subheading: "Styringsrenten settes opp",
          paragraphs: [
            "Bankene kan øke utlånsrentene, men størrelsen og tidspunktet varierer. Banken skal varsle renteendringer etter reglene som gjelder for avtalen din.",
          ],
        },
        {
          subheading: "Styringsrenten settes ned",
          paragraphs: [
            "Et kutt kan gi lavere boliglånsrente, men det er ikke garantert at banken kutter like mye eller samtidig. Sammenlign renten din med andre tilbud når endringen er varslet.",
          ],
        },
      ],
    },
    {
      heading: "Dette bør du sjekke etter møtet",
      bullets: [
        "Selve beslutningen: opp, ned eller uendret styringsrente",
        "Rentebanen: Norges Banks anslag for styringsrenten fremover",
        "Bankens varsel: ny nominell og effektiv rente og datoen den gjelder fra",
        "Terminbeløpet: hva endringen gjør med månedsbudsjettet ditt",
        "Markedet: om du kan få bedre rente hos egen eller en annen bank",
      ],
      tip: "Vent ikke på et rentemøte for å forhandle. En reduksjon på 0,20 prosentpoeng på et lån på 3 millioner kroner er omtrent 6 000 kroner i lavere årlige renter før skatt.",
    },
    {
      heading: "Oppdatering etter rentemøtet",
      paragraphs: [
        "Denne delen oppdateres etter at Norges Bank publiserer beslutningen 24. september klokken 10. Da legger vi inn resultatet, den nye rentebanen og et oppdatert regneeksempel for boliglån.",
      ],
      factBox: [
        "Status: beslutningen er ikke publisert ennå",
        "Sist oppdatert: 22. september 2026",
      ],
    },
  ],
  faq: [
    {
      question: "Når er rentemøtet i september 2026?",
      answer:
        "Norges Bank publiserer rentebeslutningen og Pengepolitisk rapport torsdag 24. september 2026 klokken 10.",
    },
    {
      question: "Følger boliglånsrenten styringsrenten direkte?",
      answer:
        "Nei. Styringsrenten påvirker bankenes rentenivå, men hver bank setter sin egen utlånsrente. Endringen kan være mindre eller større og komme senere.",
    },
    {
      question: "Hvor mye er 0,25 prosentpoeng på 3 millioner i lån?",
      answer:
        "Den enkle renteeffekten er 7 500 kroner i året eller 625 kroner i måneden før skatt. Med full skatteverdi av rentefradraget blir det omtrent 488 kroner i måneden etter skatt.",
    },
    {
      question: "Bør jeg binde renten før møtet?",
      answer:
        "Ikke baser valget på ett rentemøte alene. Fastrente er først og fremst en forsikring mot renteendringer og bør vurderes ut fra hvor mye forutsigbarhet du trenger, bindingstid og vilkår for å avslutte avtalen.",
    },
  ],
  sources: [
    {
      label: "Norges Bank: kalender for rentemøter",
      url: "https://www.norges-bank.no/aktuelt/kalender/rentemoter/",
    },
    {
      label: "Norges Bank: styringsrenten",
      url: "https://www.norges-bank.no/tema/pengepolitikk/Styringsrenten/",
    },
    {
      label: "Skatteetaten: fordeling av lån og renter",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/lan-og-renter/fordeling/",
    },
  ],
  conclusion:
    "Rentemøtet er viktig, men bankens faktiske rente er det som treffer budsjettet. Regn på effekten, les rentevarselet og bruk endringen som anledning til å sammenligne banken din med markedet.",
  bottomCta: {
    heading: "Se effekten på terminbeløpet",
    description:
      "Test dagens rente og et scenario som er 0,25 prosentpoeng høyere eller lavere.",
    buttonText: "Regn på boliglånet",
    href: "/verktoy/rentekalkulator",
    analyticsEvent: "guide_rentemote_bottom_cta",
  },
  relatedLinks: [
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    {
      label: "Fond eller ekstra nedbetaling på boliglånet?",
      href: "/guider/spare-i-fond-eller-betale-ned-boliglan",
    },
    {
      label: "Hvor mye kan du låne til bolig?",
      href: "/guider/laneramme-for-boligkjop",
    },
    { label: "Emne: bolig", href: "/emner/bolig" },
  ],
};
