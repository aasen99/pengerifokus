import type { GuideArticleContent } from "@/types/guide-article";

export const penniDenStoreUtfordreren: Omit<
  GuideArticleContent,
  "readTimeMinutes"
> = {
  slug: "penni-den-store-utfordreren",
  seoTitle: "Penni – den store utfordreren? Renter, kortgebyr og bankenes ventetid",
  intro:
    "Penni gir rente også på brukskonto, betaler ut renter hver måned og økte sparerenten samme dag som Norges Bank hevet styringsrenten. Men et bankkort til 300 kroner i året gjør at regnestykket ikke er like enkelt for alle. Vi undersøker hva du faktisk tjener – og hvorfor storbankenes sparekunder må vente på bedre rente.",
  shortAnswer:
    "Penni oppgir 3,04 % effektiv rente på brukskonto, 4,70 % på ordinær sparekonto og 4,91 % på høyrentekonto med 31 dagers uttaksvarsel. Har du bare penger stående, er den fleksible sparekontoen normalt mer relevant enn en brukskonto uten kort. Brukskontoen er for betalinger, og kortavgiften på 300 kr må vurderes mot gevinsten.",
  sections: [
    {
      heading: "En utfordrer med renter på hverdagskontoen",
      paragraphs: [
        "Mange lar penger stå på en brukskonto som gir lite eller ingen rente. Penni, et bankkonsept fra Eika Digitalbank, forsøker å skille seg ut ved å betale rente også på pengene som skal brukes i hverdagen.",
        "Det er interessant, men ikke en grunn til å flytte hele sparebeløpet til brukskonto. Vi må skille mellom penger du sparer, penger du har satt av til regninger, og penger du faktisk trenger et bankkort til.",
      ],
      table: {
        caption: "Pennis oppgitte renter per 13. november 2026",
        rows: [
          { label: "Brukskonto", value: "3,00 % nominell / 3,04 % effektiv" },
          { label: "Sparekonto, frie uttak", value: "4,60 % nominell / 4,70 % effektiv" },
          { label: "Høyrentekonto, 31 dager", value: "4,80 % nominell / 4,91 % effektiv" },
          { label: "Bankkort", value: "300 kr i årsavgift (voksne)" },
        ],
      },
      tip:
        "Renter og gebyrer kan endres. Sjekk alltid bankens gjeldende prisliste. Effektiv rente her inkluderer månedlig kapitalisering, ikke eventuelle kostnader ved bankkort.",
    },
    {
      heading: "Hvorfor ha brukskonto uten kort når sparekontoen gir høyere rente?",
      paragraphs: [
        "Det korte svaret: Hvis pengene bare skal stå der, har det liten hensikt. Penni tilbyr en ordinær sparekonto uten bindingstid, gebyrer eller uttaksbegrensninger, og renten er betydelig høyere enn på brukskontoen.",
        "En brukskonto uten bankkort kan likevel være nyttig som regningskonto dersom du bruker den til lønn, eFaktura, AvtaleGiro eller andre betalinger. Du kan da skille faste trekk fra forbruk uten å betale kortavgift. Men det er betalingsfunksjonen – ikke sparerenten – som gir kontoen en oppgave.",
        "Den praktiske løsningen kan være å ha mest mulig av pengene på en fleksibel sparekonto, og bare beløpet du trenger til kommende betalinger på brukskontoen. Du kan også beholde et rimelig eller gratis kort i en annen bank. Det er ingen grunn til å kjøpe et nytt kort bare for å få rente på penger du egentlig ikke skal bruke.",
      ],
      table: {
        caption: "Hvis 10 000 kroner står urørt i ett år",
        rows: [
          { label: "Brukskonto, 3,04 % effektiv", value: "Ca. 304 kr før skatt" },
          { label: "Sparekonto, 4,70 % effektiv", value: "Ca. 470 kr før skatt" },
          { label: "Forskjell i sparekontoens favør", value: "Ca. 166 kr før skatt / 129 kr etter 22 % skatt" },
        ],
      },
      tip:
        "Sparekonto er ikke det samme som en konto for kortkjøp og faste trekk. Velg kontotype etter hva pengene skal brukes til, og kontroller hvilken konto bankens betalingstjenester kan belastes.",
    },
    {
      heading: "Spiser kortavgiften opp rentegevinsten?",
      paragraphs: [
        "Pennis ordinære bankkort koster 300 kroner i året for voksne. Kortkjøp er oppført med 0 kroner i gebyr, men valutapåslaget ved betaling i utenlandsk valuta er 1,95 prosent.",
        "Tenk deg at alternativet er en gratis brukskonto uten renter, og at saldoen er omtrent uendret gjennom hele året. Da blir effekten av Pennis 3,04 prosent effektive brukskontorente slik:",
        "I dette forenklede tilfellet må du holde omtrent 12 650 kroner i gjennomsnitt på brukskontoen for at renteinntektene etter skatt skal dekke kortavgiften. Det er ikke en universell grense for når Penni lønner seg: Har du allerede et kort som koster penger, eller en brukskonto med renter, blir sammenligningen annerledes.",
        "Husk også alternativkostnaden. Penger du ikke trenger til betalinger kunne i stedet stått på Pennis sparekonto med høyere rente. Derfor bør du ikke fylle brukskontoen med unødvendig mye penger bare for å «tjene inn» bankkortet.",
      ],
      table: {
        caption: "Illustrasjon: renter på brukskonto, fratrukket 22 % skatt og 300 kr kortavgift",
        rows: [
          { label: "5 000 kr gjennomsnittlig saldo", value: "152 kr renter før skatt → ca. −181 kr netto" },
          { label: "10 000 kr gjennomsnittlig saldo", value: "304 kr renter før skatt → ca. −63 kr netto" },
          { label: "15 000 kr gjennomsnittlig saldo", value: "456 kr renter før skatt → ca. +56 kr netto" },
          { label: "20 000 kr gjennomsnittlig saldo", value: "608 kr renter før skatt → ca. +174 kr netto" },
          { label: "30 000 kr gjennomsnittlig saldo", value: "912 kr renter før skatt → ca. +411 kr netto" },
        ],
      },
      tip:
        "Kortavgiften skal bare trekkes fra hvis du faktisk bestiller og betaler for kortet. Regneeksemplene er avrundet og forutsetter uendret saldo og rente gjennom ett år.",
    },
    {
      heading: "Renter hver måned: Hva gjør det med den effektive renten?",
      paragraphs: [
        "Penni legger opptjente renter over én krone til kontoen den første dagen hver måned. Rentene begynner deretter selv å tjene renter. Det kalles månedlig kapitalisering og gir en liten renters rente-effekt.",
        "På ordinær sparekonto er den nominelle renten 4,60 prosent. Med tolv like kapitaliseringsperioder blir et forenklet årsregnestykke: (1 + 0,046 / 12)^12 − 1 ≈ 4,698 prosent. Det samsvarer med bankens avrundede effektive rente på 4,70 prosent.",
        "Har du 100 000 kroner stående uendret gjennom et helt år, tilsvarer det omtrent 4 698 kroner før skatt. Med den samme nominelle renten og bare én årlig rentekapitalisering ville beløpet vært 4 600 kroner. Differansen er rundt 98 kroner.",
        "Det er hyggelig, men ikke magi. Sammenlign effektive renter mellom banker – da er kapitaliseringshyppigheten allerede tatt hensyn til. Og hvis du bruker opp de utbetalte rentene hver måned, får du ikke den samme renters rente-effekten.",
      ],
      factBox: [
        "Brukskonto: 3,00 % nominell blir ca. 3,04 % effektiv.",
        "Sparekonto: 4,60 % nominell blir ca. 4,70 % effektiv.",
        "Høyrentekonto: 4,80 % nominell blir ca. 4,91 % effektiv.",
        "Månedlig renteutbetaling er en fordel, men Penni er ikke alene om ordningen.",
      ],
    },
    {
      heading: "Penni økte renten samme dag – også for eksisterende kunder",
      paragraphs: [
        "24. september 2026 hevet Norges Bank styringsrenten fra 4,25 til 4,50 prosent. Samme dag kunngjorde Penni at renten på den ordinære sparekontoen økte fra 4,35 til 4,60 prosent, mens høyrentekontoen økte fra 4,55 til 4,80 prosent.",
        "Hele renteøkningen på 0,25 prosentpoeng ble videreført til disse spareproduktene, med virkning fra samme dag både for nye og eksisterende kunder. Det er en handling som fortjener oppmerksomhet.",
        "DNB varslet derimot at de nye innskuddsrentene skulle gjelde fra 29. september for nye kunder og fra 29. november for eksisterende kunder. Nordea oppga 26. november som virkningsdato for innskuddsendringen.",
        "Vi har ikke grunnlag for å slå fast at Penni var eneste bank som handlet umiddelbart. Men banken var blant aktørene som viste at en renteøkning til fordel for eksisterende kunder ikke trenger å utsettes i to måneder.",
      ],
      table: {
        caption: "Varslede endringer etter rentemøtet i september 2026",
        rows: [
          { label: "Penni: eksisterende sparekunder", value: "24. september" },
          { label: "DNB: nye innskudd", value: "29. september" },
          { label: "DNB: eksisterende innskudd", value: "29. november" },
          { label: "Nordea: innskuddsrenter", value: "26. november" },
        ],
      },
    },
    {
      heading: "To måneders varsel: et forbrukervern, ikke en plikt til å vente med gode nyheter",
      paragraphs: [
        "Finansavtaleloven § 3-13 sier at endringer av avtalevilkår til skade for kunden som hovedregel tidligst kan settes i verk to måneder etter at kunden er varslet. Bestemmelsen er ment å beskytte kunden når betingelser blir dårligere.",
        "Når banken øker lånerenten din eller reduserer sparerenten, kan reglene om forhåndsvarsel derfor være viktige. Men loven krever ikke at banken må vente to måneder med å øke sparerenten. En fordel for kunden kan innføres tidligere.",
        "Banker kan ønske en ensartet prosess for renteendringer, eller la lån og innskudd følge samme tidsskjema. Det er likevel ikke det samme som at loven pålegger dem å utsette en gunstig innskuddsrente.",
        "Etter vårt syn bør eksisterende kunder få en vedtatt forbedring så raskt som praktisk mulig. Hvorfor skal en kunde som allerede har spart i banken, måtte vente lenger enn en ny kunde?",
      ],
      factBox: [
        "Ved en renteøkning på 0,25 prosentpoeng er 60 dagers ventetid verdt rundt 41 kroner før skatt på 100 000 kroner.",
        "For 500 000 kroner er samme forskjell rundt 205 kroner før skatt.",
        "Tallene er forenklede: beløp × 0,0025 × 60 / 365.",
      ],
    },
    {
      heading: "Høyrentekontoen har en pris: mindre fleksibilitet",
      paragraphs: [
        "Penni oppgir 4,91 prosent effektiv rente på høyrentekontoen, mot 4,70 prosent på vanlig sparekonto. Ved 100 000 kroner er forskjellen rundt 210 kroner i året før skatt, gitt uendrede satser.",
        "Men du må varsle uttak 31 dager i forveien, og kontoen har maksimalt tolv gebyrfrie uttak per kalenderår. Uttak utenfor begrensningene kan koste 2 prosent av uttaksbeløpet, minst 200 og maksimalt 2 000 kroner.",
        "En buffer du kan få behov for i morgen, bør ikke uten videre plasseres bak et slikt varsel. Den ordinære sparekontoens frie uttak kan være mer verdifulle enn de ekstra rentekronene.",
      ],
    },
    {
      heading: "Vår vurdering: viktig konkurranse – men ikke kjøp feil produkt",
      paragraphs: [
        "Penni utfordrer etablerte banker på flere områder: Høy rente også på brukskonto, månedlig renteutbetaling og rask renteøkning for eksisterende sparekunder. Det er bra for konkurransen.",
        "Samtidig bør ingen velge en brukskonto uten kort bare for å parkere sparepenger når samme bank tilbyr høyere rente på en fleksibel sparekonto. Skal kontoen brukes til regninger, er situasjonen annerledes. Skal den brukes med bankkort, må kortavgiften inn i regnestykket.",
        "Vi ønsker særlig mer konkurranse om hvordan banker behandler dem som allerede er kunder. Penni har vist at det går an å gi eksisterende sparekunder en forbedring med én gang. Det bør flere banker utfordres på.",
      ],
      tip:
        "Sjekk tre ting før du bytter bank: renten på kontoen pengene faktisk skal stå på, hva du betaler for kort og betalingstjenester, og hvor raskt du må kunne ta ut pengene.",
    },
    {
      heading: "Redaksjonell merknad",
      paragraphs: [
        "Denne artikkelen er uavhengig redaksjonelt innhold, ikke annonse eller betalt samarbeid. Penger i Fokus har ikke mottatt betaling eller andre fordeler fra Penni eller Eika Gruppen for denne omtalen. Vurderingene og meningene er forfatterens egne.",
        "Opplysninger og regneeksempler er kontrollert per 13. november 2026. Skatteberegningene benytter 22 prosent skatt på renteinntekter. Dette er generell informasjon, ikke personlig finansiell rådgivning.",
      ],
    },
  ],
  faq: [
    {
      question: "Hvorfor bruke Pennis brukskonto uten bankkort?",
      answer:
        "Det kan gi mening som konto for lønn, regninger, AvtaleGiro og eFaktura. Hvis du bare vil la penger stå urørt, er Pennis ordinære sparekonto med høyere rente og frie uttak normalt mer relevant.",
    },
    {
      question: "Må jeg betale 300 kroner for å ha brukskonto?",
      answer:
        "Nei. Penni oppgir en årsavgift på 300 kroner for bankkortet, ikke for selve brukskontoen. Kortet bestilles separat.",
    },
    {
      question: "Hvor mye må jeg ha på brukskontoen for å dekke årsavgiften?",
      answer:
        "Med 3,04 prosent effektiv rente, 22 prosent skatt på renteinntekter og sammenligning mot en gratis konto uten rente, tilsvarer 300 kroner i kortavgift omtrent 12 650 kroner i gjennomsnittlig saldo over ett år. Det tar ikke hensyn til at penger kan plasseres på sparekonto med høyere rente.",
    },
    {
      question: "Betaler Penni ut renter hver måned?",
      answer:
        "Ja. Opptjente renter over én krone legges til kontoen den første dagen hver måned og begynner selv å tjene renter.",
    },
    {
      question: "Må bankene vente to måneder med å øke sparerenten?",
      answer:
        "Nei. Finansavtaleloven § 3-13 krever som hovedregel to måneders varsel ved endringer til skade for kunden. Den krever ikke at banken må utsette en gunstig renteøkning på innskudd.",
    },
    {
      question: "Var Penni den eneste banken som økte renten samme dag?",
      answer:
        "Vi har ikke dokumentasjon for at Penni var alene om dette. Pennis egen pressemelding bekrefter imidlertid at de nye sparerentene gjaldt fra 24. september 2026 for både nye og eksisterende kunder.",
    },
  ],
  sources: [
    { label: "Penni: offisiell prisliste med renter og kortgebyr", url: "https://www.penni.no/priser" },
    { label: "Penni: månedlig renteutbetaling", url: "https://www.penni.no/dagligbank/Manedlig-renteutbetaling" },
    { label: "Eika Gruppen: Penni gir hele rentehevingen videre 24. september", url: "https://kommunikasjon.ntb.no/pressemelding/19080450/penni-gir-hele-rentehevingen-videre-til-sparekundene?lang=no&publisherId=90104" },
    { label: "DNB: endrede renter fra september/november 2026", url: "https://news.cision.com/no/dnb-bank-asa/r/dnb-oker-renten-pa-boliglan-og-innskudd,c4401421" },
    { label: "Nordea: informasjon om renteendringer", url: "https://www.nordea.no/privat/vare-produkter/priser/varsel-om-renteendring.html" },
    { label: "Lovdata: finansavtaleloven § 3-13", url: "https://lovdata.no/dokument/NL/lov/2020-12-18-146/KAPITTEL_3-2" },
    { label: "Finanstilsynet: forbrukernes situasjon i innskuddsmarkedet", url: "https://www.finanstilsynet.no/contentassets/8765573deb55464dafb59acb2210b6ec/forbrukernes-situasjon-i-innskuddsmarkedet.pdf" },
  ],
  conclusion:
    "Penni trenger ikke være best for alle for å være en verdifull utfordrer. De beste bankvalgene tas likevel ikke ved å stirre på én rentesats: Velg riktig kontotype, regn inn kortkostnader og krev at eksisterende kunder også får del i gode betingelser.",
  relatedLinks: [
    { label: "Hva koster banklojalitet?", href: "/guider/bankenes-fordelsprogrammer" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Effektiv rente – hva betyr det?", href: "/ordbok/effektiv-rente" },
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
  ],
};
