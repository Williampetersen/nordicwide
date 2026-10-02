import type { CalculationResult } from "@/lib/investment/calculator";
import { formatMoney } from "@/lib/investment/format";
import { cn } from "./cn";

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("row", strong && "row-strong")}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function ComparisonPanels({ result }: { result: CalculationResult }) {
  const money = (v: number) => formatMoney(v, result.currency);

  return (
    <div className={cn("grid grid-2 panels")}>
      <section className={cn("card panel")} aria-labelledby="without-title">
        <h3 id="without-title" className={cn("eyebrow")}>Without investment plan</h3>
        <dl>
          <Row label="Annual Google Ads Cost" value={money(result.annualAdsCost)} />
          <Row label="Annual Management Fee" value={money(result.annualManagementFee)} />
          <Row label="Total annual cost" value={money(result.annualCostWithoutPlan)} />
          <Row label={`Total cost over ${result.years} years`} value={money(result.totalWithoutPlan)} strong />
        </dl>
      </section>

      <section className={cn("card panel panel-green")} aria-labelledby="with-title">
        <h3 id="with-title" className={cn("eyebrow")}>With investment plan</h3>
        <dl>
          <Row label="Investment Amount" value={money(result.investmentAmount)} />
          <Row label="Year 1 Google Ads Cost" value={money(result.yearOneAdsCost)} />
          <Row label="Management Fee" value={money(0)} />
          <Row label="Nordic Wide Coverage" value={money(result.totalNordicWideCoverage)} />
          <Row label="Total customer-paid cost" value={money(result.totalWithPlan)} strong />
          <Row label="Estimated Potential Savings" value={money(result.potentialSavings)} strong />
        </dl>
      </section>
    </div>
  );
}
