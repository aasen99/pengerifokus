import type { GuideArticleContent } from "@/types/guide-article";

export const rentemoteSeptember2026: Omit<
  GuideArticleContent,
  "readTimeMinutes"
> = {
  slug: "rentemote-september-2026",
  seoTitle: "Rentemøtet i september 2026: Renten økte til 4,5 prosent",
  intro:
    "Norges Bank hevet styringsrenten fra 4,25 til 4,5 prosent i september 2026. Beslutningen ble publisert 24. september. Ved novemberbeslutningen ble renten holdt uendret. Her ser du hva renteøkningen kan bety for boliglånet, og hva du bør sjekke hos banken.",
  shortAnswer:
    "Styringsrenten økte med 0,25 prosentpoeng i september og var fortsatt 4,5 prosent ved beslutningen publisert 5. november. Hvis banken øker boliglånsrenten din like mye, koster et lån på 3 millioner kroner omtrent 7 500 kroner mer i årlige renter før skatt. Med full skatteverdi av rentefradraget på 22 prosent blir det rundt 488 kroner mer per måned. Dette er en forenklet renteeffekt, ikke en beregning av nytt terminbeløp.",
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
      heading: "Hva ble besluttet i september?",
      paragraphs: [
        "På møtet 23. september besluttet Norges Bank å øke styringsrenten fra 4,25 til 4,5 prosent. Beslutningen og Pengepolitisk rapport 3/26 ble publisert 24. september klokken 10. Den nye renten gjaldt fra 25. september.",
        "I septemberprognosen ventet Norges Bank at renten ville ligge nær dette nivået en tid før den etter hvert avtar noe. Rentebanen er et anslag, ikke en garanti for hva banken din vil tilby.",
      ],
      factBox: [
        "Beslutningen ble publisert: 24. september 2026 klokken 10.00",
        "Styringsrente før økningen: 4,25 prosent",
        "Styringsrente etter økningen: 4,5 prosent",
        "Endring: 0,25 prosentpoeng",
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
      heading: "Hvordan følger banken opp?",
      subsections: [
        {
          subheading: "Boliglånsrenten din kan være uendret",
          paragraphs: [
            "En økning i styringsrenten betyr ikke at alle boliglån blir dyrere samtidig. Sjekk bankens rentevarsel og avtalen din for å se om renten er endret, og fra hvilken dato.",
          ],
        },
        {
          subheading: "Banken øker boliglånsrenten",
          paragraphs: [
            "Bankene kan øke utlånsrentene, men størrelsen og tidspunktet varierer. Banken skal varsle renteendringer etter reglene som gjelder for avtalen din.",
          ],
        },
        {
          subheading: "Du kan fortsatt sammenligne og forhandle",
          paragraphs: [
            "Bankenes priser varierer også når styringsrenten står stille. Sammenlign effektiv rente og gebyrer på lån med tilsvarende belåningsgrad, og spør egen bank om den kan gi et bedre tilbud.",
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
      heading: "Siste beslutning og neste rentemøte",
      paragraphs: [
        "På møtet 4. november holdt Norges Bank styringsrenten uendret på 4,5 prosent. Beslutningen ble publisert 5. november. Banken la ikke frem nye prognoser denne gangen.",
        "Neste rentebeslutning og Pengepolitisk rapport 4/26 publiseres 17. desember 2026. Utfallet er ikke kjent. Sammenlign derfor lånet med gjeldende tilbud, og bruk mulige renteendringer som scenarioer når du planlegger budsjettet.",
      ],
      factBox: [
        "Siste publiserte beslutning: 5. november 2026",
        "Styringsrente: 4,5 prosent",
        "Neste rentebeslutning: 17. desember 2026",
        "Sist kontrollert: 17. november 2026",
      ],
    },
  ],
  faq: [
    {
      question: "Hva ble renten etter møtet i september 2026?",
      answer:
        "Norges Bank økte styringsrenten fra 4,25 til 4,5 prosent. Beslutningen ble publisert 24. september, og renten gjaldt fra 25. september. Ved novemberbeslutningen var renten uendret på 4,5 prosent.",
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
      question: "Bør jeg binde renten før neste møte?",
      answer:
        "Ikke baser valget på ett rentemøte alene. Fastrente er først og fremst en forsikring mot renteendringer og bør vurderes ut fra hvor mye forutsigbarhet du trenger, bindingstid og vilkår for å avslutte avtalen.",
    },
  ],
  sources: [
    {
      label: "Norges Bank: rentebeslutningen i september 2026",
      url: "https://www.norges-bank.no/tema/pengepolitikk/Rentemoter/2026/september-2026",
    },
    {
      label: "Norges Bank: rentebeslutningen i november 2026 og neste møtedato",
      url: "https://www.norges-bank.no/tema/pengepolitikk/Rentemoter/2026/november-2026",
    },
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
