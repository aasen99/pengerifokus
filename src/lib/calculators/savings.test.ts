import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  compareSavingsScenarios,
  monthlyToReachTarget,
  monthsToTarget,
  projectSavings,
  rateToReachTarget,
} from "./savings";

describe("compareSavingsScenarios", () => {
  it("grows with positive return and contributions", () => {
    const result = compareSavingsScenarios({
      initialBalance: 10_000,
      monthlySaving: 1_000,
      annualReturnPercent: 7,
      years: 10,
    });

    assert.ok(result.standard.finalBalance > 10_000 + 1_000 * 120);
    assert.ok(result.standard.returnEarned > 0);
    assert.equal(result.withExtra, null);
  });

  it("shows extra monthly impact", () => {
    const result = compareSavingsScenarios({
      initialBalance: 0,
      monthlySaving: 1_000,
      annualReturnPercent: 5,
      years: 5,
      extraMonthlySaving: 200,
    });

    assert.ok(result.withExtra);
    assert.ok(result.balanceDifference > 0);
    assert.equal(result.extraContributed, 200 * 60);
  });
});

describe("projectSavings", () => {
  it("includes year 0 and yearly snapshots", () => {
    const projection = projectSavings({
      initialBalance: 50_000,
      monthlySaving: 2_000,
      annualReturnPercent: 6,
      years: 5,
    });

    assert.equal(projection.years[0]?.year, 0);
    assert.equal(projection.years[0]?.balance, 50_000);
    assert.ok(projection.years.length >= 6);
    assert.ok(
      projection.final.finalBalance >
        projection.years[projection.years.length - 1]!.balance - 1,
    );
  });
});

describe("monthsToTarget", () => {
  it("returns 0 when already at target", () => {
    const result = monthsToTarget({
      initialBalance: 1_000_000,
      monthlySaving: 0,
      annualReturnPercent: 0,
      targetAmount: 1_000_000,
    });

    assert.ok(result);
    assert.equal(result.months, 0);
    assert.equal(result.reachable, true);
  });

  it("finds time to reach 1 million", () => {
    const result = monthsToTarget({
      initialBalance: 0,
      monthlySaving: 5_000,
      annualReturnPercent: 7,
      targetAmount: 1_000_000,
    });

    assert.ok(result);
    assert.equal(result.reachable, true);
    assert.ok(result.months > 12);
    assert.ok(result.months < 30 * 12);
    assert.ok(result.finalBalance >= 1_000_000);
  });

  it("marks unreachable without contributions or return", () => {
    const result = monthsToTarget({
      initialBalance: 10_000,
      monthlySaving: 0,
      annualReturnPercent: 0,
      targetAmount: 1_000_000,
    });

    assert.ok(result);
    assert.equal(result.reachable, false);
  });
});

describe("monthlyToReachTarget", () => {
  it("returns 0 when initial alone reaches target", () => {
    const monthly = monthlyToReachTarget({
      initialBalance: 1_000_000,
      annualReturnPercent: 5,
      years: 10,
      targetAmount: 1_000_000,
    });

    assert.equal(monthly, 0);
  });

  it("matches forward projection roughly", () => {
    const years = 15;
    const rate = 7;
    const target = 1_000_000;
    const initial = 50_000;

    const monthly = monthlyToReachTarget({
      initialBalance: initial,
      annualReturnPercent: rate,
      years,
      targetAmount: target,
    });

    assert.ok(monthly !== null && monthly > 0);

    const check = monthsToTarget({
      initialBalance: initial,
      monthlySaving: monthly!,
      annualReturnPercent: rate,
      targetAmount: target,
    });

    assert.ok(check?.reachable);
    assert.ok(Math.abs(check!.months - years * 12) <= 2);
  });
});

describe("rateToReachTarget", () => {
  it("returns 0 when contributions alone suffice", () => {
    const rate = rateToReachTarget({
      initialBalance: 0,
      monthlySaving: 10_000,
      years: 10,
      targetAmount: 500_000,
    });

    assert.equal(rate, 0);
  });

  it("finds a positive rate when needed", () => {
    const rate = rateToReachTarget({
      initialBalance: 0,
      monthlySaving: 3_000,
      years: 20,
      targetAmount: 1_000_000,
    });

    assert.ok(rate !== null && rate > 0);
    assert.ok(rate < 20);

    const monthly = monthlyToReachTarget({
      initialBalance: 0,
      annualReturnPercent: rate!,
      years: 20,
      targetAmount: 1_000_000,
    });

    assert.ok(monthly !== null);
    assert.ok(Math.abs(monthly! - 3_000) < 50);
  });
});
