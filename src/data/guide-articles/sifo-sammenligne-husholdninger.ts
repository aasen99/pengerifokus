import type { GuideArticleContent } from "@/types/guide-article";

export const sifoSammenligneHusholdninger: GuideArticleContent = {
  slug: "sifo-sammenligne-husholdninger",
  intro:
    "SIFO-referansebudsjettet endrer seg mye når du flytter sammen, får barn eller endrer livssituasjon. Med to scenarioer i kalkulatoren ser du nøyaktig hvilke poster som går opp, ned eller slås sammen.",
  sections: [
    {
      heading: "Hvorfor sammenligne to scenarioer?",
      paragraphs: [
        "Referansebudsjettet er ikke ett fast tall for «en familie». Det avhenger av antall personer, alder, kjønn og valg som bil, barnehage og AKS.",
        "Ved å sette opp to husholdninger side om side kan du se hva SIFO antar at livsendringer koster i forbruksutgifter, uten bolig og strøm. Det er nyttig når du vurderer samboerskap, barn eller om to husholdninger kan slås sammen.",
      ],
      tip: "Bruk modus «Sammenlign to husholdninger» i SIFO-kalkulatoren og gi scenarioene navn som «Alene» og «Samboer».",
    },
    {
      heading: "Flytte sammen: hva slås sammen?",
      paragraphs: [
        "SIFO skiller mellom individposter (følger hver person) og husholdningsposter (deles i husholdningen etter antall personer). Når to voksne flytter sammen, dobles individpostene for den andre voksne, mens husholdningspostene ikke dobles.",
        "Husholdningspostene hentes fra tabeller som går fra 1 til 7 personer. For to voksne uten barn ligger de typisk lavere enn summen av to enkeltpersoners husholdningsposter, fordi dere deler dagligvarer, møbler og medier.",
      ],
      bullets: [
        "Individposter som øker: mat, klær, personlig pleie, lek/medier og kollektiv per ekstra voksen",
        "Husholdningsposter som justeres: andre dagligvarer, husholdningsartikler, møbler, mediebruk og eventuell bil",
        "To enslige som slår seg sammen: totalen blir lavere enn to separate enkeltbudsjett, men høyere enn én enslig alene",
      ],
    },
    {
      heading: "Få barn: individposter og barnehage",
      paragraphs: [
        "Barn legger til egne individposter etter alder og kjønn. I tillegg kommer valgfrie poster for barnehage og AKS/SFO, som i kalkulatoren bruker Oslo-satser.",
        "Barnehage og skolefritidsordning kan utgjøre tusenvis av kroner i måneden, avhengig av inntekt og antall barn. SIFO skiller også mellom første, andre og flere barn i barnehage.",
      ],
      bullets: [
        "Spedbarn og små barn: mat, klær, lek og eventuelt spedbarnsutstyr",
        "Barnehagealder (1–6 år): barnehageplass i tillegg til individposter",
        "Skolealder (7–14 år): AKS/SFO hvis du velger det i kalkulatoren",
        "Par med mer enn to barn: 12 % lavere matbudsjett (stordriftseffekt) enn summen av enkeltpersonene",
      ],
    },
    {
      heading: "Eksempel 1: alene vs. samboer uten barn",
      paragraphs: [
        "Scenario A: én kvinne 25–50 år, ingen bil. Scenario B: par 25–50 år uten barn, ingen bil.",
        "I SIFO-kalkulatoren (2026-tall) lander enslig på ca. 12 600 kr per måned i forbruksutgifter. Par uten barn ligger på ca. 21 700 kr per måned. Forskjellen er ca. 9 100 kr per måned, eller rundt 109 000 kr per år.",
        "Individpostene øker med den andre voksnes mat, klær, pleie og transport. Husholdningspostene går opp moderat: fra ca. 4 100 kr til ca. 4 400 kr per måned, langt mindre enn om begge bodde helt alene.",
      ],
      tip: "Velg forhåndsvalgene «Enslig kvinne 25–50 år» og «Par 25–50 år uten barn» i kalkulatoren for å gjenskape eksempelet.",
    },
    {
      heading: "Eksempel 2: par uten barn vs. familie med barn",
      paragraphs: [
        "Scenario A: par 25–50 år uten barn. Scenario B: eksempelfamilien Nordmann (par med barn på 5 og 11 år), bensinbil, ett barn i barnehage og ett i AKS.",
        "Par uten barn ligger på ca. 21 700 kr per måned. Eksempelfamilien med bil, barnehage og AKS lander på over 42 000 kr per måned, altså nesten dobling.",
        "Størstedelen av økningen kommer fra individposter for barna (mat, klær, lek). I tillegg kommer husholdningsposter for fire personer, bilkostnader, barnehage og AKS. Barnehage og AKS alene utgjør over 5 000 kr per måned med Oslo-satser.",
      ],
      tip: "Bruk «Par 25–50 år uten barn» som scenario A og «Eksempelfamilien Nordmann» som scenario B.",
    },
    {
      heading: "Slik leser du sammenligningen",
      bullets: [
        "Total per måned og per år for begge scenarioer, med kr og prosent endring",
        "Oppdeling i individposter, husholdningsposter og barnehage/AKS",
        "Per kategori sortert etter størst endring, med merking av posttype",
        "Korte, faktabaserte observasjoner generert fra tallene",
      ],
      paragraphs: [
        "Husk at scenarioene er uavhengige fullberegninger. SIFO dobler ikke husholdningsposter feilaktig: hvert scenario får riktig rad i tabellen ut fra antall personer i akkurat det husholdet.",
      ],
    },
    {
      heading: "Begrensninger",
      bullets: [
        "Bolig, strøm, forsikring, lån og ferie er ikke med i referansebudsjettet",
        "Barnehage og AKS bruker eksempelpriser fra Oslo kommune",
        "Kollektivpriser er basert på Ruter i Oslo",
        "Tallene er normer for et akseptabelt nivå, ikke det du faktisk bruker",
        "Faktiske besparelser ved samboerskap avhenger av hvordan dere deler utgifter i praksis",
      ],
    },
  ],
  relatedLinks: [
    { label: "SIFO-kalkulator", href: "/verktoy/sifo-kalkulator" },
    { label: "SIFO referansebudsjett 2026", href: "/guider/sifo-budsjett" },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
  ],
};
