import type { InflationLoanInputs, SalaryGrowthLoanInputs } from "@/types/lanets-reelle-verdi";

export const LRV_DISCLAIMER =
  "Kalkulatoren gir forenklede estimater basert på opplysningene og forutsetningene du legger inn. Fremtidig inflasjon, rente og lønnsvekst er usikker. Beregningen er ikke personlig økonomisk rådgivning.";

export const LRV_INTRO =
  "Inflasjon gjør at penger gradvis mister kjøpekraft. Det betyr at et lån kan bli mindre belastende i reelle kroner over tid, selv om den nominelle gjelden fortsatt er den samme. Se hva lånet ditt kan tilsvare i dagens pengeverdi.";

export const LRV_NOMINAL_NOTE =
  "Du skylder fortsatt hele det nominelle beløpet til banken. Kalkulatoren viser hvordan verdien av beløpet endres målt i kjøpekraft.";

export const LRV_GRAPH_NOTE =
  "Denne illustrasjonen forutsetter at den nominelle restgjelden ikke reduseres gjennom avdrag.";

export const LRV_TOOLTIPS = {
  realValue:
    "Hva det nominelle beløpet tilsvarer målt i dagens kjøpekraft, gitt valgt inflasjon.",
  realInterest:
    "Den effektive renten etter at inflasjon er tatt med: beregnet med Fisher-ligningen.",
  salaryGrowth:
    "Forventet årlig økning i lønnen. Brukes kun til å øke låneinnbetalingen i tilleggsfunksjonen.",
  salaryShare:
    "Hvor stor del av lønnsveksten som legges til månedlig innbetaling hvert år.",
} as const;

export const SALARY_GROWTH_SHARE_OPTIONS = [25, 50, 75, 100] as const;

export const DEFAULT_INFLATION_INPUTS: InflationLoanInputs = {
  currentDebt: 2_000_000,
  years: 10,
  inflationRate: 2.5,
  nominalInterestRate: 5,
};

export const DEFAULT_SALARY_GROWTH_INPUTS: SalaryGrowthLoanInputs = {
  currentDebt: 2_000_000,
  nominalInterestRate: 5,
  repaymentYears: 25,
  salaryGrowthRate: 3,
  salaryGrowthShare: 100,
};
