import type { Tilbud } from "@/types/content";

const usblCheckedAt = "2026-07-16";
const usblBaseTerms =
  "Krever Usbl-medlemskap. Mange fordeler krever innlogging i Bonabo, rabattkode eller betaling med bankkort registrert i Bonabo. Sjekk gjeldende vilkår hos Usbl.";

function usblOffer(
  id: string,
  slug: string,
  partner: string,
  offerLabel: string,
  description: string,
  category: string,
  options?: {
    terms?: string;
    warning?: string;
    sourceUrl?: string;
  },
): Tilbud {
  return {
    id: `tilbud-usbl-${id}`,
    slug: `usbl-${slug}`,
    status: "published",
    title: partner,
    description,
    offerLabel,
    partner,
    fordelSlug: "usbl",
    category,
    terms: options?.terms ?? usblBaseTerms,
    sourceUrl:
      options?.sourceUrl ??
      "https://www.usbl.no/medlemskap/medlemsfordeler",
    warning: options?.warning,
    createdAt: usblCheckedAt,
    updatedAt: usblCheckedAt,
  };
}

/** Usbl-medlemsfordeler. Sjekket 16. juli 2026 mot usbl.no. */
export const usblTilbud: Tilbud[] = [
  usblOffer(
    "heder-bank",
    "heder-bank",
    "Heder Bank",
    "Gratis tinglysningsgebyr (545 kr)",
    "Usbl-medlemmer kan flytte boliglånet til Heder Bank uten tinglysningsgebyr, en oppgitt verdi på 545 kr.",
    "Bank",
    {
      terms:
        "Krever Usbl-medlemskap og boliglånssøknad hos Heder Bank. Banken kobler mobilnummer til medlemskapet. Heder Bank gjør egen kredittvurdering. Sjekk rente og vilkår direkte hos Heder Bank.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/heder-bank",
    },
  ),
  usblOffer(
    "if",
    "if",
    "If",
    "15 % rabatt",
    "Usbl-medlemmer får 15 % rabatt fra første skadeforsikringsprodukt hos If og 70 % startbonus på bil.",
    "Forsikring",
    {
      terms:
        "Krever Usbl-medlemskap. Direkte inn på nivå 2 i Ifs fordelsprogram. If Start gratis første år. Endelig pris avhenger av forsikringstype, kundeprofil og Ifs vurdering.",
      sourceUrl:
        "https://www.usbl.no/medlemskap/medlemsfordeler/if-forsikring-for-medlemmer",
    },
  ),
  usblOffer(
    "polar-kraft",
    "polar-kraft",
    "Polar Kraft",
    "2 % bonus",
    "Usbl-medlemmer får 2 % bonus på strømforbruket gjennom Usbl Strøm fra Polar Kraft. Avtalen har påslag på 3,63 øre/kWh og fastbeløp på 29 kr/mnd.",
    "Strøm",
    {
      terms:
        "Spotprisavtale som følger Nord Pool time for time. Bonus beregnes av faktisk strømkostnad etter at strømstøtte er trukket fra. Medlemskortnummer må oppgis for å få bonus.",
      warning:
        "Ikke vurder 2 % bonus isolert. Ta med påslag (3,63 øre/kWh) og fastbeløp (29 kr/mnd) når du sammenligner strømavtaler.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/usbl-strom",
    },
  ),
  usblOffer(
    "monter",
    "monter",
    "Montér",
    "5 % bonus + 5 % rabatt",
    "Usbl-medlemmer får 5 % bonus hos utvalgte Montér-butikker, samt rabatter på ordinære varer og enkelte bestillingsvarer.",
    "Byggevare",
    {
      terms:
        "Gjelder kun i utvalgte Montér-byggevarehus og kun kjøp i butikk. Medlemsbevis må fremvises. Kan ikke kombineres med andre fordelsprogram. 5 % rabatt gjelder ikke nettopris eller kampanjevarer. 10 % rabatt på enkelte bestillingsvarer (dør, garderobe, peis). Inntil 35 % rabatt på vindu og balkongdør som bestillingsvarer.",
      warning: "Gjelder kun utvalgte varehus, ikke landsdekkende nettverk.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/monter",
    },
  ),
  usblOffer(
    "skousen",
    "skousen",
    "Skousen",
    "15 % rabatt + 5 % bonus",
    "Usbl-medlemmer får 15 % rabatt på butikkført sortiment og 5 % bonus hos Skousen hvitevarer.",
    "Elektronikk",
    {
      terms:
        "Bonus gjelder alle varer, men ikke nettkjøp. Betaling må skje med registrert betalingskort for bonus. Rabatt gjelder kun ordinære priser. Medlemskort må fremvises.",
      sourceUrl:
        "https://www.usbl.no/medlemskap/medlemsfordeler/skousen-hvitevarer",
    },
  ),
  usblOffer(
    "bohus",
    "bohus",
    "Bohus",
    "3–5 % bonus + 5–10 % rabatt",
    "Usbl-medlemmer får bonus og rabatt hos utvalgte Bohus-varehus. Satsene varierer etter butikk.",
    "Interiør",
    {
      terms:
        "Bonus og rabatt varierer etter varehus. Bonus gjelder ikke kjøp på nett. Rabatt gjelder ordinære priser ved fremvisning av medlemsbevis.",
      warning: "Satsene varierer etter varehus. Sjekk din lokale butikk.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/bohus",
    },
  ),
  usblOffer(
    "apotekhjem",
    "apotekhjem",
    "Apotekhjem.no",
    "7 % bonus",
    "Usbl-medlemmer får 7 % bonus på apotekvarer for mennesker og dyr hos Apotekhjem.no.",
    "Helse",
    {
      terms:
        "Må gå via Usbl/Bonabo. Bonus vises i Bonabo 30–90 dager etter transaksjonen. Gjelder apotekvarer hos Apotekhjem.no.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/apotekhjem.no",
    },
  ),
  usblOffer(
    "oris-dental",
    "oris-dental",
    "Oris Dental",
    "8 % rabatt + 5 % bonus",
    "Usbl-medlemmer får 5 % bonus og 8 % rabatt på tannsjekk og behandlinger hos Oris Dental.",
    "Helse",
    {
      terms:
        "Medlemskap må oppgis ved bestilling og medlemsbevis vises ved betaling. Betal med bankkort registrert i Bonabo for bonus. Rabatt gjelder ikke salgsvarer, spesialistbehandlinger, hygienetillegg og tannteknikerarbeid kjøpt utenfra.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/oris-dental",
    },
  ),
  usblOffer(
    "bestdrive",
    "bestdrive",
    "BestDrive",
    "5 % bonus + 10 % verksted",
    "Usbl-medlemmer får 5 % bonus hos BestDrive, 10 % rabatt på utvalgte verkstedtjenester og 500 kr rabatt på første sesong dekkhotell.",
    "Bil",
    {
      terms:
        "Avtalen gjelder ikke hos alle BestDrive-partnere. Rabatt gjelder ikke allerede nedsatte varer. Verkstedtjenester gjelder kun utvalgte avdelinger. Medlemsbevis for rabatt. Bonus krever bankkort registrert i Bonabo. Dekkhotell: 500 kr første sesong + 5 % bonus, 15 % andre sesong + 5 % bonus.",
      warning: "Gjelder ikke alle BestDrive-partnere. Sjekk din lokale avdeling.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/bestdrive",
    },
  ),
  usblOffer(
    "ragn-sells",
    "ragn-sells",
    "Ragn-Sells",
    "12 % rabatt",
    "Usbl-medlemmer får 12 % rabatt på containerleie og SmartBag hos Ragn-Sells.",
    "Bolig",
    {
      terms:
        "Gjelder bestilling i Ragn-Sells nettbutikk for containerutleie. Containerleie gjelder fastpris for blandet avfall og opptil fire dager leietid.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/ragn-sells",
    },
  ),
  usblOffer(
    "lagerboks",
    "lagerboks",
    "Lagerboks",
    "10 % rabatt",
    "Usbl-medlemmer får 10 % rabatt på lagring og flytteemballasje hos Lagerboks, samt gratis utkjøring i Oslo ved kjøp over 300 kr.",
    "Bolig",
    {
      terms:
        "Lagerboks har avdelinger i Oslo og Drammen. Gratis utkjøring av emballasje gjelder Oslo ved kjøp over 300 kr.",
      warning: "Lokalt tilbud: Oslo og Drammen.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/lagerboks",
    },
  ),
  usblOffer(
    "thon-hotels",
    "thon-hotels",
    "Thon Hotels",
    "12 % rabatt",
    "Usbl-medlemmer får 12 % rabatt på ordinær pris hos Thon Hotels i Norge og Sverige.",
    "Hotell",
    {
      terms:
        "Gjelder Thon Hotels i Norge og Sverige. Frokost inkludert. Fri kansellering frem til kl. 16 samme dag. Betaling på hotellet. Booking må gjøres via Usbl/Thon-lenke.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/thon-hotels",
    },
  ),
  usblOffer(
    "nextory",
    "nextory",
    "Nextory",
    "6 uker gratis + 5 % bonus",
    "Usbl-medlemmer får ordinært 6 uker gratis prøveabonnement og 5 % bonus hos Nextory. Kampanje: 10 uker gratis til og med 31. august 2026.",
    "Underholdning",
    {
      terms:
        "Krever innlogging og medlemsnummer. Betalingskort må være registrert i Bonabo for bonus. Ordinært tilbud: 6 uker gratis. Kampanje 10 uker gratis gjelder til 31. august 2026.",
      warning:
        "Kampanjen med 10 uker gratis gjelder til og med 31. august 2026. Deretter gjelder ordinært 6 uker gratis.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/nextory",
    },
  ),
  usblOffer(
    "nki",
    "nki",
    "NKI Nettstudier",
    "22 % rabatt",
    "Usbl-medlemmer får 22 % rabatt på fag og kurs hos NKI Nettstudier.",
    "Utdanning",
    {
      terms:
        "Rabattkode finnes i Bonabo. Logg inn, hent unik rabattkode og meld deg på via NKI.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/nki-nettstudier",
    },
  ),
  usblOffer(
    "tusenfryd",
    "tusenfryd",
    "TusenFryd",
    "Opptil 25 % rabatt",
    "Usbl-medlemmer får opptil 25 % rabatt på datofestede billetter til TusenFryd.",
    "Opplevelser",
    {
      terms:
        "Gjelder datofestede billetter over 120 cm. Kan ikke kombineres med andre tilbud. Alle attraksjoner unntatt SkyCoaster og The Dungeon er inkludert. Rabattkode hentes i Bonabo.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/tusenfryd",
    },
  ),
  usblOffer(
    "bo-sommarland",
    "bo-sommarland",
    "Bø Sommarland",
    "20–30 % rabatt",
    "Usbl-medlemmer får 20–30 % rabatt på billetter til Bø Sommarland, og 50 % rabatt på Cabana i juni og august.",
    "Opplevelser",
    {
      terms:
        "Sesongbasert tilbud for 2026: 30 % på billetter i juni og august, 20 % i juli. 50 % på Cabana i juni og august.",
      warning: "Sesongtilbud for 2026. Sjekk at det fortsatt gjelder før du booker.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/bo-sommarland",
    },
  ),
  usblOffer(
    "the-well",
    "the-well",
    "The Well",
    "15–20 % rabatt",
    "Usbl-medlemmer får 20 % rabatt på utvalgte spa-pass og 15 % rabatt på overnatting mandag–fredag hos The Well.",
    "Helse",
    {
      terms:
        "20 % på Daypass, Daypass helg og Eveningpass. 15 % på overnatting mandag–fredag (ikke røde dager). Book minst 24 timer før ankomst. Gjelder ett medlem + én følge, avhengig av tilgjengelighet.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/the-well",
    },
  ),
  usblOffer(
    "hadeland-glassverk",
    "hadeland-glassverk",
    "Hadeland Glassverk",
    "10 % rabatt + 5 % bonus",
    "Usbl-medlemmer får 10 % rabatt på ordinære varer og 5 % bonus hos Hadeland Glassverk.",
    "Interiør",
  ),
  usblOffer(
    "telia",
    "telia",
    "Telia",
    "Apple TV til 499 kr",
    "Usbl-medlemmer kan få Apple TV til 499 kr ved bestilling av trådløst bredbånd på hytta hos Telia. Førpris oppgitt til 1 999 kr.",
    "Mobil",
    {
      terms:
        "Kampanje på trådløst bredbånd på hytta. Hastigheter fra 25 til 300 Mbps. Sjekk gjeldende tilbud og pris hos Usbl/Telia før bestilling.",
      warning: "Kampanje. Tilbud og pris kan endres. Verifiser før kjøp.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/telia",
    },
  ),
  usblOffer(
    "skiguard",
    "skiguard",
    "Skiguard",
    "10–20 % rabatt",
    "Usbl-medlemmer får 10 % rabatt på takbokser og takstativ, og 20 % rabatt på lagring av takboks hos Skiguard.",
    "Bil",
    {
      terms: "Medlemsbevis må vises ved kjøp i Skiguards butikk.",
      sourceUrl: "https://www.usbl.no/medlemskap/medlemsfordeler/skiguard",
    },
  ),
  usblOffer(
    "fjordfesten",
    "fjordfesten",
    "Fjordfesten",
    "15 % rabatt",
    "Usbl-medlemmer får 15 % rabatt på festivalbilletter til Fjordfesten.",
    "Kultur",
    {
      warning: "Festival-/sesongtilbud. Sjekk at det fortsatt gjelder.",
    },
  ),
  usblOffer(
    "piknik-i-parken",
    "piknik-i-parken",
    "Piknik i Parken",
    "20 % rabatt",
    "Usbl-medlemmer får 20 % rabatt på Piknik i Parken.",
    "Kultur",
    {
      warning: "Festival-/sesongtilbud. Sjekk at det fortsatt gjelder.",
    },
  ),
  usblOffer(
    "kistefos",
    "kistefos",
    "Kistefos",
    "20 % rabatt",
    "Usbl-medlemmer får 20 % rabatt på billetter hos Kistefos.",
    "Kultur",
  ),
  usblOffer(
    "maihaugen",
    "maihaugen",
    "Maihaugen",
    "15 % rabatt",
    "Usbl-medlemmer får 15 % rabatt på gjeldende priser hos Maihaugen.",
    "Kultur",
  ),
  usblOffer(
    "kinoklubben",
    "kinoklubben",
    "Kinoklubben",
    "Halv pris",
    "Usbl-medlemmer kan bli medlem i Kinoklubben og få halv pris på flere kinofilmer.",
    "Underholdning",
  ),
  usblOffer(
    "alpinco",
    "alpinco",
    "Alpinco",
    "10 % rabatt",
    "Usbl-medlemmer får 10 % rabatt på skipass og overnatting hos Hafjell, Kvitfjell og Oppdal.",
    "Sport",
    {
      warning: "Sesongtilbud. Sjekk at det fortsatt gjelder.",
    },
  ),
  usblOffer(
    "frisk-asker",
    "frisk-asker",
    "Frisk Asker Ishockey",
    "30 % rabatt",
    "Usbl-medlemmer får 30 % rabatt på ishockeykamper hos Frisk Asker.",
    "Sport og event",
    {
      warning: "Lokalt tilbud: Varner Arena / Asker.",
    },
  ),
  usblOffer(
    "padel-tonsberg",
    "padel-tonsberg",
    "Padel Tønsberg",
    "30 % rabatt",
    "Usbl-medlemmer får 30 % rabatt på banebooking hos Padel Tønsberg innen angitte tider.",
    "Sport",
    {
      warning: "Lokalt tilbud: Tønsberg. Gjelder innen angitte tider.",
    },
  ),
  usblOffer(
    "larvik-golf",
    "larvik-golf",
    "Larvik Golfklubb",
    "300 kr rabatt",
    "Usbl-medlemmer får 300 kr rabatt på årsavgiften hos Larvik Golfklubb.",
    "Sport",
    {
      warning: "Lokalt tilbud: Larvik.",
    },
  ),
  usblOffer(
    "sankthanshaugen-5000",
    "sankthanshaugen-5000",
    "Sankthanshaugen 5000",
    "Opptil 35 % rabatt",
    "Usbl-medlemmer får opptil 35 % rabatt på Sankthanshaugen 5000-løpet.",
    "Sport og event",
    {
      warning: "Sesong-/arrangementstilbud. Sjekk at det fortsatt gjelder.",
    },
  ),
  usblOffer(
    "lyreco",
    "lyreco",
    "Lyreco",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus på kjøp i Lyrecos butikker i Norge.",
    "Netthandel",
  ),
  usblOffer(
    "byggmakker-sandefjord",
    "byggmakker-sandefjord",
    "Byggmakker Sandefjord",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus hos Byggmakker Sandefjord.",
    "Byggevare",
    {
      warning: "Lokalt tilbud: Sandefjord.",
    },
  ),
  usblOffer(
    "hurtigruta-carglass",
    "hurtigruta-carglass",
    "Hurtigruta Carglass",
    "5 % bonus + rabatt",
    "Usbl-medlemmer får 5 % bonus og rabatter hos Hurtigruta Carglass.",
    "Bil",
    {
      warning: "Konkrete rabattvilkår kan variere. Sjekk hos Usbl før kjøp.",
    },
  ),
  usblOffer(
    "interflora",
    "interflora",
    "Interflora",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus hos Interflora.",
    "Netthandel",
  ),
  usblOffer(
    "wright-trafikkskole",
    "wright-trafikkskole",
    "Wright Trafikkskole",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus hos Wright Trafikkskole.",
    "Bil",
  ),
  usblOffer(
    "lillehammer-trafikkskole",
    "lillehammer-trafikkskole",
    "Lillehammer Trafikkskole",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus på trafikkopplæring hos Lillehammer Trafikkskole.",
    "Bil",
    {
      warning: "Lokalt tilbud: Lillehammer.",
    },
  ),
  usblOffer(
    "fargerike-bjorvik",
    "fargerike-bjorvik",
    "Fargerike Bjørvik",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus, gratis befaring og fargeforslag hos Fargerike Bjørvik.",
    "Byggevare",
    {
      warning: "Lokalt tilbud.",
    },
  ),
  usblOffer(
    "fargerike-colibri",
    "fargerike-colibri",
    "Fargerike Colibri",
    "Opptil 15 % rabatt",
    "Usbl-medlemmer får opptil 15 % rabatt hos Fargerike Colibri.",
    "Byggevare",
    {
      warning: "Lokalt tilbud. Rabatt gjelder maling, pensler, tapet, gulvbelegg og gardiner.",
    },
  ),
  usblOffer(
    "modena-fliser",
    "modena-fliser",
    "Modena Fliser",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus på alle kjøp hos Modena Fliser.",
    "Byggevare",
  ),
  usblOffer(
    "bake-me-up",
    "bake-me-up",
    "Bake Me Up",
    "10 % bonus",
    "Usbl-medlemmer får 10 % bonus hos Bake Me Up.",
    "Restaurant",
  ),
  usblOffer(
    "jakt-og-friluft",
    "jakt-og-friluft",
    "Jakt & Friluft",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus hos Jakt & Friluft.",
    "Sport",
  ),
  usblOffer(
    "bubbleroom",
    "bubbleroom",
    "Bubbleroom",
    "4 % bonus",
    "Usbl-medlemmer får 4 % bonus hos Bubbleroom.",
    "Mote",
  ),
  usblOffer(
    "skruvat",
    "skruvat",
    "Skruvat.no",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus på netthandel hos Skruvat.no.",
    "Bil",
  ),
  usblOffer(
    "munk-store",
    "munk-store",
    "Munk Store",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus hos Munk Store.",
    "Mote",
  ),
  usblOffer(
    "skogstad-sport",
    "skogstad-sport",
    "Skogstad Sport",
    "5 % bonus",
    "Usbl-medlemmer får 5 % bonus hos Skogstad Sport.",
    "Sport",
  ),
];
