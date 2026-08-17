import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseOfferRate } from "./tilbud";

describe("parseOfferRate", () => {
  it("returns max percent for rabatt labels", () => {
    assert.equal(parseOfferRate("15–20 % rabatt"), 20);
    assert.equal(parseOfferRate("30 % rabatt"), 30);
  });

  it("returns Trumf bonus percent as-is", () => {
    assert.equal(parseOfferRate("12,4 % Trumf-bonus"), 12.4);
  });

  it("converts EuroBonus poeng per 100 kr to ca. kr-verdi (prosent)", () => {
    assert.equal(parseOfferRate("50 poeng / 100 kr", "eurobonus"), 5);
    assert.equal(parseOfferRate("100 poeng / 100 kr", "eurobonus"), 10);
    assert.equal(parseOfferRate("Opptil 50 poeng / 100 kr", "eurobonus"), 5);
    assert.equal(parseOfferRate("50–60 poeng / 100 kr", "eurobonus"), 6);
  });

  it("converts Spenn poeng per 100 kr the same way", () => {
    assert.equal(parseOfferRate("40 poeng / 100 kr", "spenn"), 4);
  });

  it("returns raw poeng for unknown programs", () => {
    assert.equal(parseOfferRate("50 poeng / 100 kr"), 50);
  });

  it("ignores flat EuroBonus poeng without purchase amount", () => {
    assert.equal(parseOfferRate("500 poeng", "eurobonus"), null);
    assert.equal(parseOfferRate("1 500 poeng", "eurobonus"), null);
    assert.equal(parseOfferRate("3 000 poeng", "eurobonus"), null);
  });
});
