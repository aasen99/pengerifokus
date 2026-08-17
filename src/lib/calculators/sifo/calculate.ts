import {
  SIFO_AKS,
  SIFO_ANDRE_DAGLIGVARER,
  SIFO_BARNEHAGE,
  SIFO_BILKOSTNADER,
  SIFO_EXAMPLE_FAMILY,
  SIFO_HUSHOLDNINGSARTIKLER,
  SIFO_MAT_STORDRIFT_RABATT,
  SIFO_MEDIEBRUK_FRITID,
  SIFO_MEMBER_RATES,
  SIFO_MOBler,
  SIFO_REISEKOSTNADER,
  SIFO_SPEDBARNSUTSTYR,
  type SifoMemberType,
} from "./data";
import type {
  SifoAksInntekt,
  SifoAksPlass,
  SifoBarnehageInntekt,
  SifoCalculatorInput,
  SifoCalculatorResult,
  SifoCategoryAmount,
  SifoComparisonResult,
} from "./types";

const BARNEHAGE_ALDER = new Set<SifoMemberType>([
  "jente_1_3",
  "gutt_1_3",
  "jente_4_6",
  "gutt_4_6",
]);

const AKS_ALDER = new Set<SifoMemberType>([
  "jente_7_10",
  "gutt_7_10",
  "jente_11_14",
  "gutt_11_14",
]);

const VOKSEN_TYPES = new Set<SifoMemberType>([
  "kvinne_18_24",
  "kvinne_25_50",
  "kvinne_51_70",
  "kvinne_70_plus",
  "mann_18_24",
  "mann_25_50",
  "mann_51_70",
  "mann_70_plus",
  "gravid",
  "ammende",
]);

const PENSJONIST_TYPES = new Set<SifoMemberType>([
  "kvinne_70_plus",
  "mann_70_plus",
]);

const STUDENT_ALDER_TYPES = new Set<SifoMemberType>([
  "kvinne_18_24",
  "mann_18_24",
]);

const BARN_6_19_TYPES = new Set<SifoMemberType>([
  "jente_4_6",
  "gutt_4_6",
  "jente_7_10",
  "gutt_7_10",
  "jente_11_14",
  "gutt_11_14",
  "jente_15_17",
  "gutt_15_17",
]);

function householdIndex(personCount: number): number {
  return Math.min(Math.max(personCount, 1), 7) - 1;
}

function sumCategory(
  members: SifoMemberType[],
  key: keyof (typeof SIFO_MEMBER_RATES)[SifoMemberType],
): number {
  return members.reduce(
    (sum, member) => sum + (SIFO_MEMBER_RATES[member]?.[key] ?? 0),
    0,
  );
}

function getReisekostnad(
  member: SifoMemberType,
  studentKollektiv: boolean,
): number {
  if (PENSJONIST_TYPES.has(member)) {
    return SIFO_REISEKOSTNADER.pensjonist_66_plus;
  }
  if (BARN_6_19_TYPES.has(member)) {
    return SIFO_REISEKOSTNADER.barn_6_19;
  }
  if (STUDENT_ALDER_TYPES.has(member) && studentKollektiv) {
    return SIFO_REISEKOSTNADER.student_20_29;
  }
  if (VOKSEN_TYPES.has(member)) {
    return SIFO_REISEKOSTNADER.voksen_20_66;
  }
  return 0;
}

function getSpedbarnsutstyr(members: SifoMemberType[]): number {
  let total = 0;
  if (members.includes("spedbarn_grunn_6mnd")) {
    total += SIFO_SPEDBARNSUTSTYR.grunnutrustning_6mnd;
  }
  const hasSupplering = members.some(
    (m) => m === "jente_0_5mnd" || m === "gutt_0_5mnd",
  );
  if (hasSupplering) {
    total += SIFO_SPEDBARNSUTSTYR.supplering_under_1;
  }
  return total;
}

function countEligibleBarnehage(members: SifoMemberType[]): number {
  return members.filter((m) => BARNEHAGE_ALDER.has(m)).length;
}

function countEligibleAks(members: SifoMemberType[]): number {
  return members.filter((m) => AKS_ALDER.has(m)).length;
}

function calculateBarnehage(
  barn: number,
  inntekt: SifoBarnehageInntekt,
): number {
  if (barn <= 0) return 0;
  const rates =
    inntekt === "hoy"
      ? SIFO_BARNEHAGE.hoyInntekt
      : SIFO_BARNEHAGE.lavInntekt;

  let total = 0;
  for (let i = 0; i < barn; i++) {
    if (i === 0) total += rates.first;
    else if (i === 1) total += rates.second;
    else total += rates.rest;
  }
  return total;
}

function calculateAks(
  barn: number,
  plass: SifoAksPlass,
  inntekt: SifoAksInntekt,
): number {
  if (barn <= 0) return 0;
  const tier =
    inntekt === "hoy"
      ? SIFO_AKS.hoyInntekt
      : inntekt === "middels"
        ? SIFO_AKS.middelsInntekt
        : SIFO_AKS.lavInntekt;
  return tier[plass] * barn;
}

function hasMatStordriftRabatt(members: SifoMemberType[]): boolean {
  const voksne = members.filter((m) => VOKSEN_TYPES.has(m)).length;
  const barn = members.filter(
    (m) => !VOKSEN_TYPES.has(m) && m !== "spedbarn_grunn_6mnd",
  ).length;
  return voksne >= 2 && barn > 2;
}

