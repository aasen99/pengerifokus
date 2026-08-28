import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateLaneKapasitet } from "./lane-kapasitet";

describe("calculateLaneKapasitet", () => {
  it("regner EK − GJELD som netto posisjon", () => {
    const result = calculateLaneKapasitet({
      equity: 800_000,
      existingDebt: 300_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.netPosition, 500_000);
  });

  it("begrenser av inntekt når 5× regelen er strammest", () => {
    const result = calculateLaneKapasitet({
      equity: 1_000_000,
      existingDebt: 500_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.maxTotalDebtFromIncome, 3_000_000);
    assert.equal(result.remainingDebtRoomFromIncome, 2_500_000);
    assert.equal(result.maxLoanFromEquity, 9_000_000);
    assert.equal(result.maxLoan, 2_500_000);
    assert.equal(result.maxPurchase, 3_500_000);
    assert.equal(result.limitingFactor, "inntekt");
  });

  it("begrenser av egenkapital når egenkapitalkravet er strammest", () => {
    const result = calculateLaneKapasitet({
      equity: 400_000,
      existingDebt: 0,
      grossAnnualIncome: 1_200_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.maxPurchaseFromEquity, 4_000_000);
    assert.equal(result.maxLoanFromEquity, 3_600_000);
    assert.equal(result.maxLoanFromIncome, 6_000_000);
    assert.equal(result.maxLoan, 3_600_000);
    assert.equal(result.maxPurchase, 4_000_000);
    assert.equal(result.limitingFactor, "egenkapital");
  });

  it("bruker 15 % egenkapitalkrav for sekundærbolig", () => {
    const result = calculateLaneKapasitet({
      equity: 300_000,
      existingDebt: 0,
      grossAnnualIncome: 2_000_000,
      isPrimaryHome: false,
    });

    assert.ok(result);
    assert.equal(result.equityRequirementPercent, 0.15);
    assert.equal(result.maxPurchaseFromEquity, 2_000_000);
    assert.equal(result.maxLoanFromEquity, 1_700_000);
    assert.equal(result.maxLoan, 1_700_000);
    assert.equal(result.limitingFactor, "egenkapital");
  });

  it("gir ingen lånerom når gjeld allerede overstiger 5× inntekt", () => {
    const result = calculateLaneKapasitet({
      equity: 500_000,
      existingDebt: 3_200_000,
      grossAnnualIncome: 600_000,
      isPrimaryHome: true,
    });

    assert.ok(result);
    assert.equal(result.remainingDebtRoomFromIncome, 0);
    assert.equal(result.maxLoan, 0);
    assert.equal(result.limitingFactor, "gjeld");
  });
});
