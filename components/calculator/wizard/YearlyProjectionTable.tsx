import type { CalculationResult } from "@/lib/investment/calculator";
import { formatMoney } from "@/lib/investment/format";
import { cn } from "./cn";

export function YearlyProjectionTable({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);

  return (
    <section className={cn("card")} aria-labelledby="table-title">
      <h3 id="table-title" className={cn("eyebrow")}>Year-by-year projection</h3>
      <div className={cn("table-scroll")} tabIndex={0} role="region" aria-label="Year-by-year projection table">
        <table>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Google Ads Budget</th>
              <th scope="col">Without Investment Plan</th>
              <th scope="col">With Investment Plan</th>
              <th scope="col">Nordic Wide Pays</th>
              <th scope="col">Potential Savings</th>
            </tr>
          </thead>
          <tbody>
            {result.yearlyProjection.map((row) => (
              <tr key={row.year}>
                <th scope="row">Year {row.year}</th>
                <td>{money(row.adsBudget)}</td>
                <td>{money(row.withoutPlan)}</td>
                <td>{money(row.withPlan)}</td>
                <td>{money(row.nordicWidePays)}</td>
                <td className={cn(row.savings >= 0 ? "pos" : "neg")}>{money(row.savings)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{money(result.annualAdsCost * result.years)}</td>
              <td>{money(result.totalWithoutPlan)}</td>
              <td>{money(result.totalWithPlan)}</td>
              <td>{money(result.totalNordicWideCoverage)}</td>
              <td className={cn(result.potentialSavings >= 0 ? "pos" : "neg")}>{money(result.potentialSavings)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className={cn("note")}>
        Year 1 shows a negative difference because the Investment Amount is paid alongside normal Google Ads Cost.
      </p>
    </section>
  );
}
