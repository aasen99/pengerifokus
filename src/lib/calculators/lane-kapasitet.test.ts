import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateLaneKapasitet } from "./lane-kapasitet";

describe("calculateLaneKapasitet", () => {
  it("bruker EK × 10 − gjeld for maks kjøpesum og lønn × 5 − gjeld for maks lån", () => {
    const result = calculateLaneKapasitet({
      equity: 400_000,
      existingDebt: 200_000,
      grossAnnualIncome: 1_200_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.maxPurchaseFromEquity, 3_800_000);
    assert.equal(result.maxLoanFromEquity, 3_400_000);
    assert.equal(result.maxLoanFromIncome, 5_800_000);
    assert.equal(result.maxLoan, 3_400_000);
    assert.equal(result.maxPurchase, 3_800_000);
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
    assert.equal(result.maxPurchaseFromEquity, 9_500_000);
    assert.equal(result.maxLoanFromEquity, 8_500_000);
    assert.equal(result.maxLoanFromIncome, 2_500_000);
    assert.equal(result.maxLoan, 2_500_000);
    assert.equal(result.maxPurchase, 3_500_000);
    assert.equal(result.limitingFactor, "inntekt");
  });

  it("gir mer låneramme når ekstra penger holdes som EK fremfor nedbetaling", () => {
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
    assert.ok(keepEquity.maxPurchase > payDebt.maxPurchase);
    assert.ok(keepEquity.maxLoan >= payDebt.maxLoan);
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
    assert.equal(result.maxPurchaseFromEquity, 1_900_000);
    assert.equal(result.maxLoanFromEquity, 1_600_000);
    assert.equal(result.maxLoan, 1_600_000);
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
