import type { CurrencyCode } from "@/lib/investment/currencies";
import { formatMoney } from "@/lib/investment/format";
import { DAYS_PER_YEAR, GROWTH_OPTIONS, INVESTMENT_SHARE, WAITING_MONTHS } from "@/lib/investment/plan";
import { cn } from "./cn";

interface Props {
  currency: CurrencyCode;
  dailyBudget: number;
  years: number;
  growth: number;
  acknowledged: boolean;
  onAcknowledge: (v: boolean) => void;
  onEdit: (step: number) => void;
}

export function ReviewStep({ currency, dailyBudget, years, growth, acknowledged, onAcknowledge, onEdit }: Props) {
  const annual = dailyBudget * DAYS_PER_YEAR;
  const growthTitle = GROWTH_OPTIONS.find((g) => g.value === growth)?.title ?? "Stays the same";
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Currency", value: currency, step: 0 },
    { label: "Daily Google Ads budget", value: `${formatMoney(dailyBudget, currency)} / day`, step: 1 },
    { label: "Comparison period", value: `${years} years`, step: 2 },
    { label: "Ad cost without the plan", value: growthTitle, step: 3 },
  ];

  return (
    <>
      <p className={cn("step-lead")}>Check your inputs and the rules we use. Every number in your result comes from these.</p>

      <div className={cn("card review-card")}>
        <h3 className={cn("eyebrow")}>Your inputs</h3>
        <dl className={cn("review-list")}>
          {rows.map((r) => (
            <div key={r.label} className={cn("review-row")}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
              <button type="button" className={cn("link-btn")} onClick={() => onEdit(r.step)}>
                Edit<span className={cn("visually-hidden")}> {r.label}</span>
              </button>
            </div>
          ))}
        </dl>
      </div>

      <div className={cn("card review-card")}>
        <h3 className={cn("eyebrow")}>How we calculate</h3>
        <ul className={cn("bullets")}>
          <li>
            Yearly Google Ads cost = {formatMoney(dailyBudget, currency)} × {DAYS_PER_YEAR} days ={" "}
            <strong>{formatMoney(annual, currency)}</strong>
          </li>
          <li>
            One-time investment = {Math.round(INVESTMENT_SHARE * 100)}% of the yearly cost ={" "}
            <strong>{formatMoney(Math.round(annual * INVESTMENT_SHARE), currency)}</strong>
          </li>
          <li>Months 1 to {WAITING_MONTHS}: you pay Google Ads as normal.</li>
          <li>From month {WAITING_MONTHS + 1}: the plan covers your selected daily budget, fixed for the whole period.</li>
          <li>Savings = what you would pay without the plan, minus what you pay with it (investment included).</li>
        </ul>
      </div>

      <label className={cn("ack")}>
        <input type="checkbox" checked={acknowledged} onChange={(e) => onAcknowledge(e.target.checked)} />
        <span>
          I understand this is an <strong>estimate, not a guarantee</strong>, and that the final agreement governs actual
          costs, coverage and terms.
        </span>
      </label>
    </>
  );
}
