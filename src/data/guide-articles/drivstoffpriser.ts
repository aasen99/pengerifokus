import type { GuideArticleContent } from "@/types/guide-article";

export const drivstoffpriser: Omit<GuideArticleContent, "readTimeMinutes"> = {
  slug: "drivstoffpriser",
  seoTitle:
    "Drivstoffpriser: Coop, Trumf, Circle K Extra og Drivstoffappen",
  intro:
    "Bensin- og dieselprisen ved pumpa er sjelden «bare oljepris». Den er en sum av internasjonal innkjøpspris, selskapenes kostnader og margin – og en stor andel norske avgifter. Når du forstår postene og ukens prismønster, blir det lettere å fylle billigere uten å spekulere i verdensmarkedet.",
  shortAnswer:
    "Pumpeprisen består typisk av avgifter, internasjonal innkjøpspris og kjedens margin. Prisene svinger mer gjennom uken enn før. Sjekk skiltpris i Drivstoffappen, og legg på Coop (45/25 øre), Trumf hos Esso (40/20 øre) eller Circle K Extra (30–45 øre etter besøk) – fyll når nettoprisen faktisk er lavest.",
  sections: [
    {
      heading: "Hva betaler du egentlig for?",
      paragraphs: [
        "Drivkraft Norge deler pumpeprisen i tre hoveddeler: avgifter, internasjonal innkjøpspris og selskapenes egne kostnader og margin. Tommelfingerregelen i bransjen har vært omtrent 60 % avgifter, 30 % innkjøp og resten margin – men andelene endrer seg når ett ledd stiger eller faller.",
        "SSB har også vist at avgiftene demper hvor mye norske forbrukerpriser følger verdensmarkedet. Når internasjonal pris stuper, synker ikke norsk pumpepris like mye – fordi avgiftene er faste kroner per liter pluss moms på toppen.",
      ],
      bullets: [
        "Avgifter: veibruksavgift, CO₂-avgift og merverdiavgift (25 %)",
        "Innkjøpspris: bensin/diesel på verdensmarkedet, ofte priset i dollar",
        "Kjede/stasjon: transport, drift, bemanning, margin",
      ],
      tip: "Norge er oljenasjon, men det betyr ikke billig bensin. Vi eksporterer råolje og importerer i praksis ferdig produkt til verdensmarkedspris – pluss norske avgifter.",
    },
    {
      heading: "Avgiftene – den største posten",
      paragraphs: [
        "På bensin og diesel betaler du blant annet veibruksavgift (slitasje, ulykker, støy) og CO₂-avgift (klimapolitikk). Oppå hele beløpet kommer 25 % moms.",
        "Ifølge Skatteetaten er veibruksavgiften midlertidig satt til 0 kr per liter fra 1. april til 1. september 2026. Regjeringen har anslått at full overvelting da kan gi om lag 4,41 kr lavere bensinpris og 2,85 kr lavere dieselpris per liter (inkl. moms-effekt) sammenlignet med ordinære satser.",
      ],
      bullets: [
        "Veibruksavgift: vanligvis et fast kronebeløp per liter (0 i perioden april–september 2026)",
        "CO₂-avgift: gjør fossil kjøring dyrere over tid",
        "Moms: 25 % av summen – også av avgiftene",
      ],
      tip: "Når veibruksavgiften kommer tilbake, stiger normalt pumpeprisen. Regn med at midlertidige kutt er politikk – ikke en ny normalpris for alltid.",
    },
    {
      heading: "Hvorfor svinger prisen så mye gjennom uken?",
      paragraphs: [
        "Mange merker at prisen kan hoppe flere kroner fra én dag til neste – uten at oljeprisen har gjort det samme. Økonomer og Konkurransetilsynet har dokumentert et typisk norsk mønster: kjedene setter ofte opp prisene til et felles høyt nivå én eller to ganger i uken, og så presses prisen ned igjen gjennom lokal konkurranse.",
        "Det betyr at tidspunktet du fyller nesten kan bety like mye som hvilken stasjon du velger. En «dyr» dag og en «billig» dag på samme stasjon kan skille hundrevis av kroner på en full tank.",
        "Før var dette litt mer oversiktlig. Mange husker et mer forutsigbart ukemønster – når prisene gikk opp, og når det lønte seg å fylle. I dag er svingningene ofte større, forskjellen mellom topp og bunn kan være uvanlig høy, og det er flere apper, klubber og rabatter å holde styr på. Oversikten er blitt dårligere, selv om muligheten til å spare fortsatt er der – hvis du sjekker før du fyller.",
      ],
      bullets: [
        "Prishopp skyldes ofte kjedestrategi, ikke plutselig dyrere innkjøp",
        "Laveste priser kommer gjerne etter konkurranse ned fra toppen",
        "Forskjellen topp–bunn kan være flere kroner per liter",
      ],
    },
    {
      heading: "Hva påvirker innkjøpsprisen?",
      paragraphs: [
        "Internasjonal pris styres av tilbud og etterspørsel: råolje, raffinerikapasitet, lagre, geopolitikk og sesong. Handelen skjer typisk i dollar, så kronekursen påvirker også hva norske selskaper betaler.",
        "I tillegg blandes biodrivstoff inn etter norske omsetningskrav. Biodrivstoff er ofte dyrere enn rent fossilt drivstoff og påvirker den samlede innkjøpskostnaden.",
      ],
    },
    {
      heading: "Oversikt: medlemsrabatter per program",
      paragraphs: [
        "De tre hovedprogrammene dekker ulike kjeder. Her er satser per liter – alltid sjekk nettopris (skiltpris minus rabatt) før du fyller.",
      ],
      bullets: [
        "Coop: 45 øre/l betjent Circle K og YX · 25 øre/l ubetjent Circle K · ekstra rabatt hvis du også er Circle K Extra",
        "Trumf (Esso): 40 øre/l betjent Esso · 20 øre/l Esso Express",
        "Circle K Extra: 30 øre/l grunnnivå · 40 øre/l etter 8 besøk · 45 øre/l etter 15 besøk (siste 90 dager, gjelder lading)",
      ],
      tip: "Besøk hos Circle K Extra telles på alt du kjøper – også is og kaffe. Du trenger ikke fylle drivstoff for å bygge opp høyere nivå.",
    },
    {
      heading: "Drivstoffappen – se hvor det er billigst nå",
      paragraphs: [
        "Drivstoffappen er en prisapp som viser aktuelle bensin-, diesel- og ladepriser på stasjoner nær deg. Du kan sammenligne stasjoner på kart eller i liste, se prishistorikk og sette prisvarsling når literprisen faller under et nivå du velger.",
        "Appen erstatter ikke medlemsrabatter – den viser pumpepris. Bruk den til å finne lav skiltpris, og legg deretter på eventuell Trumf-, Circle K- eller Coop-rabatt før du bestemmer deg.",
      ],
      bullets: [
        "Finn nærmeste stasjon med lavest pris",
        "Sammenlign kjeder og stasjoner før du kjører",
        "Prisvarsling når det er billigere å fylle",
        "Prishistorikk: se om dagens pris er høy eller lav for stasjonen",
      ],
      tip: "Åpne Drivstoffappen før du kjører «på autopilot» til vanestasjonen. To minutter kan spare mer enn å spekulere i oljepris.",
    },
    {
      heading: "Trumf hos Esso",
      paragraphs: [
        "Trumf gir ikke drivstoffbonus overalt – partneren er Esso. Ifølge Trumf får medlemmer 40 øre per liter i Trumf-bonus på bemannede Esso-stasjoner og 20 øre per liter på Esso Express (ubemannet).",
        "For å få bonusen må du betale med Trumf-registrert bankkort eller bruke Trumf-kort. Trumf oppgir at kredittkort ikke gir Trumf-bonus hos Esso – heller ikke i kombinasjon med Trumf-kort. Bonusen er Trumf-kroner du kan ta ut eller bruke i NorgesGruppen, ikke nødvendigvis direkte fratrekk på pumpa.",
      ],
      bullets: [
        "40 øre/l Trumf-bonus på bemannet Esso",
        "20 øre/l på Esso Express",
        "Krever Trumf-registrert debetkort eller Trumf-kort",
        "Ikke bonus på avgiftsfri diesel, HVO eller AdBlue (ifølge Trumf)",
      ],
      tip: "Sjekk alltid nettopris: lav Esso-pris + Trumf kan vinne – eller tape – mot en billigere stasjon uten bonus. Bruk Drivstoffappen til skiltpris, så regn inn bonusen.",
    },
    {
      heading: "Coop – rabatt hos Circle K og YX",
      paragraphs: [
        "Coop-medlemmer får drivstoffrabatt hos Circle K og YX når medlemskapet er koblet i appen eller ved betaling med Coop Mastercard. Rabatten trekkes direkte på pumpa.",
        "Er du også Circle K Extra-medlem, kan du få ekstra rabatt hos Circle K – begge medlemskapene kan gi mer enn Coop alene. Sjekk Circle K-appen for gjeldende totalsats.",
      ],
      bullets: [
        "45 øre/l på betjent Circle K og YX",
        "25 øre/l på ubetjent Circle K",
        "Ekstra rabatt hos Circle K når du også er Circle K Extra-medlem",
      ],
      tip: "Coop-rabatten gjelder Circle K og YX – ikke Esso. For Esso bruker du Trumf.",
    },
    {
      heading: "Circle K Extra – nytt trinnmodell",
      paragraphs: [
        "Circle K Extra er Circle Ks eget fordelsprogram i appen. Konseptet er oppdatert: du starter på 30 øre per liter rabatt på drivstoff og lading, og nivået stiger etter hvor mange ganger du har besøkt Circle K de siste 90 dagene.",
        "Besøk telles uansett hva du kjøper – også om du bare handler is eller kaffe. Det betyr at du kan bygge opp høyere rabattnivå uten å fylle drivstoff hver gang.",
      ],
      bullets: [
        "Grunnnivå: 30 øre/l på drivstoff og lading",
        "8+ besøk siste 90 dager: 40 øre/l",
        "15+ besøk siste 90 dager: 45 øre/l",
        "Besøk telles på alt du kjøper – ikke bare drivstoff",
        "Gjelder både fylling og elbillading",
      ],
      tip: "Coop-medlemmer med Circle K Extra kan få ekstra rabatt oppå Extra-nivået – sjekk appen for din totalsats.",
    },
    {
      heading: "Slik sparer du på drivstoff uten å spekulere",
      paragraphs: [
        "Du kan ikke styre oljeprisen. Du kan styre når du fyller, hvor du fyller, og hvor mange liter du faktisk trenger.",
      ],
      bullets: [
        "Bruk Drivstoffappen til å se skiltpris før du kjører",
        "Unngå å fylle rett etter at prisene er satt kraftig opp i uken",
        "Regn inn Coop (Circle K/YX), Trumf (Esso) eller Circle K Extra før du velger stasjon",
        "Planlegg reiser og kombiner ærender – færre km sparer mer enn 50 øre/liter",
        "Kjør jevnt: høy fart og hard akselerasjon øker forbruket merkbart",
        "Sjekk dekktrykk – lavt trykk koster både drivstoff og dekk",
      ],
      tip: "App + medlemskap + timing er den praktiske trion. Én av dem alene er sjelden nok når jojo-prisene er store.",
    },
    {
      heading: "Rabatt slår ikke alltid lav skiltpris",
      paragraphs: [
        "Før var det enklere å huske «fyll tirsdag» eller «bruk klubben der». Nå må du ofte sjekke tre ting: skiltpris (Drivstoffappen), medlemsrabatt (Coop 45/25 øre, Trumf 40/20 øre, Circle K Extra 30–45 øre) og om du faktisk er på riktig stasjonstype (betjent vs. express/ubetjent).",
        "En «god» rabatt på en dyr toppdag kan fortsatt tape mot en lav pris uten rabatt et annet sted. Samme logikk som for kredittkort: bonus er bare verdifull hvis totalen blir lavere.",
      ],
    },
    {
      heading: "Drivstoff vs. elbil – kort regnestykke",
      paragraphs: [
        "For mange er det største grepet ikke å fylle 2 kr billigere, men å bruke mindre fossil energi. Elbilens «drivstoff» er strøm – og med Norgespris og hjemmelading kan kilometerprisen bli langt lavere enn bensin/diesel.",
        "Regn med mer enn strøm vs. liter: forsikring, verditap, bompenger og hvor du faktisk kjører. Men for høyt årlig kilometerantall er energikostnaden ofte den synlige forskjellen måned for måned.",
      ],
      tip: "Les også guiden om strømregning og Norgespris hvis du lader hjemme – da henger biløkonomi og strømbudsjett sammen.",
    },
    {
      heading: "Penger i Fokus-vurdering",
      paragraphs: [
        "Drivstoffprisen er politikk + verdensmarked + konkurranse ved pumpa. Det var litt mer oversiktlig før – nå krever det oftere app og et raskt regnestykke. Du vinner sjelden på å følge oljeprisen time for time. Du vinner på Drivstoffappen, Trumf/Circle K når de faktisk vinner, og færre unødvendige kilometer.",
        "Når politikerne midlertidig fjerner veibruksavgift, synker prisen. Når avgiften kommer tilbake, stiger den. Planlegg budsjettet etter det, ikke etter dagens laveste skiltpris alene.",
      ],
    },
  ],
  faq: [
    {
      question: "Hvorfor er bensin dyr i Norge når vi har olje?",
      answer:
        "Fordi pumpeprisen i stor grad består av avgifter, og fordi ferdig drivstoff prises etter verdensmarkedet – ikke etter at Norge er oljeprodusent. Avgifter er politisk bestemt.",
    },
    {
      question: "Hva er Drivstoffappen?",
      answer:
        "En prisapp som viser aktuelle drivstoff- og ladepriser på stasjoner nær deg, med mulighet for prishistorikk og prisvarsling. Den viser skiltpris – medlemsrabatter kommer i tillegg.",
    },
    {
      question: "Gir Trumf rabatt på Circle K?",
      answer:
        "Nei. Trumf-drivstoffbonus gjelder hos Esso (40 øre/l betjent, 20 øre/l Express). Hos Circle K bruker du Circle K Extra (30–45 øre/l) eller Coop (45 øre/l betjent, 25 øre/l ubetjent).",
    },
    {
      question: "Hvor mye rabatt gir Coop på drivstoff?",
      answer:
        "Coop gir 45 øre per liter på betjent Circle K og YX, og 25 øre per liter på ubetjent Circle K. Er du også Circle K Extra-medlem, kan du få ekstra rabatt hos Circle K.",
    },
    {
      question: "Hvordan fungerer Circle K Extra-rabattnivåene?",
      answer:
        "Du starter på 30 øre/l. Med 8 besøk hos Circle K siste 90 dager får du 40 øre/l, og med 15 besøk 45 øre/l. Besøk telles uansett kjøp – også bare is eller kaffe. Gjelder drivstoff og lading.",
    },
    {
      question: "Hvor stor del av prisen er avgifter?",
      answer:
        "Det varierer med innkjøpspris. Bransjen har ofte brukt ca. 60 % som tommelfingerregel for avgifter, men andelen synker når råvareprisen er høy og stiger når den er lav. Moms kommer alltid på toppen.",
    },
    {
      question: "Hvorfor endres prisen så mye fra dag til dag?",
      answer:
        "Ofte fordi kjedene hever prisene samtidig og konkurrerer dem ned gjennom uken. Det er et prismønster i markedet, ikke nødvendigvis et signal om at innkjøpsprisen nettopp har endret seg like mye. Svingningene er ofte større – og litt mindre oversiktlige – enn mange husker fra før.",
    },
    {
      question: "Hva skjedde med veibruksavgiften i 2026?",
      answer:
        "Ifølge Skatteetaten er veibruksavgiften satt til 0 kr per liter fra 1. april til 1. september 2026. Ordinære satser gjelder utenom denne perioden. Sjekk alltid gjeldende satser hos Skatteetaten.",
    },
    {
      question: "Hvordan sparer jeg mest på drivstoff?",
      answer:
        "Sjekk skiltpris i Drivstoffappen, legg på Trumf/Circle K/Coop-rabatt, unngå ukens dyreste timer, og kjør færre unødvendige kilometer.",
    },
  ],
  sources: [
    {
      label: "Drivkraft Norge – Dette bestemmer drivstoffprisen",
      url: "https://www.drivkraftnorge.no/Tall-og-fakta/dette-bestemmer-drivstoffprisen/",
    },
    {
      label: "SSB – Langt mer enn oljeprisen påvirker bensinprisene",
      url: "https://www.ssb.no/energi-og-industri/artikler-og-publikasjoner/langt-mer-enn-oljeprisen-pavirker-bensinprisene",
    },
    {
      label: "Skatteetaten – Veibruksavgift på drivstoff",
      url: "https://www.skatteetaten.no/bedrift-og-organisasjon/avgifter/saravgifter/om/veibruksavgift/",
    },
    {
      label: "Regjeringen – Reduksjon i avgifter på drivstoff",
      url: "https://www.regjeringen.no/no/aktuelt/oppfolging-av-stortingets-vedtak-om-reduksjon-i-avgifter-pa-drivstoff/id3155277/",
    },
    {
      label: "Trumf – Esso",
      url: "https://www.trumf.no/fordeler/esso",
    },
    {
      label: "Circle K – Extra",
      url: "https://www.circlek.no/extra",
    },
    {
      label: "Coop – medlemsfordeler",
      url: "https://www.coop.no/medlemsfordeler/",
    },
    {
      label: "Drivstoffappen",
      url: "https://drivstoffappen.no/",
    },
  ],
  conclusion:
    "Les literprisen som avgifter + marked + kjede. Sjekk skiltpris i Drivstoffappen, legg på Coop (Circle K/YX), Trumf (Esso) eller Circle K Extra (30–45 øre) – og kutt kilometer der det er mulig.",
  relatedLinks: [
    {
      label: "Strømregning og Norgespris",
      href: "/guider/stromregning-og-norgespris",
    },
    { label: "Circle K Extra", href: "/fordeler/circle-k-extra" },
    { label: "Trumf", href: "/fordeler/trumf" },
    { label: "Coop", href: "/fordeler/coop" },
    { label: "NAF", href: "/fordeler/naf" },
    { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    { label: "Se drivstofftilbud", href: "/tilbud?kategori=Bil" },
  ],
};
