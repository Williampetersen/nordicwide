export type CurrencyCode = "USD" | "EUR" | "DKK" | "NOK" | "SEK" | "AED" | "JPY" | "AUD";

export interface CurrencyOption {
  code: CurrencyCode;
  region: string;
  flag: string;
}

export const CURRENCIES: readonly CurrencyOption[] = [
  { code: "USD", region: "United States", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/usa.png" },
  { code: "EUR", region: "Eurozone", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/eu.png" },
  { code: "DKK", region: "Denmark", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/DKK.png" },
  { code: "NOK", region: "Norway", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/nok.png" },
  { code: "SEK", region: "Sweden", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/SEK_Swedish_Krona_74e38e7583.png" },
  { code: "AED", region: "UAE", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/UAE.webp" },
  { code: "JPY", region: "Japan", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/jap.webp" },
  { code: "AUD", region: "Australia", flag: "https://jetcarremoval.com.au/wp-content/uploads/2026/02/AUD.webp" },
];

export function getCurrency(code: CurrencyCode): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}
