import type { GuideArticleContent } from "@/types/guide-article";

export const trumfVsCoop: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "trumf-vs-coop",
  seoTitle: "Trumf eller Coop i 2026: Hvilket program lønner seg?",
  intro:
    "Trumf gir bonus hos NorgesGruppens kjeder, mens Coop-medlemmer får kjøpeutbytte og medlemsfordeler gjennom samvirkelaget sitt. Begge kan være lønnsomme – men butikkpris, handlemønster og hvor raskt du faktisk bruker fordelen betyr mer enn logoen på medlemskortet.",
  shortAnswer:
    "Trumf gir normalt 1 prosent grunnbonus på kvalifiserende dagligvarer og 1 prosent ekstra med Trumf Pay. Coop oppgir minst 1 prosent kjøpeutbytte, men sats og vilkår følger samvirkelaget. Velg først den butikken som gir lavest total handlekurv; en bonus på 1–2 prosent redder ikke et merkbart dyrere kjøp.",
  sections: [
    {
      heading: "Trumf og Coop side om side",
      table: {
        caption: "Hovedforskjeller i 2026",
        rows: [
          {
            label: "Grunnfordel",
            value: "Trumf: normalt 1 % bonus · Coop: minst 1 % kjøpeutbytte etter lokale vilkår",
          },
          {
            label: "Ekstra opptjening",
            value: "Trumf: blant annet Trumf Pay og Trippel-Trumf · Coop: medlemskupp og lokale fordeler",
          },
          {
            label: "Når verdien kommer",
            value: "Trumf: bonus registreres løpende · Coop: kjøpeutbytte gjøres normalt tilgjengelig etter opptjeningsåret",
          },
          {
            label: "Tilknytning",
            value: "Trumf: bonusprogram · Coop: medlemskap og eierandel i et samvirkelag",
          },
          {
            label: "Innmelding",
            value: "Trumf: ingen medlemsinnskudd · Coop: medlemsinnskudd på 300 kr",
          },
        ],
      },
      tip: "Satser, unntak og lokale Coop-vilkår kan endres. Kontroller alltid programmet og samvirkelaget du faktisk tilhører.",
    },
    {
      heading: "Hva gir Trumf?",
      paragraphs: [
        "Trumf-medlemmer får normalt 1 prosent grunnbonus på kvalifiserende dagligvarer hos tilknyttede NorgesGruppen-kjeder. Betaler du med Trumf Pay, oppgir Trumf 1 prosent ekstra bonus hos kvalifiserende butikker.",
        "På Trippel-Trumf får du normalt 3 prosent i stedet for 1 prosent før eventuelle betalingsfordeler. Kampanjer og varekategorier kan ha egne unntak, så bekreft dato og vilkår før du planlegger en ekstra stor handel.",
      ],
      bullets: [
        "Løpende bonus som kan brukes på flere måter",
        "Ekstra bonus med Trumf Pay hos støttede banker og butikker",
        "Trippel-Trumf og kjedespesifikke programmer kan øke opptjeningen",
        "Bonus skal ikke være en grunn til å betale kredittkortrente",
      ],
    },
    {
      heading: "Hva gir Coop-medlemskapet?",
      paragraphs: [
        "Coop er medlemseid. Ved innmelding betaler du et medlemsinnskudd på 300 kroner. Coop oppgir minst 1 prosent kjøpeutbytte på det du handler gjennom året, i tillegg til medlemskupp og partnerfordeler.",
        "Det konkrete kjøpeutbyttet og enkelte vilkår kan variere mellom samvirkelag. Verdien kommer normalt etter opptjeningsåret, så sammenlign ikke bare prosenten, men også hvor og når du kan bruke pengene.",
      ],
    },
    {
      heading: "Regneeksempel: 120 000 kroner i året",
      paragraphs: [
        "Anta at hele beløpet kvalifiserer, og se bort fra kampanjer, unntak og prisforskjeller. Eksemplet viser hvorfor grunnsatsen alene ofte gir et ganske likt resultat.",
      ],
      table: {
        caption: "Forenklet årlig verdi ved 120 000 kr i kvalifiserende kjøp",
        rows: [
          {
            label: "Trumf med 1 % grunnbonus",
            value: "Ca. 1 200 kr",
          },
          {
            label: "Trumf med 1 % grunnbonus + 1 % Trumf Pay",
            value: "Ca. 2 400 kr dersom alle kjøp kvalifiserer",
          },
          {
            label: "Coop med 1 % kjøpeutbytte",
            value: "Ca. 1 200 kr før andre medlemsfordeler",
          },
        ],
      },
      tip: "Er handlekurven 3 prosent dyrere, taper du 3 600 kroner på 120 000 kroner i forbruk. Det er mer enn grunnfordelen i begge programmene i dette eksemplet.",
    },
    {
      heading: "Slik velger du riktig program",
      bullets: [
        "Sammenlign prisen på varene du faktisk kjøper ofte",
        "Ta med avstand, transport og tidsbruk dersom butikkene ligger ulikt til",
        "Regn bare bonus på kjøp som faktisk kvalifiserer",
        "Verdsett kuponger ut fra det du ellers ville kjøpt – ikke pålydende rabatt",
        "Sjekk om bonusen brukes eller bare blir stående",
        "Bruk gjerne begge medlemskap dersom du handler naturlig i begge kjeder",
      ],
    },
    {
      heading: "Hvem passer de best for?",
      subsections: [
        {
          subheading: "Trumf kan passe best når",
          bullets: [
            "NorgesGruppens butikker allerede er billigst eller mest praktiske for handlekurven din",
            "Du bruker Trumf Pay og følger bekreftede bonusdager uten å overhandle",
            "Du ønsker løpende bonus og bruker den aktivt",
          ],
        },
        {
          subheading: "Coop kan passe best når",
          bullets: [
            "Coop-butikken gir best totalpris på varene dine",
            "Du bruker medlemskuppene på ting du allerede hadde tenkt å kjøpe",
            "Du verdsetter kjøpeutbytte og eierformen i samvirkelaget",
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: "Kan jeg være medlem i både Trumf og Coop?",
      answer:
        "Ja. Programmene utelukker ikke hverandre. Registrer fordelen der du handler, men velg butikk etter totalpris og behov.",
    },
    {
      question: "Gir Trumf alltid 1 prosent bonus?",
      answer:
        "Trumf oppgir normalt 1 prosent grunnbonus på kvalifiserende dagligvarer, men enkelte varer og tjenester er unntatt. Kontroller gjeldende vilkår.",
    },
    {
      question: "Hvor mye kjøpeutbytte gir Coop?",
      answer:
        "Coop oppgir minst 1 prosent, men sats og vilkår følger samvirkelaget ditt. Medlemskupp og andre fordeler kommer i tillegg.",
    },
    {
      question: "Er Trumf Pay alltid best?",
      answer:
        "Det kan gi 1 prosent ekstra bonus på kvalifiserende kjøp, men bare dersom banken og butikken støttes og vilkårene er oppfylt. Prisnivået i butikken er fortsatt viktigere.",
    },
  ],
  sources: [
    {
      label: "Trumf: Trumf Pay",
      url: "https://www.trumf.no/trumf-pay",
    },
    {
      label: "Trumf: Trippel-Trumf",
      url: "https://www.trumf.no/trippel-trumf",
    },
    {
      label: "Coop: bli medlem",
      url: "https://www.coop.no/medlem/bli-medlem",
    },
  ],
  conclusion:
    "Trumf og Coop kan begge gi reell verdi, men bonusen kommer etter prisen. Sammenlign en typisk handlekurv, tell bare fordeler du faktisk bruker, og behold gjerne begge medlemskap hvis det gjør det enklere å velge billigst fra gang til gang.",
  bottomCta: {
    heading: "Hva er bonusen egentlig verdt?",
    description:
      "Regn på opptjening, kostpris og innløsningsverdi før du endrer handlemønster.",
    buttonText: "Åpne bonuskalkulatoren",
    href: "/verktoy/bonuskalkulator",
    analyticsEvent: "guide_trumf_coop_bottom_cta",
  },
  relatedLinks: [
    { label: "Trumf og Trumf-bonus", href: "/fordeler/trumf" },
    { label: "Coop-medlemskap", href: "/fordeler/coop" },
    { label: "Trippel-Trumf 2026", href: "/guider/trippel-trumf" },
    { label: "Emne: bonus og fordeler", href: "/emner/bonus-og-fordeler" },
  ],
};
