import type { GuideArticleContent } from "@/types/guide-article";

const CALCULATOR_HREF = "/verktoy/eie-leie-kalkulator";

export const eieEllerLeieBolig: GuideArticleContent = {
  slug: "eie-eller-leie-bolig",
  seoTitle: "Eie eller leie bolig – hva lønner seg?",
  intro:
    "Skal du kjøpe eller leie? Svaret handler sjelden bare om månedlig husleie mot terminbeløp. Tid, kjøpskostnader, vedlikehold og alternativ avkastning på egenkapitalen kan snu regnestykket fullstendig.",
  shortAnswer:
    "Leie er ofte mest attraktivt når du skal bo kort, har en svært gunstig husleie eller trenger fleksibilitet. Eie kan lønne seg over tid fordi avdrag bygger egenkapital og boligen kan stige i verdi. Men renter, vedlikehold, kjøps- og salgskostnader og avkastningen du kunne fått på egenkapitalen kan endre svaret fullstendig. Derfor bør du regne med dine egne tall.",
  topCta: {
    heading: "Få svaret med dine egne tall",
    description:
      "Sammenlign eie og leie over 1–30 år. Kalkulatoren viser anslått nettoformue, månedlig forskjell og når det ene alternativet eventuelt går forbi det andre.",
    buttonText: "Regn ut om du bør eie eller leie",
    href: CALCULATOR_HREF,
    analyticsEvent: "eie_leie_cta_top",
  },
  sections: [
    {
      heading: "Hvor lenge skal du bo der?",
      paragraphs: [
        "Kjøp og salg av bolig koster penger. Dokumentavgift, megler, flytting og andre engangskostnader får stor betydning når du ser på kort tidshorisont.",
        "På kort sikt trekker kjøps- og salgskostnader ofte i retning av leie. På lengre sikt får avdrag og eventuell boligprisvekst mer tid til å virke. Break-even kan imidlertid komme etter to, fem eller ti år – eller aldri – avhengig av tallene.",
        "Break-even er tidspunktet der det ene alternativet går forbi det andre målt i anslått nettoformue. Det finnes ingen fast regel som gjelder for alle boliger og alle markeder.",
      ],
    },
    {
      heading: "Sammenlign boliger som faktisk er like",
      paragraphs: [
        "Et rettferdig sammenligningsgrunnlag krever at du ser på boliger som faktisk gir omtrent samme bo-kvalitet. Sammenlign derfor:",
      ],
      bullets: [
        "Samme område",
        "Omtrent samme størrelse",
        "Tilsvarende standard",
        "Tilsvarende tilgang til parkering, bod og uteareal",
        "Tilsvarende reisevei til jobb, skole og kollektiv",
      ],
      tip: "Dersom kjøpsalternativet er større eller bedre enn leieboligen, sammenligner du både eieform og to forskjellige livsstiler – ikke bare to like alternativer.",
    },
    {
      heading: "Terminbeløp er ikke det samme som kostnad",
      paragraphs: [
        "Når du sammenligner eie og leie, er det lett å stoppe ved terminbeløp mot husleie. Det gir et ufullstendig bilde. Du bør skille mellom kontantstrøm, renter, avdrag, reell bokostnad og oppbygging av egenkapital.",
        "Når du betaler avdrag, reduserer du gjelden og øker egenkapitalen din. Avdrag er derfor en belastning på månedsbudsjettet, men ikke en ren kostnad på samme måte som renter eller husleie. Boligens markedsverdi kan likevel både stige og falle.",
      ],
    },
    {
      heading: "Alternativkostnaden ved å binde egenkapital",
      paragraphs: [
        "Egenkapitalen du legger i bolig, kunne også vært investert i fond eller annet. Hvis boligen stiger lite og fondene gjør det bra, kan leie pluss sparing teoretisk slå eie – og omvendt.",
        `Ingen vet fremtiden. Poenget er å være bevisst på at egenkapital har en alternativ verdi, og at du bør teste flere realistiske antagelser i [eie-versus-leie-kalkulatoren](${CALCULATOR_HREF}).`,
      ],
    },
    {
      heading: "Konkret regneeksempel",
      subheading: "Eksempel: Bolig til 4 millioner eller leie til 18 000 kroner?",
      paragraphs: [
        "Tabellen under viser første måned for en selveierbolig til 4 000 000 kr med 400 000 kr i egenkapital, 5 % nominell rente over 25 år, og leie til 18 000 kr per måned. Tallene er illustrative – ikke en prognose.",
      ],
      bullets: [
        "Kjøpesum: 4 000 000 kr",
        "Egenkapital: 400 000 kr",
        "Boliglån: 3 600 000 kr",
        "Nominell rente: 5 %",
        "Nedbetalingstid: 25 år",
        "Månedlig husleie: 18 000 kr",
        "Felleskostnader: 3 000 kr per måned",
        "Vedlikeholdsreserve: 3 333 kr per måned",
        "Dokumentavgift for selveier: 100 000 kr",
        "Rentefradrag: 22 %",
      ],
      table: {
        caption: "Første måned",
        rows: [
          { label: "Terminbeløp på boliglånet", value: "21 045 kr" },
          { label: "Herav renter", value: "15 000 kr" },
          { label: "Herav avdrag", value: "6 045 kr" },
          { label: "Skatteverdi av rentene", value: "−3 300 kr" },
          { label: "Felleskostnader og vedlikehold", value: "6 333 kr" },
          { label: "Kontantbelastning etter skattevirkning", value: "24 079 kr" },
          { label: "Reell bokostnad uten avdrag", value: "18 033 kr" },
          { label: "Månedlig husleie", value: "18 000 kr" },
        ],
      },
      tip: "I dette eksemplet er den reelle månedlige bokostnaden ved å eie omtrent den samme som husleien. Eieren trenger likevel rundt 6 000 kroner mer i månedlig kontantstrøm fordi boliglånet også inneholder avdrag. Dersom leieren investerer denne forskjellen, kan det få stor betydning over tid.",
      subsections: [
        {
          subheading: "Hva tabellen ikke viser",
          paragraphs: [
            "Dette gir likevel ikke hele svaret. Følgende påvirker sluttresultatet over tid:",
          ],
          bullets: [
            "Dokumentavgift",
            "Kjøps- og salgskostnader",
            "Boligprisvekst",
            "Leieprisvekst",
            "Renteutvikling",
            "Fondsavkastning",
            "Vedlikehold",
            "Hvor lenge du bor i boligen",
          ],
        },
      ],
      cta: {
        heading: "Se hva som skjer etter 3, 5 og 10 år",
        description:
          "Bruk eie-versus-leie-kalkulatoren for å sammenligne anslått nettoformue med dine egne tall.",
        buttonText: "Test regnestykket i kalkulatoren",
        href: CALCULATOR_HREF,
        analyticsEvent: "eie_leie_cta_example",
      },
    },
    {
      heading: "Kostnader mange glemmer",
      paragraphs: [
        "Et godt regnestykke inkluderer kostnader som ofte glemmes i en rask sammenligning. Husk at strøm normalt betales av både leiere og eiere, og at et ordinært depositum er bundet kapital – ikke en kostnad dersom det tilbakebetales.",
      ],
      subsections: [
        {
          subheading: "Ved eie",
          bullets: [
            "Renter etter skattevirkning",
            "Dokumentavgift og tinglysingsgebyrer",
            "Kjøps- og salgskostnader",
            "Vedlikehold",
            "Felleskostnader",
            "Kommunale avgifter og eventuell eiendomsskatt",
            "Forsikringer som ikke allerede inngår i felleskostnadene",
            "Alternativavkastningen på egenkapitalen",
            "Risiko for fall i boligverdien",
          ],
        },
        {
          subheading: "Ved leie",
          bullets: [
            "Husleie",
            "Forventet leieprisvekst",
            "Flyttekostnader",
            "Alternativavkastningen på depositum",
            "Risikoen for at leieforholdet avsluttes",
            "Behovet for faktisk å investere forskjellen dersom leie skal bygge formue",
          ],
        },
      ],
    },
    {
      heading: "Fellesgjeld og borettslag",
      paragraphs: [
        "I et borettslag må du se på totalprisen, ikke bare prisantydningen. Totalprisen inkluderer boligens andel av fellesgjelden. Undersøk også hvor mye av felleskostnadene som går til renter og avdrag på fellesgjelden, slik at de samme kostnadene ikke telles to ganger i regnestykket.",
        "Borettslagsandeler har normalt ikke dokumentavgift på samme måte som fast eiendom, men andre gebyrer kan forekomme. Les mer om [fellesgjeld](/ordbok/fellesgjeld) i ordboken.",
      ],
    },
    {
      heading: "Hva påvirker resultatet mest?",
      paragraphs: [
        "Små endringer i antatt boligprisvekst eller fondsavkastning kan gi store utslag over mange år. Derfor bør du teste minst tre scenarioer: forsiktig, normalt og optimistisk – slik [kalkulatoren](/verktoy/eie-leie-kalkulator) også lar deg gjøre.",
      ],
      bullets: [
        "Tidshorisont",
        "Forholdet mellom kjøpesum og husleie",
        "Boliglånsrente",
        "Boligprisvekst",
        "Fondsavkastning",
        "Leieprisvekst",
        "Vedlikehold",
        "Kjøps- og salgskostnader",
        "Om leieren faktisk investerer forskjellen",
      ],
    },
    {
      heading: "Når kan det være smartest å leie?",
      bullets: [
        "Du skal sannsynligvis flytte igjen om kort tid",
        "Du har en spesielt gunstig husleie",
        "Jobb, studiested eller livssituasjon er usikker",
        "Et boligkjøp vil tømme hele bufferen",
        "Du ønsker mindre ansvar for vedlikehold",
        "Du er villig til å investere egenkapitalen og den månedlige forskjellen",
        "Kjøpsalternativet er vesentlig dyrere eller bedre enn boligen du leier",
      ],
    },
    {
      heading: "Når kan det være smartest å eie?",
      bullets: [
        "Du forventer å bli boende lenge",
        "Du har stabil inntekt og tilstrekkelig buffer etter kjøpet",
        "Kjøpesummen er rimelig sammenlignet med leien for en tilsvarende bolig",
        "Du tåler høyere renter og uforutsette kostnader",
        "Du ønsker stabilitet og kontroll over boligen",
        "Du vil bygge egenkapital gjennom avdrag",
        "Du aksepterer risikoen for at boligverdien kan falle",
      ],
    },
    {
      heading: "Norske regler og skatteforhold",
      paragraphs: [
        "Reglene nedenfor er hovedregler. Banken vurderer alltid den konkrete situasjonen, og satser kan endres.",
      ],
      factBox: [
        "Boliglån kan som hovedregel utgjøre maksimalt 90 % av boligverdien, tilsvarende minst 10 % egenkapital.",
        "Samlet gjeld kan som hovedregel ikke overstige fem ganger brutto årsinntekt.",
        "Banken skal teste betjeningsevnen mot det høyeste av 7 % rente og en renteøkning på tre prosentpoeng.",
        "Rentefradraget er 22 % av rentekostnadene.",
        "Dokumentavgiften er som hovedregel 2,5 % av markedsverdien ved tinglysing av fast eiendom.",
        "Gevinst ved salg av egen bolig kan være skattefri når kravene til eiertid og botid er oppfylt.",
        "Regler og satser kan endres. Kontroller alltid oppdatert informasjon hos myndighetene.",
      ],
    },
    {
      heading: "Slik fungerer kalkulatoren",
      paragraphs: [
        "Kalkulatoren sammenligner anslått nettoformue, ikke bare husleie mot terminbeløp. Den bruker lik kontantstrøm måned for måned. Dersom eie koster mer, investerer leieren forskjellen. Dersom leie koster mer, investerer eieren forskjellen. Avdrag reduserer samtidig boliglånet og bygger egenkapital.",
        "Resultatet er et estimat basert på forutsetningene du legger inn – ikke en prognose for boligmarkedet. Start enkelt med kjøpesum, egenkapital, rente og husleie. I avansert modus kan du legge til vedlikehold, salgskostnader, lønnsvekst og flere scenarioer.",
      ],
      cta: {
        heading: "Få svaret med dine egne tall",
        description:
          "Sammenlign anslått nettoformue, månedlig forskjell og break-even over 1–30 år.",
        buttonText: "Regn ut om du bør eie eller leie",
        href: CALCULATOR_HREF,
      },
    },
    {
      heading: "Økonomi er ikke hele svaret",
      paragraphs: [
        "Fleksibilitet, trygghet, arbeid og pendling, familieplaner, ansvar for vedlikehold, trivsel og muligheten til å tilpasse boligen teller også. Kanskje du vil bo billigere nå for å spare, eller kanskje eierskap gir trygghet som er verdt noe for deg.",
        "Et økonomisk godt valg du ikke trives med, er sjelden et godt valg totalt sett.",
      ],
    },
  ],
  faq: [
    {
      question: "Er det alltid bedre å eie enn å leie?",
      answer:
        "Nei. Tidshorisont, kjøpesum, husleie, rente, vedlikehold og alternativ avkastning kan gjøre leie mer lønnsomt.",
    },
    {
      question: "Hvor lenge må jeg bo før det lønner seg å kjøpe?",
      answer:
        "Det finnes ingen fast grense. Kjøps- og salgskostnader gjør kort botid mindre gunstig, men break-even må beregnes ut fra den konkrete boligen og husleien.",
    },
    {
      question: "Er avdrag en kostnad?",
      answer:
        "Avdrag belaster månedsbudsjettet, men reduserer samtidig gjelden. Det er derfor sparing i egen bolig, ikke en ren kostnad som renter eller husleie.",
    },
    {
      question: "Er det å leie å kaste penger ut av vinduet?",
      answer:
        "Nei. Husleie kjøper deg et sted å bo og gir fleksibilitet. Leie kan være økonomisk fornuftig, særlig dersom du bor billig og investerer kapitalen du ellers ville bundet i bolig.",
    },
    {
      question: "Hvordan påvirker fellesgjeld regnestykket?",
      answer:
        "Fellesgjeld øker boligens reelle totalpris. Renter og avdrag på fellesgjelden kan også ligge i felleskostnadene og må ikke dobbelttelles.",
    },
    {
      question: "Hva skjer dersom boligprisene faller?",
      answer:
        "Boligeierens egenkapital kan falle, særlig ved høy belåning. Leieren unngår denne boligprisrisikoen, men får heller ikke gevinst dersom markedet stiger.",
    },
    {
      question: "Bør jeg bruke forventet historisk boligprisvekst?",
      answer:
        "Bruk flere scenarioer. Historisk avkastning er ingen garanti for fremtidig utvikling.",
    },
  ],
  sources: [
    {
      label: "Utlånsforskriften (Regjeringen.no)",
      url: "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/finansmarkedene/utlansforskriften2/id3077676/",
    },
    {
      label: "Dokumentavgift (Kartverket)",
      url: "https://www.kartverket.no/eiendom/dokumentavgift-og-gebyr/fritak-for-dokumentavgift",
    },
    {
      label: "Rentefradrag (Skatteetaten)",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bank-og-lan/lan-og-renter/fordeling/",
    },
    {
      label: "Skatt ved salg av bolig (Skatteetaten)",
      url: "https://www.skatteetaten.no/person/skatt/hjelp-til-riktig-skatt/bolig-og-eiendeler/bolig-eiendom-tomt/salg/",
    },
  ],
  conclusion:
    "Det finnes ikke ett svar som gjelder for alle. På kort sikt kan fleksibiliteten og de lave engangskostnadene ved leie være mest verdifulle. På lengre sikt kan avdrag og boligprisvekst gjøre eie mer lønnsomt. Det riktige svaret finner du ved å sammenligne like boliger og teste flere realistiske scenarioer.",
  bottomCta: {
    heading: "Sammenlign eie og leie med dine egne tall",
    description:
      "Se anslått nettoformue, månedlig forskjell og break-even over tid.",
    buttonText: "Åpne eie-versus-leie-kalkulatoren",
    href: CALCULATOR_HREF,
    analyticsEvent: "eie_leie_cta_bottom",
  },
  relatedLinks: [
    { label: "Eie vs. leie-kalkulator", href: CALCULATOR_HREF },
    { label: "BSU-kalkulator", href: "/verktoy/bsu-kalkulator" },
    { label: "Rentekalkulator", href: "/verktoy/rentekalkulator" },
    { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    { label: "Nettoformue i ordboken", href: "/ordbok/nettoformue" },
    { label: "Fellesgjeld i ordboken", href: "/ordbok/fellesgjeld" },
  ],
};
