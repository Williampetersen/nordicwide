import { describe, expect, it } from "vitest";
import { calculateInvestmentPlan, sanitizeBudget } from "./calculator";

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

});

describe("helpers", () => {
  it("sanitizes budgets", () => {
    expect(sanitizeBudget("abc")).toBe(0);
    expect(sanitizeBudget(-1)).toBe(0);
    expect(sanitizeBudget("120")).toBe(120);
    expect(sanitizeBudget(1e12)).toBe(1_000_000);
  });
});

describe("investor metrics", () => {
  it("100/day breaks even in month 18 with a 7x return over 5 years", () => {
    const r = calculateInvestmentPlan({ currency: "USD", dailyBudget: 100 });
    expect(r.breakEvenMonth).toBe(18);
    expect(r.returnMultiple).toBeCloseTo(7, 5);
    expect(r.rows).toHaveLength(5);
    expect(r.rows[0].cumulativeSaving).toBe(-18_250);
    expect(r.rows[4].cumulativeSaving).toBe(127_750);
  });

  it("changes with the horizon", () => {
    const r = calculateInvestmentPlan({ currency: "USD", dailyBudget: 100, years: 3 });
    expect(r.potentialSavings).toBe(109_500 - 54_750);
  });

  it("with growth the covered amount is fixed, so the covered share of the bill falls", () => {
    const flat = calculateInvestmentPlan({ currency: "USD", dailyBudget: 100, years: 3 });
    const r = calculateInvestmentPlan({ currency: "USD", dailyBudget: 100, years: 3, growth: 0.05 });
    expect(r.rows[1].withoutPlan).toBe(38_325);
    expect(r.rows[1].withPlan).toBe(1_825);
    expect(r.potentialSavings).toBe(flat.potentialSavings);
    expect(flat.coveredShare).toBeCloseTo(2 / 3, 5);
    expect(r.coveredShare).toBeLessThan(flat.coveredShare);
  });

  it("falls back to safe defaults for invalid horizon / growth", () => {
    const r = calculateInvestmentPlan({ currency: "USD", dailyBudget: 100, years: 99, growth: -3 });
    expect(r.savingsYears).toBe(5);
    expect(r.growth).toBe(0);
  });
});
