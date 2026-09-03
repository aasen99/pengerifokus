import { buildFormuesbyggerArticle } from "./helpers";
import { forbesBillionairesSource, kapital400Source } from "./source-tiers";

// Arne Blystad
const BLYSTAD_HISTORY = "https://blystad.no/history/";
const BLYSTAD_ABOUT = "https://blystad.no/about-us-2/";
const BLYSTAD_INVESTMENTS = "https://blystad.no/investments/";
const BLYSTAD_SHIPPING = "https://blystad.no/shipping/";
const STAR_BULK_BOARD = "https://www.starbulk.com/gr/en/ir-board-of-directors/";
const FA_BLYSTAD_RIGG = "https://www.finansavisen.no/nyheter/naeringsliv/2007/07/arne-blystad-tjente-1-4-milliarder-paa-salg-av-rigger";
const SEATRADE_SONGA = "https://www.seatrade-maritime.com/dry-bulk/star-bulk-to-acquire-songa-bulk-fleet-in-deal-worth-328m";
const MARINELOG_MPC = "https://www.marinelog.com/news/mpc-container-ships-in-210-million-acquisition-of-songa-container/";
const FA_BLYSTAD_PROFIL = "https://www.finansavisen.no/person/513/arne-blystad";

// John Fredriksen
const KAPITAL_FREDRIKSEN =
  "https://e24.no/boers-og-finans/i/jQRR4L/kapital-john-fredriksen-god-for-262-milliarder";
const FORBES_FREDRIKSEN = "https://www.forbes.com/profile/john-fredriksen/";
const FRONTLINE_HISTORY = "https://www.frontlineplc.cy/history/";
const FRO_HEMEN = "https://www.stocktitan.net/sec-filings/FRO/schedule-13d-a-frontline-plc-amended-major-shareholder-report-5b46efe18946.html";
const MOWI_INVESTORS = "https://mowi.com/investors/";
const MOWI_AGM = "https://mowi.com/wp-content/uploads/2025/05/Mowi-AGM-Notice-2025.pdf";
const REUTERS_FREDRIKSEN =
  "https://www.reuters.com/article/business/shipping-magnate-fredriksen-in-eye-of-storm-idUSTRE74O3JR/";
const FORBES_HELMAN =
  "https://www.forbes.com/sites/christopherhelman/2012/03/21/how-shipping-king-john-fredriksen-found-a-port-in-the-storm/";

// Gustav Magnar Witzøe
const SALMAR_GOV = "https://www.salmar.no/en/investor/corporate-governance/about-corporate-governance/";
const SALMAR_Q3 =
  "https://ml-eu.globenewswire.com/Resource/Download/297c7fb0-da17-4749-b4ba-a4d75ab27596";
const KVERVA_BOARD = "https://kverva.no/department/board-of-directors";
const FUTURUM_WISKI = "https://www.futurum.vc/";
const E24_KVARV_CEO =
  "https://e24.no/naeringsliv/i/oEABJ7/gustav-magnar-witzoee-tar-over-som-daglig-leder-i-familieselskapet-kvarv";
const E24_WITZOE_A_AKSJER =
  "https://e24.no/boers-og-finans/i/RrPjBA/witzoee-tar-milliardutbytte-skylder-paa-formueskatten";
const E24_WITZOE_SKATT = "https://e24.no/norsk-oekonomi/i/9pl0gr/gustav-magnar-witzoee-32-er-fremdeles-norges-rikeste-med-en-formue-paa-29-9-milliarder";
const FORBES_WITZOE = "https://www.forbes.com/profile/gustav-magnar-witzoe/";

// Bjørn Dæhlie
const OLYMPICS_DAEHLIE = "https://www.olympics.com/en/athletes/bjorn-daehlie";
const DAHLIE_BRAND = "https://www.dahlie.com/us/en/about-us/";
const BRREG_SISA = "https://virksomhet.brreg.no/nb/oppslag/enheter/882585182";
const E24_SISA_2024 = "https://e24.no/boers-og-finans/i/939yXE/daehlie-selskap-tjente-124-millioner";
const BORSEN_SISA_2025 =
  "https://borsen.dagbladet.no/nyheter/arsresultatet-falt-med-over-89-millioner/84975145";
const FASTERSKIER_DAEHLIE =
  "https://fasterskier.com/2016/09/daehlie-same-brand-new-identity/";

// Petter Northug
const FIS_NORTHUG =
  "https://www.fis-ski.com/DB/general/athlete-biography.html?competitorid=89637&sectorcode=cc&type=result";
const OLYMPICS_NORTHUG = "https://www.olympics.com/en/news/petter-northug-cross-country-skiing";
const BRREG_NORTHUG_HOLDING = "https://virksomhet.brreg.no/oppslag/enheter/997602692";
const E24_NORTHUG_KRYPTO = "https://e24.no/naeringsliv/i/K8GPBo/skikongen-har-blitt-kryptokonge";
const PROFF_NORTHUG_HOLDING =
  "https://www.proff.no/selskap/petter-northug-holding-as/mosvik/utleie-og-leasing/IGHY35W01TD";
const PROFF_NORTHUG_AS =
  "https://www.proff.no/selskap/northug-as/mosvik/reklamebyr%C3%A5er/IGI07QL01DI";
const E24_NORTHUG_SPONSOR = "https://e24.no/privatoekonomi/i/ALOv7r/northug-selskap-har-aldri-hatt-lavere-overskudd";

// Alan Walker
const ALANWALKER_SITE = "https://www.alanwalker.com/";
const WOW_SITE = "https://worldofwalker.com/";
const SONY_WALKER = "https://www.sonymusic.co.uk/artist/alan-walker/";
const PROFF_WALKER_AS = "https://www.proff.no/selskap/alan-walker-as/oslo/musikk/IF5E3XP07S0";
const PROFF_WOW = "https://www.proff.no/selskap/world-of-walker-as/oslo/lydproduksjon-og-utstyr/IFFWX6O07SG";
const E24_WALKER_2025 = "https://e24.no/naeringsliv/i/JOLGmX/alan-walker-hentet-utbytte-paa-40-mill";
const FA_WOW_2026 =
  "https://www.finansavisen.no/finans/2026/08/16/8373123/utbyttefest-tross-resultatfall-for-greve-og-walker";
const FA_WALKER_2024 =
  "https://www.finansavisen.no/finans/2025/08/05/8283197/alan-walker-har-tjent-over-190-millioner-de-tre-siste-arene";
const FA_WALKER_2022 =
  "https://www.finansavisen.no/samfunn/2023/09/20/8037489/sykt-overskudd";
const WIRED_WALKER = "https://www.wired.com/story/alan-walker-music-youtube";

// Magnus Midtbø
const WORLD_CLIMBING = "https://www.worldclimbing.com/athlete/3058/magnus-midtbo";
const YOUTUBE_MIDTBO = "https://www.youtube.com/@magmidt";
const RUNGNE_MIDTBO = "https://rungne.com/pages/magnus-midtbo";
const PROFF_MIDTBO_INVEST =
  "https://www.proff.no/selskap/midtb%C3%B8-invest-as/oslo/treningssentre-og-andre-sportsaktiviteter/IFBWPNI10L8";
const PROFF_MIDTBO_EIER =
  "https://www.proff.no/aksjon%C3%A6rer/bedrift/midtb%C3%B8-invest-as/926994654";
const FA_MIDTBO_2025 =
  "https://www.finansavisen.no/handel/2025/07/27/8280418/magnus-midtbo-om-rungne-skal-bli-nye-patagonia";
const DN_RUNGNE =
  "https://www.dn.no/gasellene/dn-gaselle/dn-gaselle-2025/rungne/klatremerke-prises-til-100-mill-bransjetopp-etterlyser-mer-norsk-hype/2-1-1869979";
const FA_RUNGNE_TOLL =
  "https://www.finansavisen.no/handel/2026/05/19/8352297/magnus-midtbos-klesmerke-i-tollkrise";
const PROFF_RUNGNE = "https://www.proff.no/selskap/rungne-apparel-as/bekkestua/industridesignere/IF9CQNO00N9";

