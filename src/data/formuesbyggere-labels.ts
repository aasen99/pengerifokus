import type {
  FormuesbyggerBuildType,
  FormuesbyggerIndustry,
  FormuesbyggerRegion,
} from "@/types/formuesbygger";

export const FORMUESBYGGERE_TITLE = "Formuesbyggerne";
export const FORMUESBYGGERE_INTRO =
  "Korte profiler av kjente formuesbyggere. Hvordan de startet, hva de eier, og hva vi kan lære av reisen deres.";

export const FORMUE_DISCLAIMER =
  "Formueanslagene er omtrentlige markedsverdier, ikke skattemessig ligningsformue. Norske profiler følger i hovedsak Kapital 400 (publiseres årlig). Internasjonale profiler følger Forbes Billionaires List. Tallene svinger med aksjekurser og eiendomspriser, og skal ikke behandles som fasit.";

export const FORMUE_ESTIMATE_SOURCE =
  "Norske profiler: Kapital 400. Internasjonale: Forbes Billionaires List og tilsvarende medieestimater.";

export const KAPITAL_400_SOURCE = "Kapital 400";
export const KAPITAL_400_URL =
  "https://www.finansavisen.no/kapital-index/norges-400-rikeste";

export const FORBES_BILLIONAIRES_SOURCE = "Forbes Billionaires List";
export const FORBES_BILLIONAIRES_URL =
  "https://www.forbes.com/billionaires/";

export const REGION_LABELS: Record<FormuesbyggerRegion, string> = {
  norsk: "Norge",
  internasjonal: "Internasjonalt",
};

export const INDUSTRY_LABELS: Record<FormuesbyggerIndustry, string> = {
  teknologi: "Teknologi",
  eiendom: "Eiendom",
  sport: "Sport",
  musikk: "Musikk",
  handel: "Handel",
  industri: "Industri",
  investering: "Investering",
  arv: "Arv",
};

export const BUILD_TYPE_LABELS: Record<FormuesbyggerBuildType, string> = {
  selvskapt: "Selvskapt",
  "arv-videreutvikling": "Arv + videreutvikling",
  investor: "Investor",
  grunder: "Gründer",
  merkevare: "Merkevare",
  "idrett-underholdning": "Idrett og underholdning",
};
