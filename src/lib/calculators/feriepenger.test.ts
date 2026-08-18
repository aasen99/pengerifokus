import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculateFeriepenger,
  estimateBaseFromMonthlySalary,
  getFeriepengeRate,
  getHolidayWorkingDays,
  holidayDeductionForDays,
  HOLIDAY_WORKING_DAYS,
  WORKING_DAYS_PER_MONTH,
  WORKING_DAYS_PER_YEAR,
} from "./feriepenger";

describe("getFeriepengeRate", () => {
  it("returns statutory and tariff rates", () => {
    assert.equal(getFeriepengeRate(4, false), 10.2);
    assert.equal(getFeriepengeRate(5, false), 12);
    assert.equal(getFeriepengeRate(4, true), 12.5);
    assert.equal(getFeriepengeRate(5, true), 14.3);
  });
});

describe("getHolidayWorkingDays", () => {
  it("uses 25 days for five weeks under 60 and 30 days from age 60", () => {
    assert.equal(getHolidayWorkingDays(5, false), HOLIDAY_WORKING_DAYS.weeks5);
    assert.equal(
      getHolidayWorkingDays(5, true),
      HOLIDAY_WORKING_DAYS.weeks5 + HOLIDAY_WORKING_DAYS.extraOver60,
    );
  });

  it("uses 21 days for statutory holiday and 26 days from age 60", () => {
    assert.equal(getHolidayWorkingDays(4, false), HOLIDAY_WORKING_DAYS.weeks4);
    assert.equal(
      getHolidayWorkingDays(4, true),
      HOLIDAY_WORKING_DAYS.weeks4 + HOLIDAY_WORKING_DAYS.extraOver60,
    );
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

  it("derives monthly salary as grunnlag / 12", () => {
    const result = calculateFeriepenger({
      base: 480_000,
      weeks: 5,
      over60: false,
    });
    assert.ok(result);
    assert.equal(result.monthlySalary, 40_000);
  });

  it("applies a 25-day deduction under 60 with five weeks", () => {
    const result = calculateFeriepenger({
      base: 500_000,
      weeks: 5,
      over60: false,
    });
    assert.ok(result);
    assert.equal(result.baseHolidayDays, 25);
    assert.equal(result.extraDaysOver60, 0);
    assert.equal(result.holidayDays, 25);
    assert.equal(
      result.baseHolidayDeduction,
      holidayDeductionForDays(result.monthlySalary, 25),
    );
    assert.equal(result.extraWeekDeduction, 0);
    assert.equal(result.holidayDeduction, result.baseHolidayDeduction);
    assert.ok(
      Math.abs(result.holidayDeduction - (500_000 * 25) / WORKING_DAYS_PER_YEAR) <
        0.01,
    );
  });

  it("increases both the feriepenge rate and the deduction from age 60", () => {
    const under60 = calculateFeriepenger({
      base: 500_000,
      weeks: 5,
      over60: false,
    });
    const over60 = calculateFeriepenger({
      base: 500_000,
      weeks: 5,
      over60: true,
    });
    assert.ok(under60);
    assert.ok(over60);

    assert.equal(over60.ratePercent, 14.3);
    assert.ok(over60.feriepenger > under60.feriepenger);

    assert.equal(over60.baseHolidayDays, 25);
    assert.equal(over60.extraDaysOver60, 5);
    assert.equal(over60.holidayDays, 30);
    assert.equal(over60.baseHolidayDeduction, under60.holidayDeduction);
    assert.equal(
      over60.extraWeekDeduction,
      holidayDeductionForDays(over60.monthlySalary, 5),
    );
    assert.ok(over60.holidayDeduction > under60.holidayDeduction);
    assert.ok(
      Math.abs(over60.holidayDeduction - (500_000 * 30) / WORKING_DAYS_PER_YEAR) <
        0.01,
    );
  });

  it("does not stack a full monthly salary on top of feriepenger in June", () => {
    const result = calculateFeriepenger({
      base: 500_000,
      weeks: 5,
      over60: false,
    });
    assert.ok(result);

    const stacked = result.monthlySalary + result.feriepenger;
    assert.equal(
      result.juneGrossPayout,
      result.feriepenger + result.monthlySalary - result.holidayDeduction,
    );
    assert.notEqual(result.juneGrossPayout, stacked);
    assert.ok(result.juneGrossPayout < stacked);
    assert.ok(result.holidayDeduction > 0);
  });

  it("uses 21,67 working days per month (260 / 12)", () => {
    assert.equal(WORKING_DAYS_PER_MONTH, 260 / 12);
    const monthly = 42_000;
    const trekk25 = holidayDeductionForDays(monthly, 25);
    assert.equal(trekk25, (monthly * 25) / (260 / 12));
  });
});

describe("estimateBaseFromMonthlySalary", () => {
  it("multiplies by 12", () => {
    assert.equal(estimateBaseFromMonthlySalary(40_000), 480_000);
  });
});
