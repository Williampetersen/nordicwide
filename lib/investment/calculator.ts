import type { CurrencyCode } from "./currencies";
import { DAYS_PER_YEAR, INVESTMENT_SHARE, MAX_DAILY_BUDGET, SAVINGS_YEARS, WAITING_MONTHS } from "./plan";

export interface CalculationInput {
  currency: CurrencyCode;
  dailyBudget: number;
  /** Defaults to "now"; injectable for testing. */
  startDate?: Date;
}

export interface CalculationResult {
  currency: CurrencyCode;
  dailyBudget: number;
  /** Daily budget × 365: what the customer pays for Google Ads in one year. */
  annualAdsCost: number;
  /** 50% of the yearly Google Ads cost, paid once. */
  investmentAmount: number;
  /** What Nordic Wide covers each year once coverage begins (the full yearly cost). */
  coveragePerYear: number;
  coverageDate: Date;
  savingsYears: number;
  /** Google Ads cost over the savings period if the customer pays it all. */
  totalWithoutPlan: number;
  /** Investment plus the first year of Google Ads (the years after are covered). */
  totalWithPlan: number;
  /** totalWithoutPlan − totalWithPlan. */
  potentialSavings: number;
}

/** Coerces any value into a finite, whole, non-negative number within limits. */
export function sanitizeBudget(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.round(n), MAX_DAILY_BUDGET);
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
  const dailyBudget = sanitizeBudget(input.dailyBudget);
  const annualAdsCost = dailyBudget * DAYS_PER_YEAR;
  const investmentAmount = Math.round(annualAdsCost * INVESTMENT_SHARE);
  const totalWithoutPlan = annualAdsCost * SAVINGS_YEARS;
  const totalWithPlan = investmentAmount + annualAdsCost;

  return {
    currency: input.currency,
    dailyBudget,
    annualAdsCost,
    investmentAmount,
    coveragePerYear: annualAdsCost,
    coverageDate: addMonths(input.startDate ?? new Date(), WAITING_MONTHS),
    savingsYears: SAVINGS_YEARS,
    totalWithoutPlan,
    totalWithPlan,
    potentialSavings: totalWithoutPlan - totalWithPlan,
  };
}
