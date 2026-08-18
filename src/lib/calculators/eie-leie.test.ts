import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDefaultEieLeieInput } from "../../data/eie-leie";
import { calculateEieLeie } from "./eie-leie";

describe("calculateEieLeie", () => {
  it("includes tax fields on the default input", () => {
    const input = createDefaultEieLeieInput();
    assert.equal(typeof input.interestDeductionPercent, "number");
    assert.equal(typeof input.shareGainTaxPercent, "number");
    assert.equal(typeof input.assumeTaxFreeHomeSale, "boolean");
    assert.equal(typeof input.propertyGainTaxPercent, "number");
  });

  it("reports pretax net worth separately from after-tax net worth", () => {
    const result = calculateEieLeie(createDefaultEieLeieInput());
    assert.ok(result.owner.interestTaxBenefit > 0);
    assert.ok(result.renter.latentFundTax > 0);
    assert.notEqual(
      result.netWorthDifference,
      result.netWorthDifferenceAfterTax,
    );
  });

  it("does not tax home sale when the sale is assumed tax-free", () => {
    const result = calculateEieLeie({
      ...createDefaultEieLeieInput(),
      assumeTaxFreeHomeSale: true,
    });
    assert.equal(result.owner.homeSaleTax, 0);
  });
});
