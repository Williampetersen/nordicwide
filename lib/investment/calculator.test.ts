import { describe, expect, it } from "vitest";
import { addMonths, calculateInvestmentPlan, sanitizeBudget } from "./calculator";

describe("calculateInvestmentPlan", () => {
  it("100/day: 36,500 a year, 18,250 investment (50%), full yearly cost covered", () => {
    const r = calculateInvestmentPlan({ currency: "AUD", dailyBudget: 100 });
    expect(r.annualAdsCost).toBe(36_500);
    expect(r.investmentAmount).toBe(18_250);
    expect(r.coveragePerYear).toBe(36_500);
  });

  it("100/day over 5 years: 182,500 without, 54,750 with, saves 127,750", () => {
    const r = calculateInvestmentPlan({ currency: "AUD", dailyBudget: 100 });
    expect(r.savingsYears).toBe(5);
    expect(r.totalWithoutPlan).toBe(182_500);
    expect(r.totalWithPlan).toBe(54_750);
    expect(r.potentialSavings).toBe(127_750);
  });

  it.each([
    [50, 18_250, 9_125],
    [150, 54_750, 27_375],
    [200, 73_000, 36_500],
  ])("%i/day", (daily, annual, investment) => {
    const r = calculateInvestmentPlan({ currency: "USD", dailyBudget: daily });
    expect(r.annualAdsCost).toBe(annual);
    expect(r.investmentAmount).toBe(investment);
  });

  it("rounds a fractional investment to a whole amount", () => {
    expect(calculateInvestmentPlan({ currency: "USD", dailyBudget: 75 }).investmentAmount).toBe(13_688);
  });

  it("never returns NaN, Infinity or negative values for bad input", () => {
    for (const bad of [NaN, Infinity, -5, 0]) {
      const r = calculateInvestmentPlan({ currency: "USD", dailyBudget: bad });
      expect(r.annualAdsCost).toBe(0);
      expect(Number.isFinite(r.investmentAmount)).toBe(true);
      expect(r.investmentAmount).toBeGreaterThanOrEqual(0);
    }
  });

  it("sets the coverage date 12 months ahead", () => {
    const r = calculateInvestmentPlan({ currency: "AUD", dailyBudget: 100, startDate: new Date(2026, 2, 15) });
    expect([r.coverageDate.getFullYear(), r.coverageDate.getMonth(), r.coverageDate.getDate()]).toEqual([2027, 2, 15]);
  });
});

describe("helpers", () => {
  it("clamps leap-day when adding months", () => {
    const d = addMonths(new Date(2028, 1, 29), 12);
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2029, 1, 28]);
  });

  it("sanitizes budgets", () => {
    expect(sanitizeBudget("abc")).toBe(0);
    expect(sanitizeBudget(-1)).toBe(0);
    expect(sanitizeBudget("120")).toBe(120);
    expect(sanitizeBudget(1e12)).toBe(1_000_000);
  });
});
