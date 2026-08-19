import type { DebtType } from "@/types/gjeldsbremsen";

export const gjeldsbremsenFaq = [
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
  newCredit: string;
  usedDate: string;
  repaidDate: string;
  newCreditDate: string;
  roundTitle: string;
}

const defaultCopy: DebtTypeCopy = {
  principal: "Nåværende hovedstol",
  principalHint: "Beløpet som er brukt eller utestående nå, uten renter og gebyrer",
  amountDue: "Beløpet som skal betales",
  newCredit: "Ny kredittbruk etter betalingen",
  usedDate: "Dato kreditten eller lånet ble brukt",
  repaidDate: "Dato tilbakebetalt",
  newCreditDate: "Dato kreditten ble brukt igjen",
  roundTitle: "Lånerunde",
};

const copyByType: Record<DebtType, DebtTypeCopy> = {
  kredittkort: {
    ...defaultCopy,
    principal: "Benyttet kreditt nå",
    principalHint: "Hvor mye av kredittrammen som er brukt nå",
    amountDue: "Beløpet som skal betales inn",
    newCredit: "Ny kredittbruk etter innbetalingen",
    usedDate: "Dato kreditten ble brukt",
    newCreditDate: "Dato kreditten ble brukt igjen",
    roundTitle: "Kredittperiode",
  },
  smalan: {
    ...defaultCopy,
    principal: "Nåværende lånebeløp",
    amountDue: "Beløpet som skal tilbakebetales",
    newCredit: "Nytt lån etter tilbakebetalingen",
    usedDate: "Dato lånet ble tatt opp",
    newCreditDate: "Dato nytt lån ble tatt opp",
  },
  faktura: {
    ...defaultCopy,
    principal: "Utestående beløp nå",
    amountDue: "Beløpet som forfaller",
    newCredit: "Ny faktura eller delbetaling etter betalingen",
    usedDate: "Dato kreditten ble brukt",
    newCreditDate: "Dato ny faktura eller delbetaling oppsto",
  },
  kontokreditt: {
    ...defaultCopy,
    principal: "Benyttet kontokreditt nå",
    principalHint: "Hvor mye av rammen som er trukket nå",
    amountDue: "Beløpet som skal betales inn",
    newCredit: "Nytt trekk etter innbetalingen",
    usedDate: "Dato kreditten ble trukket",
    newCreditDate: "Dato kreditten ble trukket igjen",
    roundTitle: "Trekkperiode",
  },
  privat: {
    ...defaultCopy,
    principal: "Nåværende lånebeløp",
    amountDue: "Beløpet som skal tilbakebetales",
    newCredit: "Nytt lån etter tilbakebetalingen",
    usedDate: "Dato lånet ble mottatt",
    newCreditDate: "Dato nytt lån ble mottatt",
  },
  annet: defaultCopy,
};

export function getDebtTypeCopy(type: DebtType | ""): DebtTypeCopy {
  if (!type) return defaultCopy;
  return copyByType[type];
}

export const WIZARD_STEPS = [
  { id: "type", title: "Gjeldstype", description: "Velg hva slags kreditt det gjelder" },
  { id: "situation", title: "Nåsituasjonen", description: "Konto, forfall og inntekt" },
  { id: "history", title: "Tidligere runder", description: "Valgfritt, men anbefalt" },
  { id: "diagnosis", title: "Diagnose", description: "Reell utvikling i tre tall" },
  { id: "plan", title: "Bremseplan", description: "Fart, tiltak og sjekkpunkter" },
] as const;

export const MEASURE_FIELDS = [
  {
    key: "reducedExpenses" as const,
    label: "Reduserte utgifter",
    hint: "Kutt du faktisk kan gjennomføre før forfall",
  },
  {
    key: "extraIncome" as const,
    label: "Ekstra inntekt",
    hint: "Ekstra arbeid eller annen sikker inntekt",
  },
  {
    key: "expectedMoneyIn" as const,
    label: "Penger som allerede er ventet inn",
    hint: "Beløp du vet kommer, uten ny gjeld",
  },
  {
    key: "assetSales" as const,
    label: "Salg av eiendeler",
    hint: "Bare beløp du realistisk kan få inn i tide",
  },
  {
    key: "otherNonDebtFinance" as const,
    label: "Annen finansiering uten ny gjeld",
    hint: "For eksempel gave eller oppsparte midler du kan bruke",
  },
  {
    key: "paymentAgreement" as const,
    label: "Betalingsavtale",
    hint: "Beløpet avtalen faktisk fjerner fra denne perioden",
  },
];
