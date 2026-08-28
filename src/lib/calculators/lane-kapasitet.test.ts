import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateLaneKapasitet } from "./lane-kapasitet";

describe("calculateLaneKapasitet", () => {
  it("bruker EK × 10 for maks kjøpesum og lønn × 5 − gjeld for maks lån", () => {
    const result = calculateLaneKapasitet({
      equity: 400_000,
      existingDebt: 200_000,
      grossAnnualIncome: 1_200_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.maxPurchaseFromEquity, 4_000_000);
    assert.equal(result.maxLoanFromEquity, 3_600_000);
    assert.equal(result.maxLoanFromIncome, 5_800_000);
    assert.equal(result.maxLoan, 3_600_000);
    assert.equal(result.maxPurchase, 4_000_000);
    assert.equal(result.limitingFactor, "egenkapital");
  });

  it("begrenser av inntekt når lønn × 5 − gjeld er strammest", () => {
    const result = calculateLaneKapasitet({
      equity: 1_000_000,
      existingDebt: 500_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.maxPurchaseFromEquity, 10_000_000);
    assert.equal(result.maxLoanFromEquity, 9_000_000);
    assert.equal(result.maxLoanFromIncome, 2_500_000);
    assert.equal(result.maxLoan, 2_500_000);
    assert.equal(result.maxPurchase, 3_500_000);
    assert.equal(result.limitingFactor, "inntekt");
  });

  it("holder kjøpesum uendret når inntekt begrenser og gjeld betales med egenkapital", () => {
    const keepEquity = calculateLaneKapasitet({
      equity: 400_000,
      existingDebt: 500_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });
    const payDebt = calculateLaneKapasitet({
      equity: 300_000,
      existingDebt: 400_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });

    assert.ok(keepEquity);
    assert.ok(payDebt);
    assert.equal(keepEquity.maxPurchase, 2_900_000);
    assert.equal(payDebt.maxPurchase, 2_900_000);
    assert.ok(payDebt.maxLoan > keepEquity.maxLoan);
  });

  it("bruker lavere multiplikator for sekundærbolig", () => {
    const result = calculateLaneKapasitet({
      equity: 300_000,
      existingDebt: 100_000,
      grossAnnualIncome: 2_000_000,
      isPrimaryHome: false,
    });

    assert.ok(result);
    assert.equal(result.equityPurchaseMultiplier, 1 / 0.15);
    assert.equal(result.maxPurchaseFromEquity, 2_000_000);
    assert.equal(result.maxLoanFromEquity, 1_700_000);
    assert.equal(result.maxLoan, 1_700_000);
    assert.equal(result.limitingFactor, "egenkapital");
  });

  it("gir ingen lånerom når gjeld allerede overstiger lønn × 5", () => {
    const result = calculateLaneKapasitet({
      equity: 500_000,
      existingDebt: 3_200_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.maxLoanFromIncome, 0);
    assert.equal(result.maxLoan, 0);
    assert.equal(result.limitingFactor, "gjeld");
  });
});
