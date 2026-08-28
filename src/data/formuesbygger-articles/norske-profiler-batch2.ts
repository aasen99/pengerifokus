import { buildFormuesbyggerArticle } from "./helpers";
import { kapital400Source } from "./source-tiers";
import { heleneSundtArticle } from "./helene-sundt";

export const norskeProfilerBatch2 = {
  "torstein-hagen": buildFormuesbyggerArticle({
    slug: "torstein-hagen",
    seoAngle: "Hvordan bygde Torstein Hagen cruiseformuen?",
    shortAnswer:
      "Torstein Hagen bygde formue gjennom shipping, offshore og cruise over flere tiår, fra Kloster-miljøet til Norwegian og Viking Cruises. Formuen sitter i eierskap av cruise- og maritimselskaper, ikke i lønn. Viking Holdings er børsnotert på NYSE, men Hagen beholder kontroll via doble aksjeklasser der special shares gir ti stemmer per aksje. Cruise og shipping er sykliske bransjer, så formuesverdien svinger kraftig med børs og fraktmarkeder. Mønsteret er maritim gründerdrift: bygge i nedgang, tåle volatilitet, og la børsverdien reflektere oppgang.",
    timeline: [
      {
        date: "1960–1980-tallet",
        title: "Shipping og Kloster",
        description:
          "Hagen startet i shipping og bygde erfaring i Kloster-miljøet, som ble grunnlaget for senere maritim karriere.",
      },
      {
        date: "1993",
        title: "Norwegian Air Shuttle",
        description:
          "Hagen var med på å etablere Norwegian, som senere ble en av Europas største lavprisflyselskaper.",
      },
      {
        date: "1997",
        title: "Viking Cruises grunnlegges",
        description:
          "Hagen grunnla Viking Cruises og bygde selskapet til en global premium-cruiseaktør over to tiår.",
      },
      {
        date: "2024",
        title: "Viking Holdings børsnoteres",
        description:
          "Viking Holdings ble notert på NYSE under tickeren VIK, med doble aksjeklasser som sikret grunnleggerkontroll.",
      },
      {
        date: "2025",
        title: "87 % stemmerett via special shares",
        description:
          "Ifølge SEC-prospektet holdt hovedaksjonæren omtrent 87 % av stemmene gjennom special shares med ti stemmer per aksje.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "Eierskap i Viking Holdings og relaterte cruise- og maritimselskaper, hovedkilden til formuen.",
      },
      {
        category: "aksjer",
        description:
          "Børsnoterte og unoterte aksjer i shipping, offshore og cruise, med konsentrert eksponering mot maritim sektor.",
      },
    ],
    ownershipVsControl:
      "Viking Holdings har doble aksjeklasser: ordinary shares gir én stemme, special shares gir ti stemmer. Ifølge SEC-prospektet kontrollerer hovedaksjonæren omtrent 87 % av stemmene, langt mer enn den økonomiske andelen tilsier. Børsnotering ga kapital og likviditet uten at grunnleggeren mistet styring.",
    decisiveMove:
      "Børsnoteringen av Viking Holdings i 2024 med dual-class aksjestruktur, Hagen hentet kapital fra markedet, men beholdt kontroll via special shares med ti stemmer per aksje.",
    whatCouldGoWrong: [
      "Cruisebransjen er ekstremt syklisk, pandemi, konjunktur og reiseadferd kan kollapse inntektene over natten.",
      "Konsentrert eierskap i én bransje gir ingen naturlig diversifisering når shipping og cruise synker samtidig.",
      "Høy gjeld i maritim sektor forsterker nedganger, rente og refinansiering kan presse egenkapitalen.",
      "Dual-class strukturer kan miste verdi hvis markedet straffer gründerkontroll med lavere multipler.",
    ],
    mythVsReality: [
      {
        myth: "Børsnotering betyr at grunnleggeren har solgt ut og mistet kontroll.",
        reality:
          "Hagen noterte Viking på NYSE, men beholdt omtrent 87 % av stemmene via special shares, listing er kapital, ikke avskjed med styring.",
      },
      {
        myth: "Formuen er bygget på én smart investering i cruise.",
        reality:
          "Karrieren strekker seg over shipping, offshore, fly og cruise over femti år, cruise var et langt løp, ikke et enkeltspill.",
      },
    ],
    personalLessons: [
      "Børsnotering og kontroll kan sameksistere når aksjeklassene er riktig utformet.",
      "Én bransje kan utvikles fra tradisjonell shipping til global cruise, men krever tiår, ikke kvartaler.",
      "Sykliske bransjer belønner dem som overlever nedganger med buffer og finansiering.",
      "Konsentrert maritim eksponering gir enorm oppside i oppgang, men brutal volatilitet i nedgang.",
    ],
    sources: [
      {
        label: "Viking Holdings: SEC-prospekt (dual-class)",
        url: "https://www.sec.gov/Archives/edgar/data/1745201/000119312524129359/d496227d424b4.htm",
        tier: "primary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "John Fredriksen", href: "/formuesbyggere/john-fredriksen" },
      { label: "Nettoformue i ordboken", href: "/ordbok/nettoformue" },
    ],
  }),

  "christen-sveaas": buildFormuesbyggerArticle({
    slug: "christen-sveaas",
    seoAngle: "Hva kan vi lære av Christen Sveaas?",
    shortAnswer:
      "Christen Sveaas bygde formue gjennom aktivt industrielt eierskap via Kistefos AS, et investeringsselskap han etablerte i 1998. Strategien har vært å kjøpe industriselskaper, utvikle dem operativt og eie over lang tid, ofte tiår, ikke kvartaler. Kistefos investerer i shipping, offshore, finans, teknologi og eiendom med aktivt eierskap. Det skiller seg fra hedgefond og passiv indeks: formuen sitter i direkte industrielle eierskap, ikke i forvaltningshonorarer. Sveaas er også kjent for Kistefos Museum og filantropi innen kunst og utdanning.",
    timeline: [
      {
        date: "1980–1990-tallet",
        title: "Karriere i Aker og shipping",
        description:
          "Sveaas bygde erfaring i Aker og shipping, blant annet som styremedlem i Tschudi & Eitzen og Orkla.",
      },
      {
        date: "1998",
        title: "Kistefos AS etableres",
        description:
          "Sveaas samlet investeringsselskapene sine i Kistefos AS, et familieeid investeringshus med aktivt eierskap.",
      },
      {
        date: "1990",
        title: "ASAF stiftelsen",
        description:
          "Anders Sveaas' Almennyttige Fond ble opprettet som filantropisk plattform for kunst, kultur og sosiale formål.",
      },
      {
        date: "2019",
        title: "Kunststiftelsen grunnlegges",
        description:
          "Christen Sveaas' Kunststiftelse mottok hundrevis av kunstverk fra hans private samling for offentlig tilgjengeliggjøring.",
      },
      {
        date: "2025",
        title: "Diversifisert industrieierskap",
        description:
          "Kistefos forvalter en bred portefølje med langsiktig, aktivt eierskap i europeiske industriselskaper.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "Eierskap i industriselskaper via Kistefos AS, shipping, offshore, finans, teknologi og eiendom.",
      },
      {
        category: "aksjer",
        description:
          "Børsnoterte og unoterte aksjeposisjoner i porteføljeselskaper, forvaltet med lang holdperiode.",
      },
    ],
    decisiveMove:
      "Etableringen av Kistefos AS i 1998, Sveaas samlet alle investeringene i ett hus og gikk fra enkeltinvesteringer til systematisk, langsiktig industrielt eierskap med aktiv utvikling av porteføljeselskapene.",
    whatCouldGoWrong: [
      "Industrielt eierskap er illikvid, det tar år å realisere verdi, og feil selskap kan binde kapital lenge.",
      "Aktivt eierskap krever operativ kompetanse; feil strategi i ett porteføljeselskap kan koste mye.",
      "Konsentrasjon i sykliske bransjer som shipping og offshore gir store svingninger i porteføljeverdi.",
      "Lang holdperiode betyr at kapitalen er bundet, du kan ikke selge raskt når markedet snur.",
    ],
    mythVsReality: [
      {
        myth: "Private equity betyr alltid kortsiktighet og rask exit.",
        reality:
          "Kistefos holder ofte eierskap i tiår og utvikler selskaper aktivt, det er industrielt eierskap, ikke tradisjonelt PE med femårshorisont.",
      },
      {
        myth: "Formuen kommer primært fra kunstinvesteringer.",
        reality:
          "Kunstsamlingen og museet er synlige, men hovedformuen sitter i industrielle eierskap via Kistefos, kunst er filantropi, ikke motoren.",
      },
    ],
    personalLessons: [
      "Aktivt industrielt eierskap med lang holdperiode kan bygge stor formue, men krever tålmodighet og operativ kompetanse.",
      "PE trenger ikke bety kortsiktighet; Kistefos viser at tiårshorisont kan gi bedre avkastning enn kvartalsjakt.",
      "Formue kan kanaliseres til kultur og samfunnsprosjekter uten å ofre investeringsdisiplin.",
      "Fleksibilitet i sektor, geografi og ticket size gir mulighet til å utnytte vinduer andre ikke ser.",
    ],
    sources: [
      {
        label: "Kistefos AS: om selskapet",
        url: "https://kistefos.no/about-us/",
        tier: "primary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "Kjell Inge Røkke", href: "/formuesbyggere/kjell-inge-rokke" },
      {
        label: "Øystein Stray Spetalen",
        href: "/formuesbyggere/oystein-stray-spetalen",
      },
      { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    ],
  }),

  "bjorn-rune-gjelsten": buildFormuesbyggerArticle({
    slug: "bjorn-rune-gjelsten",
    seoAngle: "Hvordan bygde Bjørn Rune Gjelsten formue?",
    shortAnswer:
      "Bjørn Rune Gjelsten (født 17. september 1956) bygde formue gjennom karriere i RGI- og Aker-miljøet, og etablerte Gjelsten Holding i 2000 som plattform for langsiktige investeringer. Formuen sitter i eierskap av shipping-, industri- og idrettsrelaterte eiendeler via holdingselskapet, ikke i arvet maritim formue. Mønsteret er gjenkjennelig blant norske formuesbyggere: bygge erfaring og nettverk i større konsern, deretter etablere eget investeringshus uten børsens kvartalspress. Gjelsten Holding samler eierskap og gir fleksibilitet til å kjøpe, holde og utvikle selskaper over tid.",
    timeline: [
      {
        date: "1956",
        title: "Født 17. september",
        description:
          "Bjørn Rune Gjelsten ble født 17. september 1956 og vokste opp i det norske næringslivsmiljøet.",
      },
      {
        date: "1980–1990-tallet",
        title: "RGI og Aker-miljøet",
        description:
          "Gjelsten var sentral i RGI og Aker-miljøet, og bygde erfaring i shipping, industri og konsernledelse.",
      },
      {
        date: "2000",
        title: "Gjelsten Holding etableres",
        description:
          "Gjelsten Holding ble grunnlagt som eget investeringshus for langsiktige eierskap i shipping, industri og andre eiendeler.",
      },
      {
        date: "2000-tallet",
        title: "Idrett og shipping",
        description:
          "Gjelsten ble synlig gjennom eierskap i fotballklubber og fortsatt aktivitet i maritim sektor.",
      },
      {
        date: "2025",
        title: "Kapital 400, 18,2 mrd.",
        description:
          "Kapital estimerer formuen til om lag 18,2 milliarder kroner, hovedsakelig via Gjelsten Holding.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "Eierskap i shipping-, industri- og idrettsrelaterte selskaper via Gjelsten Holding.",
      },
      {
        category: "aksjer",
        description:
          "Aksjeposisjoner i porteføljeselskaper forvaltet gjennom holdingselskapet med langsiktig horisont.",
      },
    ],
    decisiveMove:
      "Etableringen av Gjelsten Holding i 2000, etter lang karriere i RGI/Aker-miljøet samlet Gjelsten eierskapene i eget hus og ga uavhengighet fra konsernstrukturer.",
    whatCouldGoWrong: [
      "Shipping og industri er sykliske, porteføljeverdien svinger kraftig med bransjesykluser.",
      "Holdingselskap uten børsnotering gir begrenset likviditet; formuen er vanskelig å realisere raskt.",
      "Konsentrasjon i maritim sektor gir stor eksponering mot fraktpriser, rente og geopolitikk.",
      "Idrettsinvesteringer er sjelden lønnsomme, de kan binde kapital uten avkastning.",
    ],
    mythVsReality: [
      {
        myth: "Gjelsten arvet sin maritime formue.",
        reality:
          "Formuen er bygget gjennom egen karriere i RGI/Aker og etableringen av Gjelsten Holding i 2000, ikke arv.",
      },
      {
        myth: "Et holdingselskap betyr passiv forvaltning.",
        reality:
          "Gjelsten Holding er aktivt eierskap i shipping og industri, forvaltet med erfaring fra konsernledelse, ikke bare papireierskap.",
      },
    ],
    personalLessons: [
      "Lang erfaring i et konsern kan bli grunnlag for eget investeringshus, nettverk og kompetanse er kapital.",
      "Gjelsten Holding (2000) viser at det er mulig å samle eierskap uten børsens kortsiktighet.",
      "Formue bygges ofte over tiår gjennom karriere, ikke arv alene.",
      "Diversifisering innen shipping, industri og idrett reduserer avhengighet av én enkelt bransje.",
    ],
    sources: [
      {
        label: "Gjelsten Holding AS: Brønnøysundregistrene",
        url: "https://virksomhet.brreg.no/nb/oppslag/enheter/979580193",
        tier: "primary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "John Fredriksen", href: "/formuesbyggere/john-fredriksen" },
      { label: "Eie eller leie bolig", href: "/guider/eie-eller-leie-bolig" },
    ],
  }),

  "ivar-erik-tollefsen": buildFormuesbyggerArticle({
    slug: "ivar-erik-tollefsen",
    seoAngle: "Hvordan bygde Ivar Erik Tollefsen boligformuen?",
    shortAnswer:
      "Ivar Erik Tollefsen bygde formue gjennom boligutleie i europeisk skala, fra Fredensborg i Norge til eierskap i Heimstaden Bostad. I april 2026 oppga Heimstaden over 156 000 leieboliger i ni land med eiendomsverdi på 323 milliarder svenske kroner. Dette er boligutleie, ikke næringseiendom i Oslo sentrum. Mønsteret er eie, drive og vokse via gjeld: leieinntekt betjener lån, og oppkjøp utvider porteføljen. Formuen er følsom for leienivå, ledighet og rente, typisk for kapitalintensiv eiendom med høy belåning.",
    timeline: [
      {
        date: "1990-tallet",
        title: "Fredensborg etableres",
        description:
          "Tollefsen grunnla Fredensborg og startet med boligutvikling og utleie i Norge, utgangspunktet for senere europeisk ekspansjon.",
      },
      {
        date: "2012",
        title: "Heimstaden grunnlegges",
        description:
          "Heimstaden ble etablert som plattform for boligutleie i Norden, med ambisjon om å bli en ledende europeisk utleier.",
      },
      {
        date: "2017",
        title: "Heimstaden Bostad børsnoteres",
        description:
          "Heimstaden Bostad ble notert på Nasdaq Stockholm og hentet kapital til videre oppkjøp av leieboliger.",
      },
      {
        date: "2020-tallet",
        title: "Europeisk oppskalering",
        description:
          "Heimstaden ekspanderte til ni europeiske land og ble en av regionens største boligutleiere gjennom oppkjøp og utvikling.",
      },
      {
        date: "April 2026",
        title: "156 000+ boliger, 323 mrd. SEK",
        description:
          "Heimstaden Bostad oppga over 156 000 leieboliger i ni land og eiendomsverdi på 323 milliarder svenske kroner.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "Eierskap i Fredensborg og Heimstaden Bostad, europeisk boligutleie i ni land.",
      },
      {
        category: "aksjer",
        description:
          "Børsnoterte aksjer i Heimstaden Bostad (Nasdaq Stockholm) utgjør hoveddelen av den synlige formuen.",
      },
    ],
    ownershipVsControl:
      "Tollefsen er grunnlegger og sentral eier i Heimstaden Bostad, der han også sitter i styret. Som børsnotert selskap er den økonomiske andelen synlig i aksjekursen, men kontrollen sitter i kombinasjonen av eierskap, styreverv og grunnleggerposisjon, ikke i dual-class aksjer.",
    decisiveMove:
      "Oppkjøpstrategien som gjorde Heimstaden til en europeisk boligutleier i ni land, fra Fredensborg i Norge til over 156 000 leieboliger og 323 milliarder svenske kroner i eiendomsverdi (april 2026).",
    whatCouldGoWrong: [
      "Høy gjeld i boligutleie gjør formuen ekstremt følsom for renteendringer, refinansiering kan bli dyr.",
      "Leienivå og ledighet svinger med konjunktur; fallende leieinntekter kan ikke betjene gjelden.",
      "Regulatorisk risiko i utleiemarkeder, leietakervern og skatt kan presse marginene.",
      "Geografisk spredning over ni land øker kompleksitet og valutarisiko.",
    ],
    mythVsReality: [
      {
        myth: "Tollefsen bygde formue på næringseiendom i Oslo, som Colosseum.",
        reality:
          "Hovedhistorien går gjennom Fredensborg og Heimstaden, boligutleie i europeisk skala, ikke kommersiell næringseiendom i Oslo sentrum.",
      },
      {
        myth: "Boligutleie er passiv inntekt uten risiko.",
        reality:
          "Heimstaden opererer med høy gjeld og 156 000+ boliger, leieinntekt må betjene milliardlån, og renteendringer kan presse egenkapitalen hardt.",
      },
    ],
    personalLessons: [
      "Boligutleie i skala kan bygge enorm formue, men krever gjeld, drift og tålmodighet over tiår.",
      "Leiefølsomhet og rente gjør modellen syklisk; kontantstrøm fra leie er det som betjener gjelden.",
      "Geografisk spredning reduserer risiko per marked, men øker kompleksitet i forvaltning.",
      "Kjøpe, utvikle og holde slår ofte rask flipping på lang sikt i eiendom.",
    ],
    sources: [
      {
        label: "Heimstaden Bostad: Q1 2026 (156 000+ boliger)",
        url: "https://heimstadenbostad.com/news/heimstaden-bostad-q1-2026-results/",
        tier: "secondary",
      },
      {
        label: "Fredensborg",
        url: "https://www.fredensborg.no/",
        tier: "primary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "Olav Thon", href: "/formuesbyggere/olav-thon" },
      { label: "Eie vs. leie-kalkulator", href: "/verktoy/eie-leie-kalkulator" },
    ],
  }),

  "helene-sundt": heleneSundtArticle,

  "nicolai-tangen": buildFormuesbyggerArticle({
    slug: "nicolai-tangen",
    seoAngle: "Hvordan bygde Nicolai Tangen formue før Oljefondet?",
    shortAnswer:
      "Nicolai Tangen bygde historisk formue gjennom hedgefondet AKO Capital, som han grunnla i London. Strategien var disiplinert forvaltning med sterk avkastning, performance fee og eierskap i fondet skapte formue. I 2020 ble eierinteressene overført endelig og ugjenkallelig til AKO Foundation, slik at formuen ikke lenger er personlig eierskap. Tangen er nå sjef for Oljefondet (NBIM), og skiller tydelig mellom privat historie og offentlig rolle. Hedgefond kan bygge betydelig formue, men stiftelseoverføring endrer hvem som eier den.",
    timeline: [
      {
        date: "2005",
        title: "AKO Capital grunnlegges",
        description:
          "Tangen grunnla AKO Capital i London og bygde det til et av Europas større hedgefond.",
      },
      {
        date: "2013",
        title: "AKO Foundation etableres",
        description:
          "Tangen grunnla AKO Foundation for filantropi innen utdanning og kunst, plattformen for senere eierskapsoverføring.",
      },
      {
        date: "Mars 2020",
        title: "Ansatt som NBIM-sjef",
        description:
          "Tangen ble utpekt som ny CEO i Norges Bank Investment Management, som forvalter Oljefondet.",
      },
      {
        date: "August 2020",
        title: "Avtale om overføring til stiftelse",
        description:
          "Norges Bank og Tangen inngikk revidert avtale om ugjenkallelig overføring av AKO-eierskap til AKO Foundation.",
      },
      {
        date: "1. desember 2020",
        title: "AKO-eierskap overført",
        description:
          "Tangens eierinteresser og utbytterettigheter i AKO Capital ble overført endelig til AKO Foundation, han eier ikke lenger fondet.",
      },
      {
        date: "September 2020",
        title: "Tiltredelse som Oljefond-sjef",
        description:
          "Tangen startet som CEO i NBIM etter at interessekonflikter var adressert gjennom stiftelseoverføring.",
      },
    ],
    wealthSources: [
      {
        category: "selskaper",
        description:
          "Historisk eierskap i AKO Capital LLP, hedgefondet som bygde formuen gjennom avkastning og performance fee.",
      },
      {
        category: "salg",
        description:
          "Eierinteresser overført ugjenkallelig til AKO Foundation i 2020, formuen er ikke lenger personlig.",
      },
    ],
    decisiveMove:
      "Overføringen av eierinteresser i AKO Capital til AKO Foundation 1. desember 2020, endelig og ugjenkallelig, slik at Tangen kunne tiltre som Oljefond-sjef uten interessekonflikt.",
    whatCouldGoWrong: [
      "Hedgefond er avhengig av avkastning, dårlige år kan utslette performance fee og fondsverdi raskt.",
      "Konsentrasjon i aktiv forvaltning gir høy risiko sammenlignet med indeksinvestering.",
      "Offentlig rolle etter privat suksess krever tydelig skille, enhver tvetydighet kan skade tillit.",
      "Stiftelseoverføring er ugjenkallelig, du kan ikke «ta tilbake» formuen senere.",
    ],
    mythVsReality: [
      {
        myth: "Tangen er fortsatt en av Norges rikeste privatpersoner.",
        reality:
          "Eierinteressene i AKO ble overført ugjenkallelig til AKO Foundation i 2020, den historiske formuen tilhører stiftelsen, ikke Tangen personlig.",
      },
      {
        myth: "Hedgefond bygger formue raskt og enkelt.",
        reality:
          "AKO Capital tok 15 år å bygge, og avkastningen krevde disiplinert forvaltning over hundrevis av handler, ikke én smart investering.",
      },
    ],
    personalLessons: [
      "Hedgefond kan bygge betydelig formue gjennom avkastning og eierskap i fondet, men krever år med disiplin.",
      "Stiftelseoverføring endrer juridisk eierskap permanent; planlegg det som en irreversibel beslutning.",
      "Offentlig rolle etter privat suksess krever tydelig skille mellom tidligere og nåværende interesser.",
      "Filantropi via stiftelse kan kanalisere formue til samfunnsnytte, som Tangen, Thon og Gates.",
    ],
    sources: [
      {
        label: "Norges Bank: overføring til AKO Foundation (2020)",
        url: "https://www.norges-bank.no/en/news-events/news/News-items/2020/2020-12-02-agreement/",
        tier: "primary",
      },
      {
        label: "NBIM: revidert avtale med Tangen",
        url: "https://www.nbim.no/en/news-and-insights/the-press/press-releases/2020/revised-agreement-with-nicolai-tangen/",
        tier: "primary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-11",
    relatedLinks: [
      { label: "Warren Buffett", href: "/formuesbyggere/warren-buffett" },
      {
        label: "Øystein Stray Spetalen",
        href: "/formuesbyggere/oystein-stray-spetalen",
      },
      { label: "Kom i gang med fond", href: "/guider/kom-i-gang-med-fond" },
    ],
  }),

  "trond-mohn": buildFormuesbyggerArticle({
    slug: "trond-mohn",
    seoAngle: "Hva kan vi lære av Trond Mohn?",
    seoTitle: "Trond Mohn: Arv, Framo og filantropi",
    metaDescription:
      "Trond Mohn videreutviklet familiebedriften Frank Mohn (Framo) og solgte den til Alfa Laval for 13 milliarder kroner i 2014. Se arv, industri og filantropi.",
    seoKeywords: [
      "Trond Mohn formue",
      "Frank Mohn",
      "Framo",
      "Alfa Laval",
      "Trond Mohn Stiftelse",
      "filantropi Bergen",
    ],
    shortAnswer:
      "Trond Mohn overtok ikke et selskap fra null. Faren, Frank Mohn, grunnla Frank Mohn AS i 1938, og Trond kom inn i familiebedriften etter utdanning i Tyskland. Som administrerende direktør fra 1986 videreutviklet han Framo til en global leverandør av skipspumper og offshore-teknologi, før selskapet ble solgt til Alfa Laval for 13 milliarder kroner i 2014. Formuen kom fra arv og langsiktig industriell eierskap. Etter salget har Mohn vært blant Norges mest betydelige filantroper, med milliardgaver til forskning, utdanning og idrett i Vestland.",
    timeline: [
      {
        date: "3. apr. 1943",
        title: "Født i Buckie, Skottland",
        description:
          "Trond Mohn ble født 3. april 1943 under foreldrenes opphold i Skottland under andre verdenskrig, men vokste opp i Fana.",
      },
      {
        date: "1970",
        title: "Inn i familiebedriften",
        description:
          "Etter siviløkonomutdanning i Mannheim begynte Mohn i Frank Mohn AS, som faren hadde grunnlagt i 1938.",
      },
      {
        date: "1986",
        title: "Overtar som daglig leder",
        description:
          "Trond Mohn ble administrerende direktør og ledet videre internasjonaliseringen av Framo-pumpene.",
      },
      {
        date: "Apr. 2014",
        title: "Solgt til Alfa Laval for 13 mrd.",
        description:
          "Familien solgte Frank Mohn AS til svenske Alfa Laval for 13 milliarder kroner kontant på gjeldfri basis.",
      },
      {
        date: "2025",
        title: "Kapital 400, 8,45 mrd.",
        description:
          "Kapital estimerer formuen til om lag 8,45 milliarder kroner, hovedsakelig fra Framo-salget og etterfølgende investeringer.",
      },
    ],
    wealthSources: [
      {
        category: "arv",
        description:
          "Arv og videreutvikling av familiebedriften Frank Mohn AS, grunnlagt av faren Frank Mohn i 1938. Trond Mohn kom inn i selskapet etter utdanning og ledet det fra 1986.",
      },
      {
        category: "salg",
        description:
          "Salg av Frank Mohn AS til Alfa Laval i april 2014 for 13 milliarder kroner kontant. Selskapet omsatte for 3,4 milliarder kroner og hadde ordreinngang på 6,1 milliarder i 2013.",
      },
      {
        category: "selskaper",
        description:
          "Formue etter industrisalget, investert og kanalisert gjennom holdingselskaper og omfattende gaver til Trond Mohn Stiftelse og andre formål i Vestland.",
      },
    ],
    ownershipVsControl:
      "Trond Mohn ledet familiebedriften som administrerende direktør og styreleder, men eierskapet lå i familieselskaper som Wimoh AS og Framo Developments. Ved salget i 2014 eide han majoriteten i Framo Developments sammen med søsteren Marit og sønnen Frederik, som hadde ulike syn på salget.",
    decisiveMove:
      "Å videreutvikle Framo fra familiebedrift til global markedsleder i skipspumper og offshore-teknologi, og realisere verdien gjennom salg til Alfa Laval i 2014 for 13 milliarder kroner kontant.",
    whatCouldGoWrong: [
      "Konsentrasjon i ett familieselskap gir ingen diversifisering hvis shipping- eller offshoremarkedet snur.",
      "Generasjonsskifte i familiebedrifter kan skape konflikter om eierskap, strategi og salg, som da Frederik Mohn gikk av som konsernsjef i 2012.",
      "Industriell formue sitter i produksjon og ordrer, ikke kontanter. Lav konjunktur kan presse marginer lenge før et salg.",
      "Store filantropiske gaver reduserer personlig formue. Det er et bevisst valg, ikke en automatisk konsekvens av rikdom.",
    ],
    mythVsReality: [
      {
        myth: "Trond Mohn grunnla Frank Mohn.",
        reality:
          "Selskapet ble etablert av faren Frank Mohn i 1938. Trond kom inn etter utdanning i 1970 og tok over som administrerende direktør i 1986.",
      },
      {
        myth: "Industriell formue er rask og enkel å bygge.",
        reality:
          "Framo tok flere tiår å bli global. Produksjon, eksport og langsiktig eierskap i familiebedriften er langsomt, men kan gi store utslag ved et salg.",
      },
      {
        myth: "Mohn ga bort hele formuen til stiftelsen, som Thon.",
        reality:
          "Trond Mohn Stiftelse mottar løpende gaver finansiert av formuen. Kapital har anslått at han har gitt over 5 milliarder kroner til forskning, utdanning og idrett over tre tiår.",
      },
    ],
    personalLessons: [
      "Arv er et utgangspunkt, ikke en ferdig formue. Trond Mohn videreutviklet det faren bygde, han startet ikke selskapet selv.",
      "Langsiktig eierskap i én industri kan gi enorm verdi, men krever tiår med ekspansjon og produktutvikling.",
      "Et salg kan være det avgjørende grepet. Framo ble verdt 13 milliarder kroner da familien solgte til Alfa Laval i 2014.",
      "Filantropi kan følge industriformue over tid. Mohn har gitt milliarder til forskning, idrett og utdanning i Vestland uten å være en tradisjonell gründerhistorie.",
    ],
    sources: [
      {
        label: "Framo: historien fra 1938",
        url: "https://www.framo.com/about-framo/history/",
        tier: "primary",
      },
      {
        label: "Store norske leksikon: Trond Mohn",
        url: "https://snl.no/Trond_Mohn",
        tier: "primary",
      },
      {
        label: "Store norske leksikon: Frank Mohn",
        url: "https://snl.no/Frank_Mohn",
        tier: "primary",
      },
      {
        label: "Alfa Laval: oppkjøp av Frank Mohn AS (2014)",
        url: "https://news.cision.com/alfa-laval/r/alfa-laval-acquires-frank-mohn-as--a-leader-in-marine-and-offshore-pumping-systems--and-strengthens-,c9564574",
        tier: "primary",
      },
      {
        label: "Trond Mohn Stiftelse",
        url: "https://www.trondmohnstiftelse.no/",
        tier: "secondary",
      },
      kapital400Source(),
    ],
    lastVerified: "2026-08-28",
    relatedLinks: [
      { label: "Johan H. Andresen", href: "/formuesbyggere/johan-h-andresen" },
      { label: "Bill Gates", href: "/formuesbyggere/bill-gates" },
      { label: "Bygg bufferkonto", href: "/guider/bygg-bufferkonto" },
    ],
  }),
};
