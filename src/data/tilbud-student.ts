import type { PublishStatus, Tilbud } from "@/types/content";

const studentCheckedAt = "2026-08-29";
const studentBaseTerms =
  "Krever gyldig studentstatus etter partnerens regler. Ha studentbevis og legitimasjon tilgjengelig. Satser og vilkår kan endres. Sjekk alltid hos partneren før kjøp.";

function studentOffer(
  id: string,
  slug: string,
  partner: string,
  offerLabel: string,
  description: string,
  category: string,
  options?: {
    terms?: string;
    sourceUrl?: string;
    expiresAt?: string;
    status?: PublishStatus;
  },
): Tilbud {
  return {
    id: `tilbud-student-${id}`,
    slug: `student-${slug}`,
    status: options?.status ?? "published",
    title: partner,
    description,
    offerLabel,
    partner,
    fordelSlug: "student",
    category,
    terms: options?.terms ?? studentBaseTerms,
    sourceUrl: options?.sourceUrl,
    expiresAt: options?.expiresAt,
    createdAt: studentCheckedAt,
    updatedAt: studentCheckedAt,
  };
}

/** Studentrabatter hos store selskaper. Sist kontrollert 29. august 2026. */
export const studentTilbud: Tilbud[] = [
  studentOffer(
    "ruter",
    "ruter",
    "Ruter",
    "40 % rabatt",
    "Studenter og lærlinger under 30 år får 40 % rabatt på Ruters 30-dagersbillett.",
    "Transport",
    {
      terms:
        "Gjelder studenter og lærlinger under 30 år i Oslo og Akershus. Gjelder 30-dagersbilletten, ikke enkeltbilletter eller andre periodebilletter. Gyldig studentbevis og legitimasjon må kunne vises.",
      sourceUrl: "https://ruter.no/",
    },
  ),
  studentOffer(
    "vy-tog",
    "vy-tog",
    "Vy Tog",
    "10–50 % rabatt",
    "Studenter under 30 år får mellom 10 og 50 % rabatt på utvalgte togbilletter hos Vy.",
    "Transport",
    {
      terms:
        "Gjelder studenter under 30 år. Gyldig studentbevis og legitimasjon kreves. Rabatten beregnes med utgangspunkt i fullt fleksibel voksenpris. Minstepris gjelder. Rabatten kan variere etter strekning, avgang og billettype. Gjelder også rabatt på periodebilletter.",
      sourceUrl: "https://www.vy.no/",
    },
  ),
  studentOffer(
    "vy-buss",
    "vy-buss",
    "Vy Buss",
    "Studentpris",
    "Studenter kan kjøpe rabatterte billetter på flere av Vy Buss sine ruter. Pris og rabatt varierer etter strekning.",
    "Transport",
    {
      terms:
        "Studenter og ungdom har samme rabattkategori. Studentbevis og legitimasjon kan kreves. Rabatt og tilgjengelighet varierer etter rute og billett. Elever i videregående skole får ikke nødvendigvis studentbillett, men kan ha rett til barne- eller ungdomsbillett.",
      sourceUrl: "https://www.vy.no/",
    },
  ),
  studentOffer(
    "flytoget",
    "flytoget",
    "Flytoget",
    "50 % rabatt",
    "Alle studenter får halv pris på Flytoget ved fremvisning av gyldig studentbevis. Eksempel Oslo S–Oslo lufthavn: 134 kr (voksen 268 kr).",
    "Transport",
    {
      terms:
        "Gjelder studenter uansett alder. Gyldig studentbevis med navn, gyldighetsperiode og studiested må kunne vises. Billetten gjelder kun Flytoget.",
      sourceUrl: "https://flytoget.no/",
    },
  ),
  studentOffer(
    "sj-norge",
    "sj-norge",
    "SJ Norge",
    "50 % rabatt",
    "Studenter under 30 år får 50 % rabatt på Standard Fleksibel-billetter hos SJ Norge.",
    "Transport",
    {
      terms:
        "Gjelder heltidsstudenter, lærlinger og skoleelever under 30 år på Dovrebanen, Nordlandsbanen, Raumabanen, Rørosbanen og i Trøndelag. Gyldig legitimasjon og student-, skole- eller lærlingbevis kreves. Internasjonale studenter kan bruke gyldig ISIC-bevis.",
      sourceUrl: "https://www.sj.no/",
    },
  ),
  studentOffer(
    "go-ahead",
    "go-ahead",
    "Go-Ahead Nordic",
    "Studentbillett",
    "Go-Ahead tilbyr studentbilletter på Sørlandsbanen, Jærbanen og Arendalsbanen. Rabatten varierer etter reise og billettype.",
    "Transport",
    {
      terms:
        "Billettene selges blant annet via Vy og Entur. Gyldig studentbevis må kunne fremvises. Konkret rabatt hentes fra bestillingsløsningen for valgt avgang.",
      sourceUrl: "https://www.go-aheadnordic.no/",
    },
  ),
  studentOffer(
    "skyss",
    "skyss",
    "Skyss",
    "Ca. 40 % rabatt",
    "Studenter får omtrent 40 % rabatt på flere av Skyss sine enkelt- og periodebilletter.",
    "Transport",
    {
      terms:
        "Gjelder enkeltbilletter, 24-timers-, 7-dagers- og 30-dagersbilletter på Skyss-busser, Bybanen og enkelte båtruter i Vestland. Gyldig studentbevis kreves. Enkelte båtruter kan ha egne regler.",
      sourceUrl: "https://www.skyss.no/",
    },
  ),
  studentOffer(
    "atb",
    "atb",
    "AtB",
    "40 % rabatt",
    "Studenter til og med 34 år får 40 % rabatt på AtBs 30-dagersbillett.",
    "Transport",
    {
      terms:
        "Studentpris gjelder til og med 34 år, også elever ved videregående skole i Trøndelag. 40 % på 30-dagersbilletten. 50 % på enkeltbillett ved reise i fire eller flere soner. Nattbuss og natt-trikk er inkludert i 30-dagersbilletten. For reiser i to eller tre soner gjelder minstepris.",
      sourceUrl: "https://www.atb.no/",
    },
  ),
  studentOffer(
    "kolumbus",
    "kolumbus",
    "Kolumbus",
    "50 % rabatt",
    "Studenter får halv pris på de fleste bussbilletter hos Kolumbus.",
    "Transport",
    {
      terms:
        "Gjelder bussbilletter i Rogaland. Gjelder ikke Kombibillett. Enkelte nærsonebilletter kan være unntatt. Båtbilletter kan ha andre rabattregler. Gyldig studentlegitimasjon kreves.",
      sourceUrl: "https://www.kolumbus.no/",
    },
  ),
  studentOffer(
    "emirates",
    "emirates",
    "Emirates",
    "Studentpris",
    "Emirates tilbyr egne studentpriser og kan inkludere ekstra bagasje på kvalifiserende flyreiser.",
    "Transport",
    {
      terms:
        "Gjelder normalt heltidsstudenter. Aldersgrense og rabatt varierer etter kampanje og marked. Studentkode og studentbevis kan kreves.",
    },
  ),
  studentOffer(
    "wideroe",
    "wideroe",
    "Widerøe",
    "Student-/ungdomspris",
    "Widerøe tilbyr rabatterte priser for unge og studenter på utvalgte flyreiser.",
    "Transport",
    {
      terms:
        "Pris og tilgjengelighet varierer etter strekning og avgang. Aldersgrense eller studentbevis kan gjelde.",
      sourceUrl: "https://www.wideroe.no/",
    },
  ),
  studentOffer(
    "kilroy",
    "kilroy",
    "KILROY",
    "Student-/ungdomspris",
    "KILROY tilbyr student- og ungdomspriser på utvalgte flybilletter, reiser og opplevelser.",
    "Transport",
    {
      terms:
        "Rabatten varierer etter flyselskap, destinasjon og produkt. Studentbevis eller aldersgrense kan gjelde.",
      sourceUrl: "https://www.kilroy.no/",
    },
  ),
  studentOffer(
    "ark",
    "ark",
    "ARK",
    "20 % på norske bøker",
    "20 % på norske pensumbøker og 10 % på engelske fagbøker hos ARK.",
    "Pensum",
    {
      terms:
        "Gjelder ikke bøker utgitt de siste 12 månedene, e-bøker eller lydbøker. Kampanjen varer til 27. september 2026.",
      sourceUrl: "https://www.ark.no/pensum",
      expiresAt: "2026-09-27",
    },
  ),
  studentOffer(
    "onecall",
    "onecall",
    "OneCall",
    "30 GB for 279 kr",
    "StudentPakka gir 30 GB for 279 kr per måned uten bindingstid.",
    "Mobil og abonnement",
    {
      terms:
        "279 kr per måned. Ingen månedsavgift i juli og desember. Ingen bindingstid. Krever studentstatus og norsk personnummer. OneCalls egen side har en motstridende FAQ som fortsatt nevner 15 GB. Bruk 30 GB fra produktkortet, men kontroller ved neste oppdatering.",
      sourceUrl: "https://onecall.no/mobilabonnement/studentpakka",
    },
  ),
  studentOffer(
    "apple",
    "apple",
    "Apple",
    "5–10 % utdanningsrabatt",
    "Studenter kan få rabatt på Mac og iPad gjennom Apples student- og utdanningstilbud.",
    "PC og elektronikk",
    {
      terms:
        "Gjelder kvalifiserte studenter. Kan kreve verifisering av studentstatus. Produkter, rabatt og kampanjer kan endres.",
      sourceUrl: "https://www.apple.com/no-edu/store",
    },
  ),
  studentOffer(
    "apple-music",
    "apple-music",
    "Apple Music",
    "Studentabonnement",
    "Egen studentpris på Apple Music. Apple TV er inkludert uten ekstra kostnad.",
    "Mobil og abonnement",
    {
      terms:
        "Studentstatus må bekreftes. Bruk ikke et fast kronebeløp uten ny priskontroll.",
      sourceUrl: "https://www.apple.com/no-edu/store",
    },
  ),
  studentOffer(
    "samsung",
    "samsung",
    "Samsung",
    "Fra 15 % rabatt",
    "Studentportalen viser blant annet 20 % på Galaxy, fra 15 % på TV og skjermer og fra 25 % på hvitevarer.",
    "PC og elektronikk",
    {
      terms:
        "Krever Samsung-konto og godkjent studentadresse. Utvalg og rabatt kan endres.",
      sourceUrl: "https://www.samsung.com/no/offer/student-discounts/",
    },
  ),
  studentOffer(
    "dell",
    "dell",
    "Dell",
    "Opptil 10 % rabatt",
    "Studenter kan hente en kupong som gir opptil 10 % rabatt på kvalifiserte produkter.",
    "PC og elektronikk",
    {
      terms: "Studentstatus må verifiseres. Unntak gjelder.",
      sourceUrl: "https://www.dell.com/no-no/lp/students",
    },
  ),
  studentOffer(
    "eplehuset",
    "eplehuset",
    "Eplehuset",
    "Studentpris på Mac og iPad",
    "Spar fra 1 000 kr på MacBook og få 5 % på andre Mac- og iPad-modeller.",
    "PC og elektronikk",
    {
      terms:
        "Gjelder i butikk og på nett. Kontroller modellutvalget ved oppdatering.",
      sourceUrl: "https://eplehuset.no/pages/studenter",
    },
  ),
  studentOffer(
    "adobe",
    "adobe",
    "Adobe Creative Cloud",
    "Studentpris",
    "Studenter får egen rabattert pris på Adobe Creative Cloud. Prisen kan øke etter introduksjonsperioden.",
    "Programvare",
    {
      terms:
        "Studentstatus må verifiseres. Introduksjonspris kan øke etter første avtaleperiode. Abonnementet kan ha bindingstid. Omfatter normalt apper som Photoshop, Illustrator, Premiere Pro og Acrobat Pro.",
      sourceUrl: "https://www.adobe.com/no/creativecloud/buy/students.html",
    },
  ),
  studentOffer(
    "microsoft-365",
    "microsoft-365",
    "Microsoft 365 Education",
    "Gratis via studiested",
    "Mange studenter kan få Microsoft 365 gratis gjennom universitetet, høyskolen eller skolen sin.",
    "Programvare",
    {
      terms:
        "Krever normalt e-postadresse fra en kvalifisert skole eller utdanningsinstitusjon. Tilgjengelige programmer (Word, Excel, PowerPoint, Teams, OneNote m.m.) avhenger av skolens avtale. Tilgangen kan opphøre når studenten avslutter studiet.",
      sourceUrl: "https://www.microsoft.com/nb-no/education/products/office",
    },
  ),
  studentOffer(
    "github",
    "github",
    "GitHub",
    "Student Developer Pack · gratis",
    "Gratis tilgang til profesjonelle utviklerverktøy og partnertilbud.",
    "Programvare",
    {
      terms:
        "Krever skoleadresse eller dokumentasjon på aktiv utdanning.",
      sourceUrl: "https://github.com/education/students",
    },
  ),
  studentOffer(
    "notion",
    "notion",
    "Notion",
    "Education Plan · gratis",
    "Gratis utdanningsplan for én bruker.",
    "Programvare",
    {
      terms:
        "Krever godkjent høyskole eller universitet og skoleadresse. Studentstatus kontrolleres årlig.",
      sourceUrl: "https://www.notion.com/help/notion-for-education",
    },
  ),
  studentOffer(
    "figma",
    "figma",
    "Figma",
    "Education Plan · gratis",
    "Figma og profesjonelle designverktøy er gratis for kvalifiserte studenter og undervisere.",
    "Programvare",
    {
      terms: "Studentstatus må verifiseres.",
      sourceUrl: "https://www.figma.com/education/higher-education/",
    },
  ),
  studentOffer(
    "jetbrains",
    "jetbrains",
    "JetBrains",
    "Student Pack · gratis",
    "Gratis tilgang til JetBrains-verktøy for kvalifiserte studenter.",
    "Programvare",
    {
      terms:
        "Krever studentverifisering. Utdanningslisensen kan ikke brukes kommersielt.",
      sourceUrl: "https://www.jetbrains.com/academy/student-pack/",
    },
  ),
  studentOffer(
    "autodesk",
    "autodesk",
    "Autodesk",
    "Education · gratis i ett år",
    "Gratis ettårstilgang til Autodesk-programmer for kvalifiserte studenter.",
    "Programvare",
    {
      terms:
        "Kan fornyes årlig. Bare til utdanning og forskning, ikke kommersiell bruk.",
      sourceUrl: "https://www.autodesk.com/education/edu-software/overview",
    },
  ),
  studentOffer(
    "spotify",
    "spotify",
    "Spotify Premium Student",
    "Studentpris",
    "Studenter ved kvalifiserte utdanningsinstitusjoner får rabattert pris på Spotify Premium.",
    "Mobil og abonnement",
    {
      terms:
        "Gjelder kvalifiserte studenter ved høyere utdanning. Studentstatus må verifiseres regelmessig. Rabatten gjelder i en begrenset totalperiode.",
      sourceUrl: "https://www.spotify.com/no/student/",
    },
  ),
  studentOffer(
    "youtube-premium",
    "youtube-premium",
    "YouTube Premium Student",
    "Studentpris",
    "Studenter kan få rabattert pris på YouTube Premium og YouTube Music Premium.",
    "Mobil og abonnement",
    {
      terms:
        "Krever bekreftet studentstatus. Studentstatus må verifiseres på nytt med jevne mellomrom.",
    },
  ),
  studentOffer(
    "egon",
    "egon",
    "EGON",
    "Buffet fra 147 kr",
    "Egen studentmeny for studenter ved universitet og høyskole.",
    "Mat og restaurant",
    {
      terms:
        "Pizzabuffet koster 147 kr hele søndag og mandag og fram til kl. 18 andre dager. Gyldig studentbevis må vises.",
      sourceUrl: "https://egon.no/studentmeny",
    },
  ),
  studentOffer(
    "peppes",
    "peppes",
    "Peppes Pizza",
    "20 % rabatt",
    "20 % på mat og drikke for studenter og vernepliktige.",
    "Mat og restaurant",
    {
      terms:
        "Vis gyldig studentbevis. Sjekk om alkohol, levering eller andre tilbud er unntatt.",
      sourceUrl: "https://live.peppes.no/about/student-discount",
    },
  ),
  studentOffer(
    "dominos",
    "dominos",
    "Domino's",
    "20 % rabatt",
    "20 % på pizza, sideretter og drikke hele året med koden STUD2026.",
    "Mat og restaurant",
    {
      terms: "Gyldig studentbevis må vises ved henting.",
      sourceUrl: "https://www.dominos.no/side/studentrabatt",
    },
  ),
  studentOffer(
    "pizzabakeren",
    "pizzabakeren",
    "Pizzabakeren",
    "20 % på pizza",
    "Bestill på nett eller i app med koden studentrabatt.",
    "Mat og restaurant",
    {
      terms:
        "Gjelder universitet, høyskole, fagskole og krigsskole, men ikke videregående. Studentbevis og legitimasjon kreves. Kan ikke kombineres med andre tilbud.",
      sourceUrl: "https://www.pizzabakeren.no/studentrabatt",
    },
  ),
  studentOffer(
    "sabrura",
    "sabrura",
    "Sabrura",
    "Buffet og 10 % takeaway",
    "Buffet til 219 kr før kl. 14 på hverdager og 249 kr ellers. 10 % på takeaway bestilt på telefon eller i kassen.",
    "Mat og restaurant",
    {
      terms: "Gyldig studentbevis kreves.",
      sourceUrl: "https://www.sabrurasushi.no/student/",
    },
  ),
  studentOffer(
    "jordbaerpikene",
    "jordbaerpikene",
    "Jordbærpikene",
    "15 % rabatt",
    "15 % studentrabatt på mat og drikke.",
    "Mat og restaurant",
    {
      terms:
        "Vis gyldig studentbevis. Kontroller lokale unntak før du bruker tilbudet.",
      sourceUrl: "https://www.jordbaerpikene.no/",
    },
  ),
  studentOffer(
    "isushi",
    "isushi",
    "iSushi",
    "15 % rabatt",
    "15 % på mat og drikke ved henting og levering med koden Student26.",
    "Mat og restaurant",
    {
      terms:
        "Koden må legges inn på nytt hvert semester. Tilgjengeligheten følger iSushis leveringsområder.",
      sourceUrl: "https://www.isushi.no/studentrabatt/",
    },
  ),
  studentOffer(
    "sats",
    "sats",
    "SATS",
    "20 % fast rabatt",
    "Studenter får normalt 20 % av ordinær medlemspris. Studentstatus må dokumenteres og fornyes årlig.",
    "Trening og helse",
    {
      terms: "Studentstatus må dokumenteres og fornyes årlig.",
      sourceUrl: "https://www.sats.no/student",
    },
  ),
  studentOffer(
    "sats-kampanje",
    "sats-kampanje",
    "SATS",
    "40 % for nye medlemmer",
    "Kampanje gir 40 % rabatt for nye medlemmer med 12 måneders binding til og med 31. august 2026.",
    "Trening og helse",
    {
      terms:
        "Gjelder nye medlemmer med 12 måneders binding. Studentstatus må dokumenteres.",
      sourceUrl: "https://www.sats.no/student",
      expiresAt: "2026-08-31",
    },
  ),
  studentOffer(
    "dr-dropin",
    "dr-dropin",
    "Dr.Dropin",
    "15 % rabatt",
    "Studenter får 15 % rabatt på flere typer fysiske konsultasjoner hos Dr.Dropin. Studentmedlemskapet koster 50 kr per år.",
    "Trening og helse",
    {
      terms:
        "Krever studentmedlemskap (oppgitt til 50 kr for 12 måneder) og gyldig studentbevis. Rabatten gjelder fysiske konsultasjoner, blant annet allmennlege, hudlege, gynekolog, psykolog, psykiater, fysioterapeut, kiropraktor, øyelege og øre-nese-hals. Tilgjengelig i flere norske byer og digitalt.",
      sourceUrl: "https://drdropin.no/",
    },
  ),
  studentOffer(
    "nito",
    "nito",
    "NITO",
    "350 kr for studietiden",
    "350 kr for hele studietiden for fulltidsstudenter på bachelor- eller mastergrad innen ingeniør- og teknologifag.",
    "Medlemskap",
    {
      terms:
        "Reiseforsikring og Tryg Legehjelp er inkludert etter gjeldende vilkår.",
      sourceUrl: "https://www.nito.no/bli-medlem/",
    },
  ),
  studentOffer(
    "tekna",
    "tekna",
    "Tekna",
    "150 kr per semester",
    "For studenter som tar eller planlegger en teknisk-naturvitenskapelig mastergrad.",
    "Medlemskap",
    {
      terms:
        "Forsikringer, arrangementer, karrierehjelp og juridisk hjelp er inkludert etter gjeldende vilkår.",
      sourceUrl: "https://www.tekna.no/student/",
    },
  ),
  studentOffer(
    "nordea",
    "nordea",
    "Nordea",
    "Gratis dagligbank",
    "Gratis dagligbank med bankkort for studenter fra 18 til 33 år.",
    "Bank og forsikring",
    {
      terms:
        "Krever brukskonto i Nordea. Elev, lærling og førstegangstjeneste kan også kvalifisere.",
      sourceUrl:
        "https://www.nordea.no/privat/vare-produkter/kundekonsepter/student.html",
    },
  ),
  studentOffer(
    "studentkortet",
    "studentkortet",
    "Studentkortet",
    "Over 250 rabatter · gratis",
    "Gratis medlemskap for studenter, elever, lærlinger og personer under utdanning i Forsvaret.",
    "Rabattportaler",
    {
      terms: "Hvert partnertilbud har egne vilkår.",
      sourceUrl: "https://studentkortet.no/sider/om/studentkortet",
    },
  ),
  studentOffer(
    "unidays",
    "unidays",
    "UNiDAYS",
    "Rabatter fra ulike merker",
    "Gratis portal med tilbud fra norske og internasjonale merker.",
    "Rabattportaler",
    {
      terms: "Krever studentverifisering. Tilbudene endres ofte.",
      sourceUrl: "https://www.myunidays.com/NO/nb-NO",
    },
  ),
  studentOffer(
    "interflora",
    "interflora",
    "Interflora",
    "10 % rabatt",
    "Studenter får 10 % rabatt på bestillinger hos Interflora. Gjelder ikke gavekort.",
    "Netthandel",
    {
      terms:
        "Rabattkode: Student10. Gjelder ikke gavekort. Rabatten er kun gyldig i nettbutikken.",
      sourceUrl: "https://www.interflora.no/",
    },
  ),
  studentOffer(
    "odeon",
    "odeon",
    "ODEON Kino",
    "Studentkino 99 kr",
    "Studenter kan få kinobillett til 99 kr hos utvalgte ODEON-kinoer på studentkino.",
    "Underholdning",
    {
      terms:
        "Gjelder normalt siste torsdag i måneden på studentforestillinger i Oslo, Stavanger og Ålesund. Liten popcornmeny til 49 kr. Studentbevis må fremvises. Tilgjengeligheten varierer etter kino.",
    },
  ),
  studentOffer(
    "lucky-bowl",
    "lucky-bowl",
    "Lucky Bowl",
    "2 for 1",
    "Studenter får to bowlingserier til prisen av én hos deltakende Lucky Bowl-avdelinger.",
    "Underholdning",
    {
      terms:
        "Gjelder normalt drop-in søndag–torsdag. Gyldig studentbevis kreves. Tilbudet kan variere mellom avdelingene.",
    },
  ),
  studentOffer(
    "dnt",
    "dnt",
    "Den Norske Turistforening",
    "Ungdoms-/medlemspris",
    "Studenter og unge kan få redusert medlemspris og lavere overnattingspris på DNT-hytter.",
    "Underholdning",
    {
      terms:
        "DNT bruker hovedsakelig aldersbaserte medlemskategorier. Fordelen er derfor ikke alltid en ren studentrabatt. Medlemspris på overnatting på DNT-hytter, samt rabatter på enkelte kurs og aktiviteter.",
      sourceUrl: "https://www.dnt.no/",
    },
  ),
  studentOffer(
    "cutters",
    "cutters",
    "Cutters",
    "20 % rabatt",
    "Skjult: aktiv studentrabatt kunne ikke bekreftes på Cutters' egen side per 29. august 2026.",
    "Trening og helse",
    { status: "draft" },
  ),
  studentOffer(
    "los-tacos",
    "los-tacos",
    "Los Tacos",
    "20 % rabatt",
    "Skjult: 20 % studentrabatt kunne ikke bekreftes hos kjeden per 29. august 2026.",
    "Mat og restaurant",
    { status: "draft" },
  ),
  studentOffer(
    "schibsted",
    "schibsted",
    "Schibsted-aviser",
    "Opptil 50 % rabatt",
    "Skjult: generelt kort uten konkret pris og kilde per avis per 29. august 2026.",
    "Mobil og abonnement",
    { status: "draft" },
  ),
];
