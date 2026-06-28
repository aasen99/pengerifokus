import type { GuideArticleContent } from "@/types/guide-article";

export const komIGangMedFond: GuideArticleContent = {
  slug: "kom-i-gang-med-fond",
  readTimeMinutes: 7,
  intro:
    "Fondssparing trenger ikke være komplisert. Her er en enkel innføring for deg som vil komme i gang, uten å måtte bli ekspert første dag.",
  sections: [
    {
      heading: "Hva er et fond?",
      paragraphs: [
        "Et fond er en kurv av mange investeringer: ofte aksjer og obligasjoner, forvaltet av et selskap. Når du kjøper andeler i fondet, eier du en liten bit av hele kurven.",
        "Fordelen er spredning, du risikerer ikke alt på én enkelt aksje. Et indeksfond kan for eksempel følge hundrevis av selskaper i ett kjøp.",
      ],
    },
    {
      heading: "Indeksfond vs. aktivt forvaltet",
      bullets: [
        "Indeksfond følger en markedsindeks og har ofte lave kostnader",
        "Aktivt forvaltede fond prøver å slå markedet: ofte med høyere gebyr",
        "For de fleste nybegynnere er brede, billige indeksfond et godt utgangspunkt",
      ],
      tip: "Se på årlig kostnad (termingebyr). Forskjellen på 0,2 % og 1,0 % kan bli mye penger over 20 år.",
    },
    {
      heading: "ASK: aksjesparekonto",
      paragraphs: [
        "ASK er en skattegunstig konto for aksjer og fond i Norge. Du betaler skatt når du tar ut gevinst, ikke underveis.",
        "Du kan flytte penger inn og ut av aksjer/fond på kontoen uten å utløse skatt, så lenge pengene blir værende på ASK. Det gjør den fleksibel for langsiktig sparing.",
      ],
      bullets: [
        "Passer for langsiktig sparing (5+ år)",
        "Skatt ved uttak av gevinst",
        "Begrensninger ved uttak til annet enn investeringer: sjekk gjeldende regler",
      ],
    },
    {
      heading: "Slik kommer du i gang",
      bullets: [
        "1. Sørg for bufferkonto først: fond er for langsiktige penger",
        "2. Velg bank eller plattform med lave fondskostnader",
        "3. Start med ett bredt indeksfond (verden eller Norden)",
        "4. Sett opp fast månedlig sparing: «dollar cost averaging»",
        "5. Ikke sjekk kontoen hver dag: fond er langsiktig",
      ],
    },
    {
      heading: "Hvor mye og hvor lenge?",
      paragraphs: [
        "Det finnes ingen magisk sum. Start med et beløp du klarer å spare hver måned, også når markedet faller.",
        "Tid i markedet slår ofte timing av markedet. De som lykkes best er gjerne de som sparer jevnt over mange år, ikke de som venter på «riktig tidspunkt».",
      ],
    },
    {
      heading: "Risiko du bør kjenne til",
      bullets: [
        "Verdien kan gå ned: noen år betyr det minus på kontoen",
        "Fond er ikke garantert avkastning",
        "Kortsiktige penger (under 3–5 år) hører sjelden hjemme i aksjefond",
        "Høyere avkastning over tid kommer med svingninger underveis",
      ],
    },
    {
      heading: "Oppsummert",
      paragraphs: [
        "Fondssparing handler om å komme i gang, holde kostnadene lave og være tålmodig. Du trenger ikke mange fond: ett godt indeksfond og fast sparing er en solid start.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Les om ASK i ordboken", href: "/ordbok/ask" },
  ],
};
