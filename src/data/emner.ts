export interface EmneLink {
  href: string;
  label: string;
  description: string;
}

export interface EmneSection {
  heading: string;
  links: EmneLink[];
}

export interface EmneHub {
  slug: string;
  title: string;
  description: string;
  intro: string[];
  keywords: string[];
  sections: EmneSection[];
}

export const emner: EmneHub[] = [
  {
    slug: "bolig",
    title: "Bolig",
    description:
      "Eie eller leie, BSU, boliglån, egenkapital og fellesgjeld. Guider, kalkulatorer og ordbok for boligøkonomi i Norge.",
    keywords: [
      "bolig",
      "eie eller leie",
      "boliglån",
      "BSU",
      "egenkapital",
      "fellesgjeld",
    ],
    intro: [
      "Bolig er den største økonomiske beslutningen de fleste tar. Valget mellom å eie og leie handler sjelden bare om husleie mot terminbeløp: kjøpskostnader, vedlikehold, renter og hva egenkapitalen kunne gitt i fond endrer regnestykket.",
      "Her samler vi guider om eie versus leie, verktøy for BSU og boliglån, ordbokbegreper banken bruker, og boligbyggelag som OBOS og Usbl. Målet er at du skal sammenligne med egne tall, ikke med tommelfingerregler.",
    ],
    sections: [
      {
        heading: "Guider",
        links: [
          {
            href: "/guider/laneramme-for-boligkjop",
            label: "EK × 10 og lønn × 5",
            description:
              "Slik regner banken låneramme, og hvorfor ekstra egenkapital slår nedbetaling.",
          },
          {
            href: "/guider/eie-eller-leie-bolig",
            label: "Eie eller leie bolig",
            description:
              "Tidshorisont, dokumentavgift, alternativkostnad og når leie kan slå eie.",
          },
          {
            href: "/guider/bygg-bufferkonto",
            label: "Bygg bufferkonto",
            description:
              "En buffer før boligkjøp reduserer risikoen for at neste uhell blir ny gjeld.",
          },
        ],
      },
      {
        heading: "Verktøy",
        links: [
          {
            href: "/verktoy/hvor-mye-kan-jeg-lane-kalkulator",
            label: "Hvor mye kan jeg låne-kalkulator",
            description:
              "EK × 10 − gjeld og lønn × 5 − gjeld for maks boliglån.",
          },
          {
            href: "/verktoy/eie-leie-kalkulator",
            label: "Eie vs. leie-kalkulator",
            description:
              "Sammenlign nettoformue ved kjøp og leie, med break-even over tid.",
          },
          {
            href: "/verktoy/bsu-kalkulator",
            label: "BSU-kalkulator",
            description:
              "Regn ut skattefordelen og innskuddstak for boligsparing for ungdom.",
          },
          {
            href: "/verktoy/rentekalkulator",
            label: "Rentekalkulator",
            description:
              "Terminbeløp, renter og effekt av ekstra innbetaling på ett annuitetslån.",
          },
          {
            href: "/verktoy/utleiebolig-kalkulator",
            label: "Utleiebolig-kalkulator",
            description:
              "Kontantstrøm, leieavkastning og break-even leie for utleie.",
          },
        ],
      },
      {
        heading: "Ordbok",
        links: [
          {
            href: "/ordbok/egenkapital",
            label: "Egenkapital",
            description: "Andelen av boligen du eier etter gjeld.",
          },
          {
            href: "/ordbok/bsu",
            label: "BSU",
            description: "Boligsparing for ungdom med skattefradrag.",
          },
          {
            href: "/ordbok/annuitetslan",
            label: "Annuitetslån",
            description: "Jevnt terminbeløp, høyest rentekostnad i starten.",
          },
          {
            href: "/ordbok/fellesgjeld",
            label: "Fellesgjeld",
            description: "Borettslagets lån som inngår i totalprisen.",
          },
          {
            href: "/ordbok/dokumentavgift",
            label: "Dokumentavgift",
            description: "2,5 % ved tinglysing av fast eiendom.",
          },
          {
            href: "/ordbok/rentefradrag",
            label: "Rentefradrag",
            description: "Skattefradrag for rentekostnader på lån.",
          },
          {
            href: "/ordbok/boliglan",
            label: "Boliglån",
            description: "Lån med pant i bolig, ofte lavere rente enn forbruksgjeld.",
          },
          {
            href: "/ordbok/depositum",
            label: "Depositum",
            description: "Sikkerhet ved leie, bundet kapital med alternativkostnad.",
          },
        ],
      },
      {
        heading: "Fordeler",
        links: [
          {
            href: "/fordeler/obos",
            label: "OBOS-medlemskap",
            description: "Forkjøpsrett, ansiennitet og medlemsfordeler.",
          },
          {
            href: "/fordeler/usbl",
            label: "Usbl-medlemskap",
            description: "Boligkø, utleiefortrinnsrett og bonus i Bonabo.",
          },
        ],
      },
      {
        heading: "Formuesbyggere",
        links: [
          {
            href: "/formuesbyggere/olav-thon",
            label: "Olav Thon",
            description: "Eiendom og handel over flere tiår.",
          },
          {
            href: "/formuesbyggere/petter-stordalen",
            label: "Petter Stordalen",
            description: "Hotell, eiendom og Strawberry Group.",
          },
          {
            href: "/formuesbyggere/ivar-erik-tollefsen",
            label: "Ivar Erik Tollefsen",
            description: "Fredensborg og boligutleie i Europa.",
          },
        ],
      },
    ],
  },
  {
    slug: "gjeld",
    title: "Gjeld",
    description:
      "Betal ned dyr gjeld, sammenlign effektiv rente og refinansiering, og bruk lavine eller snøball. Guider, kalkulatorer og ordbok.",
    keywords: [
      "gjeld",
      "effektiv rente",
      "refinansiering",
      "forbruksgjeld",
      "nedbetaling",
      "annuitetslån",
    ],
    intro: [
      "Dyr gjeld koster mer jo lenger den står. Kredittkort og forbrukslån har ofte høy effektiv rente, mens boliglån typisk er billigere – men større. Første steg er oversikt: restgjeld, rente og minimum per lån.",
      "Her finner du en nedbetalingsplan, kalkulatorer for ett eller flere lån, og ordbokforklaringer av effektiv rente, annuitet, refinansiering og rentefradrag. Inflasjon kan gjøre nominell gjeld lettere over tid, men den ettergir ikke det du skylder.",
    ],
    sections: [
      {
        heading: "Guider",
        links: [
          {
            href: "/guider/betal-ned-dyr-gjeld",
            label: "Betal ned dyr gjeld",
            description:
              "Kartlegg lån, velg lavine eller snøball, og vurder refinansiering.",
          },
          {
            href: "/guider/inflasjon-og-gjeld",
            label: "Inflasjon og gjeld",
            description:
              "Hvorfor lån kan føles lettere over tid, og hvordan lønnsvekst kan brukes til raskere nedbetaling.",
          },
          {
            href: "/guider/kutt-faste-kostnader",
            label: "Kutt faste kostnader",
            description:
              "Frigjør penger til ekstra avdrag uten å kutte i alt som gir verdi.",
          },
        ],
      },
      {
        heading: "Verktøy",
        links: [
          {
            href: "/verktoy/hvor-mye-kan-jeg-lane-kalkulator",
            label: "Hvor mye kan jeg låne-kalkulator",
            description:
              "Se hvor mye du kan låne ut fra EK × 10 − gjeld og lønn × 5 − gjeld.",
          },
          {
            href: "/verktoy/gjeldsbremsen",
            label: "Gjeldsbremsen",
            description:
              "Se reell gjeldsreduksjon og lag en plan for å unngå ny kreditt etter betaling.",
          },
          {
            href: "/verktoy/nedbetalingskalkulator",
            label: "Nedbetalingskalkulator",
            description:
              "Flere lån: sammenlign lavine og snøball med ett månedsbudsjett.",
          },
          {
            href: "/verktoy/rentekalkulator",
            label: "Rentekalkulator",
            description:
              "Ett annuitetslån: terminbeløp, renter og ekstra innbetaling.",
          },
          {
            href: "/verktoy/lanets-reelle-verdi",
            label: "Lånets reelle verdi",
            description:
              "Se hvordan inflasjon og lønnsvekst påvirker gjeldens kjøpekraft.",
          },
        ],
      },
      {
        heading: "Ordbok",
        links: [
          {
            href: "/ordbok/effektiv-rente",
            label: "Effektiv rente",
            description: "Total årlig lånekostnad, inkludert gebyrer.",
          },
          {
            href: "/ordbok/nominell-rente",
            label: "Nominell rente",
            description: "Avtalt rentesats før gebyrer.",
          },
          {
            href: "/ordbok/refinansiering",
            label: "Refinansiering",
            description: "Flytte gjeld til nytt lån, ofte for lavere rente.",
          },
          {
            href: "/ordbok/forbruksgjeld",
            label: "Forbruksgjeld",
            description: "Kredittkort og lån uten sikkerhet, ofte dyrt.",
          },
          {
            href: "/ordbok/annuitetslan",
            label: "Annuitetslån",
            description: "Samme terminbeløp, mer renter tidlig i løpetiden.",
          },
          {
            href: "/ordbok/serielan",
            label: "Serielån",
            description: "Faste avdrag, synkende terminbeløp over tid.",
          },
          {
            href: "/ordbok/rentefradrag",
            label: "Rentefradrag",
            description: "Skattefradrag for renter du betaler.",
          },
          {
            href: "/ordbok/lavinemetode",
            label: "Lavinemetode",
            description: "Ekstra på høyeste rente først.",
          },
          {
            href: "/ordbok/snoballmetode",
            label: "Snøballmetode",
            description: "Ekstra på minste gjeld først.",
          },
        ],
      },
    ],
  },
  {
    slug: "sparing-og-investering",
    title: "Sparing og investering",
    description:
      "Bufferkonto, fond, ASK, BSU og rentes rente. Guider, kalkulatorer, ordbok og profiler av investorer.",
    keywords: [
      "sparing",
      "fond",
      "ASK",
      "indeksfond",
      "rentes rente",
      "bufferkonto",
      "investering",
    ],
    intro: [
      "Sparing starter med en buffer, slik at uforutsette utgifter ikke blir til dyr gjeld. Deretter kan langsiktige penger gå i fond, BSU eller annen investering. Rentes rente gjør at jevn sparing over tid slår sporadiske hopp når markedet «ser billig ut».",
      "Her ligger innføringen i fond og ASK, sparekalkulatorer, og ordboktermer som indeksfond, avkastning og aksjesparekonto. Formuesbyggerne viser hvordan eierskap og reinvestering – ikke lønn alene – bygger store formuer.",
    ],
    sections: [
      {
        heading: "Guider",
        links: [
          {
            href: "/guider/bygg-bufferkonto",
            label: "Bygg bufferkonto",
            description: "Nødfond på sparekonto før du investerer.",
          },
          {
            href: "/guider/kom-i-gang-med-fond",
            label: "Kom i gang med fond",
            description: "Indeksfond, ASK og fast månedlig sparing.",
          },
          {
            href: "/guider/funfacts",
            label: "Funfacts om penger",
            description: "Rentes rente og andre trekk ved sparing og psykologi.",
          },
        ],
      },
      {
        heading: "Verktøy",
        links: [
          {
            href: "/verktoy/sparekalkulator",
            label: "Sparekalkulator",
            description: "Se hvordan sparingen vokser med ekstra innskudd.",
          },
          {
            href: "/verktoy/millionkalkulator",
            label: "Millionkalkulator",
            description: "Tid, månedlig beløp eller avkastning mot et sparemål.",
          },
          {
            href: "/verktoy/regel-72",
            label: "Regel 72",
            description: "Tommelfingerregel for hvor lang tid det tar å doble pengene.",
          },
          {
            href: "/verktoy/bsu-kalkulator",
            label: "BSU-kalkulator",
            description: "Skattefordel og innskuddsgrense for boligsparing.",
          },
        ],
      },
      {
        heading: "Ordbok",
        links: [
          {
            href: "/ordbok/ask",
            label: "ASK",
            description: "Aksjesparekonto med utsatt skatt på gevinst.",
          },
          {
            href: "/ordbok/rentes-rente",
            label: "Rentes rente",
            description: "Avkastning på tidligere avkastning over tid.",
          },
          {
            href: "/ordbok/indeksfond",
            label: "Indeksfond",
            description: "Fond som følger en markedsindeks, ofte med lave kostnader.",
          },
          {
            href: "/ordbok/bufferkonto",
            label: "Bufferkonto",
            description: "Lett tilgjengelige penger til uforutsette utgifter.",
          },
          {
            href: "/ordbok/aksjefond",
            label: "Aksjefond",
            description: "Fond som primært eier aksjer.",
          },
          {
            href: "/ordbok/avkastning",
            label: "Avkastning",
            description: "Hva sparingen eller investeringen gir over tid.",
          },
          {
            href: "/ordbok/bsu",
            label: "BSU",
            description: "Boligsparing for ungdom med skattefradrag.",
          },
          {
            href: "/ordbok/alternativkostnad",
            label: "Alternativkostnad",
            description: "Hva du gir opp når kapitalen bindes ett sted.",
          },
        ],
      },
      {
        heading: "Formuesbyggere",
        links: [
          {
            href: "/formuesbyggere/warren-buffett",
            label: "Warren Buffett",
            description: "Reinvestering og eierskap i Berkshire Hathaway.",
          },
          {
            href: "/formuesbyggere/johan-h-andresen",
            label: "Johan H. Andresen",
            description: "Ferd: eierskap versus kontroll i familieformue.",
          },
          {
            href: "/formuesbyggere/nicolai-tangen",
            label: "Nicolai Tangen",
            description: "Hedgefond og forvaltning, med eierskap flyttet til stiftelse.",
          },
        ],
      },
    ],
  },
  {
    slug: "bonus-og-fordeler",
    title: "Bonus og fordeler",
    description:
      "Trumf, Coop, EuroBonus, Klarna cashback, LOfavør og studentrabatter. Oversikt over bonuspoeng, kjøpeutbytte og når programmene faktisk lønner seg.",
    keywords: [
      "bonus",
      "fordelsprogram",
      "cashback",
      "bonuspoeng",
      "trumf",
      "eurobonus",
      "lofavor",
      "kjøpeutbytte",
    ],
    intro: [
      "Bonus og cashback er sjelden «gratis penger». Verdien avhenger av om du uansett handler der, om poengene utløper, og om rente på kredittkort spiser opp gevinsten. Ett program som gir 1 % tilbake på dagligvarer du likevel kjøper, er noe annet enn poeng du jager med unødvendige kjøp.",
      "Her samler vi fordelsprogrammer, bonuskalkulatoren og ordboktermer som cashback, bonuspoeng og kjøpeutbytte. Bruk tilbudsoversikten når du vil se konkrete rabatter, og les guiden før du velger kredittkort etter bonus.",
    ],
    sections: [
      {
        heading: "Guider",
        links: [
          {
            href: "/guider/velg-riktig-kredittkort",
            label: "Velg riktig kredittkort",
            description:
              "Bonusjeger eller enkel bruker: velg etter forbruk og om du betaler hele fakturaen.",
          },
          {
            href: "/guider/bankenes-fordelsprogrammer",
            label: "Bankenes fordelsprogrammer",
            description:
              "DNB, Nordea og fagforeningsavtaler: lojalitetsprogrammer, ikke veldedighet.",
          },
          {
            href: "/guider/kredittkort-eller-debetkort",
            label: "Kredittkort eller debetkort",
            description:
              "Når betalte debetkort konkurrerer med premium-kredittkort på reise og bonus.",
          },
        ],
      },
      {
        heading: "Verktøy og oversikter",
        links: [
          {
            href: "/verktoy/bonuskalkulator",
            label: "Bonuskalkulator",
            description:
              "Kostpris per poeng, innløsningsverdi og om du bør betale kontant.",
          },
          {
            href: "/fordeler",
            label: "Alle fordelsprogrammer",
            description: "Trumf, Coop, OBOS, LOfavør, EuroBonus, student og flere.",
          },
          {
            href: "/tilbud",
            label: "Tilbud og medlemsrabatter",
            description: "Aktuelle rabatter samlet etter program.",
          },
        ],
      },
      {
        heading: "Ordbok",
        links: [
          {
            href: "/ordbok/cashback",
            label: "Cashback",
            description: "Prosent tilbake på kjøp, ofte som poeng eller saldo.",
          },
          {
            href: "/ordbok/bonuspoeng",
            label: "Bonuspoeng",
            description: "Poeng til reise eller varer, med variabel verdi.",
          },
          {
            href: "/ordbok/kjopeutbytte",
            label: "Kjøpeutbytte",
            description: "Andel av handelen tilbake, typisk i samvirkelag.",
          },
          {
            href: "/ordbok/spenn",
            label: "Spenn",
            description: "Felles poengvaluta hos blant annet Norwegian og Strawberry.",
          },
          {
            href: "/ordbok/effektiv-rente",
            label: "Effektiv rente",
            description: "Hva kredittkortet koster hvis du ikke betaler hele fakturaen.",
          },
        ],
      },
      {
        heading: "Fordeler",
        links: [
          {
            href: "/fordeler/trumf",
            label: "Trumf og Trumf-bonus",
            description: "1 % på dagligvarer, Trippel-Trumf og uttak til bank.",
          },
          {
            href: "/fordeler/coop",
            label: "Coop Medlem og kjøpeutbytte",
            description: "Minst 1 % tilbake, varierer etter samvirkelag.",
          },
          {
            href: "/fordeler/eurobonus",
            label: "SAS EuroBonus",
            description: "Bonuspoeng versus nivåpoeng, SkyTeam og innløsning.",
          },
          {
            href: "/fordeler/klarna",
            label: "Klarna cashback",
            description: "Poeng via appen, innløsning til Klarna-saldo.",
          },
          {
            href: "/fordeler/student",
            label: "Studentrabatter",
            description: "Bank, reise, programvare og hvordan du sjekker at rabatten er reell.",
          },
          {
            href: "/fordeler/lofavor",
            label: "LOfavør",
            description:
              "LO-forbundenes program: innbo, SpareBank 1, strøm og reiserabatter.",
          },
        ],
      },
    ],
  },
  {
    slug: "budsjett",
    title: "Budsjett",
    description:
      "SIFO-referansebudsjett, faste kostnader og økonomisk helse. Guider og verktøy for oversikt over inntekt og utgifter.",
    keywords: [
      "budsjett",
      "SIFO",
      "referansebudsjett",
      "faste kostnader",
      "økonomisk helse",
      "buffer",
    ],
    intro: [
      "Et budsjett er ikke et forbud – det er oversikt. Når du vet hva som går ut hver måned, blir det lettere å bygge buffer, kutte det du ikke bruker, og se om inntekten tåler et uhell. SIFOs referansebudsjett er et nøkternt sammenligningsgrunnlag, ikke et komplett livsopphold: bolig og strøm kommer i tillegg.",
      "Her finner du SIFO-guider og kalkulator, gjennomgang av faste kostnader, og en rask sjekk av økonomisk helse. Ordboken forklarer budsjett, likviditet og disponibel inntekt uten bankjargong.",
    ],
    sections: [
      {
        heading: "Guider",
        links: [
          {
            href: "/guider/sifo-budsjett",
            label: "SIFO-referansebudsjettet",
            description:
              "Hva budsjettet måler, hva det utelater, og hvordan du bruker 2026-tallene.",
          },
          {
            href: "/guider/sifo-sammenligne-husholdninger",
            label: "Sammenlign husholdninger med SIFO",
            description:
              "Alene versus samboer, par versus familie: hvordan utgiftene endrer seg.",
          },
          {
            href: "/guider/kutt-faste-kostnader",
            label: "Kutt faste kostnader",
            description:
              "Abonnementer, forsikring og trekk som spiser lønnen uten at du merker det.",
          },
          {
            href: "/guider/forstaa-okonomisk-helse",
            label: "Forstå økonomisk helse",
            description:
              "Buffer, gjeld og faste utgifter: en temperaturmåling, ikke en dom.",
          },
        ],
      },
      {
        heading: "Verktøy",
        links: [
          {
            href: "/verktoy/sifo-kalkulator",
            label: "SIFO-kalkulator",
            description:
              "Referansebudsjett 2026 etter husholdning, eller sammenlign to scenarioer.",
          },
          {
            href: "/verktoy/luksusfelle-tavle",
            label: "Luksusfellen-tavle",
            description: "Inntekt, utgifter, gjeld og sparing på én tavle.",
          },
          {
            href: "/verktoy/okonomisk-rontgen",
            label: "Økonomisk røntgen",
            description: "Ti spørsmål, score 0–100 og tre konkrete prioriteringer.",
          },
        ],
      },
      {
        heading: "Ordbok",
        links: [
          {
            href: "/ordbok/budsjett",
            label: "Budsjett",
            description: "Plan for inntekter og utgifter over en periode.",
          },
          {
            href: "/ordbok/fast-kostnad",
            label: "Fast kostnad",
            description: "Utgifter som gjentar seg, som husleie og abonnement.",
          },
          {
            href: "/ordbok/bufferkonto",
            label: "Bufferkonto",
            description: "Penger satt av til det uforutsette.",
          },
          {
            href: "/ordbok/likviditet",
            label: "Likviditet",
            description: "Hvor raskt du kan betale regninger uten å selge eiendeler.",
          },
          {
            href: "/ordbok/disponibel-inntekt",
            label: "Disponibel inntekt",
            description: "Det som er igjen etter skatt og faste forpliktelser.",
          },
          {
            href: "/ordbok/kontantstrom",
            label: "Kontantstrøm",
            description: "Penger inn minus penger ut i en periode.",
          },
        ],
      },
    ],
  },
];

export function getEmner(): EmneHub[] {
  return emner;
}

export function getEmneBySlug(slug: string): EmneHub | undefined {
  return emner.find((emne) => emne.slug === slug);
}

export function getEmneSlugs(): string[] {
  return emner.map((emne) => emne.slug);
}
