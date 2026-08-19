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
  },
): Tilbud {
  return {
    id: `tilbud-lofavor-${id}`,
    slug: `lofavor-${slug}`,
    status: "published",
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
    updatedAt: lofavorCheckedAt,
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
    "15–25 % rabatt",
    "LO-medlemmer får 25 % rabatt på TusenFryd i april–juni og august–oktober, og 15 % i juli. Gjelder inntil 5 datofestede billetter.",
    "Opplevelser",
    {
      terms:
        "Forhåndsbestill på nett og oppgi rabattkoden fra lofavor.no. Juli har egen kode. Velg datert dagsbillett. Rabatten trekkes fra lukepris og gjelder billetter over 120 cm. Barn under 95 cm er gratis. Medlemskort vises ved inngang. Kan ikke kombineres med andre tilbud. SkyCoaster og The Dungeon koster ekstra.",
      sourceUrl: "https://www.lofavor.no/ferie-og-opplevelser/tusenfryd",
    },
  ),
  lofavorOffer(
    "strawberry",
    "strawberry",
    "Strawberry",
    "15 % rabatt",
    "LO-medlemmer får 15 % rabatt på Strawberry-hoteller i Norge, Sverige, Danmark og Baltikum.",
    "Hotell",
    {
      terms:
        "Book via LOfavør. Gjelder Comfort, Quality og Clarion. Gjelder ikke frittstående hoteller. Kan sjelden stables med Strawberry-medlemspris på samme booking.",
      sourceUrl: "https://www.lofavor.no/ferie-og-fritid/strawberry",
    },
  ),
  lofavorOffer(
    "hurtigruten",
    "hurtigruten",
    "Hurtigruten",
    "5–10 % rabatt",
    "LO-medlemmer får 10 % rabatt for seg og familien på Hurtigrutens reiser langs norskekysten, og 5 % på ekspedisjonsreiser.",
    "Reise",
    {
      terms:
        "10 % gjelder kystreisen. 5 % gjelder ekspedisjonsreiser. Oppgi LOfavør-tilhørighet ved bestilling, ellers faller rabatten bort. Bekreft ekspedisjonsrabatten når du booker. LOfavør oppgir at rabatten ofte kan kombineres med andre Hurtigruten-tilbud, men ikke fly, utflukter, hotell og transport. Bestill via LOfavør eller lofavor@hurtigruten.com.",
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
