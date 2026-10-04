import Link from "next/link";

import { PlanStory } from "@/components/plan/PlanStory";
import { PageHero } from "@/components/sections/PageHero";
import { buttonClassName } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "./plan.module.css";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: "How the Investment Plan Works",
  description:
    "Watch the Nordic Wide investment plan step by step: invest once, wait 12 months, then Nordic Wide pays Google Ads directly instead of your company.",
  path: routes.investmentPlan,
});

const WHO_PAYS = [
  { period: "Day 1", who: "Your company", what: "Invests once: 50% of the yearly Google Ads cost, paid to Nordic Wide." },
  { period: "Months 1 to 12", who: "Your company", what: "Keeps paying Google Ads as normal. The 12 months are counted from the date the agreement and investment begin." },
  { period: "Month 13 onward", who: "Nordic Wide", what: "Pays Google Ads directly, up to your selected daily budget. Your company no longer pays for it." },
];

const GOOD_TO_KNOW = [
  "The investment is paid one time.",
  "Coverage is limited to the daily budget you selected, and it stays fixed; it does not increase from year to year.",
  "The plan remains valid while your investment remains with Nordic Wide.",
  "Your investment amount is the amount refunded, returned to the bank account used for the original investment.",
  "The animation is an illustration. Actual costs, coverage and contractual terms are subject to the final agreement.",
];

export default function InvestmentPlanPage() {
  return (
    <>
      <PageHero
        eyebrow="Animated explainer"
        title="How the Investment Plan Works"
        lead="Press play and watch your money move: you invest once, wait 12 months, and then Nordic Wide pays Google Ads for you instead of your company."
        breadcrumbs={[{ label: "Investment Plan", href: routes.investmentPlan }]}
      />

      <section className={styles.section} aria-label="Animated plan">
        <div className="container">
          <PlanStory />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="who-pays-title">
        <div className="container">
          <h2 id="who-pays-title" className={cx(styles.title, "reveal")}>
            Who pays Google Ads, and when?
          </h2>
          <ol className={styles.timeline}>
            {WHO_PAYS.map((row) => (
              <li key={row.period} className={cx(styles.timelineItem, "reveal")}>
                <span className={styles.period}>{row.period}</span>
                <strong className={row.who === "Nordic Wide" ? styles.nw : styles.company}>{row.who} pays</strong>
                <p>{row.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="know-title">
        <div className="container">
          <div className={cx(styles.panel, "reveal")}>
            <h2 id="know-title" className={styles.titleSm}>
              Good to know
            </h2>
            <ul className={styles.list}>
              {GOOD_TO_KNOW.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className={styles.actions}>
              <Link className={buttonClassName({ variant: "primary" })} href={routes.calculator}>
                Calculate your own numbers
              </Link>
              <Link className={buttonClassName({ variant: "secondary" })} href={routes.investors}>
                See companies in the plan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
