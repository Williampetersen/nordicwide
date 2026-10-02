import type { CalculationResult } from "@/lib/investment/calculator";
import { formatDate, formatMoney } from "@/lib/investment/format";
import { cn } from "./cn";

export function PlanSummary({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);
  const items: [string, string][] = [
    ["Currency", result.currency],
    ["Daily Google Ads budget", `${money(result.dailyBudget)} / day`],
    ["Selected plan", `Plan ${result.plan.id}`],
    ["Investment Amount", money(result.investmentAmount)],
    ["Waiting period", `${result.plan.waitingMonths} months`],
    ["Nordic Wide Coverage begins", formatDate(result.coverageDate)],
  ];

  return (
    <section className={cn("card summary-card")} aria-labelledby="summary-title">
      <h2 id="summary-title" className={cn("eyebrow")}>Your calculation</h2>
      <dl className={cn("summary-grid")}>
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={cn("savings-hero")}>
        <span className={cn("eyebrow")}>Potential savings</span>
        <strong className={cn("savings-value", result.potentialSavings < 0 && "is-negative")}>
          {money(result.potentialSavings)}
        </strong>
        <p>
          Estimated potential savings over {result.years} years, based on the assumptions you entered.
        </p>
      </div>
    </section>
  );
}
