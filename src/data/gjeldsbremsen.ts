import type { DebtType } from "@/types/gjeldsbremsen";

export const gjeldsbremsenFaq = [
  {
    question: "Hva skal jeg fylle inn i nåsituasjonen?",
    answer:
      "Start med tre tall: det du har på konto, andre utgifter frem til forfall, og det du skal betale på gjelden. Inntekter som kommer før forfall tar du med. Selve gjeldsbetalingen skal ikke ligge i utgiftsfeltet, den har et eget felt.",
  },
  {
    question: "Hva er reell gjeldsreduksjon?",
    answer:
      "Reell gjeldsreduksjon er hvor mye lavere gjelden er etter at eventuell ny kredittbruk er trukket fra.",
  },
  {
    question: "Hvorfor hjelper det ikke alltid å betale hele regningen?",
    answer:
      "Hvis du må bruke nesten like mye kreditt på nytt etter betalingen, har gjelden i praksis bare blitt flyttet til en ny periode.",
  },
  {
    question: "Kan Gjeldsbremsen brukes for kredittkort?",
    answer:
      "Ja. Verktøyet kan vise forskjellen mellom beløpet som betales inn og kreditten som brukes på nytt.",
  },
  {
    question: "Må jeg registrere alle lånene mine?",
    answer:
      "Nei. Du kan lage en enkel bremseplan med nåsituasjonen, men historikken gir et bedre bilde av utviklingen.",
  },
  {
    question: "Lagres opplysningene mine?",
    answer:
      "Opplysningene skal bare lagres lokalt i nettleseren og kan slettes når som helst.",
  },
];

export const DEBT_TYPE_OPTIONS: { id: DebtType; label: string; hint: string }[] = [
  {
    id: "kredittkort",
    label: "Kredittkort",
    hint: "Inkludert trekk og handel som belastes kortet",
  },
  {
    id: "smalan",
    label: "Smålån eller forbrukslån",
    hint: "Kortsiktige lån som betales og ofte tas opp på nytt",
  },
  {
    id: "faktura",
    label: "Faktura eller delbetaling",
    hint: "Faktura, delbetaling og lignende kredittkjøp",
  },
  {
    id: "kontokreditt",
    label: "Kontokreditt",
    hint: "Rammekreditt knyttet til konto",
  },
  {
    id: "privat",
    label: "Privat lån",
    hint: "Lån fra venner, familie eller andre private avtaler",
  },
  {
    id: "annet",
    label: "Annet",
    hint: "Annen gjentakende kortsiktig kreditt",
  },
];

export interface DebtTypeCopy {
  principal: string;
  principalHint: string;
  amountDue: string;
  amountDueHint: string;
  receivedAmount: string;
  receivedAmountHint: string;
  repaidLabel: string;
  repaidHint: string;
  newCredit: string;
  newCreditHint: string;
  usedDate: string;
  repaidDate: string;
  newCreditDate: string;
  roundTitle: string;
}

const defaultCopy: DebtTypeCopy = {
  principal: "Hva du skylder totalt nå",
  principalHint:
    "Hele utestående beløp. Ikke bare det som forfaller denne gangen.",
  amountDue: "Hva du skal betale denne gangen",
  amountDueHint:
    "Forfallende beløp, eller det du faktisk planlegger å betale nå.",
  receivedAmount: "Hvor mye du fikk eller brukte",
  receivedAmountHint: "Selve låne- eller kredittbeløpet, uten renter.",
  repaidLabel: "Hva du betalte tilbake",
  repaidHint:
    "Totalt innbetalt i denne runden, inkludert renter og gebyrer.",
  newCredit: "Ny kreditt etter betalingen",
  newCreditHint:
    "0 hvis du ikke tok opp nytt. Dette viser om gjelden falt, eller bare ble flyttet.",
  usedDate: "Når du fikk pengene eller brukte kreditten",
  repaidDate: "Når du betalte",
  newCreditDate: "Når du tok opp nytt",
  roundTitle: "Runde",
};

