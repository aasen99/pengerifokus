import type { FormuesbyggerArticle } from "@/types/formuesbygger";

export const internasjonaleFormuesbyggerArtikler: Record<
  string,
  FormuesbyggerArticle
> = {
  "warren-buffett": {
    slug: "warren-buffett",
    readTimeMinutes: 6,
    seoAngle: "Hva kan vi lære av Warren Buffett?",
    intro:
      "Warren Buffett er kanskje verdens mest kjente investor. Han bygde formue ved å kjøpe gode selskaper til fornuftige priser og holde dem i tiår, ikke ved å jage raske gevinster.",
    sections: [
      {
        heading: "Hvordan det startet",
        paragraphs: [
          "Buffett begynte å investere som barn og studerte under Benjamin Graham, faren til verdiinvestering. Han tok over Berkshire Hathaway og gjorde det til et konglomerat som eier alt fra forsikring til jernbane.",
          "Strategien er enkel å forstå, vanskelig å følge: kjøp kvalitet, vær tålmodig, la rentes rente jobbe.",
        ],
      },
      {
        heading: "Hva han eier",
        paragraphs: [
          "Nesten all formuen sitter i Berkshire Hathaway-aksjer. Buffett har lenge advart mot å spekulere og for høy gjeld.",
        ],
      },
    ],
    lessons: [
      "Tid i markedet slår timing av markedet for de fleste.",
      "Forstå hva du eier: Buffett leser årsrapporter, ikke bare grafer.",
      "Unngå unødvendig gjeld og komplekse produkter du ikke forstår.",
      "Formue bygges ofte gjennom eierskap, ikke gjennom høy lønn.",
    ],
    relatedLinks: [
      { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
      { label: "Regel 72", href: "/verktoy/regel-72" },
      { label: "Rentes rente i ordboken", href: "/ordbok/rentes-rente" },
    ],
  },
  "elon-musk": {
    slug: "elon-musk",
    readTimeMinutes: 5,
    seoAngle: "Hvordan ble Elon Musk rik?",
    intro:
      "Elon Musk bygde formue gjennom gründerskap i teknologi og industri, med ekstreme svingninger i verdien. Historien viser både kraften i eierskap og risikoen ved konsentrasjon.",
    sections: [
      {
        heading: "Fra PayPal til Tesla og SpaceX",
        paragraphs: [
          "Musk tjente på PayPal-salget, men den virkelige formuen kom fra eierskap i Tesla og andre selskaper. Han har reinvestert og tatt stor personlig risiko flere ganger.",
          "Aksjekursen i Tesla har svingt voldsomt, noe som gjør at formuesanslag endrer seg raskt.",
        ],
      },
    ],
    lessons: [
      "Gründere kan bli rike på eierskap, ikke lønn, men risikoen er enorm.",
      "Konsentrasjon i få selskaper gir stor oppside og stor nedside.",
      "Å tro på en idé over tid krever både kapital og utholdenhet.",
      "Synlighet og merkevare kan være en forretningsressurs, men også en belastning.",
    ],
    relatedLinks: [
      { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    ],
  },
  "jeff-bezos": {
    slug: "jeff-bezos",
    readTimeMinutes: 5,
    seoAngle: "Hvordan bygde Jeff Bezos Amazon?",
    intro:
      "Jeff Bezos startet Amazon som nettbokhandel og bygde det til et av verdens største selskaper. Formuen kom fra å eie en stor andel av et selskap som vokste i tiår.",
    sections: [
      {
        heading: "Langsiktig gründer",
        paragraphs: [
          "Bezos fokuserte på kundeopplevelse, logistikk og skala. Amazon tjente lite i årevis, men vokste markedsandel. Investorer som holdt, ble belønnet.",
          "Han har senere investert i romfart (Blue Origin) og andre prosjekter.",
        ],
      },
    ],
    lessons: [
      "Reinvestering av overskudd kan bygge mer verdi enn utbytte på kort sikt.",
      "Eierskap i et voksende selskap kan overgå enhver lønn.",
      "Tålmodige investorer og gründere kan vinne på lang sikt.",
    ],
    relatedLinks: [
      { label: "Sparekalkulator", href: "/verktoy/sparekalkulator" },
    ],
  },
  "bill-gates": {
    slug: "bill-gates",
    readTimeMinutes: 5,
    seoAngle: "Hva kan vi lære av Bill Gates?",
    intro:
      "Bill Gates bygde Microsoft og ble en av verdens rikeste. Senere har han brukt stor del av formuen på filantropi gjennom Bill & Melinda Gates Foundation.",
    sections: [
      {
        heading: "Software og eierskap",
        paragraphs: [
          "Gates og Paul Allen så tidlig at programvare kunne skaleres globalt. Microsoft dominerte PC-epoken, og Gates beholdt betydelig eierskap.",
          "Overgangen fra gründer til filantrop viser at formue også kan brukes til samfunnsformål.",
        ],
      },
    ],
    lessons: [
      "Teknologi med skalerbarhet kan skape enorm verdi.",
      "Å holde eierskap i et vinnende selskap er ofte viktigere enn tidlig uttak.",
      "Formue kan brukes aktivt, ikke bare akkumuleres.",
    ],
    relatedLinks: [
      { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    ],
  },
  "mark-zuckerberg": {
    slug: "mark-zuckerberg",
    readTimeMinutes: 4,
    seoAngle: "Hvordan ble Mark Zuckerberg rik?",
    intro:
      "Mark Zuckerberg grunnla Facebook som student og bygde Meta til et av verdens største teknologiselskaper. Formuen er nesten utelukkende knyttet til eierskap i Meta.",
    sections: [
      {
        heading: "Sosiale medier og annonser",
        paragraphs: [
          "Facebook vokste gjennom nettverkseffekter: jo flere brukere, jo mer verdi. Inntektene kom fra annonser, og Zuckerberg beholdt kontroll og eierskap.",
        ],
      },
    ],
    lessons: [
      "Nettverkseffekter kan gi vinner-tar-alle-dynamikk i tech.",
      "Kontroll over selskapet (stemmerett) kan bety mer enn bare økonomisk eierandel.",
      "Ung gründer med stor eierandel kan bli ekstremt rik ved børsnotering.",
    ],
    relatedLinks: [],
  },
  "bernard-arnault": {
    slug: "bernard-arnault",
    readTimeMinutes: 4,
    seoAngle: "Hvordan bygde Bernard Arnault luksusimperiet?",
    intro:
      "Bernard Arnault leder LVMH, verdens største luksuskonsern. Han bygde formue ved å kjøpe og samle premium-merker som Louis Vuitton, Dior og Hennessy.",
    sections: [
      {
        heading: "Luksus som investering",
        paragraphs: [
          "Arnault så at luksusmerker med historie og kvalitet kan ta høye priser og beholde kunder over generasjoner. LVMH eier dusinvis av merker.",
        ],
      },
    ],
    lessons: [
      "Merkevare og opplevelse kan gi høyere margin enn råvarer.",
      "Oppkjøp av sterke merker kan være en vei til konsolidering.",
      "Luksus er motstandsdyktig mot konjunkturer for de rikeste kundene.",
    ],
    relatedLinks: [],
  },
  "larry-ellison": {
    slug: "larry-ellison",
    readTimeMinutes: 4,
    seoAngle: "Hvordan ble Larry Ellison rik?",
    intro:
      "Larry Ellison grunnla Oracle og bygde formue på databasesoftware til bedrifter. Senere har han investert bredt, inkludert helse og teknologi.",
    sections: [
      {
        heading: "Enterprise-software",
        paragraphs: [
          "Oracle solgte programvare til store bedrifter med langvarige kontrakter. Det ga forutsigbar inntekt og høy lojalitet hos kunder.",
        ],
      },
    ],
    lessons: [
      "B2B-software med abonnement kan gi stabil og skalerbar inntekt.",
      "Gründere som beholder eierskap over tid kan samle enorm formue.",
    ],
    relatedLinks: [],
  },
  "michael-bloomberg": {
    slug: "michael-bloomberg",
    readTimeMinutes: 4,
    seoAngle: "Hva kan vi lære av Michael Bloomberg?",
    intro:
      "Michael Bloomberg bygde Bloomberg LP, en leverandør av finansdata og nyheter til profesjonelle investorer. Han kombinerte teknologi, journalistikk og abonnement.",
    sections: [
      {
        heading: "Terminal og data",
        paragraphs: [
          "Bloomberg Terminal ble uunnværlig for mange i finansbransjen. Abonnementsmodellen ga gjentakende inntekt og høy kundelojalitet.",
        ],
      },
    ],
    lessons: [
      "Spisskompetanse mot en nisje kan gi høy betalingsvilje.",
      "Abonnement gir forutsigbar inntekt over tid.",
      "Formue kan komme fra å løse et konkret problem for profesjonelle brukere.",
    ],
    relatedLinks: [],
  },
  "amancio-ortega": {
    slug: "amancio-ortega",
    readTimeMinutes: 4,
    seoAngle: "Hvordan bygde Amancio Ortega Zara?",
    intro:
      "Amancio Ortega grunnla Inditex og Zara, og revolusjonerte klesbransjen med rask mote og effektiv logistikk. Han er en av verdens rikeste, med lav profil.",
    sections: [
      {
        heading: "Fast fashion",
        paragraphs: [
          "Zara kortet ned tiden fra design til butikk. Inditex eier produksjon og butikker, noe som gir kontroll over hele kjeden.",
        ],
      },
    ],
    lessons: [
      "Logistikk og hastighet kan være konkurransefortrinn i handel.",
      "Vertikal integrasjon gir kontroll, men krever kapital.",
      "Man trenger ikke være synlig for å bygge enorm formue.",
    ],
    relatedLinks: [],
  },
  "jensen-huang": {
    slug: "jensen-huang",
    readTimeMinutes: 4,
    seoAngle: "Hvordan ble Jensen Huang rik på AI?",
    intro:
      "Jensen Huang er medgründer og CEO av NVIDIA. Selskapet ble sentralt i AI-boomen fordi grafikkprosessorer ble brukt til å trene kunstig intelligens.",
    sections: [
      {
        heading: "Fra gaming til AI",
        paragraphs: [
          "NVIDIA startet med grafikkort til spill, men så muligheten i databehandling for AI. Timing og teknologi møttes, og aksjen steg kraftig.",
        ],
      },
    ],
    lessons: [
      "Å eie selskapet du bygger kan gi formue langt utover lønn.",
      "Teknologiskifte kan omdefinere hvem som vinner i en bransje.",
      "Konsentrert eierskap betyr at formuen svinger med selskapets suksess.",
    ],
    relatedLinks: [],
  },
  "oprah-winfrey": {
    slug: "oprah-winfrey",
    readTimeMinutes: 4,
    seoAngle: "Hvordan bygde Oprah Winfrey formue?",
    intro:
      "Oprah Winfrey bygde formue på TV, produksjon og personlig merkevare. Hun viste at underholdning og media kan skape eierskap, ikke bare berømmelse.",
    sections: [
      {
        heading: "Merkevare og media",
        paragraphs: [
          "The Oprah Winfrey Show ga plattform. Hun eide produksjon og bygget Harpo Productions, noe som betydde at hun tjente på innholdet, ikke bare presenterte det.",
        ],
      },
    ],
    lessons: [
      "Å eie innholdet ditt gir mer verdi enn å bare leie ut tid.",
      "Personlig merkevare kan åpne dører til investeringer og partnerskap.",
      "Media og underholdning kan bygge formue når du eier, ikke bare performer.",
    ],
    relatedLinks: [],
  },
  "jay-z": {
    slug: "jay-z",
    readTimeMinutes: 4,
    seoAngle: "Hvordan ble Jay-Z milliardær?",
    intro:
      "Jay-Z gikk fra rapper til gründer og investor. Formuen kom fra musikkrettigheter, Roc Nation, drikkevaremerker og bred investeringsportefølje.",
    sections: [
      {
        heading: "Fra artist til eier",
        paragraphs: [
          "Jay-Z forstod tidlig verdien av å eie masteropptak og bygge selskaper rundt musikken. Han investerte i alt fra champagne til teknologi.",
        ],
      },
    ],
    lessons: [
      "Rettigheter og eierskap til eget verk gir varig inntekt.",
      "Artister kan bygge formue utenfor scenen ved å bli investorer.",
      "Merkevare og nettverk åpner investeringsmuligheter.",
    ],
    relatedLinks: [],
  },
  "taylor-swift": {
    slug: "taylor-swift",
    readTimeMinutes: 5,
    seoAngle: "Hvordan bygde Taylor Swift formue på musikk?",
    intro:
      "Taylor Swift er et eksempel på hvordan en artist kan bygge formue gjennom eierskap til musikken, turnéer og merkevare, ikke bare strømming.",
    sections: [
      {
        heading: "Eierskap til katalogen",
        paragraphs: [
          "Swift har vært tydelig på viktigheten av å eie masteropptakene. Hun har også gjeninnspilt album for å ta kontroll. Erastour ble en av historiens mest inntektsbringende turnéer.",
        ],
      },
    ],
    lessons: [
      "Å eie rettighetene til arbeidet ditt gir kontroll og inntekt over tid.",
      "Turnéer og direkte fan-engasjement kan gi mer enn strømming alene.",
      "Merkevare og lojalitet kan omsettes til flere inntektsstrømmer.",
      "Forskjellen på lønn per konsert og eierskap til katalogen er avgjørende.",
    ],
    relatedLinks: [
      { label: "Kutt faste kostnader", href: "/guider/kutt-faste-kostnader" },
    ],
  },
  "cristiano-ronaldo": {
    slug: "cristiano-ronaldo",
    readTimeMinutes: 5,
    seoAngle: "Hvordan tjener Cristiano Ronaldo mer enn fotballlønn?",
    intro:
      "Cristiano Ronaldo er blant verdens best betalte idrettsutøvere, men stor del av formuen kommer fra sponsorater, merkevare og forretninger utenfor banen.",
    sections: [
      {
        heading: "Lønn og merkevare",
        paragraphs: [
          "Fotballlønnen er høy, men CR7-merkevaren, sponsoravtaler og investeringer i hotell, klesmerker og media har bygget formuen videre.",
          "Sosiale medier gir direkte rekkevidde til milliarder, noe sponsorer betaler godt for.",
        ],
      },
    ],
    lessons: [
      "Topp idrett gir høy lønn, men merkevare kan gi mer over tid.",
      "Å bygge personlig merkevare tidlig forlenger inntektsperioden.",
      "Inntekt fra sponsorater er lønn; eierskap i selskaper er formue.",
      "Karrieren er kort, merkevaren kan vare lenge.",
    ],
    relatedLinks: [],
  },
  "michael-jordan": {
    slug: "michael-jordan",
    readTimeMinutes: 5,
    seoAngle: "Hvorfor tjente Michael Jordan mer på Nike enn på basketball?",
    intro:
      "Michael Jordan er det klassiske eksempelet på at idrettsstjerner kan bli rikere på merkevare enn på lønn. Jordan-merkevaren hos Nike genererer fortsatt inntekt.",
    sections: [
      {
        heading: "Jordan Brand",
        paragraphs: [
          "Jordan signerte en banebrytende avtale med Nike. Air Jordan ble et eget brand, og Jordan får fortsatt royalty. Han eide også Charlotte Hornets en periode.",
        ],
      },
    ],
    lessons: [
      "Eierskap og royalty slår engangslønn over tid.",
      "Å koble idrett til sterkt merkevare kan gi inntekt i tiår etter karrieren.",
      "Investeringer i lag og selskaper kan bygge formue utenfor banen.",
      "Dette er forskjellen på å være ansatt og å eie en andel av verdien du skaper.",
    ],
    relatedLinks: [
      { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    ],
  },
};
