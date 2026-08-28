import { buildFormuesbyggerArticle } from "./helpers";
import { kapital400Source } from "./source-tiers";

const KAPITAL_E24 =
  "https://e24.no/boers-og-finans/i/jQRR4L/kapital-john-fredriksen-god-for-262-milliarder";
const SNL_PETTER = "https://snl.no/Petter_Sundt";
const DN_ARV = "https://www.dn.no/brutalt-verdifall-for-sundt-arvinger/1-1-1323829";
const E24_2024 =
  "https://e24.no/naeringsliv/i/qPqXdL/sundt-arvingenes-overskudd-gjorde-kraftig-hopp";
const PROFF_HELENE =
  "https://www.proff.no/selskap/helene-sundt-as/oslo/eiendomshandel-og-utleie/IGB9SFV10MV";
const PANDOX_HISTORY = "https://www.pandox.se/about-company/history/";
const SUNDT_GROUP = "https://www.sundtair.com/sundt-group/";
const NTB_2022 =
  "https://kommunikasjon.ntb.no/pressemelding/17976834/sundts-resultat-for-2022?publisherId=4119124";
const BRREG_SUNDT =
  "https://virksomhet.brreg.no/nb/oppslag/enheter/974525836";

export const heleneSundtArticle = buildFormuesbyggerArticle({
  slug: "helene-sundt",
  seoAngle: "Hvordan ble Helene Sundt Norges rikeste kvinne?",
  seoTitle: "Helene Sundt: Formue, arv og investeringer",
  metaDescription:
    "Helene Sundt er Norges rikeste kvinne. Se hvordan arven fra Bergesen ble forvaltet videre gjennom Sundt AS, Pandox, eiendom og aksjer.",
  seoKeywords: [
    "Helene Sundt formue",
    "Helene Sundt",
    "Norges rikeste kvinne",
    "Sundt AS",
    "Helene Sundt AS",
    "Pandox",
    "Petter C.G. Sundt",
    "Bergesen",
    "arv og investeringer",
  ],
  factCards: [
    {
      label: "Anslått formue",
      value: "ca. 11,5 mrd. kr",
      note: "Kapital 400, 2025",
    },
    {
      label: "Plassering",
      value: "Nr. 32 i Norge",
      note: "Rikeste kvinne, Kapital 2025",
    },
    {
      label: "Formuens opprinnelse",
      value: "Arv",
      note: "Etter skipsreder Petter C.G. Sundt, 2007",
    },
    {
      label: "Bokført egenkapital",
      value: "ca. 6,45 mrd. kr",
      note: "Helene Sundt AS, 2025",
    },
  ],
  factCardsNote:
    "Anslått markedsformue, bokført egenkapital og skattemessig formue er tre forskjellige størrelser. Kapital-tallet er et medieanslag på eierskapet. Regnskapstallet er verdien i Helene Sundt AS etter regnskapsreglene.",
  shortAnswer: `Else Helene Sundt arvet en av Norges store rederiformuer, men historien sluttet ikke da arven ble fordelt. Gjennom Sundt AS, egne investeringer og en stor eierpost i hotelleiendomsselskapet Pandox er milliardverdiene blitt forvaltet videre over nesten to tiår.

I 2025 anslo [Kapital](${KAPITAL_E24}) formuen hennes til omtrent 11,5 milliarder kroner. Det gjorde henne til Norges rikeste kvinne og nummer 32 på listen over landets rikeste personer.

Historien hennes er først og fremst en historie om arv. Den er samtidig et tydelig eksempel på hvor stor forskjell langsiktig eierskap, profesjonell forvaltning og flere tiår med reinvestering kan gjøre etter at en formue er overtatt.`,
  timelinePlacement: "late",
  hideStandardSections: true,
  bodySections: [
    {
      heading: "Kort fortalt",
      table: {
        headers: ["Nøkkeltall", "Opplysning"],
        rows: [
          ["Født", "3. desember 1979"],
          ["Anslått formue", "Ca. 11,5 mrd. kroner i 2025"],
          ["Plassering", "Nummer 32 i Norge og rikeste kvinne"],
          ["Formuens opprinnelse", "Arv etter skipsreder Petter C.G. Sundt"],
          ["Viktige selskaper", "Helene Sundt AS og Sundt AS"],
          ["Mest profilerte investering", "Pandox, et svensk hotelleiendomsselskap"],
          [
            "Rolle",
            "Eier og styreleder, med profesjonell ledelse av investeringene",
          ],
        ],
      },
    },
    {
      heading: "Arven etter Petter C.G. Sundt",
      paragraphs: [
        `Formuen har røtter i det norske rederiet Bergesen d.y. Helenes far, Petter C.G. Sundt, overtok ledelsen av rederiet sammen med fetteren Morten Sigval Bergesen i 1976. De ble hovedeiere i 1986 og solgte sine aksjeposter i 2003, ifølge [Store norske leksikon](${SNL_PETTER}).`,
        `Petter C.G. Sundt hadde allerede etablert investeringsselskapet Sundt AS i 1995. Da han døde i 2007, etterlot han seg verdier anslått til omtrent 4,7 milliarder kroner, ifølge [Dagens Næringsliv](${DN_ARV}). De to barna, Helene og Christian, overtok familieformuen.`,
        "Det er derfor mer presist å beskrive Helene Sundt som en arving og kapitalforvalter enn som en selvskapt gründer. Startkapitalen var enorm. Det interessante er hva som skjedde med verdiene etter at hun og broren overtok.",
      ],
    },
    {
      heading: "Slik er eierskapet organisert",
      paragraphs: [
        "Helene og Christian har både et felles investeringsselskap og hvert sitt holdingselskap. Strukturen gjør det mulig å forvalte store felles investeringer samtidig som søsknene kan gjøre investeringer hver for seg.",
      ],
      bullets: [
        "Helene eier Helene Sundt AS.",
        "Christian eier CGS Holding AS.",
        "Holdingselskapene eier Sundt AS, som er søsknenes felles investeringsselskap.",
        "Helene Sundt AS har også egne investeringer og datterselskaper utenfor den felles porteføljen.",
        "Jakob Iqbal leder den profesjonelle forvaltningen, mens Helene Sundt er styreleder i sitt eget holdingselskap.",
      ],
    },
    {
      heading: "Pandox ble en nøkkelinvestering",
      paragraphs: [
        `En av de viktigste investeringene i Sundt-systemet har vært Pandox. Det svenske børsnoterte selskapet eier og driver hotelleiendommer i en rekke land. [Pandox](${PANDOX_HISTORY}) beskriver selv at Sundt-familien og eiendomsinvestor Christian Ringnes tok selskapet av børs i 2004.`,
        "Selskapet vokste videre som privateid selskap før det igjen ble børsnotert i Stockholm i 2015. Etter børsnoteringen fortsatte Helene Sundt AS, brorens selskap og Eiendomsspar som store eiere.",
        "Pandox har siden utviklet seg til en europeisk hotelleiendomsgigant med nær 200 hotelleiendommer. Investeringen viser at Sundt-porteføljen ikke bare består av en samling passive fond. Familien har hatt store, langsiktige eierposisjoner og vært tett knyttet til utviklingen av enkelte selskaper.",
        `Det gir mulighet for høy avkastning, men også konsentrasjonsrisiko. Da Pandox-aksjen falt omtrent 20 prosent i 2022, var den en viktig årsak til at den verdijusterte [egenkapitalen](/ordbok/egenkapital) i Sundt-gruppen falt 12 prosent det året, ifølge [Sundt AS](${NTB_2022}).`,
      ],
    },
    {
      heading: "Milliardene arbeider videre",
      paragraphs: [
        "Regnskapene viser hvor store beløp som beveger seg inne i investeringssystemet. Resultatene varierer mye fra år til år fordi aksjekurser, realiserte gevinster, [utbytte](/ordbok/utbytte) og verdsettelsen av investeringene endrer seg. Ett enkelt årsresultat sier derfor mindre om en investor som Sundt enn utviklingen over mange år.",
      ],
      cards: [
        {
          title: "Helene Sundt AS i 2024",
          paragraphs: [
            `[E24](${E24_2024}) omtalte 2024-regnskapet slik:`,
          ],
          bullets: [
            "Resultat før skatt på omtrent 900 millioner kroner",
            "Nær 300 millioner kroner i gevinst ved salg av verdipapirer",
            "Rundt 180 millioner kroner i utbytter",
            "Bokført egenkapital på omtrent 5,5 milliarder kroner",
          ],
        },
        {
          title: "Helene Sundt AS i 2025",
          paragraphs: [
            `[Proff](${PROFF_HELENE}) viser 2025-regnskapet slik:`,
          ],
          bullets: [
            "Resultat før skatt på 297 millioner kroner",
            "Årsresultat på 279 millioner kroner",
            "Bokført egenkapital på omtrent 6,45 milliarder kroner",
            "Eiendeler på rundt 6,64 milliarder kroner",
          ],
        },
      ],
    },
    {
      heading: "Fra 4,7 til 23 milliarder kroner?",
      paragraphs: [
        `Faren etterlot ifølge samtidige medieanslag omtrent 4,7 milliarder kroner samlet i 2007. I 2025 anslo [Kapital](${KAPITAL_E24}) at Helene og Christian var verdt omtrent 11,5 milliarder kroner hver. Det gir en samlet anslått formue på rundt 23 milliarder kroner.`,
        "Grovt sammenlignet er det nesten fem ganger verdiene som ble omtalt ved arveoppgjøret. Fordelt over 18 år tilsvarer det omtrent 9,2 prosent årlig nominell vekst.",
        "Dette er ikke en presis avkastningsberegning. Formuestallene er medieanslag fra ulike år, og sammenligningen tar ikke hensyn til uttak, skatt, nye investeringer eller forskjeller i verdsettelsesmetode. Regnestykket illustrerer likevel hovedpoenget: En stor arv kan både krympe og vokse, og i Sundt-familiens tilfelle har verdiene blitt forvaltet betydelig videre.",
      ],
      callout: {
        title: "Grov sammenligning, ikke beregnet investeringsavkastning",
        text: "23 mrd. kroner ÷ 4,7 mrd. kroner = omtrent 4,9 ganger så mye. Fordelt over 18 år tilsvarer det omtrent 9,2 prosent årlig nominell vekst.",
      },
    },
    {
      heading: "Formue er ikke det samme som penger på konto",
      paragraphs: [
        "Tre ulike tall kan beskrive økonomien til samme person. Kapitals anslag på 11,5 milliarder kroner er derfor ikke i konflikt med at Helene Sundt AS hadde omtrent 6,45 milliarder kroner i bokført egenkapital i 2025. Børsaksjer, unoterte selskaper, eiendom, rabatter og eierskap gjennom flere selskaper kan verdsettes svært forskjellig.",
      ],
      table: {
        headers: ["Tall", "Hva det forteller"],
        rows: [
          [
            "Kapitals formuesanslag",
            "Et anslag på markedsverdien av eierskapet, fratrukket gjeld",
          ],
          [
            "Bokført egenkapital",
            "Regnskapsverdien i selskapet etter regnskapsreglene",
          ],
          [
            "Skattemessig formue",
            "Verdien som brukes i skattelistene etter skattereglene",
          ],
        ],
      },
    },
    {
      heading: "Arv, men ikke autopilot",
      paragraphs: [
        "Det er umulig å fortelle historien om Helene Sundt uten å slå fast at utgangspunktet var en milliardformue. Hun tok ikke den samme økonomiske reisen som en gründer som startet uten kapital.",
        "Samtidig bevarer ikke en arv seg selv automatisk. Store investeringer kan falle kraftig i verdi, eierne kan ta ut for mye penger, og en konsentrert portefølje kan rammes hardt når én bransje får problemer. Sundt-gruppen fikk for eksempel et tydelig tilbakeslag både under pandemien i 2020 og under børsfallet i 2022.",
        "Familien har svart med langsiktig eierskap, spredning mellom flere typer investeringer og profesjonell ledelse. Helene Sundt trenger ikke selv å velge hver aksje eller lede den daglige driften for å være en aktiv eier. En viktig del av kapitalforvaltning er nettopp å velge struktur, ledelse og tidshorisont.",
      ],
    },
    {
      heading: "Den viktigste lærdommen",
      paragraphs: [
        "Helene Sundts historie er ikke en oppskrift på hvordan man blir milliardær fra null. Den viser hva langsiktig eierskap kan gjøre med kapital som allerede finnes.",
        "For en vanlig sparer er skalaen en helt annen, men mekanismen er gjenkjennelig: Behold eierskap, spre risikoen, unngå at hele kapitalen forbrukes, og la avkastningen bli værende lenge nok til at den selv kan skape ny avkastning. For de fleste betyr det [aksjer](/ordbok/aksje) og [indeksfond](/ordbok/indeksfond) over tid, ikke et familieselskap på milliardnivå. Se også guiden [Kom i gang med fond](/guider/kom-i-gang-med-fond).",
      ],
    },
  ],
  timeline: [
    {
      date: "3. des. 1979",
      title: "Født",
      description: "Else Helene Sundt ble født 3. desember 1979.",
    },
    {
      date: "1995",
      title: "Sundt AS etableres",
      description:
        "Petter C.G. Sundt etablerte investeringsselskapet som senere ble søsknenes felles forvaltningsplattform.",
    },
    {
      date: "2003",
      title: "Salg av Bergesen-aksjene",
      description:
        "Petter C.G. Sundt og Morten Sigval Bergesen solgte sine aksjeposter i Bergesen d.y.",
    },
    {
      date: "2004",
      title: "Pandox tas av børs",
      description:
        "Sundt-familien og Christian Ringnes tok Pandox av børs. Selskapet vokste videre som privateid hotelleiendomsselskap.",
    },
    {
      date: "2007",
      title: "Arv etter Petter C.G. Sundt",
      description:
        "Da faren døde, overtok Helene og Christian familieformuen. Medieanslag på arven var omtrent 4,7 milliarder kroner samlet.",
    },
    {
      date: "2015",
      title: "Pandox børsnoteres i Stockholm",
      description:
        "Etter børsnoteringen fortsatte Helene Sundt AS, brorens selskap og Eiendomsspar som store eiere.",
    },
    {
      date: "2022",
      title: "Verdifall i Sundt-gruppen",
      description:
        "Verdijustert egenkapital falt 12 prosent. Pandox-aksjen, som falt omtrent 20 prosent, var en viktig årsak.",
    },
    {
      date: "2025",
      title: "Kapital 400: 11,5 milliarder",
      description:
        "Kapital anslo Helene Sundts formue til om lag 11,5 milliarder kroner. Det plasserte henne som Norges rikeste kvinne og nummer 32 på listen.",
    },
  ],
  wealthSources: [
    {
      category: "arv",
      description: `Arv etter skipsreder Petter C.G. Sundt i 2007. [Dagens Næringsliv](${DN_ARV}) omtalte samlede verdier på omtrent 4,7 milliarder kroner. Røttene ligger i Bergesen d.y., solgt i 2003.`,
    },
    {
      category: "selskaper",
      description: `Helene Sundt AS er hennes holdingselskap. Sammen med brorens CGS Holding eier hun [Sundt AS](${BRREG_SUNDT}), familiens felles investeringsselskap. Helene Sundt AS har også egne investeringer utenfor den felles porteføljen.`,
    },
    {
      category: "aksjer",
      description: `Langsiktige eierposisjoner, blant annet i hotelleiendomsselskapet [Pandox](${PANDOX_HISTORY}), pluss en bredere portefølje av finansielle investeringer og eiendom. Konsentrasjon i enkeltaksjer gir både avkastning og svingninger.`,
    },
  ],
  ownershipVsControl:
    "Helene Sundt eier Helene Sundt AS og er styreleder der. Den daglige forvaltningen er profesjonell, med Jakob Iqbal som leder. Holdingselskapet eier sammen med CGS Holding AS det felles investeringsselskapet Sundt AS. Eierskap og operativ ledelse er altså splittet: hun kontrollerer strukturen, men trenger ikke velge hver aksje selv.",
  decisiveMove:
    "Å la arven etter 2007 bli stående i et profesjonelt investeringsselskap, i stedet for å ta ut kapitalen. Sundt AS, etablert av faren i 1995, ble plattformen for langsiktige eierposisjoner som Pandox og for reinvestering over nesten to tiår.",
  whatCouldGoWrong: [
    "En konsentrert eierpost, som Pandox i 2022, kan dra ned hele gruppens verdijusterte egenkapital når én bransje faller.",
    "Arv gir kapital, men ikke automatisk at formuen bevares. Uttak, skatt og svak forvaltning kan erodere verdiene over generasjoner.",
    "Resultatene i holdingselskapet svinger kraftig fra år til år. Ett godt år er ikke en varig inntekt.",
    "Markedsanslag, bokført egenkapital og skattemessig formue måler ulike ting og kan ikke legges sammen til en ny fasit.",
  ],
  mythVsReality: [
    {
      myth: "Arvinger mottar én stor sjekk og er ferdige.",
      reality:
        "Helene og Christian overtok en forvaltningsstruktur. Sundt AS og de personlige holdingselskapene har investert, solgt og reinvestert i nesten to tiår etter arveoppgjøret.",
    },
    {
      myth: "11,5 milliarder kroner er det samme som 6,45 milliarder i Helene Sundt AS.",
      reality:
        "Kapital anslår markedsverdien av eierskapet. Bokført egenkapital følger regnskapsreglene i ett selskap. Skattemessig formue er en tredje størrelse.",
    },
    {
      myth: "Arv betyr automatisk at formuen vokser.",
      reality:
        "Sundt-gruppen hadde tydelige tilbakeslag under pandemien i 2020 og børsfallet i 2022. Langsiktig eierskap og profesjonell ledelse er det som skiller vekst fra forvitring.",
    },
  ],
  personalLessons: [
    "Utgangspunktet betyr enormt mye. Det er stor forskjell på å starte med månedlig sparing og å arve milliarder, og det bør ikke skjules i en formueshistorie.",
    "Eierskap kan vare gjennom generasjoner. Verdiene begynte i shipping, men lever videre i eiendom, hotell, aksjer og andre investeringer.",
    "Tid gjør mest når kapitalen får bli investert. Nesten to tiår med videre forvaltning har vært viktigere enn ett enkelt godt år.",
    "Profesjonell hjelp kan være en styrke. Eierens oppgave trenger ikke være å gjøre alt selv. Det kan være mer verdifullt å velge dyktige forvaltere og gode styrer.",
    "Store formuer svinger også. Sundt-systemet har hatt milliardoverskudd, men også år med store verdifall.",
    "Markedsverdi og regnskapstall må ikke blandes. Formuesanslag, bokført egenkapital og skattelisteformue svarer på forskjellige spørsmål.",
  ],
  sources: [
    {
      label: "Sundt AS: Brønnøysundregistrene",
      url: BRREG_SUNDT,
      tier: "primary",
    },
    {
      label: "Proff: Helene Sundt AS, regnskap 2025",
      url: PROFF_HELENE,
      tier: "primary",
    },
    {
      label: "Store norske leksikon: Petter Sundt / Bergesen d.y.",
      url: SNL_PETTER,
      tier: "primary",
    },
    {
      label: "Pandox: historien om oppkjøp og avnotering",
      url: PANDOX_HISTORY,
      tier: "secondary",
    },
    {
      label: "Sundt Group: etablert 1995, overtatt av søsknene i 2007",
      url: SUNDT_GROUP,
      tier: "secondary",
    },
    {
      label: "Sundt AS: resultatet for 2022",
      url: NTB_2022,
      tier: "secondary",
    },
    kapital400Source(),
    {
      label: "E24/Kapital: Helene Sundt anslått til 11,5 milliarder (2025)",
      url: KAPITAL_E24,
      tier: "tertiary",
    },
    {
      label: "Dagens Næringsliv: arven etter Petter C.G. Sundt",
      url: DN_ARV,
      tier: "tertiary",
    },
    {
      label: "E24: Helene Sundt AS, resultater 2024",
      url: E24_2024,
      tier: "tertiary",
    },
  ],
  lastVerified: "2026-08-28",
  relatedLinks: [
    { label: "Johan H. Andresen", href: "/formuesbyggere/johan-h-andresen" },
    {
      label: "Gustav Magnar Witzøe",
      href: "/formuesbyggere/gustav-magnar-witzoe",
    },
    { label: "Trond Mohn", href: "/formuesbyggere/trond-mohn" },
    { label: "Egenkapital i ordboken", href: "/ordbok/egenkapital" },
    { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
  ],
});