const copyByType: Record<DebtType, DebtTypeCopy> = {
  kredittkort: {
    ...defaultCopy,
    principal: "Hvor mye av kreditten som er brukt nå",
    principalHint: "Saldoen på kortet i dag, uten å telle med ubrukt ramme.",
    amountDue: "Hva du skal betale inn denne gangen",
    amountDueHint:
      "Minimumsbeløpet, hele saldoen, eller det du planlegger å betale nå.",
    receivedAmount: "Hvor mye du brukte på kortet",
    receivedAmountHint: "Beløpet som ble belastet i denne perioden, uten renter.",
    repaidLabel: "Hva du betalte inn",
    newCredit: "Ny bruk på kortet etter innbetalingen",
    newCreditHint:
      "0 hvis kortet ble liggende. Dette viser om saldoen falt, eller bare ble bygget opp igjen.",
    usedDate: "Når du brukte kreditten",
    repaidDate: "Når du betalte inn",
    newCreditDate: "Når du brukte kortet igjen",
    roundTitle: "Kredittperiode",
  },
  smalan: {
    ...defaultCopy,
    principal: "Hva du skylder på lånet nå",
    amountDue: "Hva du skal betale tilbake denne gangen",
    receivedAmount: "Hvor mye du fikk utbetalt",
    newCredit: "Nytt lån etter tilbakebetalingen",
    usedDate: "Når du tok opp lånet",
    newCreditDate: "Når du tok opp nytt lån",
  },
  faktura: {
    ...defaultCopy,
    principal: "Hva som står ubetalt nå",
    amountDue: "Hva som forfaller denne gangen",
    receivedAmount: "Hvor mye kreditten gjaldt",
    newCredit: "Ny faktura eller delbetaling etterpå",
    usedDate: "Når kreditten oppsto",
    newCreditDate: "Når ny faktura eller delbetaling oppsto",
  },
  kontokreditt: {
    ...defaultCopy,
    principal: "Hvor mye av kontokreditten som er trukket nå",
    principalHint: "Hvor mye av rammen som er brukt i dag.",
    amountDue: "Hva du skal betale inn denne gangen",
    receivedAmount: "Hvor mye du trakk",
    newCredit: "Nytt trekk etter innbetalingen",
    usedDate: "Når du trakk på kreditten",
    newCreditDate: "Når du trakk på nytt",
    roundTitle: "Trekkperiode",
  },
  privat: {
    ...defaultCopy,
    principal: "Hva du skylder nå",
    amountDue: "Hva du skal betale tilbake denne gangen",
    receivedAmount: "Hvor mye du fikk låne",
    newCredit: "Nytt lån etter tilbakebetalingen",
    usedDate: "Når du fikk lånet",
    newCreditDate: "Når du fikk nytt lån",
  },
  annet: defaultCopy,
};

export function getDebtTypeCopy(type: DebtType | ""): DebtTypeCopy {
  if (!type) return defaultCopy;
  return copyByType[type];
}

export const WIZARD_STEPS = [
  { id: "type", title: "Gjeldstype", description: "Velg hva slags kreditt det gjelder" },
  { id: "situation", title: "Nåsituasjonen", description: "Konto, utgifter og hva som skal betales" },
  { id: "history", title: "Tidligere runder", description: "Valgfritt, men anbefalt" },
  { id: "diagnosis", title: "Diagnose", description: "Reell utvikling i tre tall" },
  { id: "plan", title: "Bremseplan", description: "Fart, tiltak og sjekkpunkter" },
] as const;

export const MEASURE_FIELDS = [
  {
    key: "reducedExpenses" as const,
    label: "Kutt i andre utgifter",
    hint: "Hvor mye du kan kutte i husleie, mat, abonnementer og lignende. Ikke kutt som allerede er trukket fra i nåsituasjonen.",
  },
  {
    key: "extraIncome" as const,
    label: "Ekstra inntekt",
    hint: "Ekstra jobb eller annen sikker inntekt som ikke allerede ligger i inntektsfeltet.",
  },
  {
    key: "expectedMoneyIn" as const,
    label: "Penger som allerede er ventet inn",
    hint: "Feriepenger, tilbakebetaling eller annet du vet kommer, som ikke er lagt inn fra før.",
  },
  {
    key: "assetSales" as const,
    label: "Salg av eiendeler",
    hint: "Bare beløp du realistisk kan få inn før forfall.",
  },
  {
    key: "otherNonDebtFinance" as const,
    label: "Annen hjelp uten ny gjeld",
    hint: "Gave, oppsparte midler eller annen finansiering som ikke er et nytt lån.",
  },
  {
    key: "paymentAgreement" as const,
    label: "Betalingsavtale",
    hint: "Hvor mye av denne betalingen avtalen faktisk utsetter eller fjerner.",
  },
];
