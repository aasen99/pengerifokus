import type { GuideArticleContent } from "@/types/guide-article";

export const kredittkortEllerDebetkort: GuideArticleContent = {
  slug: "kredittkort-eller-debetkort",
  intro:
    "Spørsmålet er kreditt versus debet. Debet trekker egne penger med én gang. Kreditt bruker en innvilget kredittramme som betales senere. Valget handler om kontroll, betalingsutsettelse og om du faktisk betaler hele fakturaen.",
  shortAnswer:
    "Velg debetkort hvis du vil bruke egne penger og ha enkel kontroll. Kredittkort kan gi betalingsutsettelse, bonus og ekstra vern ved kjøp, men bare hvis du betaler hele fakturaen ved forfall. Betaler du renter, blir fordelene raskt spist opp.",
  sections: [
    {
      heading: "Hovedforskjellen",
      paragraphs: [
        "Med debetkort bruker du penger du allerede har. Med kredittkort låner du penger fra banken til du betaler fakturaen. Det er den grunnleggende forskjellen, uansett hvilke fordeler kortet også gir.",
      ],
    },
    {
      heading: "Når debetkort kan passe",
      bullets: [
        "Du vil bruke egne penger og ha oversikt uten månedlig faktura",
        "Du ønsker ikke kreditt",
        "Du vil unngå fristen for å betale hele fakturaen",
      ],
    },
    {
      heading: "Når kredittkort kan passe",
      bullets: [
        "Du betaler hele fakturaen ved forfall hver måned",
        "Du vil ha betalingsutsettelse uten renter i en kort periode",
        "Du vil ha ekstra vern ved kjøp på kreditt, som [kortreklamasjon](https://www.forbrukerradet.no/forside/okonomi-og-betaling/kortreklamasjon/)",
        "Bonus eller forsikring er verdt mer enn årsavgift og gebyrer for deg",
      ],
      tip: "Kortreklamasjon gjelder når kjøpet faktisk er gjort på kreditt. Debetkjøp har andre reklamasjonsregler.",
    },
    {
      heading: "Premium koster penger",
      paragraphs: [
        "De beste fordelene er sjelden gratis. Spør om du faktisk bruker forsikring, lounge eller bonus nok til at kortet går i pluss. Hvis ikke, er et enkelt kort ofte nok.",
      ],
    },
    {
      heading: "Oppsummert",
      paragraphs: [
        "Velg debet hvis du vil holde det enkelt. Velg kreditt hvis du betaler hele fakturaen og får verdi ut av fordelene. Detaljer om konkrete kort finner du i guiden om å velge kredittkort og under Kredittkortfordeler.",
      ],
    },
  ],
  sources: [
    {
      label: "Forbrukerrådet: kortreklamasjon",
      url: "https://www.forbrukerradet.no/forside/okonomi-og-betaling/kortreklamasjon/",
    },
  ],
  relatedLinks: [
    { label: "Velg riktig kredittkort", href: "/guider/velg-riktig-kredittkort" },
    { label: "Kredittkortfordeler", href: "/fordeler/kredittkortfordeler" },
    { label: "Bonuskalkulator", href: "/verktoy/bonuskalkulator" },
  ],
};
