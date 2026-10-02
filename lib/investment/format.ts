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