export const norskeProfilerPakke1 = {
  "arne-blystad": buildFormuesbyggerArticle({
    slug: "arne-blystad",
    seoAngle: "Arne Blystad formue: Slik bygde han seg opp igjen i shipping",
    seoTitle: "Arne Blystad formue: Slik bygde han seg opp igjen i shipping",
    metaDescription:
      "Arne Blystad bygde en ny milliardformue etter en brutal nedtur. Se formuen, Songa-selskapene og grepene bak shippingcomebacket.",
    seoKeywords: [
      "Arne Blystad formue",
      "Arne Blystad",
      "Songa Bulk",
      "Star Bulk",
      "MPC Container Ships",
      "shippinginvestor",
      "Kosmos",
    ],
    factCards: [
      {
        label: "Anslått formue",
        value: "ca. 11,8 mrd. kr",
        note: "Kapital 400, 2025",
      },
      {
        label: "Født",
        value: "18. januar 1955",
        note: "Andre generasjons skipsreder",
      },
      {
        label: "Forvaltede eiendeler",
        value: "ca. 1,5 mrd. USD",
        note: "Blystad-gruppen, konsernnivå",
      },
      {
        label: "Bransje",
        value: "Shipping og industri",
        note: "Tank, tørrlast, containere, offshore",
      },
    ],
    shortAnswer: `Arne Blystad ble ikke rik gjennom én enkelt handel. Han vokste opp i en familie med shippingbakgrunn, fikk tidlig erfaring som skipsmegler og brukte siden den samme modellen flere ganger: kjøpe eller bygge maritime eiendeler når prisene var lave, samle dem i et tydelig selskap og selge, børsnotere eller slå selskapet sammen med en større aktør når markedet bedret seg.

Historien er heller ikke en rett linje oppover. Blystad og broren Wilhelm fikk store økonomiske problemer etter forsøket på å ta kontroll over Kosmos på 1980-tallet. Arne Blystad flyttet senere til USA, startet på nytt og kom tilbake som en av Norges mest aktive shippinginvestorer. Kapital anslo formuen til rundt 11,8 milliarder kroner i 2025. Blystad-gruppen oppgir selv rundt 1,5 milliarder dollar i forvaltede eiendeler, men dette er konsernets eiendeler og skal ikke forveksles med privat nettoformue.`,
    timeline: [
      {
        date: "18. jan. 1955",
        title: "Født inn i en shippingfamilie",
        description:
          "Arne Blystad er andre generasjons skipsreder. Faren kjøpte sitt første skip mot slutten av 1940-årene.",
      },
      {
        date: "Etter videregående",
        title: "Skipsmegler i London og New York",
        description:
          "Blystad startet yrkeslivet som skipsmegler og lærte fraktrater, skipsverdier og finansiering i sykliske markeder.",
      },
      {
        date: "1980-tallet",
        title: "Kosmos-forsøket ender med nedtur",
        description:
          "Brødrene Blystad forsøkte å ta kontroll over rederiet Kosmos. Forsøket mislyktes og etterlot dem med store økonomiske problemer.",
      },
      {
        date: "1990-tallet",
        title: "Ny start i USA",
        description:
          "Blystad bygde opp ny shippingaktivitet gjennom Blystad Shipping etter tapene.",
      },
      {
        date: "2006",
        title: "Songa Drilling solgt til Abbot Group",
        description:
          "Finansavisen har omtalt en gevinst på rundt 1,4 milliarder kroner i Blystad-kontrollerte Spencer Energy.",
      },
      {
        date: "2018",
        title: "Songa Bulk solgt til Star Bulk",
        description:
          "Star Bulk kjøpte flåten på 15 skip for rundt 328 millioner dollar. Blystad gikk inn i styret i Star Bulk.",
      },
      {
        date: "2021",
        title: "Songa Container inn i MPC",
        description:
          "MPC Container Ships kjøpte 11 containerskip fra Songa Container i en transaksjon verdsatt til rundt 210 millioner dollar.",
      },
      {
        date: "2025",
        title: "Kapital 400: 11,8 milliarder",
        description:
          "Kapital anslo formuen til om lag 11,8 milliarder kroner. Gruppen er fortsatt aktiv i tank, containere, offshore og investeringer.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description: `Shipping er kjernen. Gruppen eier og opererer skip gjennom Songa-strukturen og har vært innom tank, tørrlast, containere og offshore. Verdier skapes både gjennom drift og ved kjøp i svake markeder, ifølge [Blystad Group](${BLYSTAD_SHIPPING}).`,
      },
      {
        category: "aksjer",
        description: `Blystad har flere ganger brukt børsen som verktøy. Songa Offshore, Saga Tankers, Songa Bulk og Offshore Heavy Transport er blant virksomhetene gruppen har vært med på å bygge eller notere, ifølge [investeringsoversikten](${BLYSTAD_INVESTMENTS}).`,
      },
      {
        category: "selskaper",
        description: `Songa Investments brukes til unoterte investeringer og fond, mens Songa Capital brukes til markedsbaserte verdipapirer. Songa Eiendom har prosjekter innen næringseiendom, boliger og byutvikling.`,
      },
    ],
    decisiveMove:
      "Blystad bygde egne investeringsplattformer rundt eiendelene. Når markedet snudde, kunne han børsnotere selskapet, selge flåten eller slå den sammen med en større aktør og motta både kontanter og aksjer. Dermed ble et vellykket kjøp gjort om til kapital i neste syklus.",
    whatCouldGoWrong: [
      "Shipping kombinerer store prissvingninger med høy gjeld og store faste kostnader.",
      "Kosmos-forsøket viser at aggressiv finansiering kan gi mange år med økonomiske ettervirkninger.",
      "Songa Offshore krevde store kapitalinnskudd og refinansiering da riggmarkedet ble svakere.",
      "Verdien av private skip og selskaper er vanskelig å fastsette før de faktisk selges eller børsnoteres.",
      "Flere shippingsegmenter gir flere inntektskilder, men alle kan rammes samtidig av svak verdenshandel.",
    ],
    mythVsReality: [
      {
        myth: "Arne Blystad startet helt fra null.",
        reality:
          "Han er andre generasjons skipsreder og fikk både bransjekunnskap og nettverk gjennom familien. Samtidig mistet han mye etter Kosmos-forsøket og måtte bygge seg opp på nytt.",
      },
      {
        myth: "Formuen kommer fra ett heldig riggsalg.",
        reality:
          "Riggsalget i 2006 var viktig, men den nåværende formuen bygger på flere tiår med skip, børsnoteringer, sammenslåinger og eiendom.",
      },
      {
        myth: "1,5 milliarder dollar i forvaltede eiendeler er hans private formue.",
        reality:
          "Eiendeler under forvaltning er bruttostørrelsen på gruppens investeringer. Privat nettoformue må også ta hensyn til gjeld, medeierskap og skatt.",
      },
    ],
    personalLessons: [
      "Kompetanse kan overleve selv når kapitalen forsvinner.",
      "Et comeback blir lettere når du beholder nettverk, erfaring og troverdighet.",
      "Sykliske investeringer krever likviditet lenge før markedet ser attraktivt ut.",
      "En investering blir mer verdifull når du på forhånd vet hvordan den kan finansieres, utvikles og realiseres.",
      "Arv eller et godt utgangspunkt forklarer ikke automatisk resultatet etter flere tiår.",
    ],
    sources: [
      {
        label: "Blystad Group: historien",
        url: BLYSTAD_HISTORY,
        tier: "primary",
      },
      {
        label: "Blystad Group: selskapsstruktur og virksomhetsområder",
        url: BLYSTAD_ABOUT,
        tier: "primary",
      },
      {
        label: "Blystad Group: investeringer og nøkkelhendelser",
        url: BLYSTAD_INVESTMENTS,
        tier: "primary",
      },
      {
        label: "Blystad Group: shipping",
        url: BLYSTAD_SHIPPING,
        tier: "primary",
      },
      {
        label: "Star Bulk: styrebiografi",
        url: STAR_BULK_BOARD,
        tier: "secondary",
      },
      {
        label: "Finansavisen: gevinst på riggsalg",
        url: FA_BLYSTAD_RIGG,
        tier: "tertiary",
      },
      {
        label: "Seatrade Maritime: Star Bulk kjøper Songa Bulk-flåten",
        url: SEATRADE_SONGA,
        tier: "tertiary",
      },
      {
        label: "MarineLog: MPC kjøper Songa Container-flåten",
        url: MARINELOG_MPC,
        tier: "tertiary",
      },
      {
        label: "Finansavisen: personprofil og bakgrunn",
        url: FA_BLYSTAD_PROFIL,
        tier: "tertiary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "John Fredriksen", href: "/formuesbyggere/john-fredriksen" },
      { label: "Torstein Hagen", href: "/formuesbyggere/torstein-hagen" },
      { label: "Christen Sveaas", href: "/formuesbyggere/christen-sveaas" },
    ],
  }),

  "gustav-magnar-witzoe": buildFormuesbyggerArticle({
    slug: "gustav-magnar-witzoe",
    seoAngle: "Gustav Magnar Witzøe formue: Arven, SalMar og Kvarv",
    seoTitle: "Gustav Magnar Witzøe formue: Arven, SalMar og Kvarv",
    metaDescription:
      "Gustav Magnar Witzøe arvet eierskapet bak SalMar. Se formuen, Kvarv-strukturen og hvordan han nå går inn i en aktiv eierrolle.",
    seoKeywords: [
      "Gustav Magnar Witzøe formue",
      "Gustav Magnar Witzøe",
      "SalMar",
      "Kvarv",
      "Kverva",
      "lakseoppdrett",
      "Wiski Capital",
    ],
    factCards: [
      {
        label: "Familieanslag",
        value: "ca. 44,3 mrd. kr",
        note: "Kapital 400, 2025",
      },
      {
        label: "Skattbar formue",
        value: "29,9 mrd. kr",
        note: "2024",
      },
      {
        label: "Forbes-estimat",
        value: "ca. 4,5 mrd. USD",
        note: "28. august 2026",
      },
      {
        label: "SalMar-eierskap",
        value: "44,3 %",
        note: "Via Kverva Industrier, Q3 2025",
      },
    ],
    shortAnswer: `Gustav Magnar Witzøes formue kommer først og fremst fra eierskapet i familieselskapet Kvarv, som gjennom Kverva og Kverva Industrier kontrollerer en stor eierpost i SalMar. Han grunnla ikke laksekonsernet. Det gjorde faren Gustav Witzøe i 1991. Verdiene ble overført til sønnen mens han var ung, mens faren lenge beholdt stor stemmekontroll gjennom A-aksjer.

Profilen bør derfor ikke fremstilles som en klassisk gründerhistorie. [Kapital](${E24_WITZOE_SKATT}) anslo skattbar formue til 29,9 milliarder kroner i 2024. Familien regnes samlet til om lag 44,3 milliarder kroner i 2025. [Forbes](${FORBES_WITZOE}) viste rundt 4,5 milliarder dollar 28. august 2026. I januar 2026 tok Gustav Magnar over som daglig leder i [Kvarv](${E24_KVARV_CEO}).`,
    timeline: [
      {
        date: "1991",
        title: "SalMar blir etablert",
        description:
          "Faren Gustav Witzøe var med på å grunnlegge SalMar på Frøya.",
      },
      {
        date: "2006–2013",
        title: "Eierskapet flyttes til neste generasjon",
        description:
          "Mesteparten av familieverdiene ble overført til Gustav Magnar mens han var svært ung.",
      },
      {
        date: "2017",
        title: "Etablerer Wiski Capital",
        description:
          "Witzøe og Øystein R. Skiri etablerte Wiski Capital for investeringer i vekstselskaper.",
      },
      {
        date: "2024",
        title: "Går inn i styret i Kvarv",
        description:
          "Witzøe fikk en mer formell rolle i familieselskapet og starten på et tydeligere generasjonsskifte.",
      },
      {
        date: "2025",
        title: "Kverva eier 44,3 prosent av SalMar",
        description:
          "SalMars rapportering viste at Kverva Industrier var største aksjonær ved utgangen av tredje kvartal.",
      },
      {
        date: "jan. 2026",
        title: "Blir daglig leder i Kvarv",
        description:
          "Witzøe tok over ledelsen av familiens toppselskap. Rollen handler om godt eierskap, ikke detaljstyring.",
      },
    ],
    wealthSources: [
      {
        category: "arv",
        description: `Den klart største delen av formuen er arvet. Gustav Magnar fikk aksjer og økonomisk eierskap, ikke milliarder i kontanter. Verdien beveger seg med SalMar-aksjen og gjelden i eierstrukturen.`,
      },
      {
        category: "aksjer",
        description: `SalMar er hovedmotoren. [Kverva Industrier](${SALMAR_Q3}) eide 44,3 prosent av SalMar ved utgangen av tredje kvartal 2025.`,
      },
      {
        category: "selskaper",
        description: `Familien har brukt Kverva til å investere bredere innen sjømat, industri og kapitalmarkeder. Witzøe har også vært knyttet til oppstartsinvesteringer via [Futurum Ventures](${FUTURUM_WISKI}).`,
      },
    ],
    ownershipVsControl: `1. Gustav Magnar Witzøe eier rundt 97 prosent av aksjene i Kvarv AS.
2. Faren har historisk hatt størstedelen av de stemmeberettigede A-aksjene og dermed sterk kontroll.
3. Kvarv er eier i Kverva AS.
4. Kverva eier gjennom Kverva Industrier AS rundt 44 prosent av børsnoterte SalMar ASA.
5. Kvarv-systemet har i tillegg investeringer utenfor SalMar.

Dette er grunnen til at setningen «Gustav Magnar eier nesten halvparten av SalMar» er forståelig, men upresis. Eierskapet er indirekte og ligger gjennom flere selskapsledd, ifølge [E24](${E24_WITZOE_A_AKSJER}).`,
    decisiveMove:
      "Det avgjørende grepet ble gjort av familien: økonomisk eierskap ble overført tidlig, mens kontroll og kompetanse ble beholdt rundt sønnen. Den nye lederrollen i Kvarv viser en gradvis modell for generasjonsskifte.",
    whatCouldGoWrong: [
      "Lakselus, sykdom, alger og maneter kan redusere både produksjon og lønnsomhet.",
      "Laksepris og valutakurser påvirker resultatene kraftig.",
      "Politiske endringer som grunnrenteskatt kan endre kontantstrøm og verdsettelse.",
      "Stor konsentrasjon i én børsnotert aksje gjør formuen volatil.",
      "Uklart skille mellom økonomisk eierskap og stemmekontroll kan skape misforståelser.",
    ],
    mythVsReality: [
      {
        myth: "Gustav Magnar bygde SalMar.",
        reality:
          "SalMar ble grunnlagt av faren og andre industribyggere før Gustav Magnar var født. Sønnens oppgave er forvaltning og videreutvikling.",
      },
      {
        myth: "Han fikk 44 milliarder kroner på konto.",
        reality:
          "Formuen er et anslag på verdien av aksjer og selskaper. Verdien kan ikke tas ut uten salg, utbytte og skatt.",
      },
      {
        myth: "Han har vært helt passiv.",
        reality:
          "Formuen er arvet, men han har etablert investeringsmiljø, gått inn i styret og fra 2026 tatt over som daglig leder i Kvarv.",
      },
    ],
    personalLessons: [
      "Startkapital og egen verdiskaping må omtales som to forskjellige ting.",
      "Aksjer kan gi stor formue uten at eieren har tilsvarende kontanter tilgjengelig.",
      "Et godt generasjonsskifte overfører ikke bare verdier, men også kunnskap og ansvar.",
      "Eierskap og daglig drift krever forskjellige ferdigheter.",
      "Når én aksje dominerer formuen, bør resten av kapitalen vurderes som risikospredning.",
    ],
    sources: [
      {
        label: "SalMar: selskapsstyring",
        url: SALMAR_GOV,
        tier: "primary",
      },
      {
        label: "SalMar: rapport for tredje kvartal 2025",
        url: SALMAR_Q3,
        tier: "primary",
      },
      {
        label: "Kverva: Gustav Magnar Witzøe",
        url: KVERVA_BOARD,
        tier: "primary",
      },
      {
        label: "Futurum Ventures: historien bak Wiski Capital",
        url: FUTURUM_WISKI,
        tier: "secondary",
      },
      {
        label: "E24: blir daglig leder i Kvarv",
        url: E24_KVARV_CEO,
        tier: "tertiary",
      },
      {
        label: "E24: økonomisk eierskap og A-aksjer",
        url: E24_WITZOE_A_AKSJER,
        tier: "tertiary",
      },
      {
        label: "E24: skattbar formue i 2024",
        url: E24_WITZOE_SKATT,
        tier: "tertiary",
      },
      forbesBillionairesSource(),
      {
        label: "Forbes: Gustav Magnar Witzøe",
        url: FORBES_WITZOE,
        tier: "tertiary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Johan H. Andresen", href: "/formuesbyggere/johan-h-andresen" },
      { label: "Reitan-familien", href: "/formuesbyggere/odd-reitan" },
      { label: "Helene Sundt", href: "/formuesbyggere/helene-sundt" },
    ],
  }),

  "john-fredriksen": buildFormuesbyggerArticle({
    slug: "john-fredriksen",
    seoAngle: "John Fredriksen formue: Fra budgutt til shippingimperium",
    seoTitle: "John Fredriksen formue: Fra budgutt til shippingimperium",
    metaDescription:
      "John Fredriksen bygde en av Norges største formuer gjennom tankskip, børs og oppdrett. Se formuen, selskapene og risikoen bak.",
    seoKeywords: [
      "John Fredriksen formue",
      "John Fredriksen",
      "Frontline",
      "Seadrill",
      "Mowi",
      "Golden Ocean",
      "shippingmagnat",
    ],
    factCards: [
      {
        label: "Anslått formue",
        value: "ca. 262 mrd. kr",
        note: "Kapital 400, 2025",
      },
      {
        label: "Forbes-estimat",
        value: "ca. 22 mrd. USD",
        note: "28. august 2026",
      },
      {
        label: "Født",
        value: "11. mai 1944",
        note: "Startet som bud i skipsmeglerfirma",
      },
      {
        label: "Kjernevirksomheter",
        value: "Tank, rigg, oppdrett",
        note: "Frontline, Seadrill, Mowi m.fl.",
      },
    ],
    shortAnswer: `John Fredriksen bygde formuen gjennom shipping, men ikke bare ved å eie skip. Han tok store posisjoner når markedet var presset, brukte børsnoterte selskaper til å hente kapital og flyttet eiendeler mellom spesialiserte virksomheter. Frontline ble tankmotoren, SFL ble en utleie- og finansieringsplattform, Seadrill ga eksponering mot rigg, og Mowi gjorde lakseoppdrett til en viktig del av porteføljen.

[Kapital](${KAPITAL_FREDRIKSEN}) anslo formuen til 262 milliarder kroner i 2025. [Forbes](${FORBES_FREDRIKSEN}) viste rundt 22 milliarder dollar 28. august 2026. Forskjellen illustrerer at formueanslag ikke er regnskap: kildene kan verdsette private selskaper, familietruster, gjeld og kontrollposter ulikt.`,
    timeline: [
      {
        date: "1961",
        title: "Starter nederst i shippingbransjen",
        description:
          "Fredriksen begynte som bud i et skipsmeglerfirma og tok handelsskole på kveldstid.",
      },
      {
        date: "1970-tallet",
        title: "Bygger egne shippingstrukturer",
        description:
          "Han etablerte egne selskaper og tok posisjoner i en periode med store svingninger i tankmarkedet.",
      },
      {
        date: "1980-tallet",
        title: "Gjennombrudd under Iran–Irak-krigen",
        description:
          "Fredriksen fraktet olje ut av Persiabukta mens skip risikerte rakettangrep. [Reuters](${REUTERS_FREDRIKSEN}) beskriver perioden som sentral for den tidlige formuen.",
      },
      {
        date: "1996–1997",
        title: "Tar kontroll over Frontline",
        description:
          "Hemen Holding, indirekte kontrollert av familietruster, ble majoritetseier i Frontline.",
      },
      {
        date: "2005–2006",
        title: "Bygger Seadrill og kjøper Smedvig",
        description:
          "Fredriksen etablerte Seadrill under oppgangen i offshoremarkedet og kjøpte Smedvig.",
      },
      {
        date: "2017–2022",
        title: "Seadrill gjennom restruktureringer",
        description:
          "Seadrill søkte konkursbeskyttelse og ble restrukturert. Fredriksen beholdt ikke hele den opprinnelige oppsiden.",
      },
      {
        date: "2025",
        title: "Selger Golden Ocean-posten",
        description:
          "Fredriksen solgte rundt 40,8 prosent av Golden Ocean til CMB.TECH for omtrent 1,18 milliarder dollar.",
      },
      {
        date: "2025–2026",
        title: "Frontline og Mowi er fortsatt sentrale",
        description:
          "Hemen-systemet rapporterte 35,6 prosent av Frontline i mars 2026. Geveran var største aksjonær i Mowi.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description: `Frontline er den tydeligste kjernen. Fredriksen har brukt nedgangstider til å kjøpe skip eller aksjer, og sterke markeder til å hente utbytte og refinansiere, ifølge [Frontline](${FRONTLINE_HISTORY}).`,
      },
      {
        category: "aksjer",
        description: `I stedet for ett konglomerat har Fredriksen brukt flere børsnoterte selskaper med hver sin oppgave: tank, gass, rigg, skipsutleie og oppdrett.`,
      },
      {
        category: "selskaper",
        description: `[Mowi](${MOWI_INVESTORS}) gjør historien større enn shipping. Oppdrett gir en annen type kontantstrøm og andre prisdrivere enn tank og offshore.`,
      },
      {
        category: "selskaper",
        description: `Mye av eierskapet ligger gjennom Hemen Holding, Geveran Trading og familietruster. Overskriften «Fredriksen eier» er ofte en forenkling.`,
      },
    ],
    decisiveMove:
      "Fredriksens viktigste grep var å gjøre skip om til skalerbart eierskap. Et børsnotert selskap kan hente milliarder, kjøpe en hel flåte, betale med aksjer og skille ut nye virksomheter. Slik kunne han gjenta strategien i flere markeder uten å finansiere alt privat.",
    whatCouldGoWrong: [
      "Skipene i Persiabukta ble faktisk truffet av raketter. Den tidlige formuen ble bygget med reell fare for mannskap og materiell.",
      "Seadrill viser at høy gjeld og fallende råvarepriser kan ødelegge store aksjonærverdier.",
      "Shippingverdier kan falle raskere enn lånene, noe som kan utløse krav om ny sikkerhet.",
      "Flere selskaper betyr ikke automatisk lav risiko dersom de alle er avhengige av global handel.",
      "Familieeierskap gjennom truster gjør kontroll og privat nettoformue vanskeligere å beregne utenfra.",
    ],
    mythVsReality: [
      {
        myth: "Fredriksen ble rik fordi han alltid kjøpte på bunnen.",
        reality:
          "Han har hatt flere svært gode sykliske kjøp, men også store tap og krevende restruktureringer. Seadrill er det klareste eksempelet.",
      },
      {
        myth: "Hele formuen er shipping.",
        reality:
          "Tank er kjernen, men oppdrett, skipsutleie, gass og finansielle investeringer er også viktige.",
      },
      {
        myth: "262 milliarder kroner står på konto.",
        reality:
          "Formuen består hovedsakelig av aksjer, kontrollposter og private strukturer. Verdien kan endre seg med flere milliarder når børsen beveger seg.",
      },
    ],
    personalLessons: [
      "Eierskap skalerer bedre enn lønn når virksomheten vokser.",
      "Kontanter og lånekapasitet er mest verdifulle når andre må selge.",
      "Høy avkastning og høy risiko kommer ofte fra samme beslutning.",
      "Et godt aktivum kan bli en dårlig investering med for mye gjeld.",
      "Det er mulig å spre seg til flere bransjer uten å gi slipp på området der man har størst kompetanse.",
    ],
    sources: [
      {
        label: "Frontline: selskapets historie",
        url: FRONTLINE_HISTORY,
        tier: "primary",
      },
      {
        label: "Frontline/Hemen: SEC-eiermelding, mars 2026",
        url: FRO_HEMEN,
        tier: "primary",
      },
      {
        label: "Mowi: investormateriale",
        url: MOWI_INVESTORS,
        tier: "primary",
      },
      {
        label: "Mowi: innkalling til generalforsamling 2025",
        url: MOWI_AGM,
        tier: "primary",
      },
      {
        label: "E24: Kapital anslår 262 milliarder kroner",
        url: KAPITAL_FREDRIKSEN,
        tier: "tertiary",
      },
      forbesBillionairesSource(),
      {
        label: "Forbes: John Fredriksen",
        url: FORBES_FREDRIKSEN,
        tier: "tertiary",
      },
      {
        label: "Reuters: shippingmagnaten og tankkrigen",
        url: REUTERS_FREDRIKSEN,
        tier: "tertiary",
      },
      {
        label: "Forbes: shippingprofil og selskapsbygging",
        url: FORBES_HELMAN,
        tier: "tertiary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Arne Blystad", href: "/formuesbyggere/arne-blystad" },
      { label: "Torstein Hagen", href: "/formuesbyggere/torstein-hagen" },
      { label: "Kjell Inge Røkke", href: "/formuesbyggere/kjell-inge-rokke" },
    ],
  }),

  "bjorn-daehlie": buildFormuesbyggerArticle({
    slug: "bjorn-daehlie",
    seoAngle: "Bjørn Dæhlie formue: Fra skikonge til investor",
    seoTitle: "Bjørn Dæhlie formue: Fra skikonge til investor",
    metaDescription:
      "Bjørn Dæhlie gjorde idrettsnavnet om til merkevare, eiendom og investeringer. Se dokumenterte verdier og historien bak formuen.",
    seoKeywords: [
      "Bjørn Dæhlie formue",
      "Bjørn Erlend Dæhlie",
      "Sisa Invest",
      "Dæhlie Sportswear",
      "OL-medaljer",
      "idrettsinvestor",
    ],
    factCards: [
      {
        label: "Bokført egenkapital",
        value: "782,8 mill. kr",
        note: "Sisa Invest, 2025",
      },
      {
        label: "OL-medaljer",
        value: "12 totalt, 8 gull",
        note: "1992–1998",
      },
      {
        label: "Årsresultat 2025",
        value: "35,1 mill. kr",
        note: "Sisa Invest",
      },
      {
        label: "Markedsformue",
        value: "Ikke fastslått",
        note: "Ingen troverdig totalanslag",
      },
    ],
    factCardsNote:
      "Bokført egenkapital i Sisa Invest er ikke det samme som privat nettoformue. Markedsverdier, private eiendeler, skatt og gjeld kan gjøre faktisk nettoformue både høyere og lavere. Vi viser dokumenterte regnskapstall, ikke et anslag på samlet markedsformue.",
    shortAnswer: `Bjørn Dæhlie bygde ikke den store formuen på medaljer alene. Idrettskarrieren skapte navn, troverdighet og sponsorinntekter. Mens han fortsatt var aktiv etablerte han Dæhlie Sportswear. Senere ble kapitalen flyttet videre til eiendom, aksjer og andre investeringer gjennom det heleide selskapet Sisa Invest.

Det finnes ikke et ferskt og etterprøvbart anslag på Dæhlies samlede private markedsformue. [Sisa Invest](${BRREG_SISA}) hadde 782,8 millioner kroner i bokført egenkapital ved utgangen av 2025, ifølge [Børsen](${BORSEN_SISA_2025}). Bokført egenkapital er ikke det samme som privat nettoformue, men viser at virksomheten han eier alene har bygget betydelige verdier.`,
    timeline: [
      {
        date: "19. juni 1967",
        title: "Født",
        description: "Bjørn Erlend Dæhlie ble født 19. juni 1967.",
      },
      {
        date: "1992–1998",
        title: "Blir en av tidenes vinterolympiere",
        description:
          "Dæhlie vant åtte OL-gull og tolv OL-medaljer totalt, ifølge [Olympics.com](${OLYMPICS_DAEHLIE}).",
      },
      {
        date: "1996",
        title: "Etablerer Dæhlie Sportswear",
        description:
          "Klesmerket ble startet mens han fortsatt var på toppen sportslig.",
      },
      {
        date: "1999–2001",
        title: "Skade avslutter karrieren",
        description:
          "En rulleskiulykke ga en ryggskade som til slutt tvang ham til å legge opp.",
      },
      {
        date: "2000",
        title: "Sisa Invest etableres",
        description:
          "Selskapet ble plattformen for investeringer i verdipapirer, eiendom og andre selskaper.",
      },
      {
        date: "2011",
        title: "Sportsmerket blir del av Active Brands",
        description:
          "BJ Sport, selskapet bak Dæhlie-merket, ble kjøpt av det som senere ble Active Brands.",
      },
      {
        date: "2024",
        title: "Svært sterkt investeringsår",
        description:
          "Sisa Invest fikk et årsresultat på 124,5 millioner kroner, ifølge [E24](${E24_SISA_2024}). Egenkapitalen nådde 751,7 millioner.",
      },
      {
        date: "2025",
        title: "Lavere resultat, høyere egenkapital",
        description:
          "Årsresultatet falt til 35,1 millioner kroner, mens egenkapitalen økte til 782,8 millioner.",
      },
    ],
    wealthSources: [
      {
        category: "royalty",
        description: `Skikarrieren skapte startkapitalen og oppmerksomheten. Dæhlies sportslige posisjon gjorde navnet attraktivt for sponsorer og forbrukere.`,
      },
      {
        category: "selskaper",
        description: `Ved å starte [Dæhlie Sportswear](${DAHLIE_BRAND}) før han la opp gikk Dæhlie fra å reklamere for andres produkter til å bygge verdi rundt eget navn.`,
      },
      {
        category: "selskaper",
        description: `Sisa Invest har over tid vært tungt involvert i kjøp, salg og utvikling av eiendom, pluss finansielle investeringer.`,
      },
      {
        category: "aksjer",
        description: `De store utslagene i årsresultatet viser at finansporteføljen nå er en sentral motor i [Sisa Invest](${BRREG_SISA}).`,
      },
    ],
    decisiveMove:
      "Det avgjørende grepet var å kommersialisere navnet mens den sportslige oppmerksomheten var størst, og deretter flytte gevinster og inntekter over i eiendeler som kunne gi avkastning i flere tiår.",
    whatCouldGoWrong: [
      "En alvorlig skade kunne ha avsluttet inntektene før merkevaren og investeringene var etablert.",
      "Et navn på et produkt garanterer ikke lønnsom drift, distribusjon eller god kvalitet.",
      "Eiendomsinvesteringer kan bli presset av renteøkninger, tomgang og refinansiering.",
      "Finansinntekter kan svinge kraftig fra år til år, slik resultatforskjellen mellom 2024 og 2025 viser.",
      "Når en merkevare bærer personens navn, kan omdømmerisiko påvirke virksomheten direkte.",
    ],
    mythVsReality: [
      {
        myth: "Dæhlie ble rik på OL-medaljer.",
        reality:
          "Medaljene skapte markedsverdien rundt navnet. Den langsiktige formuen kom av hva han gjorde med inntektene og oppmerksomheten etterpå.",
      },
      {
        myth: "Dæhlie eier fortsatt hele klesmerket med navnet sitt.",
        reality:
          "Merkevaren er en del av Active Brands, ifølge [FasterSkier](${FASTERSKIER_DAEHLIE}). Navnet lever videre i produktet, men virksomheten er større enn Dæhlies personlige selskap.",
      },
      {
        myth: "782,8 millioner kroner er en eksakt privat formue.",
        reality:
          "Tallet er bokført egenkapital i Sisa Invest. Markedsverdier, private eiendeler, skatt og privat gjeld kan gjøre faktisk nettoformue både høyere og lavere.",
      },
    ],
    personalLessons: [
      "Bruk perioder med høy inntekt til å kjøpe eiendeler som varer lenger enn inntekten.",
      "En personlig merkevare er mest verdifull når den kobles til et produkt eller eierskap.",
      "Det er lettere å ta karriererisiko når privatøkonomien ikke er avhengig av neste konkurranse.",
      "Bokført egenkapital og årlig overskudd må vurderes sammen. Ett sterkt år er ikke en stabil normal.",
      "En exit fra en virksomhet kan frigjøre tid og kapital til nye investeringer.",
    ],
    sources: [
      {
        label: "Olympics.com: Bjørn Dæhlie",
        url: OLYMPICS_DAEHLIE,
        tier: "primary",
      },
      {
        label: "Dæhlie: om merkevaren",
        url: DAHLIE_BRAND,
        tier: "primary",
      },
      {
        label: "Brønnøysundregistrene: Sisa Invest",
        url: BRREG_SISA,
        tier: "primary",
      },
      {
        label: "E24: Sisa Invest i 2024",
        url: E24_SISA_2024,
        tier: "tertiary",
      },
      {
        label: "Børsen: Sisa Invest i 2025",
        url: BORSEN_SISA_2025,
        tier: "tertiary",
      },
      {
        label: "FasterSkier: Dæhlie-merket og Active Brands",
        url: FASTERSKIER_DAEHLIE,
        tier: "tertiary",
      },
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Petter Northug", href: "/formuesbyggere/petter-northug" },
      { label: "Erling Braut Haaland", href: "/formuesbyggere/erling-haaland" },
      { label: "Michael Jordan", href: "/formuesbyggere/michael-jordan" },
    ],
  }),

  "petter-northug": buildFormuesbyggerArticle({
    slug: "petter-northug",
    seoAngle: "Petter Northug formue: Selskaper etter skikarrieren",
    seoTitle: "Petter Northug formue: Selskaper etter skikarrieren",
    metaDescription:
      "Petter Northug tjener penger på merkevare, TV, skilag og investeringer. Se formuen, selskapene og risikoen bak Northug-navnet.",
    seoKeywords: [
      "Petter Northug formue",
      "Petter Northug",
      "Northug AS",
      "Team Northug",
      "Petter Northug Holding",
      "langrenn",
    ],
    factCards: [
      {
        label: "Skattbar formue",
        value: "over 12 mill. kr",
        note: "2024",
      },
      {
        label: "Bokført egenkapital",
        value: "22,5 mill. kr",
        note: "Petter Northug Holding, 2025",
      },
      {
        label: "VM-gull",
        value: "13",
        note: "Langrenn, 2007–2015",
      },
      {
        label: "Markedsformue",
        value: "Ikke fastslått",
        note: "Ingen komplett totalanslag",
      },
    ],
    factCardsNote:
      "Skattbar formue og bokført egenkapital i holdingselskapet er ikke det samme som samlet markedsformue. Unoterte selskaper, bolig, gjeld og andre eiendeler kan være verdsatt annerledes enn i skattelistene eller regnskapet.",
    shortAnswer: `Petter Northug har bygget økonomien etter skikarrieren rundt sitt eget navn. Det heleide [Petter Northug Holding](${BRREG_NORTHUG_HOLDING}) eier og finansierer virksomheter knyttet til merkevaren Northug, arrangementer og Team Northug. I tillegg kommer mediearbeid, sponsoravtaler og investeringer.

Northug hadde over 12 millioner kroner i skattbar formue i 2024. Holdingselskapet hadde 22,5 millioner kroner i bokført egenkapital ved utgangen av 2025, ifølge [Proff](${PROFF_NORTHUG_HOLDING}). Ingen av tallene er en komplett markedsverdi på alt han eier.`,
    timeline: [
      {
        date: "6. jan. 1986",
        title: "Født",
        description: "Petter Northug jr. ble født 6. januar 1986.",
      },
      {
        date: "2005–2006",
        title: "Sportslig gjennombrudd",
        description:
          "Northug ble den første langrennsjunioren som vant fem individuelle junior-VM-gull.",
      },
      {
        date: "2007–2015",
        title: "Bygger en av langrennssportens sterkeste profiler",
        description:
          "Han vant 13 VM-gull, to OL-gull og verdenscupen sammenlagt to ganger, ifølge [FIS](${FIS_NORTHUG}).",
      },
      {
        date: "2011",
        title: "Etablerer holdingselskap",
        description:
          "Petter Northug Holding og selskapet bak Northug-merkevaren ble etablert mens han fortsatt var aktiv.",
      },
      {
        date: "2018",
        title: "Legger opp",
        description:
          "Da konkurransekarrieren tok slutt, kunne inntektene fortsette gjennom TV, sponsorater og arrangementer.",
      },
      {
        date: "2020",
        title: "Omdømmekrise rammer sponsorinntektene",
        description:
          "Etter dom for blant annet råkjøring avsluttet Uno-X sponsoravtalen, ifølge [E24](${E24_NORTHUG_SPONSOR}).",
      },
      {
        date: "2025",
        title: "Flere inntektsmotorer gir overskudd",
        description:
          "Petter Northug Holding fikk et årsresultat på 2,25 millioner kroner. Team Northug snudde underskudd til overskudd på rundt 3,4 millioner.",
      },
    ],
    wealthSources: [
      {
        category: "royalty",
        description: `Sportsresultatene skapte navnet. Sponsoravtaler, TV-jobber og personlige oppdrag gjør oppmerksomheten om til løpende inntekter.`,
      },
      {
        category: "selskaper",
        description: `[Northug AS](${PROFF_NORTHUG_AS}) står bak merkevaren Northug og salg av klær og sportsbriller.`,
      },
      {
        category: "selskaper",
        description: `Team Northug kombinerer idrett, sponsorinntekter, medieprofiler og innhold. I 2025 ble dette den sterkeste resultatmotoren blant datterselskapene.`,
      },
      {
        category: "aksjer",
        description: `Regnskapet for 2025 viste nær 13 millioner kroner i kryptovaluta gjennom holdingselskapet, ifølge [E24](${E24_NORTHUG_KRYPTO}).`,
      },
    ],
    ownershipVsControl: `**Petter Northug Holding AS** er det heleide toppselskapet som samler eierpostene og investeringene. I 2025 hadde selskapet 34,3 millioner kroner i eiendeler og 22,5 millioner kroner i egenkapital.

**Northug AS** står bak merkevaren Northug og salg av klær og sportsbriller. Merkevaren gjør at navnet kan tjene penger gjennom produkter, ikke bare personlige oppdrag.

**Team Northug AS** kombinerer idrett, sponsorinntekter, medieprofiler og innhold. I 2025 ble dette den sterkeste resultatmotoren blant de omtalte datterselskapene.

**Northug Event AS** arbeider med utvikling, markedsføring og engroshandel av sportsprodukter.`,
    decisiveMove:
      "Northugs avgjørende grep var å beholde kontroll over den kommersielle identiteten sin. Han bygde selskaper rundt navnet, produktene og et eget lag, slik at samme profil kan skape inntekter gjennom flere kanaler.",
    whatCouldGoWrong: [
      "Omdømmekrisen i 2020 viste at sponsoravtaler kan forsvinne raskt.",
      "Et personnavn som merkevare gjør hele virksomheten avhengig av én persons omdømme.",
      "Kles- og brillesalg har lager-, mote- og marginrisiko.",
      "Skilag er avhengige av sponsorer og kontinuerlig oppmerksomhet.",
      "Nær 13 millioner kroner i krypto er en konsentrert og volatil plassering.",
    ],
    mythVsReality: [
      {
        myth: "Northug lever bare av gamle sponsorinntekter.",
        reality:
          "Dagens inntekter kommer fra holdingselskap, produkter, TV, skilag, arrangementer og investeringer.",
      },
      {
        myth: "Northug-merkevaren er en enorm pengemaskin.",
        reality:
          "Northug AS var lønnsomt i 2025, men overskuddet var rundt 950.000 kroner. Team Northug leverte et større resultat samme år.",
      },
      {
        myth: "Skattbar formue viser alt han eier.",
        reality:
          "Skattelisten bruker skattemessige verdier. Unoterte selskaper, bolig og gjeld kan være verdsatt annerledes enn i markedet.",
      },
    ],
    personalLessons: [
      "Bygg flere inntektskilder mens hovedkarrieren fortsatt gir oppmerksomhet.",
      "Et holdingselskap skaper oversikt, men gjør ikke risikable investeringer mindre risikable.",
      "Omdømme er en økonomisk eiendel når inntektene er knyttet til navnet ditt.",
      "Produktinntekter og sponsorinntekter har helt forskjellige kostnader og risiko.",
      "En liten lønnsom virksomhet kan være mer robust enn en stor virksomhet med svak margin.",
    ],
    sources: [
      {
        label: "FIS: Petter Northug",
        url: FIS_NORTHUG,
        tier: "primary",
      },
      {
        label: "Olympics.com: Petter Northug",
        url: OLYMPICS_NORTHUG,
        tier: "primary",
      },
      {
        label: "Brønnøysundregistrene: Petter Northug Holding",
        url: BRREG_NORTHUG_HOLDING,
        tier: "primary",
      },
      {
        label: "E24: regnskap, krypto og datterselskaper i 2025",
        url: E24_NORTHUG_KRYPTO,
        tier: "tertiary",
      },
      {
        label: "Proff: Petter Northug Holding 2025",
        url: PROFF_NORTHUG_HOLDING,
        tier: "tertiary",
      },
      {
        label: "Proff: Northug AS",
        url: PROFF_NORTHUG_AS,
        tier: "tertiary",
      },
      {
        label: "E24: sponsoravtale avsluttet etter omdømmekrise",
        url: E24_NORTHUG_SPONSOR,
        tier: "tertiary",
      },
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Bjørn Dæhlie", href: "/formuesbyggere/bjorn-daehlie" },
      { label: "Erling Braut Haaland", href: "/formuesbyggere/erling-haaland" },
      { label: "Cristiano Ronaldo", href: "/formuesbyggere/cristiano-ronaldo" },
    ],
  }),

  "alan-walker": buildFormuesbyggerArticle({
    slug: "alan-walker",
    seoAngle: "Alan Walker formue: Bak 100 milliarder streams",
    seoTitle: "Alan Walker formue: Bak 100 milliarder streams",
    metaDescription:
      "Alan Walker har bygget en omfattende selskapsstruktur rundt musikk, konserter og rettigheter. Se inntektene og selskapene bak.",
    seoKeywords: [
      "Alan Walker formue",
      "Alan Walker",
      "World of Walker",
      "Alan Walker AS",
      "musikkrettigheter",
      "Faded",
    ],
    factCards: [
      {
        label: "Bokført egenkapital",
        value: "96,7 mill. kr",
        note: "Alan Walker AS, 2025",
      },
      {
        label: "Konsernomsetning",
        value: "224,2 mill. kr",
        note: "World of Walker, 2025",
      },
      {
        label: "Utbytte 2025",
        value: "ca. 40 mill. kr",
        note: "Alan Walker AS",
      },
      {
        label: "Markedsformue",
        value: "Ikke fastslått",
        note: "Ingen komplett totalanslag",
      },
    ],
    factCardsNote:
      "Bokført egenkapital, konsernomsetning og utbytte er ulike størrelser og utgjør ikke alene en komplett privat nettoformue. Strømminger, rettighetsfordelinger og skatt gjør at inntektene ikke kan omregnes direkte til formue.",
    shortAnswer: `Alan Walker tjener ikke bare penger når noen strømmer «Faded». Inntektene er fordelt på konserter, musikk, publisering, rettigheter, merkevare og samarbeid. Disse aktivitetene er organisert i en selskapsstruktur med [Alan Walker AS](${PROFF_WALKER_AS}) som hans personlige selskap og World of Walker som et felles konsern med manager Gunnar Greve.

I 2025 omsatte World of Walker-konsernet for 224,2 millioner kroner og fikk et årsresultat på 25,7 millioner, ifølge [E24](${E24_WALKER_2025}). Alan Walker AS omsatte for 33 millioner, fikk et årsresultat på 21,9 millioner og hadde 96,7 millioner i egenkapital. Walker tok samtidig ut rundt 40 millioner kroner i utbytte.`,
    timeline: [
      {
        date: "24. aug. 1997",
        title: "Født",
        description: "Alan Olav Walker ble født 24. august 1997.",
      },
      {
        date: "2012–2014",
        title: "Lærer musikkproduksjon og publiserer på nett",
        description:
          "Walker lærte produksjon gjennom videoer og digitale fellesskap. Låten «Fade» spredte seg i spillvideoer og nettinnhold.",
      },
      {
        date: "2015",
        title: "«Faded» blir det globale gjennombruddet",
        description:
          "Etter avtale med MER/Sony ble «Fade» videreutviklet til «Faded» med vokal, ifølge [Sony Music](${SONY_WALKER}).",
      },
      {
        date: "2016–2023",
        title: "Bygger katalog, turné og visuell identitet",
        description:
          "Masken, hettegenseren og Walker-universet gjorde prosjektet gjenkjennelig internasjonalt.",
      },
      {
        date: "2022",
        title: "Svært høyt overskudd",
        description:
          "Finansavisen omtalte et samlet overskudd på over 210 millioner kroner i Walker-systemet, ifølge [FA](${FA_WALKER_2022}).",
      },
      {
        date: "2024",
        title: "World of Walker blir nytt felles toppselskap",
        description:
          "Walker og manager Gunnar Greve samlet mer av aktiviteten i et felles konsern eid 50/50.",
      },
      {
        date: "2025",
        title: "Konsernet vokser til 224,2 millioner i omsetning",
        description:
          "Inntektene økte, selv om årsresultatet falt fra 2024. Alan Walker AS betalte utbytte større enn årets resultat.",
      },
      {
        date: "2026",
        title: "Passerer 100 milliarder strømminger",
        description:
          "Walkers offisielle nettsted og E24 oppgir at musikken har passert 100 milliarder lyd- og videostrømminger.",
      },
    ],
    wealthSources: [
      {
        category: "royalty",
        description: `Strømming og musikkrettigheter gir inntekter fra masterrettigheter, låtskriverandeler, publisering, video og lisensiering.`,
      },
      {
        category: "royalty",
        description: `Livevirksomheten kan gi langt mer inntekt per fan enn strømming, men har også store kostnader til produksjon og reise.`,
      },
      {
        category: "selskaper",
        description: `[World of Walker](${WOW_SITE}) er mer enn et artistnavn. Det er et konsern med egne selskaper for live, musikk, publisering, merkevarer og internasjonal aktivitet.`,
      },
      {
        category: "aksjer",
        description: `[Alan Walker AS](${PROFF_WALKER_AS}) har over flere år fått betydelige finansinntekter. Deler av artistinntektene er beholdt og investert.`,
      },
    ],
    ownershipVsControl: `**Alan Walker AS** er heleid av Alan Walker. Det fungerer som hans personlige topp- og investeringsselskap, mottar inntekter og eier halvparten av World of Walker.

**World of Walker AS** eies 50/50 av Walker- og Greve-systemet. Konsernet samler den operative virksomheten og holder ulike inntekter, rettigheter og risikoer adskilt.

**Datterselskapene** omfatter blant annet World of Walker Live AS (konserter), World of Walker Music AS, World of Walker Publishing AS, World of Walker Continental AS, World of Walker Brands AS og Walkercon AS. Konsernregnskapet brukes for å vise helheten uten dobbelttelling av interne handler.`,
    decisiveMove:
      "Det avgjørende grepet var å gjøre en hit om til et univers som kunne bære flere produkter og inntekter. «Faded» ga oppmerksomheten. Walker-identiteten, katalogen, konsertene og selskapsstrukturen gjorde oppmerksomheten om til en virksomhet som fortsatt tjener store penger mer enn ti år senere.",
    whatCouldGoWrong: [
      "Én viral låt kunne ha blitt et kortvarig fenomen uten en sterk oppfølgerstrategi.",
      "Konsertinntekter kan forsvinne ved pandemi, sykdom eller avlysninger.",
      "Musikkrettigheter er kompliserte, og mange opphavere betyr at inntektene skal fordeles.",
      "Et 50/50-eierskap krever klare avtaler dersom artist og manager senere er uenige.",
      "Utbytte over årets resultat reduserer kapitalbufferen i det personlige selskapet.",
    ],
    mythVsReality: [
      {
        myth: "Alan Walker får hele inntekten hver gang «Faded» spilles.",
        reality:
          "Plattform, plateselskap, utgivere, låtskrivere, produsenter og andre rettighetshavere kan ha krav på hver sin andel.",
      },
      {
        myth: "World of Walker er bare et kreativt navn.",
        reality:
          "Det er også et faktisk konsern med egne selskaper for live, musikk, publisering, merkevarer og internasjonal aktivitet.",
      },
      {
        myth: "100 milliarder strømminger kan omregnes direkte til formue.",
        reality:
          "Strømminger skjer på ulike plattformer, med ulike satser og rettighetsfordelinger. Omsetning, kostnader, eierskap og skatt avgjør hva som blir igjen.",
      },
    ],
    personalLessons: [
      "En digital suksess blir mer varig når den kobles til en identitet og et fellesskap.",
      "Skill inntektskilder og risiko i egne selskaper når virksomheten blir stor nok.",
      "En rådgiver kan være med på å skape verdier, men eierandel og insentiver må avtales tydelig.",
      "Behold deler av ekstraordinært gode inntekter som kapital for svakere år.",
      "Omsetning og følgertall er mindre viktige enn hvor mye virksomheten faktisk sitter igjen med.",
    ],
    sources: [
      {
        label: "Alan Walker: offisielt nettsted",
        url: ALANWALKER_SITE,
        tier: "primary",
      },
      {
        label: "World of Walker: offisielt nettsted",
        url: WOW_SITE,
        tier: "primary",
      },
      {
        label: "Sony Music: Alan Walker",
        url: SONY_WALKER,
        tier: "primary",
      },
      {
        label: "Proff: Alan Walker AS",
        url: PROFF_WALKER_AS,
        tier: "primary",
      },
      {
        label: "Proff: World of Walker AS",
        url: PROFF_WOW,
        tier: "primary",
      },
      {
        label: "E24: 2025-regnskap og konsernstruktur",
        url: E24_WALKER_2025,
        tier: "tertiary",
      },
      {
        label: "Finansavisen: seks selskaper i World of Walker",
        url: FA_WOW_2026,
        tier: "tertiary",
      },
      {
        label: "Finansavisen: 2024-regnskap og eierstruktur",
        url: FA_WALKER_2024,
        tier: "tertiary",
      },
      {
        label: "Finansavisen: resultatet på 210,7 millioner kroner i 2022",
        url: FA_WALKER_2022,
        tier: "tertiary",
      },
      {
        label: "Wired: fra nettutgivelse til Sony og global hit",
        url: WIRED_WALKER,
        tier: "tertiary",
      },
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Kygo", href: "/formuesbyggere/kygo" },
      { label: "Rihanna", href: "/formuesbyggere/rihanna" },
      { label: "Taylor Swift", href: "/formuesbyggere/taylor-swift" },
      { label: "Magnus Midtbø", href: "/formuesbyggere/magnus-midtbo" },
    ],
  }),

  "magnus-midtbo": buildFormuesbyggerArticle({
    slug: "magnus-midtbo",
    seoAngle: "Magnus Midtbø formue: Fra klatrer til YouTube-stjerne",
    seoTitle: "Magnus Midtbø formue: Fra klatrer til YouTube-stjerne",
    metaDescription:
      "Magnus Midtbø gikk fra toppklatring til en av Norges største YouTube-kanaler og Rúngne. Se inntektene, eierskapet og strategien.",
    seoKeywords: [
      "Magnus Midtbø formue",
      "Magnus Midtbø",
      "Midtbø Invest",
      "Rúngne",
      "YouTube klatring",
      "klatremerke",
    ],
    factCards: [
      {
        label: "Bokført egenkapital",
        value: "16,8 mill. kr",
        note: "Midtbø Invest, 2025",
      },
      {
        label: "Rúngne-eierskap",
        value: "66,95 %",
        note: "Via Midtbø Invest, 2025",
      },
      {
        label: "YouTube-abonnenter",
        value: "ca. 3,64 mill.",
        note: "August 2026",
      },
      {
        label: "Markedsformue",
        value: "Ikke fastslått",
        note: "Ingen komplett totalanslag",
      },
    ],
    factCardsNote:
      "Bokført egenkapital i Midtbø Invest og eierandelen i Rúngne er dokumenterte regnskapstall, ikke en komplett privat nettoformue. Unoterte aksjer, bolig, gjeld og andre eiendeler kan gjøre faktisk nettoformue både høyere og lavere.",
    shortAnswer: `Magnus Midtbø tjente ikke den største kapitalen som konkurranseklatrer. Han bygde den ved å gjøre ekspertisen sin forståelig og underholdende for et globalt YouTube-publikum. Kanalen hadde rundt 3,64 millioner abonnenter i august 2026 og er blant de aller største persondrevne norske kanalene utenfor musikkartistene.

YouTube-inntektene er samlet i [Midtbø Invest](${PROFF_MIDTBO_INVEST}), som i 2025 omsatte for 15 millioner kroner, fikk et årsresultat på 5,9 millioner og hadde 16,8 millioner i egenkapital, ifølge [Finansavisen](${FA_MIDTBO_2025}). Selskapet eide samtidig 66,95 prosent av klatremerket [Rúngne Apparel](${PROFF_RUNGNE}).`,
    timeline: [
      {
        date: "18. sep. 1988",
        title: "Født",
        description: "Magnus Rognan Midtbø ble født 18. september 1988.",
      },
      {
        date: "2000",
        title: "Begynner å klatre",
        description:
          "Midtbø startet som elleve–tolvåring og vant raskt nasjonale ungdomskonkurranser.",
      },
      {
        date: "2005",
        title: "Juniorverdensmester",
        description:
          "Han vant junior-VM i ledklatring og etablerte seg som et internasjonalt talent, ifølge [World Climbing](${WORLD_CLIMBING}).",
      },
      {
        date: "2011",
        title: "Oppretter YouTube-kanalen",
        description:
          "Kanalen vokste rundt klatring, trening og reiser. Engelsk språk gjorde at nisjen kunne skaleres langt utenfor Norge.",
      },
      {
        date: "2017",
        title: "Avslutter konkurransekarrieren",
        description:
          "I stedet for at synligheten forsvant etter idretten, ble YouTube den nye hovedarenaen.",
      },
      {
        date: "2019",
        title: "Etablerer Rúngne Apparel",
        description:
          "Midtbø gikk fra å reklamere for utstyr til å eie mer av produktet og kundereisen selv.",
      },
      {
        date: "2024–2025",
        title: "Rúngne vokser kraftig",
        description:
          "Rúngne omsatte for 46,9 millioner kroner i 2024. I 2025 ble selskapet omtalt med en verdsettelse på 100 millioner kroner, ifølge [DN](${DN_RUNGNE}).",
      },
      {
        date: "aug. 2026",
        title: "Medieselskapet blir stadig sterkere",
        description:
          "Midtbø Invest økte omsetningen fra 9,4 millioner i 2024 til 15 millioner i 2025. YouTube viste over 700 millioner visninger.",
      },
    ],
    wealthSources: [
      {
        category: "royalty",
        description: `[YouTube](${YOUTUBE_MIDTBO}) gir annonseinntekter og gjør Midtbø attraktiv for sponsorer. Den største verdien er distribusjonen til millioner av relevante kunder.`,
      },
      {
        category: "royalty",
        description: `Videoene kan integrere produkter og merkevarer, men Midtbø har også brukt kanalen til å løfte eget selskap.`,
      },
      {
        category: "selskaper",
        description: `[Rúngne](${RUNGNE_MIDTBO}) gjør publikum om til kunder. Midtbø eier en majoritet av selskapet som lager produktene.`,
      },
      {
        category: "selskaper",
        description: `Midtbø Invest har eierposter i blant annet Oslo Klatresenter, Adrenalin Norge, Høyt & Lavt Gruppen og Optim Performance.`,
      },
    ],
    ownershipVsControl: `**Midtbø Invest AS** er det heleide selskapet som mottar inntekter fra video, samarbeid og andre aktiviteter, og fungerer samtidig som investeringsselskap. Driftsmarginen var svært høy i 2025 fordi digitalt innhold kan skaleres uten tilsvarende varekostnad.

**Rúngne Apparel AS** eies 66,95 prosent av Midtbø Invest. Rúngne selger klær, kalk og klatreutstyr. Produktselskapet har høyere omsetning enn medieselskapet, men langt lavere margin.

**Andre eierposter** inkluderer Hltf Eiendom, Oslo Klatresenter, Adrenalin Norge, Venga Holding, Høyt & Lavt Gruppen og Optim Performance. Dette gjør profilen til mer enn «YouTuber med merch».`,
    decisiveMove:
      "Det avgjørende grepet var å velge et globalt marked. Klatring er en liten norsk nisje, men en stor internasjonal nisje. Ved å lage engelskspråklige videoer og utvide fra rene klatreprestasjoner kunne Midtbø nå langt flere enn aktive klatrere. Det neste grepet var å bruke publikum til å bygge et produkt han selv eier.",
    whatCouldGoWrong: [
      "Algoritmeendringer kan redusere rekkevidden uten forvarsel.",
      "Kanalen er tett knyttet til Midtbøs person, helse og evne til å produsere nye videoer.",
      "Et internasjonalt publikum gir valuta-, toll- og logistikkrisiko.",
      "Rúngne måtte hente ekstra kapital i 2026 etter tollproblemer, ifølge [Finansavisen](${FA_RUNGNE_TOLL}).",
      "Klær og utstyr binder kapital i lager og kan få svakere margin enn digitalt innhold.",
    ],
    mythVsReality: [
      {
        myth: "Midtbø lever av premiepenger fra klatring.",
        reality:
          "Toppklatringen skapte kompetansen og historien. Den dokumenterte inntjeningen kommer nå hovedsakelig gjennom medievirksomhet, samarbeid, produkter og eierskap.",
      },
      {
        myth: "YouTube er bare markedsføring for Rúngne.",
        reality:
          "Midtbø Invest er en svært lønnsom virksomhet i seg selv. I 2025 hadde selskapet 15 millioner i omsetning og 11,7 millioner i driftsresultat.",
      },
      {
        myth: "Høy omsetning betyr at Rúngne tjener mer enn YouTube-kanalen.",
        reality:
          "Rúngne omsatte for 46,9 millioner i 2024, men satt igjen med 1,23 millioner. Medieselskapet hadde langt lavere omsetning, men betydelig høyere resultat.",
      },
    ],
    personalLessons: [
      "En liten nisje kan være stor nok dersom markedet er globalt.",
      "Ekspertise blir mer verdifull når den kan forklares og pakkes som innhold.",
      "Digitalt innhold kan ha høy margin, mens fysiske produkter kan bygge større omsetning og eierverdi.",
      "Publikum er distribusjon. Distribusjon kan brukes til å bygge egne produkter, ikke bare selge reklame.",
      "Invester helst i områder du forstår, men pass på at hele økonomien ikke blir avhengig av samme miljø.",
    ],
    sources: [
      {
        label: "World Climbing: Magnus Midtbø",
        url: WORLD_CLIMBING,
        tier: "primary",
      },
      {
        label: "Magnus Midtbø på YouTube",
        url: YOUTUBE_MIDTBO,
        tier: "primary",
      },
      {
        label: "Rúngne: Magnus Midtbø",
        url: RUNGNE_MIDTBO,
        tier: "primary",
      },
      {
        label: "Proff: Midtbø Invest",
        url: PROFF_MIDTBO_INVEST,
        tier: "primary",
      },
      {
        label: "Proff: Midtbø Invest eierdata",
        url: PROFF_MIDTBO_EIER,
        tier: "primary",
      },
      {
        label: "Finansavisen: YouTube-inntekter og Rúngne i 2025",
        url: FA_MIDTBO_2025,
        tier: "tertiary",
      },
      {
        label: "Dagens Næringsliv: Rúngne verdsettelse på 100 millioner",
        url: DN_RUNGNE,
        tier: "tertiary",
      },
      {
        label: "Finansavisen: tollproblemer og kapitalbehov i 2026",
        url: FA_RUNGNE_TOLL,
        tier: "tertiary",
      },
      {
        label: "Proff: Rúngne Apparel",
        url: PROFF_RUNGNE,
        tier: "tertiary",
      },
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Alan Walker", href: "/formuesbyggere/alan-walker" },
      { label: "Petter Northug", href: "/formuesbyggere/petter-northug" },
      { label: "Erling Braut Haaland", href: "/formuesbyggere/erling-haaland" },
    ],
  }),
};
