import type { CurrencyCode } from "./currencies";

const cache = new Map<CurrencyCode, Intl.NumberFormat>();

function formatterFor(currency: CurrencyCode): Intl.NumberFormat {
  let f = cache.get(currency);
  if (!f) {
    f = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "code",
      maximumFractionDigits: 0,
    });
    cache.set(currency, f);
  }
  return f;
}

/** Formats a money value; never returns NaN / Infinity / undefined. */
export function formatMoney(value: number, currency: CurrencyCode): string {
  const safe = Number.isFinite(value) ? value : 0;
  // Avoid "-0"
  const normalised = Math.abs(safe) < 0.5 ? 0 : safe;
  return formatterFor(currency).format(normalised).replace(/ /g, " ");
}

/** Short axis label such as "182.5K" (no currency). */
export function formatCompact(value: number): string {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(safe);
}

/** "18 months (1 year 6 months)" style label for a month count. */
export function formatMonths(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [y ? `${y} year${y > 1 ? "s" : ""}` : "", m ? `${m} month${m > 1 ? "s" : ""}` : ""].filter(Boolean);
  return months > 12 ? `${months} months (${parts.join(" ")})` : `${months} month${months > 1 ? "s" : ""}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
