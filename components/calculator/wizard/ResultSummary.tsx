import type { CalculationResult } from "@/lib/investment/calculator";
import { formatDate, formatMoney } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";
import { cn } from "./cn";

const STEPS = [
  { title: "Invest once", text: "You invest 50% of your yearly Google Ads cost, one time." },
  { title: "Wait 12 months", text: "You pay your Google Ads as normal during the first 12 months." },
  { title: "We cover your ads", text: "After 12 months, Nordic Wide covers your Google Ads every year." },
];

export function ResultSummary({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);
  const date = formatDate(result.coverageDate);

  return (
    <>
      <div className={cn("result-grid")}>
        <section className={cn("card")} aria-labelledby="cost-title">
          <h3 id="cost-title" className={cn("eyebrow")}>
            1. What you pay today
          </h3>
          <p className={cn("equation")}>{money(result.dailyBudget)} × 365 days</p>
          <p className={cn("big-result")}>{money(result.annualAdsCost)}</p>
          <ul className={cn("bullets")}>
            <li>Your Google Ads cost for one year</li>
            <li>Daily budget: {money(result.dailyBudget)}</li>
            <li>You pay this yourself, every year</li>
          </ul>
        </section>

        <section className={cn("card panel-green")} aria-labelledby="invest-title">
          <h3 id="invest-title" className={cn("eyebrow")}>
            2. With the investment plan
          </h3>
          <p className={cn("equation")}>One-time investment (50% of the yearly cost)</p>
          <p className={cn("big-result")}>{money(result.investmentAmount)}</p>
          <ul className={cn("bullets")}>
            <li>
              First {WAITING_MONTHS} months: you pay Google Ads as normal ({money(result.annualAdsCost)})
            </li>
            <li>
              From {date}: Nordic Wide covers <strong>{money(result.coveragePerYear)}</strong> of Google Ads every year
            </li>
            <li>Your daily coverage stays fixed at {money(result.dailyBudget)} / day</li>
            <li>Your management fee becomes {money(0)} after joining</li>
          </ul>
        </section>
      </div>

      <section className={cn("card savings-hero")} aria-labelledby="savings-title">
        <h3 id="savings-title" className={cn("eyebrow")}>
          Estimated potential savings over {result.savingsYears} years
        </h3>
        <p className={cn("big-result")}>{money(result.potentialSavings)}</p>
        <ul className={cn("bullets")}>
          <li>
            Without the plan: {money(result.annualAdsCost)} × {result.savingsYears} years ={" "}
            <strong>{money(result.totalWithoutPlan)}</strong>
          </li>
          <li>
            With the plan: investment {money(result.investmentAmount)} + first year of Google Ads{" "}
            {money(result.annualAdsCost)} = <strong>{money(result.totalWithPlan)}</strong>
          </li>
        </ul>
      </section>

      <section className={cn("card")} aria-labelledby="how-title">
        <h3 id="how-title" className={cn("eyebrow")}>
          How the plan works
        </h3>
        <ol className={cn("steps")}>
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className={cn("step-num")} aria-hidden="true">
                {i + 1}
              </span>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={cn("card")} aria-labelledby="details-title">
        <h3 id="details-title" className={cn("eyebrow")}>
          Plan details
        </h3>
        <ul className={cn("bullets")}>
          <li>One-time investment</li>
          <li>{WAITING_MONTHS}-month waiting period before coverage begins</li>
          <li>Coverage is limited to the daily budget you selected</li>
          <li>The selected daily coverage remains fixed</li>
          <li>The plan remains valid while the investment remains with Nordic Wide</li>
          <li>Contractual terms are governed by the final agreement</li>
        </ul>
      </section>
    </>
  );
}
