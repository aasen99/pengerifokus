import type { GuideArticleContent } from "@/types/guide-article";

export const sifoBudsjett: GuideArticleContent = {
  slug: "sifo-budsjett",
  intro:
    "SIFOs referansebudsjett (tidligere standardbudsjettet) viser hva som kreves for et akseptabelt forbruksnivå i norske husholdninger. Det er et nyttig sammenligningsgrunnlag, men det er ikke et komplett husholdningsbudsjett.",
  sections: [
    {
      heading: "Hva er SIFO og referansebudsjettet?",
      paragraphs: [
        "SIFO (Forbruksforskningsinstituttet) er en del av OsloMet og forsker på forbruk og levekår. Siden 1987 har instituttet publisert referansebudsjettet, et anslag på nødvendige forbruksutgifter for ulike husholdninger.",
        "Budsjettet bygger på konkrete varekurver og priser, ikke på et statistisk gjennomsnitt av alt nordmenn bruker. Fagfolk innen hvert område har definert hva som regnes som et akseptabelt nivå: nok til helseanbefalinger, vanlige fritidsaktiviteter og alminnelig kvalitet på klær og utstyr.",
      ],
    },
    {
      heading: "Hva måler budsjettet?",
      bullets: [
        "Mat og drikke, klær, personlig pleie og individuell fritid",
        "Husholdningsvarer, møbler, medier og felles fritidsutstyr",
        "Kollektivtransport, bilkostnader (drift), barnehage og AKS/SFO",
        "Utgifter fordelt på alder, kjønn og antall personer i husholdet",
      ],
      tip: "Bruk SIFO-kalkulatoren under Verktøy for å se månedlige og årlige beløp tilpasset din husholdning.",
    },
    {
      heading: "Hva er ikke med?",
      paragraphs: [
        "Referansebudsjettet er et forbruksbudsjett, ikke et fullt livsopphold. De største postene mange sliter med i hverdagen, bolig og strøm, ligger utenfor.",
      ],
      bullets: [
        "Bolig: husleie, renter, avdrag, felleskostnader og vedlikehold",
        "Strøm og andre faste boutgifter",
        "Forsikring, lån, sparing og investering",
        "Alkohol, tobakk, feriereiser og kostbare hobbyer",
        "Helsetjenester utover ett årlig lege- og tannlegebesøk",
      ],
    },
    {
      heading: "Individ- vs. husholdningsposter",
      paragraphs: [
        "SIFO skiller mellom utgifter som følger enkeltpersoner og utgifter som deles i husholdningen.",
        "Eksempelfamilien i rapporten for 2026 er et par i alderen 25–50 med barn på 5 og 11 år. I Excel-eksempelet lander de på ca. 37 358 kr per måned uten barnehage (448 296 kr per år). Kalkulatoren som summerer hovedtabellene gir 37 438 kr per måned, blant annet fordi klærverdiene i tabellene er noe høyere enn i eksempelarket.",
      ],
      bullets: [
        "Individspesifikke: mat, klær, personlig pleie, lek/medier og reise per person",
        "Husholdningsspesifikke: dagligvarer, hvitevarer, møbler, medier og bil",
        "Stordriftseffekt: par med mer enn to barn får 12 % lavere matbudsjett enn summen av enkeltpersonene",
        "Langtidsbudsjett: dyre innkjøp (kjøleskap, møbler) er fordelt månedlig, slik at du setter av over tid",
      ],
    },
    {
      heading: "Hva er nytt i 2026?",
      paragraphs: [
        "SIFO-rapport 9-2026 oppdaterer priser til februar 2026 og justerer enkelte varekurver, blant annet mat etter nye kostholdsråd. Kollektivprisene er basert på Ruter i Oslo, og barnehage/AKS følger Oslo kommune uten mattillegg.",
      ],
      bullets: [
        "Eksempelfamilien i rapporten (mor, far, barn 5 og 11 år, bensinbil) har ca. 37 358 kr/mnd i forbruksutgifter uten barnehage",
        "Med barnehage (1 200 kr/mnd) blir årsutgiften ca. 461 496 kr (11 måneder barnehage)",
        "Kalkulatoren vår summerer tabellverdiene direkte og kan avvike noen få kroner fra eksempelarket i Excel",
      ],
      tip: "Test eksempelfamilien i SIFO-kalkulatoren for å se fordeling per kategori.",
    },
    {
      heading: "Slik bruker du tallene i praksis",
      paragraphs: [
        "Det beste utgangspunktet er egne kontoutskrifter. Referansebudsjettet er nyttig når du mangler historikk, vil sjekke om forbruket ditt er høyt eller lavt, eller trenger et nøkternt normnivå (for eksempel i dialog med bank eller kommune).",
      ],
      bullets: [
        "1. Regn ut SIFO-nivå for din husholdning i kalkulatoren",
        "2. Legg til bolig, strøm og andre faste poster du faktisk har",
        "3. Sammenlign totalt og per kategori med egne utgifter",
        "4. Tilpass barnehage, AKS og kollektivpriser til din kommune",
        "5. Husk at normen er nøktern: tilbud, bruktkjøp og arv er ikke med",
      ],
      tip: "OsloMet oppdaterer budsjettet årlig med nye priser og reviderte varekurver. Sjekk alltid om det finnes nyere tall enn det kalkulatoren her bruker.",
    },
    {
      heading: "Oppdateringer i 2026",
      bullets: [
        "Grunnlaget for «mat og drikke» og «møbler» er revidert",
        "Nye priser for mat, andre dagligvarer, møbler, barnehage, AKS og kollektivtransport",
        "Øvrige poster justert etter konsumprisindeksen (KPI)",
        "Individspesifikke utgifter har økt med 1 223 kr/mnd fra februar 2025 til februar 2026 (for familie med to barn)",
      ],
    },
    {
      heading: "Begrensninger du bør kjenne til",
      bullets: [
        "Kollektivpriser er basert på Ruter i Oslo, ikke din hjemkommune",
        "Barnehage og AKS bruker eksempelpriser fra Oslo kommune",
        "Bilkostnader forutsetter ny bil uten avskrivning og lån",
        "Budsjettet passer dårlig for helt nye hushold i etableringsfasen",
        "Tallene er normer, ikke det du «bør» bruke hvis prioritetene dine er annerledes",
      ],
    },
    {
      heading: "Kilder",
      paragraphs: [
        "Offisiell informasjon, kalkulator og nedlastbare filer finnes hos OsloMet SIFO. Husbanken viser til referansebudsjettet i veiledning om startlån og betjeningsevne.",
      ],
      bullets: [
        "Referansebudsjettet – kalkulator: oslomet.no/om/sifo/referansebudsjettet",
        "SIFO-rapport 2-2025: Referansebudsjett for forbruksutgifter 2025",
        "SIFO-rapport 9-2026: oppdatert versjon med 2026-tall (NVA/Sikt)",
        "Husbanken: veiledning for startlån og levekostnader",
      ],
      tip: "Sist verifisert: 17. august 2026. Kalkulatoren bruker SIFO-rapport 9-2026 (februar 2026-priser).",
    },
  ],
  relatedLinks: [
    { label: "SIFO-kalkulator", href: "/verktoy/sifo-kalkulator" },
    {
      label: "Sammenlign to husholdninger",
      href: "/guider/sifo-sammenligne-husholdninger",
    },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Luksusfellen-tavle", href: "/verktoy/luksusfelle-tavle" },
  ],
};
