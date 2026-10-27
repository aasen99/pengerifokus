import type { Tilbud } from "@/types/content";

const lofavorCheckedAt = "2026-08-19";
const lofavorTerms =
  "Krever medlemskap i et LO-forbund. Book eller aktiver via LOfavør. Sjekk gjeldende vilkår på lofavor.no.";

function lofavorOffer(
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
    updatedAt?: string;
    status?: Tilbud["status"];
  },
): Tilbud {
  return {
    id: `tilbud-lofavor-${id}`,
    slug: `lofavor-${slug}`,
    status: options?.status ?? "published",
    title: partner,
    description,
    offerLabel,
    partner,
    fordelSlug: "lofavor",
    category,
    terms: options?.terms ?? lofavorTerms,
    sourceUrl: options?.sourceUrl ?? "https://www.lofavor.no/",
    warning: options?.warning,
    createdAt: lofavorCheckedAt,
    updatedAt: options?.updatedAt ?? lofavorCheckedAt,
  };
}

/** LOfavør-partnerrabatter. Sjekket 19. august 2026 mot lofavor.no. */
export const lofavorTilbud: Tilbud[] = [
  lofavorOffer(
    "legoland",
    "legoland",
    "LEGOLAND",
    "20 % rabatt",
    "LO-medlemmer får 20 % medlemsrabatt på billetter til LEGOLAND i Billund, Danmark.",
    "Opplevelser",
    {
      terms:
        "Gjelder online-pris, som varierer. Når entré er betalt, er kjørende aktiviteter inkludert unntatt Hyundai Trafikkskolen. Billettene kan ikke refunderes, endres eller kombineres med andre kampanjer. Book via LOfavør.",
      sourceUrl: "https://www.lofavor.no/ferie-og-fritid/legoland",
    },
  ),
  lofavorOffer(
    "scandic",
    "scandic",
    "Scandic Hotels",
    "Opptil 14 %",
    "LO-medlemmer får opptil 14 % rabatt på Scandic i Norge, Norden og Europa. Unge til og med 25 år kan få opptil 25 % på fleksible priser i Norge.",
    "Hotell",
    {
      terms:
        "Opptil 14 % på gjeldende publiserte FLEX-priser, alle ukedager og romkategorier. Book via LOfavør. Gjelder ikke Kristiansand i juli. Opptil 25 % i Norge for unge til og med 25 år, heltidsstudenter inntil 36 år, førstegangstjeneste og heltids lærlinger med gyldig bevis. Vis medlemskort ved innsjekk. Gjelder ved ledig kapasitet.",
      sourceUrl: "https://www.lofavor.no/ferie-og-opplevelser/scandic-hotels",
    },
  ),
  lofavorOffer(
    "tusenfryd",
    "tusenfryd",
    "TusenFryd",
    "30 % rabatt",
    "LO-medlemmer får 30 % rabatt på inntil fem datofestede dagsbilletter til TusenFryd ut 2026-sesongen.",
    "Opplevelser",
    {
      status: "draft",
      updatedAt: "2026-10-27",
      warning: "Gjelder ut 2026-sesongen. Sjekk parkens åpningskalender før bestilling.",
      terms:
        "Forhåndsbestill på nett via LOfavør og oppgi koden LOFAV26TUS. Gjelder inntil fem datofestede dagsbilletter over 120 cm. Rabatten trekkes fra lukepris, oppgitt til 619 kr. Barn under 95 cm er gratis. Medlemskort vises ved inngang. Kan ikke kombineres med andre tilbud. SkyCoaster og The Dungeon koster ekstra.",
      sourceUrl: "https://www.lofavor.no/ferie-og-opplevelser/tusenfryd",
    },
  ),
  lofavorOffer(
    "strawberry",
    "strawberry",
    "Strawberry",
    "15–20 % rabatt",
    "LO-medlemmer får 15 % rabatt på én natt og 20 % ved to eller flere netter på fleksible priser hos Strawberry. 20 %-rabatten gjelder ikke tirsdag og onsdag.",
    "Hotell",
    {
      updatedAt: "2026-10-27",
      terms:
        "Book via LOfavør. 15 % gjelder én natt alle dager. 20 % gjelder to eller flere netter på fleksible priser, unntatt tirsdag og onsdag. Gjelder Comfort, Quality og Clarion i Skandinavia og Baltikum, ikke frittstående hoteller. Kredittkort må oppgis som garanti ved nettbestilling.",
      sourceUrl: "https://www.lofavor.no/ferie-og-fritid/strawberry",
    },
  ),
  lofavorOffer(
    "hurtigruten",
    "hurtigruten",
    "Hurtigruten",
    "10 % rabatt",
    "LO-medlemmer får 10 % rabatt for seg og familien på reiser langs norskekysten når de bestiller sammen.",
    "Reise",
    {
      updatedAt: "2026-10-27",
      terms:
        "Gjelder reiser mellom 24 timer og fem døgn langs norskekysten. Oppgi LOfavør-tilhørighet ved bestilling, ellers faller rabatten bort. Gjelder også familien ved felles bestilling. Bestill hos Hurtigruten på 800 24 932 eller lofavor@hurtigruten.com. Kan med enkelte unntak kombineres med andre rabatter og kampanjer; se LOfavørs vilkår.",
      sourceUrl: "https://www.lofavor.no/ferie-og-opplevelser/hurtigruten",
    },
  ),
  lofavorOffer(
    "det-norske-teatret",
    "det-norske-teatret",
    "Det Norske Teatret",
    "30 % rabatt",
    "LO-medlemmer får 30 % rabatt på inntil 4 billetter per forestilling på utvalgte forestillinger ved Det Norske Teatret.",
    "Kultur",
    {
      terms:
        "Gjelder kun utvalgte forestillinger og ordinære billetter. Kan ikke kombineres med honnør, studentbillett eller Scenekort. Bruk kampanjekoden lofavor i handlekurven. Bestill via LOfavør. Ta med medlemskort til forestillingen.",
      sourceUrl: "https://www.lofavor.no/ferie-og-opplevelser/det-norske-teateret",
    },
  ),
];
