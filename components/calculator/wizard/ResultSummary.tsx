import type { CalculationResult } from "@/lib/investment/calculator";
import { formatDate, formatMoney } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";
import { cn } from "./cn";

export function ResultSummary({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);

  return (
    <div className={cn("result-grid")}>
      <section className={cn("card")} aria-labelledby="cost-title">
        <h3 id="cost-title" className={cn("eyebrow")}>
          1. What you pay today
        </h3>
        <p className={cn("equation")}>
          {money(result.dailyBudget)} × 365 days
        </p>
        <p className={cn("big-result")}>{money(result.annualAdsCost)}</p>
        <p className={cn("caption")}>Your Google Ads cost for one year.</p>
      </section>

      <section className={cn("card panel-green")} aria-labelledby="invest-title">
        <h3 id="invest-title" className={cn("eyebrow")}>
          2. With the investment plan
        </h3>
        <p className={cn("equation")}>Invest 50% of the yearly cost, one time</p>
        <p className={cn("big-result")}>{money(result.investmentAmount)}</p>
        <p className={cn("caption")}>
          After {WAITING_MONTHS} months (from {formatDate(result.coverageDate)}), Nordic Wide covers your Google Ads
          of <strong>{money(result.coveragePerYear)}</strong> every year. During the first {WAITING_MONTHS} months you
          pay Google Ads as normal.
        </p>
      </section>
    </div>
  );
}
