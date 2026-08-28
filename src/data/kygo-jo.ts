import { calculateReadTimeFromTexts } from "@/lib/read-time";
import type { FormuesbyggerSource, FormuesbyggerStory } from "@/types/formuesbygger";

export const KYGO_JO_PATH = "/formuesbyggere/erling-haaland/kygo-jo";
export const HAALAND_PATH = "/formuesbyggere/erling-haaland";

const YOUTUBE_ORIGINAL = "https://www.youtube.com/watch?v=oYJWkDFzEXA";
const YOUTUBE_REMIX = "https://www.youtube.com/watch?v=zqF4VeAjoNg";
const SPOTIFY_TRACK = "https://open.spotify.com/track/3ExrDwHbhBZYurE2AOC1rL";
const SPOTIFY_TOP_50 = "https://open.spotify.com/playlist/37i9dQZEVXbJvfa0Yxg7E7";
const AFTENPOSTEN_KYGO =
  "https://www.aftenposten.no/sport/fotball/i/rrmv63/kygo-med-haaland-remiks-naa-har-haaland-svart";
const AFTENBLADET =
  "https://www.aftenbladet.no/lokalt/i/K8G8kG/kygo-ga-ut-haaland-laat-blir-fort-en-banger";
const GUARDIAN =
  "https://www.theguardian.com/football/2026/jul/05/brazil-norway-world-cup-2026-last-16-match-report";
const DJ_MAG =
  "https://djmag.com/news/erling-haalands-rap-track-hits-no-1-norway-after-kygo-remix";
const FOTBOLLSKANALEN =
  "https://www.fotbollskanalen.se/artiklar/tyskland/tv-se-haaland-som-rappare-en-usel-text-och-en-usel-lat";

export interface KygoJoFactRow {
  label: string;
  value: string;
}

export interface KygoJoTimelineRow {
  year: string;
  event: string;
  interpretation: string;
}

