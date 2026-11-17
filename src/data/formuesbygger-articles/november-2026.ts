import { buildFormuesbyggerArticle } from "./helpers";

const kjosHistory = "https://www.norwegian.com/no/om-oss/var-historie/";
const kjosDeparture = "https://media.no.norwegian.com/pressreleases/bjoern-kjos-takker-av-som-konsernsjef-i-norwegian-2896360";
const kjosKapital = "https://www.finansavisen.no/kapital-index/profile/7560029/bjorn-kjos";
const kjosLufttransport = "https://www.finansavisen.no/transport/2026/08/03/8369797/bjorn-kjos-venter-inntektseksplosjon";
const norwegianReport = "https://www.norwegian.com/globalassets/ip/documents/about-us/company/investor-relations/reports-and-presentations/annual-reports/nas-annual-report-2021.pdf";
const kampradForbes = "https://www.forbes.com/profile/ingvar-kamprad/";
const ikeaHistory = "https://www.ikea.com/global/en/stories/our-roots/ingvar-kamprad-100-years-260330/";
const ingkaHistory = "https://www.ingka.com/newsroom/ingvar-kamprad-at-100-the-legacy-of-the-ikea-founder/";
const ingkaFoundation = "https://www.ingkafoundation.org/our-role/";
const interIkeaFoundation = "https://www.interikeafoundation.com/en/about-inter-ikea-foundation";
const ikeaFranchise = "https://www.inter.ikea.com/en/this-is-inter-ikea-group/the-ikea-franchise-system";
const spotifyHistory = "https://newsroom.spotify.com/spotify-timeline/";
const spotifyLeadership = "https://newsroom.spotify.com/2025-09-30/spotify-announcement-daniel-ek-executive-chairman/";
const spotifyReport = "https://www.sec.gov/Archives/edgar/data/1639920/000162828026006874/ck0001639920-20251231.htm";
const ekForbes = "https://www.forbes.com/profile/daniel-ek/";

