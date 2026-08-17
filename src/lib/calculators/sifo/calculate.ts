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
import { parseIntegerInput } from "@/lib/format/number";
import type {
  SifoAksInntekt,
  SifoAksPlass,
  SifoBarnehageInntekt,
  SifoCalculatorInput,
  SifoCalculatorResult,
  SifoCarFuelType,
  SifoCategoryAmount,
  SifoCategoryDiff,
  SifoCohabitationInsight,
  SifoComparisonResult,
  SifoHouseholdComparison,
  SifoHouseholdGroupDiffs,
  SifoSummaryComparison,
  SifoSummaryComparisonLine,
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

function getReisekostnad(member: SifoMemberType): number {
  if (PENSJONIST_TYPES.has(member)) {
    return SIFO_REISEKOSTNADER.pensjonist_66_plus;
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

/** Antall barn i husholdningen som er i barnehagealder (1–6 år). */
export function getEligibleBarnehageCount(members: SifoMemberType[]): number {
  return countEligibleBarnehage(members);
}

/** Antall barn i husholdningen som er i AKS-alder (7–14 år). */
export function getEligibleAksCount(members: SifoMemberType[]): number {
  return countEligibleAks(members);
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

/**
 * Månedlig bilkostnad for én bil. SIFO-tabellen har satser per husholdning
 * (1–4 vs 5–7 personer), ikke per bil. Vi antar at hver bil i husholdningen
 * belastes med samme husstandsstørrelse-band — altså summeres kostnaden per bil.
 */
function getBilkostnadForCar(
  carType: SifoCarFuelType,
  personCount: number,
): number {
  const bilKey =
    personCount <= 4
      ? carType === "bensin"
        ? "bensin_1_4"
        : "el_1_4"
      : carType === "bensin"
        ? "bensin_5_7"
        : "el_5_7";
  return SIFO_BILKOSTNADER[bilKey];
}

function calculateBilkostnader(
  cars: SifoCalculatorInput["cars"],
  personCount: number,
): number {
  return cars.reduce(
    (sum, car) => sum + getBilkostnadForCar(car.type, personCount),
    0,
  );
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

  const reisekostnader = members
    .filter((m) => VOKSEN_TYPES.has(m))
    .reduce((sum, member) => sum + getReisekostnad(member), 0);

  const andreDagligvarer = SIFO_ANDRE_DAGLIGVARER[idx];
  const husholdningsartikler = SIFO_HUSHOLDNINGSARTIKLER[idx];
  const mobler = SIFO_MOBler[idx];
  const mediebrukOgFritid = SIFO_MEDIEBRUK_FRITID[idx];

  const bilkostnader = calculateBilkostnader(input.cars, personCount);

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

export function sumUserCategoryAmounts(
  categories: SifoCategoryAmount[],
  rawAmounts: Record<string, string>,
): { total: number; filledCount: number } | null {
  let total = 0;
  let filledCount = 0;

  for (const category of categories) {
    const raw = rawAmounts[category.id];
    if (raw === undefined || raw.trim() === "") continue;

    const amount = parseIntegerInput(raw);
    if (!Number.isFinite(amount) || amount < 0) continue;

    total += amount;
    filledCount += 1;
  }

  if (filledCount === 0) return null;
  return { total, filledCount };
}

export function buildSifoSummaryComparison(
  result: SifoCalculatorResult,
  rawUserMonthlyTotal: string,
  rawUserCategoryAmounts: Record<string, string>,
): SifoSummaryComparison {
  const lines: SifoSummaryComparisonLine[] = [];

  if (rawUserMonthlyTotal.trim() !== "") {
    const userMonthly = parseIntegerInput(rawUserMonthlyTotal);
    if (Number.isFinite(userMonthly) && userMonthly >= 0) {
      const userYearly = userMonthly * 12;
      lines.push({
        id: "direct",
        label: "Dine utgifter (totalt)",
        userMonthly,
        userYearly,
        monthlyDiff: compareToSifo(userMonthly, result.monthlyTotal),
        yearlyDiff: compareToSifo(userYearly, result.yearlyTotal),
      });
    }
  }

  const categorySum = sumUserCategoryAmounts(
    result.categories,
    rawUserCategoryAmounts,
  );
  if (categorySum) {
    const userYearly = categorySum.total * 12;
    lines.push({
      id: "categories",
      label: "Sum av kategorier",
      userMonthly: categorySum.total,
      userYearly,
      monthlyDiff: compareToSifo(categorySum.total, result.monthlyTotal),
      yearlyDiff: compareToSifo(userYearly, result.yearlyTotal),
      filledCategoryCount: categorySum.filledCount,
      totalCategoryCount: result.categories.length,
    });
  }

  return {
    sifoMonthly: result.monthlyTotal,
    sifoYearly: result.yearlyTotal,
    lines,
  };
}

function countAdults(members: SifoMemberType[]): number {
  return members.filter((m) => VOKSEN_TYPES.has(m)).length;
}

function formatKrAmount(amount: number): string {
  return `${Math.round(amount).toLocaleString("nb-NO")} kr`;
}

/**
 * Sammenligner enslig ↔ par der kun antall voksne endres (+/− én person).
 * Besparelse vs. to enslige: 2 × ensligTotal − parTotal når parTotal < 2 × ensligTotal.
 */
export function buildCohabitationInsight(
  inputA: SifoCalculatorInput,
  inputB: SifoCalculatorInput,
  resultA: SifoCalculatorResult,
  resultB: SifoCalculatorResult,
): SifoCohabitationInsight | null {
  const adultsA = countAdults(inputA.members);
  const adultsB = countAdults(inputB.members);
  const personsA = resultA.personCount;
  const personsB = resultB.personCount;

  const fmtPct = (n: number) =>
    n.toLocaleString("nb-NO", { maximumFractionDigits: 1 });

  if (adultsA === 1 && adultsB === 2 && personsB === personsA + 1) {
    const singleMonthly = resultA.monthlyTotal;
    const coupledMonthly = resultB.monthlyTotal;
    const increasePercent =
      ((coupledMonthly - singleMonthly) / singleMonthly) * 100;
    const collectiveMonthlySavings = 2 * singleMonthly - coupledMonthly;
    const perPersonCoupled = coupledMonthly / 2;
    const perPersonSavings = singleMonthly - perPersonCoupled;

    const highlights: string[] = [];
    if (collectiveMonthlySavings > 0) {
      highlights.push(
        `Samlet økning er ${fmtPct(increasePercent)} % — under 100 %. Dere sparer ${formatKrAmount(collectiveMonthlySavings)}/mnd sammenlignet med to separate enslighusholdninger.`,
      );
      highlights.push(
        `Per person: ${formatKrAmount(perPersonCoupled)}/mnd mot ${formatKrAmount(singleMonthly)} alene (spar ${formatKrAmount(perPersonSavings)}/mnd hver).`,
      );
      highlights.push(
        `Det tilsvarer ${formatKrAmount(collectiveMonthlySavings * 12)}/år samlet, eller ${formatKrAmount(perPersonSavings * 12)}/år per person.`,
      );
    } else {
      highlights.push(
        `Samlet økning er ${fmtPct(increasePercent)} % — høyere enn to separate enslighusholdninger (${formatKrAmount(2 * singleMonthly)}/mnd).`,
      );
    }

    return {
      direction: "enslig-til-par",
      singleMonthlyTotal: singleMonthly,
      coupledMonthlyTotal: coupledMonthly,
      increasePercent,
      collectiveMonthlySavings,
      collectiveYearlySavings: collectiveMonthlySavings * 12,
      perPersonCoupledMonthly: perPersonCoupled,
      perPersonSavingsMonthly: perPersonSavings,
      perPersonSavingsYearly: perPersonSavings * 12,
      highlights,
    };
  }

  if (adultsA === 2 && adultsB === 1 && personsA === personsB + 1) {
    const coupledMonthly = resultA.monthlyTotal;
    const singleMonthly = resultB.monthlyTotal;
    const perPersonWhenTogether = coupledMonthly / 2;
    const perPersonIncrease = singleMonthly - perPersonWhenTogether;
    const collectiveMonthlySavings = 2 * singleMonthly - coupledMonthly;
    const totalDrop = coupledMonthly - singleMonthly;

    const highlights: string[] = [
      `Husholdningen bruker ${formatKrAmount(totalDrop)}/mnd mindre totalt, men per person stiger utgiftene fra ${formatKrAmount(perPersonWhenTogether)}/mnd sammen til ${formatKrAmount(singleMonthly)}/mnd alene (+${formatKrAmount(perPersonIncrease)}/mnd).`,
    ];
    if (collectiveMonthlySavings > 0) {
      highlights.push(
        `To separate enslighusholdninger ville koste ${formatKrAmount(2 * singleMonthly)}/mnd totalt — ${formatKrAmount(collectiveMonthlySavings)}/mnd mer enn dere bruker sammen.`,
      );
    }

    return {
      direction: "par-til-enslig",
      singleMonthlyTotal: singleMonthly,
      coupledMonthlyTotal: coupledMonthly,
      increasePercent:
        perPersonWhenTogether > 0
          ? (perPersonIncrease / perPersonWhenTogether) * 100
          : 0,
      collectiveMonthlySavings,
      collectiveYearlySavings: collectiveMonthlySavings * 12,
      perPersonCoupledMonthly: perPersonWhenTogether,
      perPersonSavingsMonthly: -perPersonIncrease,
      perPersonSavingsYearly: -perPersonIncrease * 12,
      highlights,
    };
  }

  return null;
}

function buildHouseholdComparisonInsights(
  resultA: SifoCalculatorResult,
  resultB: SifoCalculatorResult,
  groupDiffs: SifoHouseholdGroupDiffs,
  topChanges: SifoCategoryDiff[],
): string[] {
  const insights: string[] = [];

  if (resultB.personCount !== resultA.personCount) {
    insights.push(
      `Antall personer endres fra ${resultA.personCount} til ${resultB.personCount}.`,
    );
  }

  if (groupDiffs.husholdning.diff !== 0) {
    const verb = groupDiffs.husholdning.diff > 0 ? "øker" : "reduseres";
    const pct =
      groupDiffs.husholdning.diffPercent !== null
        ? ` (${groupDiffs.husholdning.diffPercent > 0 ? "+" : ""}${groupDiffs.husholdning.diffPercent.toLocaleString("nb-NO", { maximumFractionDigits: 1 })} %)`
        : "";
    insights.push(
      `Husholdningsposter ${verb} med ${Math.abs(groupDiffs.husholdning.diff).toLocaleString("nb-NO")} kr per måned${pct}.`,
    );
  }

  if (groupDiffs.individ.diff !== 0) {
    const verb = groupDiffs.individ.diff > 0 ? "øker" : "reduseres";
    insights.push(
      `Individposter ${verb} med ${Math.abs(groupDiffs.individ.diff).toLocaleString("nb-NO")} kr per måned.`,
    );
  }

  if (groupDiffs.valgfritt.diff !== 0) {
    const verb = groupDiffs.valgfritt.diff > 0 ? "øker" : "reduseres";
    insights.push(
      `Barnehage og AKS ${verb} med ${Math.abs(groupDiffs.valgfritt.diff).toLocaleString("nb-NO")} kr per måned.`,
    );
  }

  const meaningful = topChanges.filter((c) => c.diff !== 0).slice(0, 3);
  if (meaningful.length > 0) {
    insights.push(
      `Størst endring i: ${meaningful.map((c) => c.label.toLowerCase()).join(", ")}.`,
    );
  }

  return insights;
}

export function compareSifoHouseholds(
  inputA: SifoCalculatorInput,
  inputB: SifoCalculatorInput,
  labelA = "Scenario A",
  labelB = "Scenario B",
): SifoHouseholdComparison | null {
  const resultA = calculateSifoBudget(inputA);
  const resultB = calculateSifoBudget(inputB);
  if (!resultA || !resultB) return null;

  const monthlyDiff = compareToSifo(resultB.monthlyTotal, resultA.monthlyTotal);
  const yearlyDiff = compareToSifo(resultB.yearlyTotal, resultA.yearlyTotal);

  const categoryIds = new Set([
    ...resultA.categories.map((c) => c.id),
    ...resultB.categories.map((c) => c.id),
  ]);

  const categoryDiffs: SifoCategoryDiff[] = [];
  for (const id of categoryIds) {
    const catA = resultA.categories.find((c) => c.id === id);
    const catB = resultB.categories.find((c) => c.id === id);
    const amountA = catA?.amount ?? 0;
    const amountB = catB?.amount ?? 0;
    const diff = amountB - amountA;
    categoryDiffs.push({
      id,
      label: catB?.label ?? catA?.label ?? id,
      group: catB?.group ?? catA?.group ?? "individ",
      amountA,
      amountB,
      diff,
      diffPercent: amountA > 0 ? (diff / amountA) * 100 : null,
    });
  }

  const topChanges = [...categoryDiffs].sort(
    (a, b) => Math.abs(b.diff) - Math.abs(a.diff),
  );

  const valgfrittA = resultA.barnehageTotal + resultA.aksTotal;
  const valgfrittB = resultB.barnehageTotal + resultB.aksTotal;
  const groupDiffs: SifoHouseholdGroupDiffs = {
    individ: compareToSifo(resultB.individTotal, resultA.individTotal),
    husholdning: compareToSifo(resultB.husholdTotal, resultA.husholdTotal),
    valgfritt: compareToSifo(valgfrittB, valgfrittA),
  };

  const cohabitationInsight = buildCohabitationInsight(
    inputA,
    inputB,
    resultA,
    resultB,
  );

  const insights = buildHouseholdComparisonInsights(
    resultA,
    resultB,
    groupDiffs,
    topChanges,
  );

  return {
    scenarioA: { label: labelA, result: resultA },
    scenarioB: { label: labelB, result: resultB },
    monthlyDiff,
    yearlyDiff,
    categoryDiffs,
    topChanges,
    groupDiffs,
    insights,
    cohabitationInsight,
  };
}

/** Verifiserer eksempelfamilien fra rapporten kap. 2.3 (uten barnehage/AKS). */
export function calculateEksempelfamilieNordmann(): SifoCalculatorResult | null {
  return calculateSifoBudget({
    members: [...SIFO_EXAMPLE_FAMILY.members],
    cars: [{ type: "bensin" }],
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  });
}
