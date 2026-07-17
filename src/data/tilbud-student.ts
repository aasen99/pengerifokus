import type { Tilbud } from "@/types/content";

const studentCheckedAt = "2026-07-17";
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
  },
): Tilbud {
  return {
    id: `tilbud-student-${id}`,
    slug: `student-${slug}`,
    status: "published",
    title: partner,
    description,
    offerLabel,
    partner,
    fordelSlug: "student",
    category,
    terms: options?.terms ?? studentBaseTerms,
    sourceUrl: options?.sourceUrl,
    createdAt: studentCheckedAt,
    updatedAt: studentCheckedAt,
  };
}

/** Studentrabatter hos store selskaper. Sjekket 17. juli 2026. */
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
    "Reise",
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
    "Reise",
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
    "Reise",
    {
      terms:
        "Rabatten varierer etter flyselskap, destinasjon og produkt. Studentbevis eller aldersgrense kan gjelde.",
      sourceUrl: "https://www.kilroy.no/",
    },
  ),
  studentOffer(
    "apple",
    "apple",
    "Apple",
    "5–10 % utdanningsrabatt",
    "Studenter kan få rabatt på Mac og iPad gjennom Apples student- og utdanningstilbud. StudentTorget oppgir blant annet 10 % på Mac og 5 % på iPad.",
    "Elektronikk",
    {
      terms:
        "Gjelder kvalifiserte studenter. Kan kreve verifisering av studentstatus. Produkter, rabatt og kampanjer kan endres. Apple har egne utdanningspriser som kan avvike fra StudentTorget-tilbudet.",
      sourceUrl: "https://www.apple.com/no/store",
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
    "spotify",
    "spotify",
    "Spotify Premium Student",
    "Studentpris",
    "Studenter ved kvalifiserte utdanningsinstitusjoner får rabattert pris på Spotify Premium.",
    "Abonnement",
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
    "Abonnement",
    {
      terms:
        "Krever bekreftet studentstatus. Studentstatus må verifiseres på nytt med jevne mellomrom.",
    },
  ),
  studentOffer(
    "schibsted",
    "schibsted",
    "Schibsted-aviser",
    "Opptil 50 % rabatt",
    "Flere store Schibsted-aviser tilbyr rabatterte digitale abonnementer til studenter og unge, blant annet Aftenposten, BT, Aftenbladet og Adresseavisen.",
    "Abonnement",
    {
      terms:
        "Flere Schibsted-aviser tilbyr redusert pris til studenter eller personer under en bestemt alder. Enkelte tilbud gir første måned til svært lav pris. Deretter kan rabatten være opptil 50 %. Aldersgrense kan brukes i stedet for studentstatus. Pris varierer mellom avisene.",
    },
  ),
  studentOffer(
    "dr-dropin",
    "dr-dropin",
    "Dr.Dropin",
    "15 % rabatt",
    "Studenter får 15 % rabatt på flere typer fysiske konsultasjoner hos Dr.Dropin. Studentmedlemskapet koster 50 kr per år.",
    "Helse",
    {
      terms:
        "Krever studentmedlemskap (oppgitt til 50 kr for 12 måneder) og gyldig studentbevis. Rabatten gjelder fysiske konsultasjoner, blant annet allmennlege, hudlege, gynekolog, psykolog, psykiater, fysioterapeut, kiropraktor, øyelege og øre-nese-hals. Tilgjengelig i flere norske byer og digitalt.",
      sourceUrl: "https://drdropin.no/",
    },
  ),
  studentOffer(
    "cutters",
    "cutters",
    "Cutters",
    "20 % rabatt",
    "Studenter får 20 % rabatt hos Cutters, og nye studentkunder kan få første klipp til 199 kr.",
    "Helse",
    {
      terms:
        "20 % rabatt på ordinær klipp. Bestilling og betaling skjer i Cutters-appen. Rabattkode kreves. Førstegangstilbud (199 kr) gjelder nye studentkunder via StudentTorget. Oppgitt ordinær studentpris: 343 kr, vanlig pris: 429 kr.",
    },
  ),
  studentOffer(
    "los-tacos",
    "los-tacos",
    "Los Tacos",
    "20 % rabatt",
    "Studenter får 20 % rabatt på mat hos Los Tacos. Rabatten gjelder ikke alkohol.",
    "Restaurant",
    {
      terms:
        "Gjelder ikke alkohol. Gyldig studentbevis kan kreves. Sjekk om alle avdelinger deltar.",
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
    "Sport",
    {
      terms:
        "DNT bruker hovedsakelig aldersbaserte medlemskategorier. Fordelen er derfor ikke alltid en ren studentrabatt. Medlemspris på overnatting på DNT-hytter, samt rabatter på enkelte kurs og aktiviteter.",
      sourceUrl: "https://www.dnt.no/",
    },
  ),
];
