import type {
  FormuesbyggerBuildType,
  FormuesbyggerIndustry,
  FormuesbyggerRegion,
} from "@/types/formuesbygger";

export const FORMUESBYGGERE_TITLE = "Formuesbyggerne";
export const FORMUESBYGGERE_INTRO =
  "Korte profiler av kjente formuesbyggere. Hvordan de startet, hva de eier, og hva vi kan lære av reisen deres.";

export const FORMUE_DISCLAIMER =
  "Formueanslagene er omtrentlige og basert på offentlige kilder som Forbes, Kapital og lignende medier. Verdien svinger ofte med aksjekurser og eiendomspriser, og skal ikke behandles som fasit.";

export const FORMUE_ESTIMATE_SOURCE =
  "Kilder: Forbes Billionaires List, Kapital, Finansavisen og tilsvarende medieestimater.";

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
