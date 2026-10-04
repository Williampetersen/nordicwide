import { describe, expect, it } from "vitest";
import { PORTFOLIO, companyStatus, summarize } from "./portfolio";

const ASOF = new Date("2026-10-04T00:00:00Z");
const by = (slug: string) => companyStatus(PORTFOLIO.find((c) => c.slug === slug)!, ASOF);

describe("investor portfolio", () => {
  it("Courier Copenhagen: 200 DKK/day, 18 months in, investment fully recovered", () => {
    const s = by("courier-copenhagen");
    expect(s.annualAdsCost).toBe(73_000);
    expect(s.investment).toBe(36_500);
    expect(s.phase).toBe("covered");
    expect(s.monthsElapsed).toBeCloseTo(18, 0);
    expect(s.coveredToDate).toBeGreaterThan(35_000);
    expect(s.recoveredShare).toBeGreaterThan(0.95);
  });

  it("Washmax: 250 DKK/day, covered for a few months, partly recovered", () => {
    const s = by("washmax");
    expect(s.investment).toBe(45_625);
    expect(s.phase).toBe("covered");
    expect(s.monthsCovered).toBeGreaterThan(3);
    expect(s.monthsCovered).toBeLessThan(4.5);
    expect(s.recoveredShare).toBeGreaterThan(0.5);
    expect(s.recoveredShare).toBeLessThan(0.75);
  });

  it("Eluxus: 150 DKK/day, still in the waiting period", () => {
    const s = by("eluxus");
    expect(s.investment).toBe(27_375);
    expect(s.phase).toBe("waiting");
    expect(s.coveredToDate).toBe(0);
    expect(s.monthsUntilCoverage).toBeGreaterThan(7.5);
    expect(s.monthsUntilCoverage).toBeLessThan(8.5);
  });

  it("summarizes the three companies", () => {
    const t = summarize(PORTFOLIO.map((c) => companyStatus(c, ASOF)));
    expect(t.companies).toBe(3);
    expect(t.covered).toBe(2);
    expect(t.waiting).toBe(1);
    expect(t.totalDailyBudget).toBe(600);
    expect(t.totalInvested).toBe(36_500 + 45_625 + 27_375);
  });
});
