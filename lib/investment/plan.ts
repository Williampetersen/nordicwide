export const DAYS_PER_YEAR = 365;
/** The investment is this share of the yearly Google Ads cost. */
export const INVESTMENT_SHARE = 0.5;
/** Months before Nordic Wide starts covering Google Ads. */
export const WAITING_MONTHS = 12;

/** Default length of the savings comparison. */
export const SAVINGS_YEARS = 5;

export const BUDGET_PRESETS = [50, 100, 150, 200] as const;
export const MAX_DAILY_BUDGET = 1_000_000;

/** Time horizons an investor can compare (years). */
export const HORIZON_OPTIONS = [3, 5, 7, 10] as const;

/** Yearly change in what the customer would otherwise pay for Google Ads. */
export const GROWTH_OPTIONS = [
  { value: 0, title: "Stays the same", text: "Conservative. Your budget is flat every year. Recommended for a cautious estimate." },
  { value: 0.05, title: "Grows 5% a year", text: "Moderate. Typical when clicks get more expensive over time." },
  { value: 0.1, title: "Grows 10% a year", text: "Growth case. You expect to scale your advertising." },
] as const;

export const DEFAULT_GROWTH = 0;
