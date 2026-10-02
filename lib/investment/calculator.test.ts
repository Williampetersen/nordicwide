import { describe, expect, it } from "vitest";
import { addMonths, calculateInvestmentPlan, sanitizeAmount } from "./calculator";

const base = { currency: "AUD" as const, dailyBudget: 200, monthlyManagementFee: 650, years: 5 };

describe("calculateInvestmentPlan", () => {
  it("matches the worked example (AUD, 200/day, 650 fee, 5 years)", () => {
    const r = calculateInvestmentPlan(base);
    expect(r.plan.id).toBe("B");
    expect(r.annualAdsCost).toBe(73_000);
    expect(r.annualManagementFee).toBe(7_800);
    expect(r.investmentAmount).toBe(25_000);
    expect(r.yearlyProjection).toHaveLength(5);
    expect(r.yearlyProjection[0]).toMatchObject({ withoutPlan: 80_800, withPlan: 98_000, nordicWidePays: 0 });
    expect(r.yearlyProjection[1]).toMatchObject({ withoutPlan: 80_800, withPlan: 0, nordicWidePays: 73_000 });
    expect(r.totalWithoutPlan).toBe(404_000);
    expect(r.totalWithPlan).toBe(98_000);
    expect(r.totalNordicWideCoverage).toBe(292_000);
    expect(r.potentialSavings).toBe(306_000);
  });

  it("keeps the daily budget fixed across a 10-year projection", () => {
    const r = calculateInvestmentPlan({ ...base, years: 10 });
    expect(r.yearlyProjection).toHaveLength(10);
    expect(new Set(r.yearlyProjection.map((y) => y.adsBudget))).toEqual(new Set([73_000]));
    expect(r.yearlyProjection[9].cumulativeSavings).toBe(r.potentialSavings);
  });

  it("maps each budget to its plan", () => {
    expect(calculateInvestmentPlan({ ...base, dailyBudget: 100 }).investmentAmount).toBe(15_000);
    expect(calculateInvestmentPlan({ ...base, dailyBudget: 300 }).investmentAmount).toBe(35_000);
  });

  it("treats invalid fees as 0", () => {
    for (const bad of [NaN, Infinity, -5]) {
      const r = calculateInvestmentPlan({ ...base, monthlyManagementFee: bad });
      expect(r.annualManagementFee).toBe(0);
      expect(Number.isFinite(r.potentialSavings)).toBe(true);
    }
  });

  it("throws for an unknown budget", () => {
    expect(() => calculateInvestmentPlan({ ...base, dailyBudget: 150 })).toThrow();
  });

  it("sets the coverage date 12 months ahead", () => {
    const r = calculateInvestmentPlan({ ...base, startDate: new Date(2026, 2, 15) });
    expect(r.coverageDate.getFullYear()).toBe(2027);
    expect(r.coverageDate.getMonth()).toBe(2);
    expect(r.coverageDate.getDate()).toBe(15);
  });
});

describe("helpers", () => {
  it("clamps leap-day when adding months", () => {
    const d = addMonths(new Date(2028, 1, 29), 12);
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2029, 1, 28]);
  });

  it("sanitizes amounts", () => {
    expect(sanitizeAmount("abc")).toBe(0);
    expect(sanitizeAmount(-1)).toBe(0);
    expect(sanitizeAmount("12.5")).toBe(12.5);
  });
});