export const novemberFormuesbyggerArtikler = {
  "bjorn-kjos": buildFormuesbyggerArticle({
    slug: "bjorn-kjos",
    seoAngle: "Hvordan bygde Bjørn Kjos formuen sin?",
    seoTitle: "Bjørn Kjos: Formuen, Norwegian og Lufttransport",
    metaDescription: "Bjørn Kjos bygde verdier gjennom Norwegian og bank, men opplevde også kraftige fall. Les om eierskap, utvanning og den senere Lufttransport-satsingen.",
    seoKeywords: ["Bjørn Kjos formue", "Bjørn Kjos Norwegian", "Bjørn Kjos Lufttransport", "Observatoriet Holding", "HBK Holding"],
    shortAnswer: "Bjørn Kjos bygde formue som medeier og leder i Norwegian, med bankverdier og andre investeringer ved siden av flyselskapet. Aksjeverdiene var viktigere enn lederlønnen for milliardanslagene. Historien handler også om tap: Kapital satte formuen til 1,7 milliarder kroner i 2019 etter et kraftig fall. Det er et historisk tall. Senere har Lufttransport fått en viktig plass i Kjos' virksomhet, uten at konsernets inntekter kan leses som hans private formue.",
    factCards: [
      { label: "Historisk formueanslag", value: "1,7 mrd. kr", note: "Kapital, 2019. Ikke dagens formue." },
      { label: "Norwegian etablert", value: "1993", note: "Lavprissatsingen startet i 2002." },
      { label: "Konsernsjef i Norwegian", value: "2002 til 2019", note: "Gikk av 11. juli 2019." },
    ],
    factCardsNote: "2019-anslaget viser hva Kapital vurderte verdiene til den gangen. Vi bruker det ikke som et oppdatert anslag på Kjos' nettoformue i 2026.",
    bodySections: [
      {
        heading: "Fra fire fly til internasjonal virksomhet",
        paragraphs: [
          "Da Kjos gikk av i juli 2019, beskrev Norwegian en vekst fra fire fly og 130 ansatte til 162 fly og over 11 000 ansatte i løpet av hans 17 år som konsernsjef. Selskapet hadde også bygget opp langdistanseruter. Dette er historiske størrelser fra 2019, ikke dagens flyflåte eller bemanning.",
          "Allerede i 2018 hadde selskapet endret retning fra vekst til lønnsomhet. Vår vurdering er at det er kjernen i lærdommen: flere ruter og større flåte binder kapital. For eieren er det avgjørende hva veksten koster, hvordan den finansieres og hvor mye som blir igjen etter kostnadene.",
        ],
      },
      {
        heading: "Hva forteller Lufttransport-tallene?",
        paragraphs: [
          "Finansavisen rapporterte i august 2026 at konsernet med Observatoriet Holding som morselskap hadde 438,7 millioner kroner i omsetning og 52,1 millioner i årsresultat i 2025. Nesten hele omsetningen kom fra Lufttransport, der Kjos ifølge avisen eide 90 prosent.",
          "Dette sier noe om driften, men er ikke et regnestykke for privat nettoformue. Omsetning er inntekter før kostnader, resultat er et årlig overskudd, og selskapsverdi avhenger blant annet av fremtidig inntjening og gjeld. Heller ikke en stor kontraktsverdi kan føres direkte som eierens formue.",
        ],
      },
    ],
    timeline: [
      { date: "1993", title: "Med på å etablere Norwegian", description: "Norwegian Air Shuttle ble etablert, med Kjos blant grunnleggerne." },
      { date: "2002", title: "Lavprisselskapet tar form", description: "Norwegian startet lavprisflyginger med Boeing 737, og Kjos ble konsernsjef." },
      { date: "2019", title: "Går av og får lavere formueanslag", description: "Kjos gikk av 11. juli. Kapital anslo formuen til 1,7 milliarder kroner etter kursfall og kapitalinnhentinger." },
      { date: "2021", title: "Norwegian rekonstrueres", description: "Etter Kjos' tid som konsernsjef ble gjeld konvertert og nye aksjer utstedt. Selskapets videre drift må skilles fra verdien for tidligere aksjonærer." },
      { date: "2025", title: "Lufttransport driver nye inntekter", description: "Regnskapstall omtalt i august 2026 viste økt omsetning og overskudd i Observatoriet-konsernet, med Lufttransport som viktigste inntektskilde." },
    ],
    wealthSources: [
      { category: "aksjer", description: "Historiske eierposter knyttet til Norwegian og Bank Norwegian. Aksjeverdiene kunne falle selv om selskapene fortsatt hadde kunder og virksomhet." },
      { category: "selskaper", description: "Familie- og holdingselskaper med senere investeringer, blant annet Lufttransport. Konserntall er ikke automatisk Kjos' personlige verdier." },
      { category: "lonn", description: "Lederinntekt inngår i karrierehistorien, men må ikke forveksles med markedsverdien av store eierposter." },
    ],
    ownershipVsControl: "Konsernsjef, grunnlegger og aksjonær er ulike roller. Kjos kunne lede Norwegian uten å eie hele selskapet. Eierskap gjennom et holdingselskap kan dessuten være delt med familie og andre investorer. Når nye aksjer utstedes, kan den gamle eierandelen bli mindre dersom eieren ikke deltar tilsvarende i kapitalinnhentingen.",
    decisiveMove: "Lavprissatsingen i 2002 gjorde Norwegian til en utfordrer i rutemarkedet. Vår vurdering er at dette er det sentrale kommersielle vendepunktet: kundene fikk et tydelig pristilbud som kunne skaleres. Men senere vekst og finansieringsbehov viser også at en stor virksomhet ikke nødvendigvis gir en trygg eierformue.",
    whatCouldGoWrong: [
      "Fly krever kapital og løpende finansiering, mens inntektene kan falle raskt ved svikt i reiseetterspørselen.",
      "Emisjoner og konvertering av gjeld kan holde en virksomhet i live samtidig som gamle aksjonærer utvannes.",
      "En formue konsentrert i få selskaper påvirkes sterkt av kursfall og driftsproblemer i samme bransje.",
    ],
    mythVsReality: [
      { myth: "Kapitals 1,7 milliarder er Kjos' formue i dag.", reality: "Tallet gjelder 2019. Det er ikke oppdatert til 2026, og vi har ikke grunnlag for å sette likhetstegn mellom dette anslaget og dagens nettoformue." },
      { myth: "Hvis et selskap reddes, blir også aksjonærenes gamle verdier reddet.", reality: "Virksomheten kan fortsette etter ny kapital og gjeldskonvertering, mens tidligere eiere sitter igjen med en langt mindre andel." },
    ],
    personalLessons: [
      "Se på både gjeld og eierskap når du vurderer en gründerhistorie. Antall fly og passasjerer forteller ikke alene hvor mye eieren sitter igjen med.",
      "Behandle formueanslag som daterte øyeblikksbilder, særlig når mye av verdien ligger i børsaksjer.",
      "Hold kontraktsverdi, omsetning, overskudd og privat formue i hver sin kolonne.",
    ],
    faq: [
      { question: "Hvor stor er Bjørn Kjos' formue?", answer: "Vi viser Kapitals historiske anslag på 1,7 milliarder kroner fra 2019, tydelig merket med år. Det er ikke et anslag på hans nåværende formue." },
      { question: "Er Lufttransports omsetning Kjos' private inntekt?", answer: "Nei. Omsetningen tilhører selskapet og skal dekke kostnader. Privat formue krever en vurdering av eierandel, selskapsverdier, øvrige eiendeler og gjeld." },
    ],
    sources: [
      { label: "Norwegian: selskapets historie", url: kjosHistory, tier: "primary" },
      { label: "Norwegian: årsrapport 2021, rekonstruksjon og aksjeutstedelser", url: norwegianReport, tier: "primary" },
      { label: "Norwegian: Kjos går av 11. juli 2019", url: kjosDeparture, tier: "secondary" },
      { label: "Kapital: Bjørn Kjos, historisk formueanslag 2019", url: kjosKapital, tier: "tertiary" },
      { label: "Finansavisen, 3. august 2026: Observatoriet og Lufttransport i 2025", url: kjosLufttransport, tier: "tertiary" },
      { label: "Store norske leksikon: Bjørn Kjos, bakgrunn og fødselsdato", url: "https://snl.no/Bj%C3%B8rn_Kjos", tier: "tertiary" },
    ],
    lastVerified: "2026-11-17",
    relatedLinks: [
      { label: "Norwegian Reward", href: "/fordeler/norwegian-reward", description: "Kundens bonusprogram er noe annet enn gründerens eierskap." },
      { label: "Torstein Hagen", href: "/formuesbyggere/torstein-hagen", description: "En annen kapitalintensiv reisevirksomhet, med et annet eierskap." },
    ],
  }),
  "ingvar-kamprad": buildFormuesbyggerArticle({
    slug: "ingvar-kamprad",
    seoAngle: "Hvordan bygde Ingvar Kamprad IKEA?",
    seoTitle: "Ingvar Kamprad: IKEA, formuen og stiftelsene",
    metaDescription: "Ingvar Kamprad bygde IKEA med lave kostnader og stor skala. Se hvorfor IKEA-verdier, historisk familieformue og stiftelseseierskap er ulike ting.",
    seoKeywords: ["Ingvar Kamprad formue", "hvem eier IKEA", "IKEA grunnlegger", "Ingka Foundation", "Inter IKEA Foundation"],
    shortAnswer: "Ingvar Kamprad grunnla IKEA som 17-åring i 1943 og bygde en internasjonal møbelvirksomhet med lave priser, effektiv distribusjon og selvmontering. Men verdiene i IKEA kan ikke uten videre regnes som hans private formue. Store deler av virksomheten ble lagt i stiftelsesstrukturer. Forbes' tall på 3,5 milliarder dollar gjelder Kamprad og familie i 2015. Det er verken en nåverdi av IKEA eller verdien av dødsboet etter hans død i 2018.",
    factCards: [
      { label: "IKEA grunnlagt", value: "1943", note: "Kamprad var 17 år." },
      { label: "Historisk familieanslag", value: "3,5 mrd. USD", note: "Forbes, 2. mars 2015." },
      { label: "Levetid", value: "1926 til 2018", note: "Døde 27. januar 2018." },
    ],
    factCardsNote: "Forbes-profilen heter «Ingvar Kamprad & family». Familieanslaget fra 2015 må ikke forveksles med personlige kontanter, arveoppgjør eller verdien av dagens IKEA-system.",
    bodySections: [
      {
        heading: "Hvem eier IKEA i dag?",
        paragraphs: [
          "IKEA består av flere virksomheter med ulike oppgaver. Ingka Group er den største IKEA-forhandleren og eies av INGKA Foundation. Kamprad overførte eierskapet til denne stiftelsen i 1982. IKEA Foundation, som arbeider med veldedighet, er en separat juridisk enhet.",
          "Inter IKEA-systemet omfatter blant annet konseptet og franchisevirksomheten. Dagens øverste eier av Inter IKEA Holding er Inter IKEA Foundation. Den ble opprettet i 2023 etter en deling av Interogo Foundation, flere år etter Kamprads død. Det ville derfor være feil å bruke en gammel strukturtegning som beskrivelse av dagens eierskap.",
          "Inter IKEA Foundation opplyser at ingen enkeltperson kan være privat mottaker av stiftelsens verdier. Familien kan få ordinær lønn eller styrehonorar for arbeid på vanlige vilkår, men dette er noe annet enn å eie stiftelseskapitalen personlig.",
        ],
      },
    ],
    timeline: [
      { date: "1943", title: "IKEA etableres", description: "Kamprad startet en postordrevirksomhet som senere dreide mot møbler." },
      { date: "1958", title: "Varehus i Älmhult", description: "Et fysisk varehus gjorde det mulig å vise frem møblene og utvikle handleopplevelsen rundt sortimentet." },
      { date: "1982", title: "Ingka legges i stiftelse", description: "Kamprad overførte eierskapet i Ingka Group til INGKA Foundation for å sikre langsiktig selvstendighet." },
      { date: "2015", title: "Forbes' historiske familieanslag", description: "Forbes oppga 3,5 milliarder dollar for Kamprad og familie. Årstallet og hvem anslaget gjelder, er avgjørende." },
      { date: "2018", title: "Kamprad dør", description: "Han døde 27. januar, 91 år gammel. IKEA-systemet fortsatte gjennom sine selskaper og stiftelser." },
      { date: "2023", title: "Ny Inter IKEA Foundation", description: "Delingen av Interogo Foundation ga en ny øverste eier av Inter IKEA Holding. Dette er en senere endring i systemet han bygde." },
    ],
    wealthSources: [
      { category: "selskaper", description: "Gründerverdiene oppsto i handel, innkjøp, design og distribusjon. IKEA vokste gjennom en modell som kunne gjentas i mange markeder." },
      { category: "aksjer", description: "Historiske private og familiære eierinteresser må skilles fra kapital som er overført til selvstendige stiftelser." },
    ],
    ownershipVsControl: "En gründer kan forme en organisasjon lenge uten at organisasjonens samlede verdier er privat eiendom. Kamprads prinsipper og familienavn er tett knyttet til IKEA, men stiftelser er egne juridiske enheter. Dagens selskapsstruktur må vurderes ut fra stiftelsenes eierskap og vedtekter, ikke bare hvem som grunnla virksomheten.",
    decisiveMove: "Vår vurdering er at kombinasjonen av pris, distribusjon og kundens egeninnsats var viktigere enn én enkelt møbelidé. Flatpakking og selvmontering gjorde det mulig å endre kostnaden ved å flytte og levere møbler. IKEA Museum understreker også at verken Kamprad eller IKEA oppfant flatpakken. Verdiskapingen lå i å utvikle og skalere en hel modell rundt den.",
    whatCouldGoWrong: [
      "Lav pris er bare lønnsomt hvis innkjøp, transport, lager og drift samlet tåler prisen.",
      "Stor internasjonal skala gir også valuta-, leverandør- og gjennomføringsrisiko.",
      "Formuelister kan bli misvisende dersom stiftelsesverdier, familieverdier og personlig eierskap blandes sammen.",
    ],
    mythVsReality: [
      { myth: "Kamprads familie eier automatisk alle verdiene som bruker IKEA-navnet.", reality: "Ingka Group og Inter IKEA Holding har stiftelser som øverste eiere. Det er ikke det samme som at familien personlig eier kapitalen." },
      { myth: "3,5 milliarder dollar er verdien av IKEA i dag.", reality: "Tallet er et Forbes-anslag for Kamprad og familie i 2015. Det gjelder ikke dagens samlede virksomhet eller hans dødsbo." },
    ],
    personalLessons: [
      "Undersøk hele leveransen når du skal kutte kostnader. En enklere transport- eller arbeidsprosess kan være like viktig som billigere innkjøp.",
      "Et kjent navn og en sterk kultur forteller ikke hvem som juridisk eier verdiene.",
      "Sammenlign formueanslag først etter at du har kontrollert både årstall og om kilden regner på person, familie eller virksomhet.",
    ],
    faq: [
      { question: "Eier Kamprad-familien IKEA?", answer: "IKEA-systemet har flere deler. Ingka Group eies av INGKA Foundation, mens Inter IKEA Holding har Inter IKEA Foundation som øverste eier. Familieforbindelser og roller er ikke det samme som personlig eierskap til stiftelsenes kapital." },
      { question: "Hvorfor viser profilen et formuetall fra 2015?", answer: "Det er det daterte Forbes-anslaget vi dokumenterer her, og det gjelder Kamprad og familie. Vi fremstiller det ikke som en oppdatert verdi av IKEA eller arveoppgjøret etter 2018." },
    ],
    sources: [
      { label: "IKEA: Kamprads historie og varehuset i 1958", url: ikeaHistory, tier: "primary" },
      { label: "Ingka Group: Kamprads 100-årsdag og forretningsmodellen", url: ingkaHistory, tier: "primary" },
      { label: "INGKA Foundation: eierskap siden 1982 og separate stiftelser", url: ingkaFoundation, tier: "primary" },
      { label: "Inter IKEA Foundation: opprettet i 2023, eierskap og familiens stilling", url: interIkeaFoundation, tier: "primary" },
      { label: "Inter IKEA: franchisesystemet", url: ikeaFranchise, tier: "primary" },
      { label: "IKEA Museum: flatpakken og hvem som utviklet modellen", url: "https://ikeamuseum.com/en/explore/the-story-of-ikea/hej-ingvar/", tier: "primary" },
      { label: "Forbes: Ingvar Kamprad & family, anslag 2. mars 2015 og dødsdato", url: kampradForbes, tier: "tertiary" },
    ],
    lastVerified: "2026-11-17",
    relatedLinks: [
      { label: "IKEA Family", href: "/fordeler/ikea-family", description: "Medlemsfordelene for deg som handler hos IKEA." },
      { label: "Reitan-familien", href: "/formuesbyggere/reitan-familien", description: "En annen handelsmodell, med franchise og familieeierskap." },
    ],
  }),
  "daniel-ek": buildFormuesbyggerArticle({
    slug: "daniel-ek",
    seoAngle: "Hvordan bygde Daniel Ek formuen gjennom Spotify?",
    seoTitle: "Daniel Ek: Formuen, Spotify og stemmemakten",
    metaDescription: "Daniel Ek bygde formue gjennom Spotify. Se det daterte Forbes-estimatet, overgangen til arbeidende styreleder og forskjellen på aksjer og stemmemakt.",
    seoKeywords: ["Daniel Ek formue", "Spotify eier", "Spotify grunnlegger", "Daniel Ek styreleder", "Martin Lorentzon"],
    shortAnswer: "Daniel Ek bygde formue som medgründer og eier i Spotify, som han startet sammen med Martin Lorentzon i 2006. Forbes viste et nettoformueestimat på rundt 13,5 milliarder dollar 17. november 2026. Det er et datert verdianslag, ikke penger på bankkonto. Fra 1. januar 2026 gikk Ek fra konsernsjef til arbeidende styreleder. Spotify viser også hvorfor økonomisk eierskap, fullmakter og stemmemakt må holdes fra hverandre når man vurderer en gründers innflytelse.",
    factCards: [
      { label: "Forbes-estimat", value: "13,5 mrd. USD", note: "Øyeblikksbilde 17. november 2026." },
      { label: "Spotify etablert", value: "2006", note: "Medgrunnlegger: Martin Lorentzon." },
      { label: "SEC-rapportert stemmemakt", value: "28,8 %", note: "Per 31. desember 2025, ikke økonomisk eierandel." },
    ],
    factCardsNote: "Forbes-tallet kan endre seg med markedet. SEC-tallene gjelder en annen dato og beskriver stemmerett etter rapporteringsreglene. De kan ikke brukes som en enkel prosent av Spotifys børsverdi for å beregne Eks private formue.",
    bodySections: [
      {
        heading: "Et abonnement betaler selskapet, ikke gründeren direkte",
        paragraphs: [
          "Spotify ble lansert i 2008, to år etter etableringen. Tjenesten kombinerer betalte abonnementer med annonsefinansiert lytting. Kundene kjøper tilgang til en tjeneste, mens eierne sitter med aksjer i virksomheten bak.",
          "Vår vurdering er at dette er et viktig skille for leseren: mange brukere og gjentakende betalinger kan gi et stort inntektsgrunnlag, men sier ikke alene hvor lønnsomt selskapet er. Inntektene skal også dekke rettigheter, teknologi, ansatte og andre kostnader. Gründerens aksjeverdi påvirkes av markedets forventninger til hva som blir igjen over tid.",
        ],
      },
    ],
    timeline: [
      { date: "2006", title: "Spotify etableres", description: "Ek og Martin Lorentzon grunnla selskapet i Sverige." },
      { date: "2008", title: "Tjenesten lanseres", description: "Spotify gikk fra utvikling til en musikktjeneste for brukere." },
      { date: "2018", title: "Direkte notering i New York", description: "Aksjen ble tilgjengelig gjennom en direkte notering på NYSE. En slik notering er ikke i seg selv en ordinær emisjon av nye aksjer." },
      { date: "2025", title: "Lederskiftet kunngjøres", description: "30. september varslet Spotify at Ek skulle bli arbeidende styreleder." },
      { date: "2026", title: "Ny rolle og datert formueanslag", description: "Fra 1. januar ble Alex Norström og Gustav Söderström medkonsernsjefer. Forbes-estimatet i denne profilen ble kontrollert 17. november." },
    ],
    wealthSources: [
      { category: "aksjer", description: "Eierskap knyttet til Spotify er den sentrale forklaringen på formueshistorien. En stigende aksjekurs øker verdien av en eierpost uten at hele gevinsten er solgt eller utbetalt." },
      { category: "selskaper", description: "Forbes omtaler også Eks virksomhet utenfor Spotify, blant annet Prima Materia og Neko Health. En verdsettelse av et slikt selskap er ikke det samme som hans personlige andel." },
    ],
    ownershipVsControl: "Spotifys årsrapport for 2025 tilordner Ek 28,8 prosent av stemmemakten og Lorentzon 40,5 prosent per 31. desember 2025. Selskapet bruker også stemmesertifikater uten økonomiske rettigheter. Aksjetallet på 13,9 prosent som SEC-tabellen tilordner Ek etter «beneficial ownership»-reglene inkluderer aksjer omfattet av stemmefullmakter. Det er derfor ikke et rent mål på hans personlige økonomiske eierandel. En stor stemmeandel kan gi innflytelse uten tilsvarende rett til utbytte eller salgsproveny.",
    decisiveMove: "Vår vurdering er at Spotify gjorde tilgang og brukervennlighet til et produkt som kunne gjentas på tvers av markeder. For Ek kom formuesmuligheten gjennom å beholde eierskap i selskapet som skalerte tjenesten. Overgangen til arbeidende styreleder i 2026 viser samtidig at rollen som daglig leder kan endres uten at grunnleggeren nødvendigvis forsvinner ut av styringen.",
    whatCouldGoWrong: [
      "En stor eierpost i ett selskap kan svinge kraftig selv når antall abonnenter øker.",
      "Et abonnement gir ikke garantert fortjeneste dersom kostnader eller kundetap vokser raskere enn inntektene.",
      "Fullmakter og stemmesertifikater gjør en enkel eierprosent lite egnet som snarvei til privat formue.",
    ],
    mythVsReality: [
      { myth: "Forbes-estimatet er penger Ek kan ta ut fra Spotify.", reality: "Det er et anslag på nettoformue, ikke en bankkonto eller et krav på å ta ut tilsvarende beløp fra selskapet." },
      { myth: "Prosenten i en SEC-eiertabell er alltid personlig økonomisk eierskap.", reality: "Rapporteringsreglene kan også omfatte stemme- og investeringsmakt gjennom fullmakter. Økonomiske rettigheter og stemmerett må leses hver for seg." },
    ],
    personalLessons: [
      "Skalering blir mer interessant når kunden har en grunn til å komme tilbake, men lønnsomhet må fortsatt måles etter kostnader.",
      "Les fotnotene i eiertabeller før du ganger en prosent med selskapets markedsverdi.",
      "Skill produktets popularitet fra prisen på aksjen. En god tjeneste og en god investering er to forskjellige vurderinger.",
    ],
    faq: [
      { question: "Hvor stor er Daniel Eks formue?", answer: "Forbes viste rundt 13,5 milliarder dollar 17. november 2026. Vi viser dette som et datert estimat som kan endres, ikke som kontanter eller en garantert salgsverdi." },
      { question: "Er Daniel Ek fortsatt konsernsjef i Spotify?", answer: "Nei. Han ble arbeidende styreleder fra 1. januar 2026, mens Alex Norström og Gustav Söderström ble medkonsernsjefer." },
      { question: "Eier Daniel Ek hele Spotify?", answer: "Nei. Spotify har flere eiere. Rapportert stemmemakt og aksjer tilordnet etter SEC-reglene er heller ikke det samme som personlig økonomisk eierskap." },
    ],
    sources: [
      { label: "Spotify: selskapets tidslinje, etablering, lansering og notering", url: spotifyHistory, tier: "primary" },
      { label: "Spotify: årsrapport 2025, særlig Item 7 og fotnotene om eierskap", url: spotifyReport, tier: "primary" },
      { label: "Spotify: lederendring fra 1. januar 2026", url: spotifyLeadership, tier: "secondary" },
      { label: "Forbes: Daniel Ek, estimat kontrollert 17. november 2026", url: ekForbes, tier: "tertiary" },
    ],
    lastVerified: "2026-11-17",
    relatedLinks: [
      { label: "Taylor Swift", href: "/formuesbyggere/taylor-swift", description: "Musikkrettigheter sett fra artistens side." },
      { label: "Mark Zuckerberg", href: "/formuesbyggere/mark-zuckerberg", description: "En annen teknologigründer med skille mellom eierskap og kontroll." },
    ],
  }),
};
