import type { Tilbud } from "@/types/content";

const eurobonusRestaurantBase =
  "Krever EuroBonus-medlemskap og registrert betalingskort i SAS sitt restaurant- og partnerprogram. Poeng opptjenes per 100 kr brukt. Sjekk deltakende steder og vilkår hos SAS.";

const eurobonusOnlineShoppingBase =
  "Kjøp via SAS Online Shopping (onlineshopping.flysas.com). Start handelen via portalen, logg inn med EuroBonus-konto, og fullfør kjøpet i samme økt. Poengsatser kan endres, og kampanjer kan gi ekstra poeng midlertidig. Sjekk aktuell sats i portalen før kjøp.";

const eurobonusCheckedAt = "2026-08-08";
const eurobonusSourceUrl = "https://www.sas.no/eurobonus/tilbud";
const eurobonusOnlineShoppingUrl = "https://onlineshopping.flysas.com/nb-NO/";

function eurobonusOffer(
  id: string,
  slug: string,
  partner: string,
  poengPer100Kr: number | string,
  category: string,
  options?: { warning?: string; terms?: string },
): Tilbud {
  const label =
    typeof poengPer100Kr === "number"
      ? `${poengPer100Kr} poeng / 100 kr`
      : poengPer100Kr;

  const poengText =
    typeof poengPer100Kr === "number"
      ? `${poengPer100Kr} EuroBonus-poeng per 100 kr`
      : poengPer100Kr.replace(" / 100 kr", " EuroBonus-poeng per 100 kr");

  return {
    id: `tilbud-eurobonus-${id}`,
    slug: `eurobonus-${slug}`,
    status: "published",
    title: partner,
    description: `Tjen ${poengText} hos ${partner} som EuroBonus-medlem.`,
    offerLabel: label,
    partner,
    fordelSlug: "eurobonus",
    category,
    terms: options?.terms ?? eurobonusRestaurantBase,
    sourceUrl: eurobonusSourceUrl,
    warning: options?.warning,
    createdAt: "2026-07-10",
    updatedAt: eurobonusCheckedAt,
  };
}

function eurobonusShoppingOffer(
  id: string,
  partner: string,
  offerLabel: string,
  description: string,
  category: string,
): Tilbud {
  return {
    id: `tilbud-eurobonus-os-${id}`,
    slug: `eurobonus-os-${id}`,
    status: "published",
    title: partner,
    description,
    offerLabel,
    partner,
    fordelSlug: "eurobonus",
    category,
    terms: eurobonusOnlineShoppingBase,
    sourceUrl: eurobonusOnlineShoppingUrl,
    createdAt: "2026-08-08",
    updatedAt: eurobonusCheckedAt,
  };
}

