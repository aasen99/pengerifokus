import type { Tilbud } from "@/types/content";

const eurobonusRestaurantBase =
  "Krever EuroBonus-medlemskap og registrert betalingskort i SAS sitt restaurant- og partnerprogram. Poeng opptjenes per 100 kr brukt. Sjekk deltakende steder og vilkår hos SAS.";

const eurobonusCheckedAt = "2026-07-10";
const eurobonusSourceUrl = "https://www.sas.no/eurobonus/tilbud";

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

/** EuroBonus-poeng hos restauranter, hotell og utvalgte partnere i Norge. */
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
];