export function calculateSifoBudget(
  input: SifoCalculatorInput,
): SifoCalculatorResult | null {
  const { members } = input;
  if (members.length === 0) return null;

  const personCount = members.filter((m) => m !== "spedbarn_grunn_6mnd").length;
  const idx = householdIndex(personCount);

  let matOgDrikke = sumCategory(members, "matOgDrikke");
  let matStordriftRabatt = 0;
  if (hasMatStordriftRabatt(members)) {
    matStordriftRabatt = Math.round(matOgDrikke * SIFO_MAT_STORDRIFT_RABATT);
    matOgDrikke -= matStordriftRabatt;
  }

  const klaerOgSko = sumCategory(members, "klaerOgSko");
  const personligPleie = sumCategory(members, "personligPleie");
  const lekOgMediebruk = sumCategory(members, "lekOgMediebruk");
  const spedbarnsutstyr = getSpedbarnsutstyr(members);

  const reisekostnader = input.includeKollektiv
    ? members.reduce(
        (sum, member) =>
          sum + getReisekostnad(member, input.studentKollektiv),
        0,
      )
    : members
        .filter((m) => VOKSEN_TYPES.has(m))
        .reduce(
          (sum, member) =>
            sum + getReisekostnad(member, input.studentKollektiv),
          0,
        );

  const andreDagligvarer = SIFO_ANDRE_DAGLIGVARER[idx];
  const husholdningsartikler = SIFO_HUSHOLDNINGSARTIKLER[idx];
  const mobler = SIFO_MOBler[idx];
  const mediebrukOgFritid = SIFO_MEDIEBRUK_FRITID[idx];

  let bilkostnader = 0;
  if (input.car !== "none") {
    const bilKey =
      personCount <= 4
        ? input.car === "bensin"
          ? "bensin_1_4"
          : "el_1_4"
        : input.car === "bensin"
          ? "bensin_5_7"
          : "el_5_7";
    bilkostnader = SIFO_BILKOSTNADER[bilKey];
  }

  const maxBarnehage = countEligibleBarnehage(members);
  const barnehageBarn = Math.min(input.barnehageBarn, maxBarnehage);
  const barnehageTotal = calculateBarnehage(
    barnehageBarn,
    input.barnehageInntekt,
  );

  const maxAks = countEligibleAks(members);
  const aksBarn = Math.min(input.aksBarn, maxAks);
  const aksTotal = calculateAks(aksBarn, input.aksPlass, input.aksInntekt);

  const categories: SifoCategoryAmount[] = [
    {
      id: "matOgDrikke",
      label: "Mat og drikke",
      amount: matOgDrikke,
      group: "individ",
    },
    {
      id: "klaerOgSko",
      label: "Klær og sko",
      amount: klaerOgSko,
      group: "individ",
    },
    {
      id: "personligPleie",
      label: "Personlig pleie",
      amount: personligPleie,
      group: "individ",
    },
    {
      id: "lekOgMediebruk",
      label: "Lek og mediebruk",
      amount: lekOgMediebruk,
      group: "individ",
    },
    {
      id: "reisekostnader",
      label: "Reisekostnader (kollektiv)",
      amount: reisekostnader,
      group: "individ",
    },
    ...(spedbarnsutstyr > 0
      ? [
          {
            id: "spedbarnsutstyr",
            label: "Spedbarnsutstyr",
            amount: spedbarnsutstyr,
            group: "individ" as const,
          },
        ]
      : []),
    {
      id: "andreDagligvarer",
      label: "Andre dagligvarer",
      amount: andreDagligvarer,
      group: "husholdning",
    },
    {
      id: "husholdningsartikler",
      label: "Husholdningsartikler",
      amount: husholdningsartikler,
      group: "husholdning",
    },
    {
      id: "mobler",
      label: "Møbler",
      amount: mobler,
      group: "husholdning",
    },
    {
      id: "mediebrukOgFritid",
      label: "Mediebruk og fritid (husholdning)",
      amount: mediebrukOgFritid,
      group: "husholdning",
    },
    ...(bilkostnader > 0
      ? [
          {
            id: "bilkostnader",
            label: "Bilkostnader",
            amount: bilkostnader,
            group: "husholdning" as const,
          },
        ]
      : []),
    ...(barnehageTotal > 0
      ? [
          {
            id: "barnehage",
            label: "Barnehage",
            amount: barnehageTotal,
            group: "valgfritt" as const,
          },
        ]
      : []),
    ...(aksTotal > 0
      ? [
          {
            id: "aks",
            label: "AKS / skolefritidsordning",
            amount: aksTotal,
            group: "valgfritt" as const,
          },
        ]
      : []),
  ];

  const individTotal = categories
    .filter((c) => c.group === "individ")
    .reduce((s, c) => s + c.amount, 0);
  const husholdTotal = categories
    .filter((c) => c.group === "husholdning")
    .reduce((s, c) => s + c.amount, 0);
  const monthlyTotal = individTotal + husholdTotal + barnehageTotal + aksTotal;

  return {
    personCount,
    categories,
    individTotal,
    husholdTotal,
    barnehageTotal,
    aksTotal,
    monthlyTotal,
    yearlyTotal: monthlyTotal * 12,
    matStordriftRabatt,
  };
}

export function compareToSifo(
  userAmount: number,
  referenceAmount: number,
): SifoComparisonResult {
  const diff = userAmount - referenceAmount;
  const diffPercent =
    referenceAmount > 0 ? (diff / referenceAmount) * 100 : null;
  return { diff, diffPercent };
}

/** Verifiserer eksempelfamilien fra rapporten kap. 2.3 (uten barnehage/AKS). */
export function calculateEksempelfamilieNordmann(): SifoCalculatorResult | null {
  return calculateSifoBudget({
    members: [...SIFO_EXAMPLE_FAMILY.members],
    includeKollektiv: false,
    studentKollektiv: false,
    car: "bensin",
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  });
}
