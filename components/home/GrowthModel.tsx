import { CTAButton } from "@/components/ui/Button";
import { growthStages } from "@/lib/content/growth";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";

import styles from "./GrowthModel.module.css";

interface GrowthModelProps {
  /** Hide the CTA when the section is shown on the growth strategy page itself. */
  showCta?: boolean;
}

export function GrowthModel({ showCta = true }: GrowthModelProps) {
  return (
    <section className="section" aria-labelledby="growth-model-title">
      <div className="container-wide">
        <div className={cx(styles.panel, "reveal")}>
          <div className={styles.content}>
            <p className="eyebrow eyebrow-light">The Nordic Wide growth model</p>
            <h2 id="growth-model-title" className={styles.title}>
              Built for Long-Term Business Growth
            </h2>
            <p className={styles.text}>
              Instead of treating advertising as a recurring expense, Nordic Wide focuses on building marketing
              infrastructure that can support your business over the long term.
            </p>
            {showCta ? (
              <CTAButton href={routes.growthStrategy} variant="light" size="lg" withArrow block>
                Explore Our Growth Model
              </CTAButton>
            ) : null}
          </div>

          <ol role="list" className={styles.stages}>
            {growthStages.map((stage, index) => (
              <li key={stage.id} className={styles.stage}>
                <span className={styles.stageNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.stageTitle}>{stage.title}</h3>
                  <p className={styles.stageText}>{stage.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
