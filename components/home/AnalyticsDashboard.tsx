import { channelLeads, demoMetrics, demoPeriodLabel, weeklyLeads } from "@/lib/content/analytics";

import styles from "./AnalyticsDashboard.module.css";

const Y_STEP = 15;
const X_LABEL_WEEKS = new Set([1, 4, 8, 12]);

function niceMax(value: number, step: number) {
  return Math.ceil(value / step) * step;
}

/**
 * Illustrative reporting view. Charts are drawn with plain SVG + HTML so text
 * stays readable at every width; the plot itself is decorative for assistive
 * tech, and the same numbers are available in the data table below it.
 */
export function AnalyticsDashboard() {
  const maxLeads = Math.max(...weeklyLeads.map((point) => point.leads));
  const yMax = niceMax(maxLeads, Y_STEP);
  const yTicks = Array.from({ length: yMax / Y_STEP + 1 }, (_, index) => index * Y_STEP);
  const lastIndex = weeklyLeads.length - 1;

  const points = weeklyLeads.map((point, index) => ({
    ...point,
    x: (index / lastIndex) * 100,
    y: 100 - (point.leads / yMax) * 100,
  }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L100 100 L0 100 Z`;
  const lastPoint = points[lastIndex];

  const maxChannel = Math.max(...channelLeads.map((row) => row.leads));

  return (
    <figure className={styles.dashboard} aria-labelledby="dashboard-title">
      <div className={styles.header}>
        <div>
          <p id="dashboard-title" className={styles.title}>
            Growth overview
          </p>
          <p className={styles.period}>{demoPeriodLabel}</p>
        </div>
        <span className={styles.badge}>Illustrative demo data</span>
      </div>

      <dl className={styles.metrics}>
        {demoMetrics.map((metric) => (
          <div key={metric.label} className={styles.metric}>
            <dt className={styles.metricLabel}>{metric.label}</dt>
            <dd className={styles.metricValue}>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Qualified leads per week</p>
          <div className={styles.lineChart} aria-hidden="true">
            <div className={styles.yAxis}>
              {yTicks.map((tick) => (
                <span key={tick} style={{ bottom: `${(tick / yMax) * 100}%` }}>
                  {tick}
                </span>
              ))}
            </div>
            <div className={styles.plot}>
              {yTicks.map((tick) => (
                <span key={tick} className={styles.gridline} style={{ bottom: `${(tick / yMax) * 100}%` }} />
              ))}
              <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d={areaPath} className={styles.area} />
                <path d={linePath} className={styles.line} vectorEffect="non-scaling-stroke" />
              </svg>
              {points.map((point) => (
                <span
                  key={point.week}
                  className={styles.hit}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <span className={styles.hoverDot} />
                  <span className={styles.tooltip}>
                    Week {point.week} · <strong>{point.leads}</strong> leads
                  </span>
                </span>
              ))}
              <span className={styles.endDot} style={{ left: "100%", top: `${lastPoint.y}%` }} />
              <span className={styles.endLabel} style={{ top: `${lastPoint.y}%` }}>
                {lastPoint.leads}
              </span>
            </div>
            <div className={styles.xAxis}>
              {points
                .filter((point) => X_LABEL_WEEKS.has(point.week))
                .map((point) => (
                  <span key={point.week} style={{ left: `${point.x}%` }}>
                    W{point.week}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <p className={styles.chartTitle}>Leads by channel</p>
          <ul role="list" className={styles.bars}>
            {channelLeads.map((row) => (
              <li key={row.channel} className={styles.barRow}>
                <span className={styles.barLabel}>{row.channel}</span>
                <span className={styles.barTrack}>
                  <span className={styles.bar} style={{ width: `${(row.leads / maxChannel) * 100}%` }} />
                  <span className={styles.barValue}>{row.leads}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figcaption className={styles.caption}>
        An example of the reporting view we set up for clients. All figures are illustrative demo data, not client
        results.
      </figcaption>

      <details className={styles.details}>
        <summary>View weekly lead data as a table</summary>
        <table className={styles.table}>
          <caption className="visually-hidden">Illustrative qualified leads per week</caption>
          <thead>
            <tr>
              <th scope="col">Week</th>
              <th scope="col">Qualified leads</th>
            </tr>
          </thead>
          <tbody>
            {weeklyLeads.map((point) => (
              <tr key={point.week}>
                <th scope="row">Week {point.week}</th>
                <td>{point.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
