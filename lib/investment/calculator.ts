import type { CurrencyCode } from "./currencies";
import { DAYS_PER_YEAR, getPlanForBudget, type Plan } from "./plans";

export interface CalculationInput {
  currency: CurrencyCode;
  dailyBudget: number;
  monthlyManagementFee: number;
  years: number;
  /** Defaults to "now"; injectable for testing. */
  startDate?: Date;
}

export interface YearRow {
  year: number;
  /** Google Ads budget for the year (daily budget × 365). */
  adsBudget: number;
  withoutPlan: number;
  withPlan: number;
  nordicWidePays: number;
  /** withoutPlan − withPlan for this year (negative in the investment year). */
  savings: number;
  /** Running total of savings up to and including this year. */
  cumulativeSavings: number;
}

export interface CalculationResult {
  currency: CurrencyCode;
  plan: Plan;
  years: number;
  dailyBudget: number;
  monthlyManagementFee: number;
  annualAdsCost: number;
  annualManagementFee: number;
  annualCostWithoutPlan: number;
  investmentAmount: number;
  yearOneAdsCost: number;
  yearlyProjection: YearRow[];
  totalWithoutPlan: number;
  totalWithPlan: number;
  totalNordicWideCoverage: number;
  potentialSavings: number;
  coverageDate: Date;
}

export const MAX_MANAGEMENT_FEE = 10_000_000;

/** Coerces any value into a finite, non-negative number. */
export function sanitizeAmount(value: unknown, max = MAX_MANAGEMENT_FEE): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}

/** Adds calendar months, clamping the day (e.g. 29 Feb + 12 months → 28 Feb). */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const day = result.getDate();
  result.setDate(1);
  result.setMonth(result.getMonth() + months);
  const lastDay = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(day, lastDay));
  return result;
}

export function calculateInvestmentPlan(input: CalculationInput): CalculationResult {
  const plan = getPlanForBudget(input.dailyBudget);
  if (!plan) {
    throw new Error(`No plan matches a daily budget of ${String(input.dailyBudget)}`);
  }

  const years = Math.max(1, Math.floor(sanitizeAmount(input.years, 50)));
  const monthlyManagementFee = sanitizeAmount(input.monthlyManagementFee);

  // The daily coverage stays fixed for the whole projection.
  const annualAdsCost = plan.dailyBudget * DAYS_PER_YEAR;
  const annualManagementFee = monthlyManagementFee * 12;
  const annualCostWithoutPlan = annualAdsCost + annualManagementFee;
  const investmentAmount = plan.investment;

  const yearlyProjection: YearRow[] = [];
  let cumulativeSavings = 0;

  for (let year = 1; year <= years; year++) {
    const isFirstYear = year === 1;
    // Year 1: investment + normal ads, management fee 0.
    // Year 2+: ads covered by Nordic Wide, management fee 0.
    const withPlan = isFirstYear ? investmentAmount + annualAdsCost : 0;
    const nordicWidePays = isFirstYear ? 0 : annualAdsCost;
    const savings = annualCostWithoutPlan - withPlan;
    cumulativeSavings += savings;
    yearlyProjection.push({
      year,
      adsBudget: annualAdsCost,
      withoutPlan: annualCostWithoutPlan,
      withPlan,
      nordicWidePays,
      savings,
      cumulativeSavings,
    });
  }

  const totalWithoutPlan = annualCostWithoutPlan * years;
  const totalWithPlan = yearlyProjection.reduce((sum, r) => sum + r.withPlan, 0);
  const totalNordicWideCoverage = yearlyProjection.reduce((sum, r) => sum + r.nordicWidePays, 0);

  return {
    currency: input.currency,
    plan,
    years,
    dailyBudget: plan.dailyBudget,
    monthlyManagementFee,
    annualAdsCost,
    annualManagementFee,
    annualCostWithoutPlan,
    investmentAmount,
    yearOneAdsCost: annualAdsCost,
    yearlyProjection,
    totalWithoutPlan,
    totalWithPlan,
    totalNordicWideCoverage,
    potentialSavings: totalWithoutPlan - totalWithPlan,
    coverageDate: addMonths(input.startDate ?? new Date(), plan.waitingMonths),
  };
}