export const kygoJoArticle = {
  slug: "kygo-jo",
  path: KYGO_JO_PATH,
  seoTitle: "Kygo Jo: Haaland-låten Kygo gjorde til hit",
  pageTitle:
    "Artisten som ble verdens beste spiss for å promotere musikken",
  metaDescription:
    "Historien om Kygo Jo, Flow Kingz, Erling Haalands artistnavn Lyng og Kygo-remiksen som gikk til topps på Spotify etter Norge mot Brasil.",
  seoKeywords: [
    "Kygo Jo",
    "Erling Haaland Kygo Jo",
    "Flow Kingz",
    "Lyng Haaland",
    "Kygo remix Haaland",
    "Kygo Jo Spotify",
    "Haaland artist",
  ],
  intro: `De fleste artister bruker TikTok, konserter og plateselskaper for å promotere musikken sin. Erling Haaland valgte en mer langsiktig strategi. Først ga han ut «Kygo Jo» som 16-åring. Deretter brukte han ti år på å bli en av verdens beste fotballspillere før Kygo remikset låten og sendte den til topps på Spotify i Norge.

Det finnes ingen dokumentasjon på at hele fotballkarrieren var planlagt som en markedsføringskampanje. Men tidslinjen er mistenkelig perfekt.`,
  publishedAt: "2026-08-28",
  lastVerified: "2026-08-27",
  youtubeId: "oYJWkDFzEXA",
  youtubeUrl: YOUTUBE_ORIGINAL,
  spotifyTrackId: "3ExrDwHbhBZYurE2AOC1rL",
  spotifyUrl: SPOTIFY_TRACK,
  factRows: [
    { label: "Originalutgivelse", value: "30. august 2016" },
    { label: "Gruppe", value: "Flow Kingz" },
    { label: "Haalands artistnavn", value: "Lyng" },
    {
      label: "Medlemmer",
      value: "Erling Haaland, Erik Botheim og Erik Tobias Sandberg",
    },
    { label: "Originalvideo", value: "ca. 28 millioner visninger" },
    { label: "Kygo-remiks", value: "7. juli 2026" },
    { label: "Utløsende hendelse", value: "To Haaland-mål mot Brasil" },
    {
      label: "Listeplassering",
      value: "Nummer én på Spotify Top 50 Norge",
    },
    {
      label: "Spotify-avspillinger",
      value: "Over 14 millioner i august 2026",
    },
  ] satisfies KygoJoFactRow[],
  factsNote: "Sist kontrollert 27. august 2026",
  disclaimerTitle: "Er dette en sann historie?",
  disclaimerBody:
    "Alle datoer, scoringer, visningstall og utgivelser på denne siden er dokumenterte. Påstanden om at Haaland ble fotballspiller utelukkende for å promotere musikken sin, er vår egen svært plausible teori.",
  timeline: [
    {
      year: "2016",
      event: "«Kygo Jo» blir publisert",
      interpretation: "Produktlansering",
    },
    {
      year: "2017 til 2019",
      event: "Haaland scorer mål for Molde og Salzburg",
      interpretation: "Tidlig merkevarebygging",
    },
    {
      year: "2020",
      event: "Gjennombrudd i Borussia Dortmund",
      interpretation: "Internasjonal ekspansjon",
    },
    {
      year: "2022",
      event: "Overgang til Manchester City",
      interpretation: "Tilgang til Premier Leagues distribusjonsapparat",
    },
    {
      year: "2023",
      event: "Vinner Premier League og Champions League",
      interpretation: "Bygger troverdighet før artistcomebacket",
    },
    {
      year: "2025",
      event: "Signerer kontrakt med City til 2034",
      interpretation: "Sikrer langsiktig musikkpromotering",
    },
    {
      year: "2026",
      event: "Tar Norge til VM og møter Brasil",
      interpretation: "Kampanjen går inn i sluttfasen",
    },
    {
      year: "5. juli 2026",
      event: "Scorer to mål mot Brasil",
      interpretation: "Oppfyller Kygos lanseringskrav",
    },
    {
      year: "7. juli 2026",
      event: "Kygo-remiksen blir utgitt",
      interpretation: "Artistcomeback",
    },
    {
      year: "9. juli 2026",
      event: "Låten topper Spotify i Norge",
      interpretation: "Planen lykkes",
    },
  ] satisfies KygoJoTimelineRow[],
  timelineNote:
    "Enkelte vil hevde at Haaland valgte fotball fordi han var et enormt talent. Tidslinjen viser imidlertid at karrieren også fungerte utmerket som promotering for «Kygo Jo».",
  faq: [
    {
      question: "Hvem laget «Kygo Jo»?",
      answer:
        "Låten ble laget av Erling Haaland, Erik Botheim og Erik Tobias Sandberg under navnet Flow Kingz. Haaland ble kreditert med artistnavnet Lyng.",
    },
    {
      question: "Når ble «Kygo Jo» utgitt?",
      answer:
        "Den originale musikkvideoen ble publisert 30. august 2016. Kygos offisielle remix ble utgitt 7. juli 2026.",
    },
    {
      question: "Hvorfor heter låten «Kygo Jo»?",
      answer:
        "Låten viser til den norske artisten og produsenten Kygo. Haaland synger blant annet at han ikke kan danse til Kygo. Ti år senere remikset Kygo selv låten.",
    },
    {
      question: "Hvorfor remikset Kygo Haaland-låten?",
      answer:
        "Kygo oppdaget at den gamle låten hadde gått viralt igjen under VM i 2026. Han laget en remix og lovet å gi den ut dersom Haaland scoret mot Brasil.",
    },
    {
      question: "Scoret Haaland mot Brasil?",
      answer:
        "Ja. Haaland scoret begge Norges mål da Brasil ble slått 2–1 i åttedelsfinalen 5. juli 2026.",
    },
    {
      question: "Gikk «Kygo Jo» til førsteplass?",
      answer:
        "Kygo-remiksen gikk til førsteplass på Spotify Top 50 Norge kort tid etter utgivelsen. Dette må ikke omtales som førsteplass på den offisielle norske singellisten uten egen dokumentasjon.",
    },
    {
      question: "Hvor mange visninger har originalen?",
      answer:
        "Den originale YouTube-videoen hadde omtrent 28 millioner visninger 27. august 2026.",
    },
    {
      question: "Er Haaland offisielt artist?",
      answer:
        "Haaland er kreditert som Lyng på den offisielle Kygo-remiksen. Låten har toppet Spotify-listen i Norge. Det er derfor rimelig å omtale ham som artist, selv om fotball fortsatt ser ut til å være hovedjobben.",
    },
    {
      question: "Hvor mye har Haaland tjent på låten?",
      answer:
        "Det er ikke offentlig kjent. Fordelingen av strømmeinntekter og rettigheter er ikke publisert.",
    },
    {
      question: "Ble Haaland virkelig fotballspiller for å promotere musikken?",
      answer:
        "Nei, det finnes ingen dokumentasjon på dette. Det er sidens humoristiske fortelling basert på at fotballkarrieren har gitt den gamle låten enorm oppmerksomhet.",
    },
  ],
  sources: [
    {
      label: "Original musikkvideo: Flow Kingz – Kygo Jo",
      url: YOUTUBE_ORIGINAL,
      tier: "primary",
    },
    {
      label: "Offisiell Kygo-remix på Spotify",
      url: SPOTIFY_TRACK,
      tier: "primary",
    },
    {
      label: "Kygo-remixen på YouTube",
      url: YOUTUBE_REMIX,
      tier: "primary",
    },
    {
      label: "Spotify Top 50 Norge",
      url: SPOTIFY_TOP_50,
      tier: "tertiary",
    },
    {
      label: "Aftenposten: Kygo med Haaland-remiks",
      url: AFTENPOSTEN_KYGO,
      tier: "tertiary",
    },
    {
      label: "Stavanger Aftenblad: Kygo ga ut Haaland-låt",
      url: AFTENBLADET,
      tier: "tertiary",
    },
    {
      label: "The Guardian: Norge mot Brasil, åttedelsfinale VM 2026",
      url: GUARDIAN,
      tier: "tertiary",
    },
    {
      label: "DJ Mag: Haaland-låten til førsteplass i Norge",
      url: DJ_MAG,
      tier: "tertiary",
    },
    {
      label: "Fotbollskanalen: Haaland som rapper og visningstall",
      url: FOTBOLLSKANALEN,
      tier: "quaternary",
    },
  ] satisfies FormuesbyggerSource[],
  sourcesIntro:
    "Utgivelser og visningstall er hentet fra YouTube og Spotify. Kampresultat, Kygos løfte og listeplassering er hentet fra nyhetskilder. Visningstall og strømmetall endrer seg.",
  relatedLinks: [
    {
      label: "Erling Haalands lønn, formue og investeringer",
      href: HAALAND_PATH,
    },
    { label: "Formuesbyggere", href: "/formuesbyggere" },
    { label: "Hva er inntekt?", href: "/ordbok/inntekt" },
    { label: "Hva er royalties?", href: "/ordbok/royalties" },
  ],
};

