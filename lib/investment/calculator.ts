import type { CurrencyCode } from "./currencies";
import {
  DAYS_PER_YEAR,
  DEFAULT_GROWTH,
  HORIZON_OPTIONS,
  INVESTMENT_SHARE,
  MAX_DAILY_BUDGET,
  SAVINGS_YEARS,
  WAITING_MONTHS,
} from "./plan";

export interface CalculationInput {
  currency: CurrencyCode;
  dailyBudget: number;
  /** Comparison length in years (defaults to 5). */
  years?: number;
  /** Yearly change in ad cost without the plan, e.g. 0.05 = +5% (defaults to 0). */
  growth?: number;
}

export interface YearRow {
  year: number;
  /** What you would pay for Google Ads this year without the plan. */
  withoutPlan: number;
  /** What you pay this year with the plan (year 1 includes the investment). */
  withPlan: number;
  cumulativeWithout: number;
  cumulativeWith: number;
  /** cumulativeWithout − cumulativeWith (negative while the investment is not yet recovered). */
  cumulativeSaving: number;
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
  savingsYears: number;
  growth: number;
  /** Google Ads cost over the period if the customer pays it all. */
  totalWithoutPlan: number;
  /** Investment plus the Google Ads costs that remain with the plan. */
  totalWithPlan: number;
  /** totalWithoutPlan − totalWithPlan. */
  potentialSavings: number;
  /** potentialSavings ÷ investmentAmount. */
  returnMultiple: number;
  /** Month (counted from the start) in which total savings overtake the investment, or null. */
  breakEvenMonth: number | null;
  rows: YearRow[];
  /** Share of your total Google Ads bill over the period that the plan covers (1 = all of it). */
  coveredShare: number;
  /** The same figures under each growth assumption, for the sensitivity table. */
  scenarios: { growth: number; potentialSavings: number; coveredShare: number }[];
}

/** Coerces any value into a finite, whole, non-negative number within limits. */
export function sanitizeBudget(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(Math.round(n), MAX_DAILY_BUDGET);
}

export function sanitizeYears(value: unknown): number {
  const n = Number(value);
  return (HORIZON_OPTIONS as readonly number[]).includes(n) ? n : SAVINGS_YEARS;
}

export function sanitizeGrowth(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 && n <= 0.1 ? n : DEFAULT_GROWTH;
}

function buildRows(annual: number, investment: number, years: number, growth: number): YearRow[] {
  const rows: YearRow[] = [];
  let cumWithout = 0;
  let cumWith = 0;
  for (let y = 1; y <= years; y++) {
    const withoutPlan = Math.round(annual * (1 + growth) ** (y - 1));
    // Year 1 is the waiting period (you pay as normal, plus the investment). After that the
    // plan covers the selected daily budget; any growth above it stays with the customer.
    const withPlan = y === 1 ? investment + annual : Math.max(0, withoutPlan - annual);
    cumWithout += withoutPlan;
    cumWith += withPlan;
    rows.push({
      year: y,
      withoutPlan,
      withPlan,
      cumulativeWithout: cumWithout,
      cumulativeWith: cumWith,
      cumulativeSaving: cumWithout - cumWith,
    });
  }
  return rows;
}

/** First month in which cumulative savings recover the investment. */
function findBreakEven(rows: YearRow[], investment: number, annual: number): number | null {
  let diff = -investment;
  for (let m = 1; m <= rows.length * 12; m++) {
    const row = rows[Math.ceil(m / 12) - 1];
    const without = row.withoutPlan / 12;
    const withPlan = m <= WAITING_MONTHS ? without : Math.max(0, row.withoutPlan - annual) / 12;
    diff += without - withPlan;
    if (diff >= -1e-9) return m;
  }
  return null;
}

function coveredShareOf(rows: YearRow[], investment: number): number {
  const last = rows[rows.length - 1];
  if (last.cumulativeWithout <= 0) return 0;
  const paidAds = last.cumulativeWith - investment;
  return (last.cumulativeWithout - paidAds) / last.cumulativeWithout;
}

export function calculateInvestmentPlan(input: CalculationInput): CalculationResult {
  const dailyBudget = sanitizeBudget(input.dailyBudget);
  const years = sanitizeYears(input.years ?? SAVINGS_YEARS);
  const growth = sanitizeGrowth(input.growth ?? DEFAULT_GROWTH);
  const annualAdsCost = dailyBudget * DAYS_PER_YEAR;
  const investmentAmount = Math.round(annualAdsCost * INVESTMENT_SHARE);

  const rows = buildRows(annualAdsCost, investmentAmount, years, growth);
  const last = rows[rows.length - 1];
  const potentialSavings = last.cumulativeSaving;

  return {
    currency: input.currency,
    dailyBudget,
    annualAdsCost,
    investmentAmount,
    coveragePerYear: annualAdsCost,
    savingsYears: years,
    growth,
    totalWithoutPlan: last.cumulativeWithout,
    totalWithPlan: last.cumulativeWith,
    potentialSavings,
    returnMultiple: investmentAmount > 0 ? potentialSavings / investmentAmount : 0,
    breakEvenMonth: investmentAmount > 0 ? findBreakEven(rows, investmentAmount, annualAdsCost) : null,
    rows,
    coveredShare: coveredShareOf(rows, investmentAmount),
    scenarios: [0, 0.05, 0.1].map((g) => {
      const r = buildRows(annualAdsCost, investmentAmount, years, g);
      return { growth: g, potentialSavings: r[years - 1].cumulativeSaving, coveredShare: coveredShareOf(r, investmentAmount) };
    }),
  };
}
