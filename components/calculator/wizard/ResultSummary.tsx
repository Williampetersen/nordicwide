import type { CalculationResult } from "@/lib/investment/calculator";
import { formatMoney } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";
import { cn } from "./cn";

const STEPS = [
  { title: "Invest once", text: "You invest 50% of your yearly Google Ads cost, one time." },
  { title: "Wait 12 months", text: "Counted from the date your agreement and investment start, you pay Google Ads as normal for 12 months." },
  { title: "We cover your ads", text: "After 12 months you no longer need to pay Google Ads; Nordic Wide covers it every year." },
];

export function ResultSummary({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);

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
              The {WAITING_MONTHS} months start from the date your agreement and investment begin
            </li>
            <li>
              During those {WAITING_MONTHS} months you pay Google Ads as normal ({money(result.annualAdsCost)})
            </li>
            <li>
              After {WAITING_MONTHS} months you no longer need to pay Google Ads: Nordic Wide covers{" "}
              <strong>{money(result.coveragePerYear)}</strong> every year
            </li>
            <li>Your daily coverage stays fixed at {money(result.dailyBudget)} / day</li>
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
          Investment rules
        </h3>
        <ul className={cn("bullets")}>
          <li>The investment is paid <strong>one time</strong> and is 50% of your yearly Google Ads cost.</li>
          <li>The {WAITING_MONTHS}-month waiting period starts from the date your agreement and investment begin.</li>
          <li>During the waiting period you continue to pay your Google Ads as normal.</li>
          <li>After {WAITING_MONTHS} months you no longer need to pay Google Ads, up to the daily budget you selected.</li>
          <li>Coverage is limited to your selected daily budget of {money(result.dailyBudget)} / day.</li>
          <li>Your selected daily coverage stays fixed; it does not increase from year to year.</li>
          <li>The plan remains valid while your investment remains with Nordic Wide.</li>
          <li>Your investment amount of {money(result.investmentAmount)} is the amount refunded (see Refund below).</li>
          <li>Contractual terms are governed by the final agreement.</li>
        </ul>
      </section>
    </>
  );
}
