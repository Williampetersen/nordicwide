import type { CalculationResult } from "@/lib/investment/calculator";
import { formatMoney, formatMonths, formatPercent } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";
import { CumulativeChart } from "./CumulativeChart";
import { cn } from "./cn";

const GROWTH_LABEL: Record<number, string> = { 0: "Stays the same", 0.05: "+5% a year", 0.1: "+10% a year" };

const DUE_DILIGENCE = [
  "When exactly do the 12 months start, and where is that date written in the agreement?",
  "What are the conditions and timing for a refund of my investment?",
  "What does it mean that the plan stays valid while my investment remains with Nordic Wide?",
  "What happens if I want to change my daily budget during the period?",
  "Which verification steps apply before a refund, and how long do they take?",
  "Who do I contact, and how are my payment details kept up to date?",
];

const RISKS = [
  "This is an estimate, not a guarantee. Actual costs, coverage and terms follow the final agreement.",
  "Coverage is fixed at your selected daily budget. If your ad spend grows beyond it, you pay the difference.",
  "Savings depend on you advertising on Google Ads at the budget you selected.",
];

export function ResultSummary({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);
  const { rows } = result;
  const last = rows[rows.length - 1];
  const afterYearOne = rows.slice(1);
  const avgYearly = afterYearOne.length
    ? Math.round(afterYearOne.reduce((s, r) => s + (r.withoutPlan - r.withPlan), 0) / afterYearOne.length)
    : 0;

  return (
    <>
      <nav className={cn("jump-nav")} aria-label="Result sections">
        <a href="#r-overview">Overview</a>
        <a href="#r-timeline">Timeline</a>
        <a href="#r-years">Year by year</a>
        <a href="#r-scenarios">Scenarios</a>
        <a href="#r-risks">Risks &amp; questions</a>
        <a href="#r-terms">Terms &amp; refund</a>
      </nav>

      <section id="r-overview" className={cn("card savings-hero")} aria-labelledby="savings-title">
        <h3 id="savings-title" className={cn("eyebrow")}>
          Estimated potential savings over {result.savingsYears} years
        </h3>
        <p className={cn("big-result")}>{money(result.potentialSavings)}</p>
        <p className={cn("hero-sub")}>
          You pay {money(result.totalWithPlan)} with the plan instead of {money(result.totalWithoutPlan)} without it.
        </p>
        <dl className={cn("kpi-grid")}>
          <div className={cn("kpi")}>
            <dt>One-time investment</dt>
            <dd>{money(result.investmentAmount)}</dd>
            <span>50% of your yearly ad cost</span>
          </div>
          <div className={cn("kpi")}>
            <dt>Break-even</dt>
            <dd>{result.breakEvenMonth ? `Month ${result.breakEvenMonth}` : "Not reached"}</dd>
            <span>{result.breakEvenMonth ? formatMonths(result.breakEvenMonth) : `within ${result.savingsYears} years`}</span>
          </div>
          <div className={cn("kpi")}>
            <dt>Savings per investment</dt>
            <dd>{result.returnMultiple.toFixed(1)}×</dd>
            <span>savings ÷ investment</span>
          </div>
          <div className={cn("kpi")}>
            <dt>Ad bill covered</dt>
            <dd>{formatPercent(result.coveredShare)}</dd>
            <span>of {money(result.totalWithoutPlan)}, after the investment</span>
          </div>
        </dl>
      </section>

      <section className={cn("card")} aria-labelledby="chart-h">
        <h3 id="chart-h" className={cn("eyebrow")}>
          Total cost over time
        </h3>
        <CumulativeChart result={result} />
        <p className={cn("note")}>
          The with-plan line starts higher because you pay the investment first. After month {WAITING_MONTHS} the plan covers
          your Google Ads and the lines move apart.
        </p>
      </section>

      <section id="r-timeline" className={cn("card")} aria-labelledby="how-title">
        <h3 id="how-title" className={cn("eyebrow")}>
          Your timeline
        </h3>
        <ol className={cn("timeline")}>
          <li>
            <span className={cn("step-num")} aria-hidden="true">1</span>
            <strong>Day 1: invest {money(result.investmentAmount)}</strong>
            <span>One-time payment. The {WAITING_MONTHS} months are counted from the date your agreement and investment begin.</span>
          </li>
          <li>
            <span className={cn("step-num")} aria-hidden="true">2</span>
            <strong>Months 1 to {WAITING_MONTHS}: pay as normal</strong>
            <span>You keep paying Google Ads yourself: {money(result.annualAdsCost)} for the year.</span>
          </li>
          <li>
            <span className={cn("step-num")} aria-hidden="true">3</span>
            <strong>
              Month {WAITING_MONTHS + 1}
              {result.breakEvenMonth ? ` to ${result.breakEvenMonth}: recover the investment` : " onward: coverage starts"}
            </strong>
            <span>
              Nordic Wide covers {money(result.coveragePerYear)} a year ({money(result.dailyBudget)} / day).
              {result.breakEvenMonth ? ` Your savings pass the investment in month ${result.breakEvenMonth}.` : ""}
            </span>
          </li>
          <li>
            <span className={cn("step-num")} aria-hidden="true">4</span>
            <strong>
              Year {Math.min(2, result.savingsYears)} to {result.savingsYears}: keep saving
            </strong>
            <span>
              About {money(avgYearly)} a year is covered, so your yearly net saving grows to {money(last.cumulativeSaving)}.
            </span>
          </li>
        </ol>
      </section>

      <section id="r-years" className={cn("card")} aria-labelledby="years-title">
        <h3 id="years-title" className={cn("eyebrow")}>
          Year by year
        </h3>
        <div className={cn("table-scroll")} tabIndex={0} role="region" aria-label="Year by year table, scrollable">
          <table>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Without the plan</th>
                <th scope="col">With the plan</th>
                <th scope="col">You save this year</th>
                <th scope="col">Cumulative saving</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.year}>
                  <th scope="row">
                    Year {r.year}
                    {r.year === 1 && <span className={cn("tag")}>incl. investment</span>}
                  </th>
                  <td>{money(r.withoutPlan)}</td>
                  <td>{money(r.withPlan)}</td>
                  <td className={cn(r.withoutPlan - r.withPlan < 0 ? "neg" : "pos")}>{money(r.withoutPlan - r.withPlan)}</td>
                  <td className={cn(r.cumulativeSaving < 0 ? "neg" : "pos")}>{money(r.cumulativeSaving)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td>{money(result.totalWithoutPlan)}</td>
                <td>{money(result.totalWithPlan)}</td>
                <td className={cn("pos")}>{money(result.potentialSavings)}</td>
                <td className={cn("pos")}>{money(result.potentialSavings)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className={cn("note")}>Year 1 shows a negative saving because of the one-time investment.</p>
      </section>

      <section id="r-scenarios" className={cn("card")} aria-labelledby="scen-title">
        <h3 id="scen-title" className={cn("eyebrow")}>
          What if your ad cost changes? ({result.savingsYears} years)
        </h3>
        <div className={cn("table-scroll")} tabIndex={0} role="region" aria-label="Scenario table, scrollable">
          <table>
            <thead>
              <tr>
                <th scope="col">Ad cost without the plan</th>
                <th scope="col">Net saving</th>
                <th scope="col">Share of ad bill covered</th>
              </tr>
            </thead>
            <tbody>
              {result.scenarios.map((s) => (
                <tr key={s.growth} className={cn(s.growth === result.growth && "row-active")}>
                  <th scope="row">
                    {GROWTH_LABEL[s.growth] ?? `${Math.round(s.growth * 100)}% a year`}
                    {s.growth === result.growth && <span className={cn("tag")}>your choice</span>}
                  </th>
                  <td className={cn("pos")}>{money(s.potentialSavings)}</td>
                  <td>{formatPercent(s.coveredShare)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={cn("note")}>
          Coverage is fixed at {money(result.dailyBudget)} / day, so your saving stays the same. If your ad cost grows, a smaller
          share of the total bill is covered.
        </p>
      </section>

      <section id="r-risks" className={cn("result-grid")} aria-label="Risks and questions">
        <div className={cn("card")}>
          <h3 className={cn("eyebrow")}>Read before you invest</h3>
          <ul className={cn("bullets")}>
            {RISKS.map((r) => (
              <li key={r}>{r}</li>
            ))}
            <li>
              {result.breakEvenMonth
                ? `Until month ${result.breakEvenMonth}, your total outlay is higher than if you had not invested.`
                : "Within this period your savings may not recover the investment."}
            </li>
          </ul>
        </div>
        <div className={cn("card")}>
          <h3 className={cn("eyebrow")}>Ask Nordic Wide before signing</h3>
          <ul className={cn("bullets")}>
            {DUE_DILIGENCE.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="r-terms" className={cn("card")} aria-labelledby="details-title">
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
