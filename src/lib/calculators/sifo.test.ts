import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildCohabitationInsight,
  buildSifoSummaryComparison,
  calculateEksempelfamilieNordmann,
  calculateSifoBudget,
  compareSifoHouseholds,
  compareToSifo,
  sumUserCategoryAmounts,
  type SifoCalculatorInput,
} from "./sifo";

describe("calculateEksempelfamilieNordmann", () => {
  it("matcher tallene i SIFO-rapport 9-2026 kap. 2.3", () => {
    const result = calculateEksempelfamilieNordmann();
    assert.ok(result);

    assert.equal(result.individTotal, 28_543);
    assert.equal(result.husholdTotal, 8_895);
    assert.equal(result.monthlyTotal, 37_438);
    assert.equal(result.yearlyTotal, 449_256);
  });
});

describe("compareToSifo", () => {
  it("regner ut kr og prosent avvik", () => {
    const comparison = compareToSifo(40_000, 37_438);
    assert.equal(comparison.diff, 2_562);
    assert.ok(comparison.diffPercent !== null);
    assert.ok(Math.abs(comparison.diffPercent! - 6.84) < 0.1);
  });
});

describe("sumUserCategoryAmounts", () => {
  it("summerer kun fylte kategorier", () => {
    const result = calculateEksempelfamilieNordmann();
    assert.ok(result);

    const sum = sumUserCategoryAmounts(result.categories, {
      matOgDrikke: "10 000",
      klaerOgSko: "",
      personligPleie: "2 500",
    });

    assert.ok(sum);
    assert.equal(sum.total, 12_500);
    assert.equal(sum.filledCount, 2);
  });
});

describe("compareSifoHouseholds", () => {
  const ensligInput: SifoCalculatorInput = {
    members: ["kvinne_25_50"],
    cars: [],
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };

  const parInput: SifoCalculatorInput = {
    members: ["kvinne_25_50", "mann_25_50"],
    cars: [],
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };

  const familieInput: SifoCalculatorInput = {
    members: ["kvinne_25_50", "mann_25_50", "gutt_4_6", "jente_11_14"],
    cars: [{ type: "bensin" }],
    barnehageBarn: 1,
    barnehageInntekt: "hoy",
    aksBarn: 1,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };

  it("returnerer null når et scenario mangler medlemmer", () => {
    const comparison = compareSifoHouseholds(
      { ...ensligInput, members: [] },
      parInput,
    );
    assert.equal(comparison, null);
  });

  it("sammenligner enslig og par uten barn", () => {
    const enslig = calculateSifoBudget(ensligInput);
    const par = calculateSifoBudget(parInput);
    assert.ok(enslig);
    assert.ok(par);

    assert.equal(enslig.monthlyTotal, 12_599);
    assert.equal(par.monthlyTotal, 21_678);
    assert.equal(enslig.husholdTotal, 4_110);
    assert.equal(par.husholdTotal, 4_390);

    const comparison = compareSifoHouseholds(
      ensligInput,
      parInput,
      "Alene",
      "Samboer",
    );
    assert.ok(comparison);

    assert.equal(comparison.scenarioA.label, "Alene");
    assert.equal(comparison.scenarioB.label, "Samboer");
    assert.equal(comparison.monthlyDiff.diff, par.monthlyTotal - enslig.monthlyTotal);
    assert.equal(comparison.yearlyDiff.diff, comparison.monthlyDiff.diff * 12);
    assert.ok(comparison.groupDiffs.individ.diff > 0);
    assert.ok(comparison.groupDiffs.husholdning.diff > 0);
    assert.equal(comparison.groupDiffs.valgfritt.diff, 0);
    assert.ok(comparison.insights.length > 0);
    assert.ok(comparison.topChanges[0]);
    assert.equal(
      Math.abs(comparison.topChanges[0].diff),
      comparison.topChanges.reduce(
        (max, c) => Math.max(max, Math.abs(c.diff)),
        0,
      ),
    );

    assert.ok(comparison.cohabitationInsight);
    assert.equal(comparison.cohabitationInsight.direction, "enslig-til-par");
    assert.equal(comparison.cohabitationInsight.collectiveMonthlySavings, 3_520);
    assert.equal(comparison.cohabitationInsight.perPersonSavingsMonthly, 1_760);
    assert.ok(comparison.cohabitationInsight.increasePercent < 100);
  });

  it("sammenligner par og familie med barnehage og AKS", () => {
    const par = calculateSifoBudget(parInput);
    const familie = calculateSifoBudget(familieInput);
    assert.ok(par);
    assert.ok(familie);

    assert.equal(par.monthlyTotal, 21_678);
    assert.equal(familie.monthlyTotal, 42_472);
    assert.equal(familie.barnehageTotal + familie.aksTotal, 5_034);

    const comparison = compareSifoHouseholds(parInput, familieInput);
    assert.ok(comparison);

    assert.equal(comparison.monthlyDiff.diff, familie.monthlyTotal - par.monthlyTotal);
    assert.ok(comparison.groupDiffs.individ.diff > 0);
    assert.ok(comparison.groupDiffs.husholdning.diff > 0);
    assert.ok(comparison.groupDiffs.valgfritt.diff > 0);
    assert.equal(comparison.cohabitationInsight, null);

    const matDiff = comparison.categoryDiffs.find((c) => c.id === "matOgDrikke");
    assert.ok(matDiff);
    assert.ok(matDiff.diff > 0);

    const barnehageDiff = comparison.categoryDiffs.find((c) => c.id === "barnehage");
    assert.ok(barnehageDiff);
    assert.equal(barnehageDiff.amountA, 0);
    assert.ok(barnehageDiff.amountB > 0);
  });
});