export const kygoJoReadTimeMinutes = calculateReadTimeFromTexts([
  kygoJoArticle.pageTitle,
  kygoJoArticle.intro,
  kygoJoArticle.disclaimerBody,
  kygoJoArticle.factsNote,
  kygoJoArticle.timelineNote,
  ...kygoJoArticle.factRows.flatMap((row) => [row.label, row.value]),
  ...kygoJoArticle.timeline.flatMap((row) => [
    row.year,
    row.event,
    row.interpretation,
  ]),
  ...kygoJoArticle.faq.flatMap((item) => [item.question, item.answer]),
]);

export const haalandKygoJoRelatedLink = {
  label: "Artisten som ble verdens beste spiss",
  href: KYGO_JO_PATH,
  description:
    "Historien om «Kygo Jo», Flow Kingz og den ti år lange markedsføringskampanjen som endte med en Kygo-remix og førsteplass på Spotify.",
};

export const kygoJoStory: FormuesbyggerStory = {
  id: "story-kygo-jo",
  href: KYGO_JO_PATH,
  title: "Kygo Jo",
  description: haalandKygoJoRelatedLink.description,
  region: "norsk",
  industries: ["musikk", "sport"],
  buildType: "idrett-underholdning",
  searchText: [
    "Kygo Jo",
    "Kygo",
    "Flow Kingz",
    "Lyng",
    "Erling Haaland",
    "Erling Braut Haaland",
    "remix",
    "Spotify",
    "artist",
    "musikk",
    haalandKygoJoRelatedLink.label,
    haalandKygoJoRelatedLink.description,
  ].join(" "),
};

export const formuesbyggerStories: FormuesbyggerStory[] = [kygoJoStory];
