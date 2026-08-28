import type { GuideArticleContent } from "@/types/guide-article";

export const komIGangMedFond: GuideArticleContent = {
  slug: "kom-i-gang-med-fond",
  intro:
    "Fondssparing trenger ikke være komplisert. Her er en enkel innføring for deg som vil komme i gang, uten å måtte bli ekspert første dag.",
  sections: [
    {
      heading: "Hva er et fond?",
      paragraphs: [
        "Et fond er en kurv av mange investeringer: ofte aksjer og obligasjoner, forvaltet av et selskap. Når du kjøper andeler i fondet, eier du en liten bit av hele kurven.",
        "Fordelen er spredning. Et [indeksfond](/ordbok/indeksfond) kan for eksempel følge hundrevis av selskaper i ett kjøp. Indeksfond har ofte lave kostnader. Aktivt forvaltede fond prøver å slå markedet, men har ofte høyere gebyr.",
      ],
    },
    {
      heading: "Risiko og tidshorisont",
      paragraphs: [
        "Verdien kan gå ned. Fond er ikke garantert avkastning, og historisk avkastning sier lite om fremtiden.",
        "Aksjefond passer normalt best når pengene kan stå i minst fem år. Kortsiktige penger bør ikke settes i risikable fond bare for å jage avkastning.",
      ],
      tip: "Se på årlig kostnad (termingebyr). Forskjellen på 0,2 % og 1,0 % kan bli mye penger over 20 år.",
    },
    {
      heading: "Hva er en aksjesparekonto?",
      paragraphs: [
        "En [aksjesparekonto](/ordbok/ask), ofte kalt ASK, lar deg kjøpe og selge godkjente aksjer og aksjefond uten å betale skatt for hvert salg. Skatten kommer først når du tar ut mer enn du har satt inn, etter eventuell skjerming.",
        "Du kan ikke ha alle aksjer og fond på ASK. Kontoen kan blant annet brukes til børsnoterte aksjer i selskaper hjemmehørende i EØS og aksjefond med mer enn 80 prosent aksjer. Rene rentefond kan ikke stå på ASK.",
      ],
    },
    {
      heading: "Slik kommer du i gang",
      bullets: [
        "1. Sørg for [bufferkonto](/ordbok/bufferkonto) først: fond er for langsiktige penger",
        "2. Velg bank eller plattform med lave fondskostnader",
        "3. Start med ett bredt og billig globalt indeksfond som utgangspunkt",
        "4. Sett opp fast månedlig sparing",
        "5. Ikke sjekk kontoen hver dag: fond er langsiktig",
      ],
    },
    {
      heading: "Oppsummert",
      paragraphs: [
        "Fondssparing handler om å komme i gang, holde kostnadene lave og være tålmodig. Du trenger ikke mange fond: ett godt indeksfond og fast sparing er en solid start.",
      ],
    },
  ],
  sources: [
    {
      label: "Skatteetaten om aksjesparekonto",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/aksjer-og-verdipapirer/om/aksjesparekonto-ask/",
    },
  ],
  relatedLinks: [
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "ASK i ordboken", href: "/ordbok/ask" },
    { label: "Emne: sparing og investering", href: "/emner/sparing-og-investering" },
  ],
};