describe("buildCohabitationInsight", () => {
  const ensligInput: SifoCalculatorInput = {
    members: ["kvinne_25_50"],
    cars: [],
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };

  const parInput: SifoCalculatorInput = {
    members: ["kvinne_25_50", "mann_25_50"],
    cars: [],
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };

  it("beregner besparelse ved enslig → par", () => {
    const enslig = calculateSifoBudget(ensligInput);
    const par = calculateSifoBudget(parInput);
    assert.ok(enslig);
    assert.ok(par);

    const insight = buildCohabitationInsight(
      ensligInput,
      parInput,
      enslig,
      par,
    );
    assert.ok(insight);
    assert.equal(insight.direction, "enslig-til-par");
    assert.equal(insight.singleMonthlyTotal, 12_599);
    assert.equal(insight.coupledMonthlyTotal, 21_678);
    assert.equal(insight.collectiveMonthlySavings, 3_520);
    assert.equal(insight.perPersonCoupledMonthly, 10_839);
    assert.equal(insight.perPersonSavingsMonthly, 1_760);
    assert.ok(insight.increasePercent > 70 && insight.increasePercent < 73);
    assert.ok(insight.highlights.length >= 2);
    assert.ok(
      insight.highlights.some((line) => line.includes("under 100 %")),
    );
  });

  it("beskriver kostnad per person ved par → enslig", () => {
    const enslig = calculateSifoBudget(ensligInput);
    const par = calculateSifoBudget(parInput);
    assert.ok(enslig);
    assert.ok(par);

    const insight = buildCohabitationInsight(
      parInput,
      ensligInput,
      par,
      enslig,
    );
    assert.ok(insight);
    assert.equal(insight.direction, "par-til-enslig");
    assert.equal(insight.perPersonSavingsMonthly, -1_760);
    assert.ok(
      insight.highlights.some((line) => line.includes("per person stiger")),
    );
  });

  it("returnerer null når mønsteret ikke matcher", () => {
    const familieInput: SifoCalculatorInput = {
      members: ["kvinne_25_50", "mann_25_50", "gutt_4_6"],
      cars: [],
      barnehageBarn: 0,
      barnehageInntekt: "hoy",
      aksBarn: 0,
      aksPlass: "heltid",
      aksInntekt: "hoy",
    };
    const enslig = calculateSifoBudget(ensligInput);
    const familie = calculateSifoBudget(familieInput);
    assert.ok(enslig);
    assert.ok(familie);

    assert.equal(
      buildCohabitationInsight(ensligInput, familieInput, enslig, familie),
      null,
    );
  });
});

describe("calculateSifoBudget – flere biler", () => {
  const baseInput: SifoCalculatorInput = {
    members: ["kvinne_25_50", "mann_25_50", "gutt_4_6", "jente_11_14"],
    cars: [],
    barnehageBarn: 0,
    barnehageInntekt: "hoy",
    aksBarn: 0,
    aksPlass: "heltid",
    aksInntekt: "hoy",
  };

  it("summerer bilkostnad per bil (samme husstandsstørrelse-band)", () => {
    const enBil = calculateSifoBudget({
      ...baseInput,
      cars: [{ type: "bensin" }],
    });
    const toBiler = calculateSifoBudget({
      ...baseInput,
      cars: [{ type: "bensin" }, { type: "el" }],
    });
    assert.ok(enBil);
    assert.ok(toBiler);

    const bilEn = enBil.categories.find((c) => c.id === "bilkostnader");
    const bilTo = toBiler.categories.find((c) => c.id === "bilkostnader");
    assert.ok(bilEn);
    assert.ok(bilTo);
    assert.equal(bilEn.amount, 3_375);
    assert.equal(bilTo.amount, 3_375 + 2_245);
    assert.equal(
      toBiler.husholdTotal - enBil.husholdTotal,
      bilTo.amount - bilEn.amount,
    );
  });
});

describe("buildSifoSummaryComparison", () => {
  it("inkluderer både direkte total og sum av kategorier", () => {
    const result = calculateEksempelfamilieNordmann();
    assert.ok(result);

    const comparison = buildSifoSummaryComparison(result, "35 000", {
      matOgDrikke: "10 000",
      klaerOgSko: "3 000",
    });

    assert.equal(comparison.sifoMonthly, 37_438);
    assert.equal(comparison.sifoYearly, 449_256);
    assert.equal(comparison.lines.length, 2);

    const direct = comparison.lines.find((line) => line.id === "direct");
    assert.ok(direct);
    assert.equal(direct.userMonthly, 35_000);
    assert.equal(direct.userYearly, 420_000);
    assert.equal(direct.monthlyDiff.diff, -2_438);

    const categories = comparison.lines.find((line) => line.id === "categories");
    assert.ok(categories);
    assert.equal(categories.userMonthly, 13_000);
    assert.equal(categories.filledCategoryCount, 2);
    assert.equal(categories.totalCategoryCount, result.categories.length);
  });
});
