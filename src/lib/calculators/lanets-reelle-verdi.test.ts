import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculateAnnuityPayment,
  calculateInflationLoanResult,
  calculateRealDebtValue,
  calculateRealInterestRate,
  compareLoanStrategies,
  simulateLoan,
} from "./lanets-reelle-verdi";

describe("calculateRealDebtValue", () => {
  it("returns same value at 0 % inflation", () => {
    assert.equal(calculateRealDebtValue(2_000_000, 0, 10), 2_000_000);
  });

  it("returns lower value with positive inflation", () => {
    const value = calculateRealDebtValue(2_000_000, 2.5, 10);
    assert.ok(value < 2_000_000);
    assert.ok(value > 1_500_000);
  });
});

describe("calculateRealInterestRate", () => {
  it("uses Fisher equation", () => {
    const real = calculateRealInterestRate(5, 2.5);
    assert.ok(Math.abs(real - 2.439) < 0.01);
  });
});

describe("calculateInflationLoanResult", () => {
  it("matches spec example shape", () => {
    const result = calculateInflationLoanResult({
      currentDebt: 2_000_000,
      years: 10,
      inflationRate: 2.5,
      nominalInterestRate: 5,
    });

    assert.ok(result.reductionInRealValue > 0);
    assert.ok(result.reductionPercent > 0);
    assert.equal(result.yearlyValues.length, 11);
    assert.equal(result.yearlyValues[0]?.realValue, 2_000_000);
  });
});

describe("calculateAnnuityPayment", () => {
  it("returns positive payment for normal loan", () => {
    const payment = calculateAnnuityPayment(2_000_000, 5, 25);
    assert.ok(payment > 10_000);
  });

  it("distributes principal evenly at 0 % interest", () => {
    const payment = calculateAnnuityPayment(120_000, 0, 10);
    assert.equal(payment, 1_000);
  });
});

describe("simulateLoan", () => {
  it("pays off loan without negative balance", () => {
    const payment = calculateAnnuityPayment(500_000, 4, 20);
    const result = simulateLoan({
      principal: 500_000,
      annualInterestRate: 4,
      monthlyPayment: payment,
    });

    assert.ok(result.months > 0);
    assert.ok(result.schedule.at(-1)!.balance <= 0.01);
  });

  it("finishes faster with increased payments", () => {
    const payment = calculateAnnuityPayment(1_000_000, 5, 25);
    const standard = simulateLoan({
      principal: 1_000_000,
      annualInterestRate: 5,
      monthlyPayment: payment,
    });
    const faster = simulateLoan({
      principal: 1_000_000,
      annualInterestRate: 5,
      monthlyPayment: payment,
      annualPaymentIncreaseRate: 0.03,
    });

    assert.ok(faster.months < standard.months);
    assert.ok(faster.totalInterest < standard.totalInterest);
  });

  it("gives identical scenarios at 0 % salary growth increase", () => {
    const payment = calculateAnnuityPayment(800_000, 4.5, 20);
    const standard = simulateLoan({
      principal: 800_000,
      annualInterestRate: 4.5,
      monthlyPayment: payment,
    });
    const same = simulateLoan({
      principal: 800_000,
      annualInterestRate: 4.5,
      monthlyPayment: payment,
      annualPaymentIncreaseRate: 0,
    });

    assert.equal(standard.months, same.months);
    assert.equal(standard.totalInterest, same.totalInterest);
  });
});

describe("compareLoanStrategies", () => {
  it("applies 100 % of 3 % salary growth as 3 % payment increase", () => {
    const comparison = compareLoanStrategies({
      currentDebt: 2_000_000,
      nominalInterestRate: 5,
      repaymentYears: 25,
      salaryGrowthRate: 3,
      salaryGrowthShare: 100,
    });

    assert.ok(comparison);
    assert.ok(Math.abs(comparison.annualPaymentIncreaseRate - 0.03) < 0.0001);
  });

  it("applies 50 % of 4 % salary growth as 2 % payment increase", () => {
    const comparison = compareLoanStrategies({
      currentDebt: 2_000_000,
      nominalInterestRate: 5,
      repaymentYears: 25,
      salaryGrowthRate: 4,
      salaryGrowthShare: 50,
    });

    assert.ok(comparison);
    assert.ok(Math.abs(comparison.annualPaymentIncreaseRate - 0.02) < 0.0001);
  });
});
