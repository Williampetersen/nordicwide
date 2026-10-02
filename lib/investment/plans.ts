export type DailyBudget = 100 | 200 | 300;

export interface Plan {
  id: "A" | "B" | "C";
  dailyBudget: DailyBudget;
  investment: number;
  waitingMonths: number;
}

export const WAITING_MONTHS = 12;
export const DAYS_PER_YEAR = 365;

export const PLANS: readonly Plan[] = [
  { id: "A", dailyBudget: 100, investment: 15000, waitingMonths: WAITING_MONTHS },
  { id: "B", dailyBudget: 200, investment: 25000, waitingMonths: WAITING_MONTHS },
  { id: "C", dailyBudget: 300, investment: 35000, waitingMonths: WAITING_MONTHS },
];

export const BUDGET_OPTIONS: readonly DailyBudget[] = [100, 200, 300];
export const YEAR_OPTIONS = [5, 10] as const;
export type ProjectionYears = (typeof YEAR_OPTIONS)[number];

export function getPlanForBudget(dailyBudget: number): Plan | undefined {
  return PLANS.find((p) => p.dailyBudget === dailyBudget);
}
