import { CTAButton } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/ui/icons";
import { investmentBullets } from "@/lib/content/growth";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";

import styles from "./InvestmentSection.module.css";

export function InvestmentSection() {
  return (
    <section className="section" aria-labelledby="investment-title">
      <div className="container-wide">
        <div className={cx(styles.panel, "reveal")}>
          <div className={styles.content}>
            <p className="eyebrow eyebrow-light">Long-term value</p>
            <h2 id="investment-title" className={styles.title}>
              Your Marketing Should Build Value Over Time
            </h2>
            <p className={styles.text}>
              Short-term advertising can generate traffic. A well-built digital growth system can create a foundation
              that continues to support your business over time.
            </p>
            <CTAButton href={routes.contact} variant="light" size="lg" withArrow block>
              Talk to Nordic Wide
            </CTAButton>
          </div>

          <ul role="list" className={styles.list}>
            {investmentBullets.map((bullet) => (
              <li key={bullet} className={styles.item}>
                <CheckCircleIcon className={styles.icon} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
