import type { CalculationResult } from "@/lib/investment/calculator";
import { formatCompact, formatMoney } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";
import { cn } from "./cn";

const W = 720;
const H = 340;
const M = { top: 20, right: 20, bottom: 40, left: 64 };

/** Cumulative cost at the end of each month (index 0 = start, where the investment is paid). */
function monthlySeries(result: CalculationResult) {
  const without = [0];
  const withPlan = [result.investmentAmount];
  result.rows.forEach((row, i) => {
    for (let m = 1; m <= 12; m++) {
      const w = row.withoutPlan / 12;
      const p = i === 0 ? w : row.withPlan / 12;
      without.push(without[without.length - 1] + w);
      withPlan.push(withPlan[withPlan.length - 1] + p);
    }
  });
  return { without, withPlan };
}

/** Rounds up to a 1, 2, 2.5, 5 or 10 × 10^n axis maximum. */
function niceMax(v: number): number {
  if (v <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(v));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * pow >= v) ?? 10;
  return step * pow;
}

export function CumulativeChart({ result }: { result: CalculationResult }) {
  const { without, withPlan } = monthlySeries(result);
  const months = without.length - 1;
  const max = niceMax(Math.max(...without, ...withPlan));
  const x = (m: number) => M.left + (m / months) * (W - M.left - M.right);
  const y = (v: number) => H - M.bottom - (v / max) * (H - M.top - M.bottom);
  const path = (s: number[]) => s.map((v, m) => `${m ? "L" : "M"}${x(m).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const be = result.breakEvenMonth;

  return (
    <figure className={cn("chart")}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="chart-title chart-desc" className={cn("chart-svg")}>
        <title id="chart-title">Cumulative Google Ads cost with and without the plan</title>
        <desc id="chart-desc">
          Without the plan you pay {formatMoney(result.totalWithoutPlan, result.currency)} over {result.savingsYears} years.
          With the plan you pay {formatMoney(result.totalWithPlan, result.currency)} including the investment.
          {be ? ` The lines cross in month ${be}.` : ""}
        </desc>

        {yTicks.map((t) => (
          <g key={t}>
            <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} className={cn("chart-grid")} />
            <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className={cn("chart-axis")}>
              {formatCompact(t)}
            </text>
          </g>
        ))}
        {result.rows.map((r) => (
          <text key={r.year} x={x(r.year * 12)} y={H - M.bottom + 20} textAnchor="middle" className={cn("chart-axis")}>
            Year {r.year}
          </text>
        ))}

        <rect x={x(0)} y={M.top} width={x(WAITING_MONTHS) - x(0)} height={H - M.top - M.bottom} className={cn("chart-wait")} />
        <text x={(x(0) + x(WAITING_MONTHS)) / 2} y={M.top + 16} textAnchor="middle" className={cn("chart-note")}>
          You pay as normal
        </text>

        <path d={path(without)} className={cn("chart-line chart-line-without")} fill="none" />
        <path d={path(withPlan)} className={cn("chart-line chart-line-with")} fill="none" />

        {be && (
          <g>
            <line x1={x(be)} x2={x(be)} y1={M.top} y2={H - M.bottom} className={cn("chart-be")} />
            <circle cx={x(be)} cy={y(without[be])} r={6} className={cn("chart-dot")} />
            <text x={Math.min(x(be) + 10, W - 140)} y={M.top + 34} className={cn("chart-be-label")}>
              Break-even: month {be}
            </text>
          </g>
        )}
      </svg>
      <figcaption className={cn("chart-legend")}>
        <span>
          <i className={cn("swatch swatch-without")} /> Without the plan
        </span>
        <span>
          <i className={cn("swatch swatch-with")} /> With the plan (investment included)
        </span>
      </figcaption>
    </figure>
  );
}