/** Restaurant- og partnerprogram (kort/sted), pluss SAS Online Shopping. */
export const eurobonusTilbud: Tilbud[] = [
  eurobonusOffer("wolt", "wolt", "Wolt", 10, "Matlevering"),
  eurobonusOffer("egon", "egon", "EGON", 50, "Restaurant"),
  eurobonusOffer("johnny-rockets", "johnny-rockets", "Johnny Rockets", 50, "Restaurant"),
  eurobonusOffer("escalon", "escalon", "Escalon", 100, "Restaurant"),
  eurobonusOffer("fish-and-cow", "fish-and-cow", "Fish & Cow", 60, "Restaurant"),
  eurobonusOffer("brasilia", "brasilia", "Brasilia", "50–60 poeng / 100 kr", "Restaurant", {
    warning: "Satsen kan variere mellom 50 og 60 poeng per 100 kr avhengig av kilde og lokasjon.",
  }),
  eurobonusOffer("fiskeriet", "fiskeriet", "Fiskeriet", 50, "Restaurant"),
  eurobonusOffer("fish-me", "fish-me", "Fish Me", 50, "Restaurant"),
  eurobonusOffer("glod", "glod", "Glød", 30, "Restaurant"),
  eurobonusOffer("mellom", "mellom", "Mellom", 30, "Restaurant"),
  eurobonusOffer(
    "fjellskal-fisketorget",
    "fjellskal-fisketorget",
    "Fjellskål Fisketorget",
    50,
    "Restaurant",
  ),
  eurobonusOffer("tiger-sushi-bar", "tiger-sushi-bar", "Tiger Sushi Bar", 50, "Restaurant"),
  eurobonusOffer("taxifix", "taxifix", "Taxifix", "Opptil 50 poeng / 100 kr", "Transport"),
  eurobonusOffer("rituals", "rituals", "Rituals", 50, "Mote"),
  eurobonusOffer("smarthotel", "smarthotel", "Smarthotel", 50, "Hotell"),
  eurobonusOffer("by-benson", "by-benson", "By Benson", 100, "Restaurant"),
  eurobonusOffer("bonner-i-byen", "bonner-i-byen", "Bønner i Byen", 50, "Restaurant"),
  eurobonusOffer("banken-hotel", "banken-hotel", "Banken Hotel", 50, "Hotell"),
  eurobonusOffer(
    "ac-perchs-thehandel",
    "ac-perchs-thehandel",
    "A.C. Perchs Thehandel",
    75,
    "Netthandel",
  ),
  eurobonusOffer("cruiseaway", "cruiseaway", "CruiseAway", 50, "Reise"),
  eurobonusOffer("ditec", "ditec", "Ditec-lokasjoner", 50, "Bil"),
  eurobonusOffer("escape-hunt-bergen", "escape-hunt-bergen", "Escape Hunt Bergen", 50, "Opplevelser"),
  eurobonusOffer(
    "fangene-pa-fortet-bergen",
    "fangene-pa-fortet-bergen",
    "Fangene på Fortet Bergen",
    50,
    "Opplevelser",
  ),
  eurobonusOffer("norfloor-lillehammer", "norfloor-lillehammer", "Norfloor Lillehammer", 100, "Interiør"),
  eurobonusOffer(
    "hurtigruta-carglass-stjordal",
    "hurtigruta-carglass-stjordal",
    "Hurtigruta Carglass Stjørdal",
    50,
    "Bil",
  ),

  // SAS Online Shopping (må gå via portalen, som Trumf Netthandel)
  eurobonusShoppingOffer("adidas", "Adidas", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Adidas via SAS Online Shopping.", "Sport"),
  eurobonusShoppingOffer("albert", "Albert", "500 poeng", "Tjen 500 EuroBonus-poeng hos Albert via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("babybanden", "Babybanden", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Babybanden via SAS Online Shopping.", "Netthandel"),
  eurobonusShoppingOffer("bookbeat", "Bookbeat", "250 poeng", "Tjen 250 EuroBonus-poeng hos Bookbeat via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("baerum-energi", "Bærum Energi", "1 500 poeng", "Tjen 1 500 EuroBonus-poeng hos Bærum Energi via SAS Online Shopping.", "Netthandel"),
  eurobonusShoppingOffer("caia-cosmetics", "CAIA Cosmetics", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos CAIA Cosmetics via SAS Online Shopping.", "Netthandel"),
  eurobonusShoppingOffer("cdon-com", "CDON.COM", "100 poeng", "Tjen 100 EuroBonus-poeng hos CDON.COM via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("cos", "COS", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos COS via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("cs-megastore", "CS Megastore", "10 poeng / 100 kr", "Tjen 10 EuroBonus-poeng per 100 kr hos CS Megastore via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("cyberghost-vpn", "CyberGhost VPN", "100 poeng / 100 kr", "Tjen 100 EuroBonus-poeng per 100 kr hos CyberGhost VPN via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("daniel-wellington", "Daniel Wellington", "50 poeng / 100 kr", "Tjen 50 EuroBonus-poeng per 100 kr hos Daniel Wellington via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("dentway", "Dentway", "180 poeng / 100 kr", "Tjen 180 EuroBonus-poeng per 100 kr hos Dentway via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("disney", "Disney+", "500 poeng", "Tjen 500 EuroBonus-poeng hos Disney+ via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("dressmann", "Dressmann", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Dressmann via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("dyrekassen", "Dyrekassen", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Dyrekassen via SAS Online Shopping.", "Dyretilbehør"),
  eurobonusShoppingOffer("ellos", "Ellos", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Ellos via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("elskling", "ELSKLING", "500 poeng", "Tjen 500 EuroBonus-poeng hos ELSKLING via SAS Online Shopping.", "Hus og hjem"),
  eurobonusShoppingOffer("fabel", "Fabel", "250 poeng", "Tjen 250 EuroBonus-poeng hos Fabel via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("farmasiet", "Farmasiet", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Farmasiet via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("fjordline", "Fjordline", "15 poeng / 100 kr", "Tjen 15 EuroBonus-poeng per 100 kr hos Fjordline via SAS Online Shopping.", "Reise"),
  eurobonusShoppingOffer("fortum-strom", "Fortum Strøm", "3 000 poeng", "Tjen 3 000 EuroBonus-poeng hos Fortum Strøm via SAS Online Shopping.", "Hus og hjem"),
  eurobonusShoppingOffer("foto-no", "Foto.no", "10 poeng / 100 kr", "Tjen 10 EuroBonus-poeng per 100 kr hos Foto.no via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("go-nordic-cruiseline", "Go Nordic Cruiseline", "15 poeng / 100 kr", "Tjen 15 EuroBonus-poeng per 100 kr hos Go Nordic Cruiseline via SAS Online Shopping.", "Reise"),
  eurobonusShoppingOffer("guttelus", "Guttelus", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Guttelus via SAS Online Shopping.", "Barn"),
  eurobonusShoppingOffer("gymgrossisten", "Gymgrossisten", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Gymgrossisten via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("hellofresh", "HelloFresh", "500 poeng", "Tjen 500 EuroBonus-poeng hos HelloFresh via SAS Online Shopping.", "Mat"),
  eurobonusShoppingOffer("husqvarna", "Husqvarna", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Husqvarna via SAS Online Shopping.", "Hus og hjem"),
  eurobonusShoppingOffer("ice", "ICE", "2 000 poeng", "Tjen 2 000 EuroBonus-poeng hos ICE via SAS Online Shopping.", "Mobil"),
  eurobonusShoppingOffer("inkclub", "InkClub", "50 poeng / 100 kr", "Tjen 50 EuroBonus-poeng per 100 kr hos InkClub via SAS Online Shopping.", "Netthandel"),
  eurobonusShoppingOffer("kinoklubb", "Kinoklubb", "250 poeng", "Tjen 250 EuroBonus-poeng hos Kinoklubb via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("komplett", "Komplett", "15 poeng / 100 kr", "Tjen 15 EuroBonus-poeng per 100 kr hos Komplett via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("kost1", "Kost1", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Kost1 via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("l-occitane", "L'Occitane", "50 poeng / 100 kr", "Tjen 50 EuroBonus-poeng per 100 kr hos L'Occitane via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("lindex", "Lindex", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Lindex via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("logitech", "Logitech", "10 poeng / 100 kr", "Tjen 10 EuroBonus-poeng per 100 kr hos Logitech via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("lux-case", "Lux-case", "80 poeng / 100 kr", "Tjen 80 EuroBonus-poeng per 100 kr hos Lux-case via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("lyko", "LYKO", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos LYKO via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("makeup-mekka", "Makeup Mekka", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Makeup Mekka via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("maxulin", "Maxulin", "1 000 poeng", "Tjen 1 000 EuroBonus-poeng hos Maxulin via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("memira", "Memira", "1 000 poeng", "Tjen 1 000 EuroBonus-poeng hos Memira via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("nextory", "Nextory", "250 poeng", "Tjen 250 EuroBonus-poeng hos Nextory via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("nicebeauty", "NiceBeauty", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos NiceBeauty via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("nordvpn", "NordVPN", "100 poeng / 100 kr", "Tjen 100 EuroBonus-poeng per 100 kr hos NordVPN via SAS Online Shopping.", "Mobil"),
  eurobonusShoppingOffer("norli", "Norli", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Norli via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("norton-by-symantec", "Norton by Symantec", "100 poeng / 100 kr", "Tjen 100 EuroBonus-poeng per 100 kr hos Norton by Symantec via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("oakley", "Oakley", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Oakley via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("outnorth", "Outnorth", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Outnorth via SAS Online Shopping.", "Sport"),
  eurobonusShoppingOffer("parfymonline", "Parfymonline", "50 poeng / 100 kr", "Tjen 50 EuroBonus-poeng per 100 kr hos Parfymonline via SAS Online Shopping.", "Helse"),
  eurobonusShoppingOffer("plussmobil", "PlussMobil", "1 000 poeng", "Tjen 1 000 EuroBonus-poeng hos PlussMobil via SAS Online Shopping.", "Mobil"),
  eurobonusShoppingOffer("proteinfabrikken", "Proteinfabrikken", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Proteinfabrikken via SAS Online Shopping.", "Sport"),
  eurobonusShoppingOffer("rains", "Rains", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Rains via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("readly", "Readly", "250 poeng", "Tjen 250 EuroBonus-poeng hos Readly via SAS Online Shopping.", "Netthandel"),
  eurobonusShoppingOffer("sail-racing", "Sail Racing", "50 poeng / 100 kr", "Tjen 50 EuroBonus-poeng per 100 kr hos Sail Racing via SAS Online Shopping.", "Sport"),
  eurobonusShoppingOffer("skeidar", "Skeidar", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Skeidar via SAS Online Shopping.", "Hus og hjem"),
  eurobonusShoppingOffer("sky-showtime", "Sky Showtime", "500 poeng", "Tjen 500 EuroBonus-poeng hos Sky Showtime via SAS Online Shopping.", "Hus og hjem"),
  eurobonusShoppingOffer("smartbuyglasses", "SmartBuyGlasses", "50 poeng / 100 kr", "Tjen 50 EuroBonus-poeng per 100 kr hos SmartBuyGlasses via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("steelseries", "Steelseries", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Steelseries via SAS Online Shopping.", "Elektronikk"),
  eurobonusShoppingOffer("storytel", "Storytel", "250 poeng", "Tjen 250 EuroBonus-poeng hos Storytel via SAS Online Shopping.", "Underholdning"),
  eurobonusShoppingOffer("strim", "Strim", "500 poeng", "Tjen 500 EuroBonus-poeng hos Strim via SAS Online Shopping.", "Reise"),
  eurobonusShoppingOffer("suitable", "Suitable", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos Suitable via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("telia", "Telia", "2 000 poeng", "Tjen 2 000 EuroBonus-poeng hos Telia via SAS Online Shopping.", "Mobil"),
  eurobonusShoppingOffer("tibber", "Tibber", "1 000 poeng", "Tjen 1 000 EuroBonus-poeng hos Tibber via SAS Online Shopping.", "Hus og hjem"),
  eurobonusShoppingOffer("trondermobil", "Trøndermobil", "2 500 poeng", "Tjen 2 500 EuroBonus-poeng hos Trøndermobil via SAS Online Shopping.", "Mobil"),
  eurobonusShoppingOffer("volt", "VOLT", "25 poeng / 100 kr", "Tjen 25 EuroBonus-poeng per 100 kr hos VOLT via SAS Online Shopping.", "Mote"),
  eurobonusShoppingOffer("xplora", "Xplora", "1 000 poeng", "Tjen 1 000 EuroBonus-poeng hos Xplora via SAS Online Shopping.", "Elektronikk"),
];
