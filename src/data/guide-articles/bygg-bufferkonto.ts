import type { GuideArticleContent } from "@/types/guide-article";

export const byggBufferkonto: GuideArticleContent = {
  slug: "bygg-bufferkonto",
  intro:
    "En bufferkonto er økonomiens airbag. Den gjør at uforutsette regninger ikke blir til dyr gjeld, og gir deg ro i hverdagen.",
  sections: [
    {
      heading: "Hva er en bufferkonto?",
      paragraphs: [
        "Bufferkontoen er penger du setter til side for det du ikke planlegger: bil som ryker, tannlege, plutselig jobbtap eller en ødelagt vaskemaskin.",
        "Pengene bør være lett tilgjengelige på en vanlig sparekonto, ikke låst i fond eller BSU. Poenget er at du skal kunne bruke dem raskt uten å måtte selge investeringer eller ta opp forbrukslån.",
      ],
    },
    {
      heading: "Hvor mye bør du ha?",
      bullets: [
        "Minimum er én måneds normale utgifter, bedre enn ingenting",
        "Anbefalt: 3 måneders utgifter for de fleste",
        "Tryggere: 6 måneder hvis du har uforutsigbar inntekt eller familie",
        "Egen bolig med lån: vurder nærmere 3–6 måneder",
      ],
      tip: "Regn ut månedlige utgifter, ikke bare inntekt. Leie, mat, strøm, forsikring og lån teller. Streaming og takeaway kan du kutte i nød.",
    },
    {
      heading: "Slik bygger du den steg for steg",
      paragraphs: [
        "Du trenger ikke spare alt på én gang. De fleste kommer dit ved å sette av fast beløp hver måned, akkurat som en regning.",
      ],
      bullets: [
        "1. Finn månedlige utgifter (se på kontoutskrift eller budsjett)",
        "2. Sett et mål, f.eks. 3 × utgifter",
        "3. Åpne en egen sparekonto (gjør det synlig at pengene har et formål)",
        "4. Sett opp fast trekk på lønningsdag",
        "5. Fyll på igjen etter at du har måttet bruke bufferen",
      ],
    },
    {
      heading: "Hvor skal pengene ligge?",
      paragraphs: [
        "Bufferen hører hjemme på en sparekonto med god rente og ingen binding. Du skal ikke jage høy avkastning her: trygghet og tilgjengelighet er viktigst.",
        "Ikke bland buffer med daglig bruk. Mange oppretter en egen konto med navn som «Buffer» eller «Nødfond» for å unngå å bruke pengene på hverdagskjøp.",
      ],
    },
    {
      heading: "Vanlige feil",
      bullets: [
        "Bruke bufferen til ferie eller TV. Da er det ikke en buffer",
        "Investere bufferen i aksjer: risikerer å måtte selge med tap når du trenger pengene",
        "Vente med å starte til du «har råd», selv 500 kr i måneden hjelper",
        "Glemme å fylle på etter bruk",
      ],
    },
    {
      heading: "Når er du ferdig?",
      paragraphs: [
        "Når bufferen er på plass, kan du med god samvittighet prioritere annet: nedbetale dyr gjeld, BSU, fond eller ekstra innbetaling på boliglån.",
        "Bufferen er grunnmuren. Resten av økonomien blir lettere å bygge når den står.",
      ],
    },
  ],
  relatedLinks: [
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
  ],
};
