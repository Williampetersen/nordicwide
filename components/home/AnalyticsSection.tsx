import { ArrowLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { measurementAreas } from "@/lib/content/growth";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";

import { AnalyticsDashboard } from "./AnalyticsDashboard";
import styles from "./AnalyticsSection.module.css";

export function AnalyticsSection() {
  return (
    <section className="section section-surface" aria-labelledby="analytics-title">
      <div className={cx("container", styles.inner)}>
        <div className={cx(styles.content, "reveal")}>
          <p className="eyebrow">Analytics</p>
          <h2 id="analytics-title" className={styles.title}>
            Growth Driven by Data
          </h2>
          <p className={styles.text}>
            Every marketing decision should be connected to measurable information. Nordic Wide combines advertising
            data, website analytics and customer behavior to continuously improve the growth system.
          </p>
          <CheckList items={measurementAreas} />
          <ArrowLink href={routes.howItWorks}>See how we work</ArrowLink>
        </div>

        <div className="reveal">
          <AnalyticsDashboard />
        </div>
      </div>
    </section>
  );
}
