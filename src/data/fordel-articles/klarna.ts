import type { FordelArticleContent } from "@/types/fordel-article";

export const klarna: FordelArticleContent = {
  slug: "klarna",
  title: "Klarna cashback",
  readTimeMinutes: 8,
  intro:
    "Klarna cashback lar deg tjene en prosentandel tilbake når du handler hos utvalgte nettbutikker via Klarna-appen. Poengene samles i appen og kan løses inn til Klarna-saldo – men cashback er ikke kontanter før du faktisk løser dem inn, og mange vilkår gjelder.",
  lastVerified: "2. juli 2026",
  lastModifiedIso: "2026-07-02",
  seoTitle: "Klarna cashback: slik fungerer det og hva du bør vite",
  seoDescription:
    "Forstå Klarna cashback: opptjening via appen, Krav om Klarna-saldo, utbetalingstid, medlemskap og vanlige fallgruver ved netthandel.",
  seoKeywords: [
    "Klarna cashback",
    "Klarna app",
    "Klarna saldo",
    "Klarna medlemskap",
    "Klarna bonus",
    "cashback netthandel",
    "Klarna poeng",
    "Klarnakort cashback",
  ],
  sections: [
    {
      heading: "Hva er Klarna cashback?",
      paragraphs: [
        "Klarna cashback er et bonusprogram der du kan tjene poeng på kjøp hos deltakende butikker i Klarna-appen. Poengene er lojalitetskreditter – ikke kontanter – og har ingen verdi før du løser dem inn etter Klarnas vilkår.",
        "Programmet er gratis for forbrukeren, men krever Klarna-app og i praksis en aktiv Klarna-saldo for å motta utbetalt cashback.",
      ],
    },
    {
      heading: "Slik tjener du cashback",
      paragraphs: [
        "Du handler via Klarna-appen hos butikker som tilbyr cashback. Når kjøpet er godkjent av butikken, registreres poeng i «Cashback-hjem» i appen. Satser varierer fra butikk til butikk – ofte fra rundt 1 % og oppover.",
      ],
      bullets: [
        "Start kjøpet fra cashback-tilbudet i Klarna-appen – ikke bare fra butikkens egen side",
        "Cashback kan gjelde uansett betalingsmåte (betal nå, del opp, 30 dager osv.)",
        "Godkjenning fra butikken kan ta tid – Klarna oppgir typisk 35–95 dager",
        "Informasjonskapsler, returer og avbrutte kjøp kan påvirke opptjening",
      ],
      tip: "Les tilbudsreglene for hver butikk. Cashback gjelder bare «tilgjengelige kjøp» – ikke alt du handler.",
    },
    {
      heading: "Klarna-saldo og utbetaling",
      paragraphs: [
        "For å løse inn cashback mot penger trenger du Klarna-saldo. Du kan manuelt løse inn poeng i appen, eller la dem flyte til saldo etter ca. 90 dager hvis du ikke gjør noe – ifølge Klarnas vilkår.",
        "Poeng kan også konverteres til fly- eller hotellpoeng med Klarna-medlemskap, avhengig av hva som er tilgjengelig i appen.",
      ],
    },
    {
      heading: "Klarna-medlemskap og Klarnakort",
      paragraphs: [
        "Grunnleggende cashback får du ved shopping i appen. Med Klarna-medlemskap kan du i tillegg tjene cashback på debettkjøp med Klarnakortet og enkelte «betal nå»-kjøp med Klarna-saldo.",
        "Medlemskapet har egne satser og fordeler, men er et betalt abonnement – vurder om ekstra cashback dekker kostnaden ut fra ditt faktiske forbruk.",
      ],
    },
    {
      heading: "Vanlige fallgruver",
      paragraphs: [
        "Cashback-programmer belønner deg for å handle mer – ikke for å spare. En «god» cashback-sats kan lokke til kjøp du ikke hadde planlagt.",
      ],
      bullets: [
        "Kjøp utenfor appen eller uten å følge tilbudslinken gir ofte ingen cashback",
        "Retur og kansellering kan trekke tilbake poeng",
        "Poeng er ikke penger før innløsning – planlegg ikke budsjettet rundt uoppgjent cashback",
        "Sammenlign totalpris med andre butikker – 5 % cashback på dyr vare slår ikke alltid lavere pris et annet sted",
      ],
    },
    {
      heading: "Er Klarna cashback verdt det?",
      paragraphs: [
        "Det kan være verdt det hvis du uansett handler hos butikker i Klarna-appen og har (eller vil ha) Klarna-saldo. Da er cashback en bonus på planlagte kjøp.",
        "Det er sjelden verdt det å velge dyrere butikk eller kjøpe noe ekstra bare for cashback. Behandle poeng som en liten rabatt – ikke som inntekt.",
      ],
    },
  ],
  faq: [
    {
      question: "Må jeg betale med Klarna for å få cashback?",
      answer:
        "Nei, ifølge Klarna kan du tjene cashback uansett betalingsmåte i appen. Klarna anbefaler likevel å betale med Klarna for enklere oppfølging ved problemer.",
    },
    {
      question: "Trenger jeg Klarna-saldo?",
      answer:
        "Du kan begynne å opptjene poeng uten saldo, men du trenger aktiv Klarna-saldo for å motta cashback utbetalt som penger.",
    },
    {
      question: "Hvor lang tid tar det før cashback blir tilgjengelig?",
      answer:
        "Klarna oppgir typisk 35–95 dager fra kjøp til poeng er tilgjengelige for innløsning, avhengig av butikkens godkjenning.",
    },
    {
      question: "Utløper Klarna cashback?",
      answer:
        "Ja. Ifølge Klarnas vilkår kan poeng utløpe ved inaktivitet. Med aktiv Klarna-saldo kan poeng flyttes dit automatisk før utløp.",
    },
  ],
  sources: [
    { label: "Klarna – Cashback", url: "https://www.klarna.com/no/cashback/" },
    { label: "Klarna-appen", url: "https://www.klarna.com/no/klarna-app/" },
    {
      label: "Klarna – Cashback vilkår (Norge)",
      url: "https://cdn.klarna.com/1.0/shared/content/legal/terms/nb-NO/cashback",
    },
  ],
  relatedLinks: [
    { label: "Klarna-tilbud – oversikt", href: "/tilbud?program=klarna" },
    { label: "Velg riktig kredittkort", href: "/guider/velg-riktig-kredittkort" },
    { label: "Bonuskalkulator", href: "/verktoy/bonuskalkulator" },
    { label: "Trumf Netthandel", href: "/fordeler/trumf" },
  ],
};
