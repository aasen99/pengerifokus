import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DOCUMENT_FEE_RATE } from "../../data/eie-leie";
import { createDefaultUtleieboligInput } from "../../data/utleiebolig";
import { calculateDocumentFeeForPrice } from "./dokumentavgift";
import {
  calculateUtleiebolig,
  calculateUtleieboligBuyerCosts,
  calculateUtleieboligSaleCosts,
  projectUtleieboligVsFond,
  resolvedDocumentFee,
} from "./utleiebolig";

describe("utleiebolig dokumentavgift and buyer costs", () => {
  it("charges 75 000 kr dokumentavgift for a 3 000 000 kr selveier, not a 50 000 kr lump sum", () => {
    const input = createDefaultUtleieboligInput();
    assert.equal(input.purchasePrice, 3_000_000);
    assert.equal(input.housingType, "selveier");

    const documentFee = resolvedDocumentFee(input);
    assert.equal(documentFee, 75_000);
    assert.equal(documentFee, Math.round(3_000_000 * DOCUMENT_FEE_RATE));

    const buyerCosts = calculateUtleieboligBuyerCosts(input);
    assert.ok(buyerCosts >= documentFee);
    assert.notEqual(buyerCosts, 50_000);
    assert.equal(input.registrationFee + documentFee, buyerCosts);
  });

  it("charges no dokumentavgift for andelsbolig", () => {
    const input = {
      ...createDefaultUtleieboligInput(),
      housingType: "andelsbolig" as const,
      autoDocumentFee: true,
    };
    assert.equal(resolvedDocumentFee(input), 0);
    assert.equal(calculateDocumentFeeForPrice(3_000_000, "andelsbolig"), 0);
  });

  it("charges no dokumentavgift for aksjeleilighet", () => {
    assert.equal(calculateDocumentFeeForPrice(3_000_000, "aksjeleilighet"), 0);
  });

  it("does not add meglerhonorar to buyer purchase cash", () => {
    const input = createDefaultUtleieboligInput();
    const result = calculateUtleiebolig(input);
    const expectedBuyerCosts =
      resolvedDocumentFee(input) +
      input.registrationFee +
      input.appraisalFee +
      input.otherBuyerCosts;

    assert.equal(result.purchaseCosts, expectedBuyerCosts);
    assert.equal(result.equityInvested, input.downPayment + expectedBuyerCosts);
    assert.equal(input.appraisalFee, 0);
    assert.equal(input.otherBuyerCosts, 0);
    assert.ok(input.saleCostPercent > 0);
  });
});

describe("utleiebolig long-term sale costs", () => {
  it("reduces net proceeds by sale costs in the long-term comparison", () => {
    const input = createDefaultUtleieboligInput();
    const base = calculateUtleiebolig(input);
    const withSale = projectUtleieboligVsFond(input, base);
    const withoutSale = projectUtleieboligVsFond(
      { ...input, saleCostPercent: 0, saleCostFixed: 0 },
      base,
    );

    const expectedSaleCosts = calculateUtleieboligSaleCosts(
      withSale.propertyValue,
      input,
    );

    assert.ok(withSale.saleCosts > 0);
    assert.equal(withSale.saleCosts, expectedSaleCosts);
    assert.equal(withoutSale.saleCosts, 0);
    assert.equal(
      withSale.propertyNetWorth,
      withoutSale.propertyNetWorth - withSale.saleCosts,
    );
    assert.ok(withSale.propertyNetWorth < withoutSale.propertyNetWorth);
  });

  it("estimates latent fund tax in the projection without applying it to pretax fund net worth", () => {
    const input = createDefaultUtleieboligInput();
    const base = calculateUtleiebolig(input);
    const projection = projectUtleieboligVsFond(input, base);

    assert.ok(projection.fundLatentTax > 0);
    assert.equal(
      projection.fundNetWorthAfterTax,
      projection.fundNetWorth - projection.fundLatentTax,
    );
    assert.ok(projection.differenceVsFundAfterTax > projection.differenceVsFund);
  });
});
