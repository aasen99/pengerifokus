import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BSU_MAX_ANNUAL_DEPOSIT,
  BSU_MAX_TOTAL_DEPOSIT,
  calculateBsu,
} from "./bsu";

const base = {
  annualDeposit: BSU_MAX_ANNUAL_DEPOSIT,
  years: 5,
  currentBalance: 0,
  totalDeposited: 0,
  interestRatePercent: 4,
  regularSavingsRatePercent: 3,
  age: 25,
  ownsHomeOnDecember31: false,
  paysEnoughTax: true,
};

describe("calculateBsu", () => {
  it("caps five years of max deposits at 137 500 kr when starting from 0", () => {
    const result = calculateBsu(base);
    assert.equal(result.totalDeposits, 5 * BSU_MAX_ANNUAL_DEPOSIT);
    assert.equal(result.totalTaxBenefit, 5 * 2_750);
  });

  it("allows only 10 000 kr new deposits when 290 000 kr is already paid in", () => {
    const result = calculateBsu({
      ...base,
      currentBalance: 290_000,
      totalDeposited: 290_000,
    });
    assert.equal(result.totalDeposits, 10_000);
    assert.ok(result.bsuBalance > 290_000);
  });

  it("adds no new deposits at 300 000 kr paid in, but interest continues", () => {
    const result = calculateBsu({
      ...base,
      currentBalance: BSU_MAX_TOTAL_DEPOSIT,
      totalDeposited: BSU_MAX_TOTAL_DEPOSIT,
    });
    assert.equal(result.totalDeposits, 0);
    assert.ok(result.bsuBalance > BSU_MAX_TOTAL_DEPOSIT);
    assert.ok(result.totalInterest > 0);
  });

  it("shows interest advantage for homeowners without BSU tax deduction", () => {
    const withHome = calculateBsu({
      ...base,
      ownsHomeOnDecember31: true,
    });
    const withoutHome = calculateBsu(base);

    assert.equal(withHome.totalTaxBenefit, 0);
    assert.ok(withHome.advantageFromInterest > 0);
    assert.equal(withHome.advantageFromInterest, withoutHome.advantageFromInterest);
  });

  it("limits the tax deduction when the user does not pay enough tax", () => {
    const result = calculateBsu({
      ...base,
      years: 1,
      paysEnoughTax: false,
      annualTaxAvailable: 1_000,
    });
    assert.equal(result.totalTaxBenefit, 1_000);
  });

  it("stops saving after the year the user turns 33", () => {
    const result = calculateBsu({
      ...base,
      age: 33,
      years: 5,
    });
    assert.equal(result.yearsUsed, 1);
    assert.equal(result.totalDeposits, BSU_MAX_ANNUAL_DEPOSIT);
  });
});
