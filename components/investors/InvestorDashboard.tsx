import Link from "next/link";

import { DanishFlag } from "@/components/ui/DanishFlag";
import { buttonClassName } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import { formatMoney } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";
import { routes } from "@/lib/routes";
import { type CompanyStatus, type PortfolioSummary } from "@/lib/investors/portfolio";

import styles from "./InvestorDashboard.module.css";

const dkk = (v: number) => formatMoney(v, "DKK");
const monthYear = (d: Date) => new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(d);
const pct = (v: number) => `${Math.round(v * 100)}%`;
const months = (v: number) => `${v.toFixed(1)} months`;

/** Axis length of the shared timeline, in months since each company's start. */
const AXIS_MONTHS = 24;

function Bar({ value, label, tone }: { value: number; label: string; tone: "wait" | "ok" }) {
  const p = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={styles.barWrap}>
      <div className={styles.barTrack} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={p}>
        <div className={cx(styles.barFill, tone === "ok" ? styles.barOk : styles.barWait)} style={{ width: `${p}%` }} />
      </div>
      <span className={styles.barValue}>{p}%</span>
    </div>
  );
}

function CompanyCard({ s }: { s: CompanyStatus }) {
  const covered = s.phase === "covered";
  return (
    <article className={styles.card} aria-labelledby={`c-${s.company.slug}`}>
      <header className={styles.cardHead}>
        <DanishFlag className={styles.flag} />
        <div>
          <h3 id={`c-${s.company.slug}`} className={styles.cardTitle}>
            {s.company.name}
          </h3>
          <p className={styles.muted}>Denmark · invested {monthYear(s.start)}</p>
        </div>
        <span className={cx(styles.badge, covered ? styles.badgeOk : styles.badgeWait)}>
          {covered ? "Ads covered" : "Waiting period"}
        </span>
      </header>

      <p className={styles.headline}>
        {covered ? (
          <>
            No longer pays Google Ads. Nordic Wide has covered <strong>{dkk(s.coveredToDate)}</strong> so far.
          </>
        ) : (
          <>
            Pays Google Ads as normal for now. Coverage starts in <strong>{months(s.monthsUntilCoverage)}</strong> (
            {monthYear(s.coverageStart)}).
          </>
        )}
      </p>

      <dl className={styles.stats}>
        <div>
          <dt>Daily budget</dt>
          <dd>{dkk(s.company.dailyBudgetDkk)}</dd>
        </div>
        <div>
          <dt>Yearly ad cost</dt>
          <dd>{dkk(s.annualAdsCost)}</dd>
        </div>
        <div>
          <dt>One-time investment</dt>
          <dd>{dkk(s.investment)}</dd>
        </div>
        <div>
          <dt>Time in the plan</dt>
          <dd>{months(s.monthsElapsed)}</dd>
        </div>
      </dl>

      <div className={styles.progress}>
        <p className={styles.progressLabel}>{WAITING_MONTHS}-month waiting period</p>
        <Bar value={s.waitingProgress} label={`${s.company.name} waiting period`} tone="wait" />
      </div>
      <div className={styles.progress}>
        <p className={styles.progressLabel}>Investment recovered through covered ads</p>
        <Bar value={s.recoveredShare} label={`${s.company.name} investment recovered`} tone="ok" />
      </div>

      <ul className={styles.facts}>
        <li>
          <span>Google Ads paid by the company during the wait</span>
          <strong>{dkk(s.paidDuringWaiting)}</strong>
        </li>
        <li>
          <span>Google Ads covered by Nordic Wide to date</span>
          <strong>{dkk(s.coveredToDate)}</strong>
        </li>
        <li>
          <span>Coverage {covered ? "started" : "starts"}</span>
          <strong>{monthYear(s.coverageStart)}</strong>
        </li>
        <li>
          <span>Projected net saving over 5 years</span>
          <strong>{dkk(s.fiveYearSavings)}</strong>
        </li>
      </ul>

      {s.company.performance?.length ? (
        <div className={styles.perf}>
          <h4 className={styles.perfTitle}>Business results</h4>
          <dl className={styles.stats}>
            {s.company.performance.map((p) => (
              <div key={p.label}>
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
                {p.note ? <span className={styles.muted}>{p.note}</span> : null}
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </article>
  );
}

export function InvestorDashboard({
  statuses,
  summary,
  asOf,
}: {
  statuses: readonly CompanyStatus[];
  summary: PortfolioSummary;
  asOf: Date;
}) {
  const asOfLabel = new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(asOf);

  return (
    <div className={styles.dashboard}>
      <p className={styles.asOf}>Figures as of {asOfLabel}</p>

      <dl className={styles.kpis}>
        <div className={styles.kpi}>
          <dt>Companies in the plan</dt>
          <dd>{summary.companies}</dd>
          <span>
            {summary.covered} with ads covered · {summary.waiting} in waiting period
          </span>
        </div>
        <div className={styles.kpi}>
          <dt>Total invested</dt>
          <dd>{dkk(summary.totalInvested)}</dd>
          <span>one-time, 50% of yearly ad cost</span>
        </div>
        <div className={styles.kpi}>
          <dt>Ad budgets under the plan</dt>
          <dd>{dkk(summary.totalDailyBudget)} / day</dd>
          <span>{dkk(summary.totalAnnualAdsCost)} per year</span>
        </div>
        <div className={cx(styles.kpi, styles.kpiGreen)}>
          <dt>Ad cost covered to date</dt>
          <dd>{dkk(summary.totalCoveredToDate)}</dd>
          <span>no longer paid by these companies</span>
        </div>
      </dl>

      <section className={styles.panel} aria-labelledby="tl-title">
        <h2 id="tl-title" className={styles.panelTitle}>
          Where each company is on the plan
        </h2>
        <div className={styles.timeline} role="img" aria-label="Timeline of each company's waiting and coverage periods">
          <div className={styles.tlAxis} aria-hidden="true">
            {[0, 6, 12, 18, 24].map((m) => (
              <span key={m} style={{ left: `${(m / AXIS_MONTHS) * 100}%` }}>
                {m === 0 ? "Start" : `${m} mo`}
              </span>
            ))}
          </div>
          {statuses.map((s) => (
            <div key={s.company.slug} className={styles.tlRow}>
              <div className={styles.tlName}>
                <DanishFlag className={styles.flagSm} />
                {s.company.name}
              </div>
              <div className={styles.tlTrack}>
                <div className={styles.tlWait} style={{ width: `${(WAITING_MONTHS / AXIS_MONTHS) * 100}%` }}>
                  Pay as normal
                </div>
                <div className={styles.tlCover} style={{ left: `${(WAITING_MONTHS / AXIS_MONTHS) * 100}%` }}>
                  Ads covered
                </div>
                <div className={styles.tlNow} style={{ left: `${Math.min(s.monthsElapsed / AXIS_MONTHS, 1) * 100}%` }}>
                  <span>Today</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.cards}>
        {statuses.map((s) => (
          <CompanyCard key={s.company.slug} s={s} />
        ))}
      </div>

      <section className={styles.panel} aria-labelledby="cmp-title">
        <h2 id="cmp-title" className={styles.panelTitle}>
          Side-by-side comparison
        </h2>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Company comparison table, scrollable">
          <table>
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Status</th>
                <th scope="col">Daily budget</th>
                <th scope="col">Investment</th>
                <th scope="col">Invested</th>
                <th scope="col">Coverage starts</th>
                <th scope="col">Covered to date</th>
                <th scope="col">Recovered</th>
              </tr>
            </thead>
            <tbody>
              {statuses.map((s) => (
                <tr key={s.company.slug}>
                  <th scope="row">
                    <span className={styles.cellName}>
                      <DanishFlag className={styles.flagSm} />
                      {s.company.name}
                    </span>
                  </th>
                  <td>{s.phase === "covered" ? "Ads covered" : "Waiting"}</td>
                  <td>{dkk(s.company.dailyBudgetDkk)}</td>
                  <td>{dkk(s.investment)}</td>
                  <td>{monthYear(s.start)}</td>
                  <td>{monthYear(s.coverageStart)}</td>
                  <td>{dkk(s.coveredToDate)}</td>
                  <td>{pct(s.recoveredShare)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total</th>
                <td />
                <td>{dkk(summary.totalDailyBudget)}</td>
                <td>{dkk(summary.totalInvested)}</td>
                <td />
                <td />
                <td>{dkk(summary.totalCoveredToDate)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="how-title">
        <h2 id="how-title" className={styles.panelTitle}>
          How the plan works
        </h2>
        <ol className={styles.steps}>
          <li>
            <strong>Invest once</strong>
            <span>The company invests 50% of its yearly Google Ads cost, one time.</span>
          </li>
          <li>
            <strong>Wait {WAITING_MONTHS} months</strong>
            <span>Counted from the date the agreement and investment begin. The company pays Google Ads as normal.</span>
          </li>
          <li>
            <strong>Ads are covered</strong>
            <span>After {WAITING_MONTHS} months the company no longer pays Google Ads, up to its fixed daily budget.</span>
          </li>
        </ol>
        <p className={styles.note}>
          Numbers on this page are calculated from each company&apos;s daily budget, its approximate start date and these plan rules.
          They are not audited accounts and not a guarantee of future results. Contractual terms are governed by each
          company&apos;s agreement.
        </p>
        <div className={styles.actions}>
          <Link className={buttonClassName({ variant: "primary" })} href={routes.calculator}>
            Calculate your own savings
          </Link>
          <Link className={buttonClassName({ variant: "secondary" })} href={routes.contact}>
            Talk to Nordic Wide
          </Link>
        </div>
      </section>
    </div>
  );
}
