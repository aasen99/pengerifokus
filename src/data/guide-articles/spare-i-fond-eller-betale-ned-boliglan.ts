import type { GuideArticleContent } from "@/types/guide-article";

export const spareIFondEllerBetaleNedBoliglan: Omit<
  GuideArticleContent,
  "readTimeMinutes"
> = {
  slug: "spare-i-fond-eller-betale-ned-boliglan",
  seoTitle: "Fond eller ekstra nedbetaling på boliglånet?",
  intro:
    "Ekstra avdrag gir en sikker rentebesparelse. Aksjefond kan gi høyere avkastning over tid, men også store fall underveis. Sammenlign boliglånsrenten etter rentefradrag med den usikre avkastningen du kan sitte igjen med etter kostnader og skatt.",
  shortAnswer:
    "Betal dyr gjeld og bygg buffer først. Deretter er ekstra avdrag best for deg som vil ha sikker effekt og lavere risiko, mens et bredt, rimelig aksjefond kan passe med minst 5–10 års horisont og evne til å tåle tap. En kombinasjon er ofte mer robust enn et alt-eller-ingenting-valg.",
  topCta: {
    heading: "Finn lånekostnaden din",
    description:
      "Se renter, terminbeløp og effekten av ekstra innbetaling på boliglånet.",
    buttonText: "Åpne rentekalkulatoren",
    href: "/verktoy/rentekalkulator",
    analyticsEvent: "guide_fond_boliglan_top_cta",
  },
  sections: [
    {
      heading: "Start med riktig rekkefølge",
      bullets: [
        "Behold en buffer til uforutsette utgifter",
        "Betal først ned kredittkort og annen gjeld med høyere rente",
        "Sjekk om du trenger pengene til bolig, oppussing eller annet de nærmeste årene",
        "Sammenlign først deretter ekstra boliglånsavdrag med langsiktig fondssparing",
      ],
      tip: "Penger du betaler inn på lånet er ikke alltid enkle å hente ut igjen. Ikke tøm kontoen for å få lavere gjeld dersom neste uforutsette regning må betales med kredittkort.",
    },
    {
      heading: "Hva er den sikre avkastningen på et ekstra avdrag?",
      paragraphs: [
        "Et ekstra avdrag reduserer fremtidige renter. Har du 5,50 prosent boliglånsrente og full skatteverdi av rentefradraget på 22 prosent, er den forenklede rentekostnaden etter skatt 4,29 prosent.",
        "Betaler du inn 100 000 kroner ekstra, sparer du dermed omtrent 5 500 kroner i renter første år før skatt og 4 290 kroner etter skatteverdien. Besparelsen faller etter hvert som lånet uansett betales ned, og et annuitetslån må beregnes med faktisk betalingsplan.",
      ],
      table: {
        caption: "Eksempel: 100 000 kroner ekstra på lånet",
        rows: [
          { label: "Boliglånsrente", value: "5,50 %" },
          { label: "Spart rente før skatt", value: "Ca. 5 500 kr første år" },
          { label: "Skatteverdi av renter", value: "22 % i eksemplet" },
          { label: "Spart rente etter skatt", value: "Ca. 4 290 kr første år" },
        ],
      },
    },
    {
      heading: "Hva må fondet levere for å være bedre?",
      paragraphs: [
        "Fondet må slå rentebesparelsen etter kostnader, risiko og skatt. I 2026 er effektiv skatt på skattepliktig aksjegevinst 37,84 prosent før eventuell skjerming. På aksjesparekonto utsettes skatten til du tar ut mer enn innskutt beløp.",
        "Det betyr ikke at du skal trekke 37,84 prosent fra hvert års fondsavkastning. Skatten kommer på gevinsten når den blir skattepliktig, og utsatt skatt kan også få stå investert. Poenget er at forventet bruttoavkastning ikke kan sammenlignes direkte med boliglånsrenten.",
      ],
      tip: "Ingen kjenner fondsavkastningen på forhånd. En historisk gjennomsnittsavkastning er ikke en garanti for perioden du faktisk skal spare.",
    },
    {
      heading: "Når taler mest for ekstra nedbetaling?",
      bullets: [
        "Du ønsker sikker besparelse fremfor mulig meravkastning",
        "Du har kortere tidshorisont eller lav toleranse for børsfall",
        "Gjeldsnivået gjør økonomien sårbar for renteoppgang eller inntektsfall",
        "Lavere lån gir deg bedre nattesøvn og gjør det lettere å holde planen",
        "Du har allerede nok langsiktig sparing i fond eller pensjon",
      ],
    },
    {
      heading: "Når taler mest for fond?",
      bullets: [
        "Du har minst 5–10 års tidshorisont",
        "Du tåler at verdien kan falle betydelig uten å selge",
        "Du har stabil økonomi, buffer og håndterbar gjeld",
        "Du vil spre formuen utover mer enn egen bolig",
        "Du bruker et bredt fond med lave kostnader og har en fast spareplan",
      ],
    },
    {
      heading: "Du kan dele beløpet",
      paragraphs: [
        "Valget trenger ikke være binært. Har du 4 000 kroner ekstra hver måned, kan du for eksempel bruke 2 000 kroner på lånet og 2 000 kroner i fond. Du får både garantert rentebesparelse og markedsdeltakelse.",
        "En annen modell er å øke avdragene når renten er høy, og fortsette et mindre fast fondsbeløp for å beholde vanen. Det viktigste er at fordelingen passer risikoen og målene dine – ikke at den er matematisk perfekt i ettertid.",
      ],
    },
  ],
  faq: [
    {
      question: "Er ekstra nedbetaling risikofritt?",
      answer:
        "Rentebesparelsen er forutsigbar, men pengene blir mindre likvide og en stor del av formuen kan bli bundet i bolig. Behold derfor buffer.",
    },
    {
      question: "Hvor mye sparer jeg på 100 000 kroner ekstra avdrag?",
      answer:
        "Ved 5,50 prosent rente er den enkle besparelsen cirka 5 500 kroner første år før skatt. Med 22 prosent skatteverdi av rentene er nettoeffekten omtrent 4 290 kroner.",
    },
    {
      question: "Bør jeg stoppe all fondssparing når renten er høy?",
      answer:
        "Ikke nødvendigvis. En mindre fast sparing kan bevare den langsiktige vanen, mens resten går til lånet. Vurder helheten i økonomien og hvor mye risiko du tåler.",
    },
    {
      question: "Hva med fastrente?",
      answer:
        "Ved fastrente må du sjekke avtalen før ekstra innbetaling. Overkurs eller underkurs kan påvirke kostnaden dersom lånet endres eller innfris før bindingstiden er over.",
    },
  ],
  sources: [
    {
      label: "Skatteetaten: lån og renter",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/lan-og-renter/",
    },
    {
      label: "Skatteetaten: 22 prosent rentefradrag",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/lan-og-renter/fordeling/",
    },
    {
      label: "Skatteetaten: skatt på aksjegevinst og utbytte",
      url: "https://www.skatteetaten.no/satser/faktor-for-oppjustering-av-gevinsttap-eller-utbytte-pa-aksjer/",
    },
    {
      label: "Skatteetaten: aksjesparekonto",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/aksjer-og-verdipapirer/om/aksjesparekonto-ask/",
    },
  ],
  conclusion:
    "Ekstra avdrag gir en kjent besparelse; fond gir en ukjent mulighet. Når buffer og dyr gjeld er på plass, bør valget styres av tidshorisont, risikotoleranse og hvor mye av formuen som allerede er bundet i bolig.",
  bottomCta: {
    heading: "Test et ekstra avdrag",
    description:
      "Sammenlign lånet med og uten ekstra innbetaling og se renter spart over tid.",
    buttonText: "Regn på lånet",
    href: "/verktoy/rentekalkulator",
    analyticsEvent: "guide_fond_boliglan_bottom_cta",
  },
  relatedLinks: [
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
  ],
};
