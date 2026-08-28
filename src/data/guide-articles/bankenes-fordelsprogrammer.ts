import type { GuideArticleContent } from "@/types/guide-article";

export const bankenesFordelsprogrammer: GuideArticleContent = {
  slug: "bankenes-fordelsprogrammer",
  intro:
    "Bankfordeler ser ut som gaver, men de er lojalitetsprogrammer. Den viktige beslutningen er totalprisen: effektiv boliglånsrente, gebyrer og verdien av fordelene du faktisk bruker.",
  shortAnswer:
    "Regn først på effektiv boliglånsrente og gebyrer. Trekk deretter fra verdien av fordelene du faktisk bruker. En synlig fordel er ikke verdifull hvis totalpakken koster mer.",
  sections: [
    {
      heading: "Se på totalprisen",
      paragraphs: [
        "Rente på et boliglån betyr ofte mer enn lounge og kortfordeler. Regn alltid tre tall mot hverandre: boliglånsrente, gebyrer i dagligbank og verdien av fordelene du faktisk bruker.",
      ],
      tip: "En renteforskjell på 0,25 prosentpoeng på et boliglån på 3 millioner kroner er omtrent 7 500 kroner det første året før skattevirkning og nedbetaling. Hvis bankfordelene er verdt 2 000 kroner for deg, er pakken fortsatt rundt 5 500 kroner dyrere det året.",
    },
    {
      heading: "Boliglånsrenten er hovedprisen",
      paragraphs: [
        "Sammenlign [effektiv rente](/ordbok/effektiv-rente), ikke bare [nominell rente](/ordbok/nominell-rente) og ikke bare kundepakkene banken fronter.",
      ],
      bullets: [
        "Hva er effektiv rente på boliglånet ditt i dag?",
        "Hva kan du få andre steder med samme sikkerhet og belåningsgrad?",
        "Hvilke produkter må du ha i banken for å få den lovede renten?",
      ],
    },
    {
      heading: "Hva lojalitet koster",
      bullets: [
        "Ubrukte fordeler er verdt null",
        "Krav om lønnskonto, sparing eller forsikring kan gjøre «rabatten» dyr",
        "Binding gjelder bare enkelte produkter, for eksempel fastrentelån",
        "Tidskostnad ved bytte hører med i regnestykket",
      ],
    },
    {
      heading: "Slik vurderer du om du skal bli eller bytte",
      bullets: [
        "1. Finn effektiv rente og årlige gebyrer der du er i dag",
        "2. Innhent minst ett konkret tilbud fra en annen bank eller medlemsavtale",
        "3. Trekk fra verdien av fordeler du faktisk brukte siste 12 måneder",
        "4. Legg til kostnad ved bytte: tid, dokumenter, eventuelt gebyr",
        "5. Bli bare hvis totalprisen er lavere",
      ],
    },
  ],
  relatedLinks: [
    { label: "Bankfordeler, full oversikt", href: "/fordeler/bankfordeler" },
    { label: "Velg riktig kredittkort", href: "/guider/velg-riktig-kredittkort" },
    { label: "Effektiv rente (ordbok)", href: "/ordbok/effektiv-rente" },
  ],
};
