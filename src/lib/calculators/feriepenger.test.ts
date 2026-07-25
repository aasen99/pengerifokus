import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculateFeriepenger,
  estimateBaseFromMonthlySalary,
  getFeriepengeRate,
} from "./feriepenger";

describe("getFeriepengeRate", () => {
  it("returns statutory and tariff rates", () => {
    assert.equal(getFeriepengeRate(4, false), 10.2);
    assert.equal(getFeriepengeRate(5, false), 12);
    assert.equal(getFeriepengeRate(4, true), 12.5);
    assert.equal(getFeriepengeRate(5, true), 14.3);
  });
});

describe("calculateFeriepenger", () => {
  it("calculates 12 % of base", () => {
    const result = calculateFeriepenger({
      base: 500_000,
      weeks: 5,
      over60: false,
    });
    assert.ok(result);
    assert.equal(result.ratePercent, 12);
    assert.equal(result.feriepenger, 60_000);
  });

  it("uses 10.2 % for statutory vacation", () => {
    const result = calculateFeriepenger({
      base: 500_000,
      weeks: 4,
      over60: false,
    });
    assert.ok(result);
    assert.equal(result.feriepenger, 51_000);
  });

  it("applies over-60 uplift", () => {
    const result = calculateFeriepenger({
      base: 500_000,
      weeks: 5,
      over60: true,
    });
    assert.ok(result);
    assert.equal(result.ratePercent, 14.3);
    assert.equal(result.feriepenger, 71_500);
  });
});

describe("estimateBaseFromMonthlySalary", () => {
  it("multiplies by 12", () => {
    assert.equal(estimateBaseFromMonthlySalary(40_000), 480_000);
  });
});
