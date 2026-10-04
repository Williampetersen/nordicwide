import { calculateInvestmentPlan } from "../investment/calculator";
import { DAYS_PER_YEAR, INVESTMENT_SHARE, WAITING_MONTHS } from "../investment/plan";

export interface PerformanceFact {
  label: string;
  value: string;
  note?: string;
}

export interface PortfolioCompany {
  slug: string;
  name: string;
  /** Daily Google Ads budget in DKK that the plan covers. */
  dailyBudgetDkk: number;
  /** Approximate date the agreement and investment began (ISO yyyy-mm-dd). */
  startDate: string;
  /**
   * Optional real results (leads, revenue, ROAS ...). Only rendered when filled in,
   * so the dashboard never shows numbers that have not been verified.
   */
  performance?: PerformanceFact[];
}

/** Edit this list to update the investor dashboard. */
export const PORTFOLIO: readonly PortfolioCompany[] = [
  { slug: "courier-copenhagen", name: "Courier Copenhagen", dailyBudgetDkk: 200, startDate: "2025-04-04" },
  { slug: "washmax", name: "Washmax", dailyBudgetDkk: 250, startDate: "2025-06-16" },
  { slug: "eluxus", name: "Eluxus", dailyBudgetDkk: 150, startDate: "2026-06-04" },
];

const MS_PER_DAY = 86_400_000;
const DAYS_PER_MONTH = 30.4375;

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

export interface CompanyStatus {
  company: PortfolioCompany;
  start: Date;
  coverageStart: Date;
  phase: "waiting" | "covered";
  monthsElapsed: number;
  /** Months left until Nordic Wide starts covering Google Ads (0 once covered). */
  monthsUntilCoverage: number;
  /** Months of coverage so far (0 while waiting). */
  monthsCovered: number;
  annualAdsCost: number;
  investment: number;
  /** Google Ads cost the company paid itself during the waiting period so far. */
  paidDuringWaiting: number;
  /** Google Ads cost Nordic Wide has covered so far. */
  coveredToDate: number;
  /** coveredToDate ÷ investment, capped at 1. */
  recoveredShare: number;
  /** Share of the 12-month waiting period completed (1 once finished). */
  waitingProgress: number;
  fiveYearSavings: number;
  breakEvenMonth: number | null;
}

export function companyStatus(company: PortfolioCompany, asOf: Date): CompanyStatus {
  const start = new Date(`${company.startDate}T00:00:00Z`);
  const monthsElapsed = Math.max(0, (asOf.getTime() - start.getTime()) / MS_PER_DAY / DAYS_PER_MONTH);
  const annualAdsCost = company.dailyBudgetDkk * DAYS_PER_YEAR;
  const investment = Math.round(annualAdsCost * INVESTMENT_SHARE);
  const monthsCovered = Math.max(0, monthsElapsed - WAITING_MONTHS);
  const coveredToDate = Math.round((annualAdsCost / 12) * monthsCovered);
  const plan = calculateInvestmentPlan({ currency: "DKK", dailyBudget: company.dailyBudgetDkk, years: 5 });

  return {
    company,
    start,
    coverageStart: addMonths(start, WAITING_MONTHS),
    phase: monthsElapsed >= WAITING_MONTHS ? "covered" : "waiting",
    monthsElapsed,
    monthsUntilCoverage: Math.max(0, WAITING_MONTHS - monthsElapsed),
    monthsCovered,
    annualAdsCost,
    investment,
    paidDuringWaiting: Math.round((annualAdsCost / 12) * Math.min(monthsElapsed, WAITING_MONTHS)),
    coveredToDate,
    recoveredShare: investment > 0 ? Math.min(1, coveredToDate / investment) : 0,
    waitingProgress: Math.min(1, monthsElapsed / WAITING_MONTHS),
    fiveYearSavings: plan.potentialSavings,
    breakEvenMonth: plan.breakEvenMonth,
  };
}

export interface PortfolioSummary {
  companies: number;
  covered: number;
  waiting: number;
  totalInvested: number;
  totalDailyBudget: number;
  totalAnnualAdsCost: number;
  totalCoveredToDate: number;
  totalFiveYearSavings: number;
}

export function summarize(statuses: readonly CompanyStatus[]): PortfolioSummary {
  const sum = (f: (s: CompanyStatus) => number) => statuses.reduce((t, s) => t + f(s), 0);
  return {
    companies: statuses.length,
    covered: statuses.filter((s) => s.phase === "covered").length,
    waiting: statuses.filter((s) => s.phase === "waiting").length,
    totalInvested: sum((s) => s.investment),
    totalDailyBudget: sum((s) => s.company.dailyBudgetDkk),
    totalAnnualAdsCost: sum((s) => s.annualAdsCost),
    totalCoveredToDate: sum((s) => s.coveredToDate),
    totalFiveYearSavings: sum((s) => s.fiveYearSavings),
  };
}
