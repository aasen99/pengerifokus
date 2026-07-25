import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  adjustByPercent,
  findWhole,
  isPercentOf,
  percentChange,
  percentOf,
} from "./prosent";

describe("percentOf", () => {
  it("calculates 15 % of 899", () => {
    const result = percentOf(15, 899);
    assert.ok(result);
    assert.ok(Math.abs(result.value - 134.85) < 0.01);
  });
});

describe("isPercentOf", () => {
  it("calculates share of salary increase", () => {
    const result = isPercentOf(15_000, 500_000);
    assert.ok(result);
    assert.ok(Math.abs(result.percent - 3) < 0.01);
  });

  it("returns null when whole is 0", () => {
    assert.equal(isPercentOf(10, 0), null);
  });
});

describe("findWhole", () => {
  it("finds whole from part and percent", () => {
    const result = findWhole(250_000, 10);
    assert.ok(result);
    assert.equal(result.whole, 2_500_000);
  });
});

describe("percentChange", () => {
  it("detects increase", () => {
    const result = percentChange(100, 125);
    assert.ok(result);
    assert.equal(result.direction, "increase");
    assert.equal(result.percent, 25);
    assert.equal(result.difference, 25);
  });

  it("detects decrease", () => {
    const result = percentChange(200, 150);
    assert.ok(result);
    assert.equal(result.direction, "decrease");
    assert.equal(result.percent, -25);
  });
});

describe("adjustByPercent", () => {
  it("increases value", () => {
    const result = adjustByPercent(900, 20, "increase");
    assert.ok(result);
    assert.equal(result.newValue, 1080);
    assert.equal(result.difference, 180);
  });

  it("decreases value", () => {
    const result = adjustByPercent(240, 20, "decrease");
    assert.ok(result);
    assert.equal(result.newValue, 192);
  });
});
