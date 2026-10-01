import { CheckList } from "@/components/ui/CheckList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import type { ProcessStep } from "@/types/content";

import styles from "./ProcessSteps.module.css";

interface ProcessStepsProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  /** Show the detail checklist under each step (used on the How It Works page). */
  showDetails?: boolean;
  surface?: boolean;
}

export function ProcessSteps({
  steps,
  title = "From First Conversation to Sustainable Growth",
  subtitle = "A clear four-step process built around your business, your market and your long-term goals.",
  eyebrow = "How it works",
  showDetails = false,
  surface = false,
}: ProcessStepsProps) {
  return (
    <section className={cx("section", surface && "section-surface")} aria-labelledby="process-title">
      <div className="container">
        <SectionHeading
          id="process-title"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          className="reveal"
        />

        <ol role="list" className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.id} className={cx(styles.step, "reveal")}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>
                <span className="visually-hidden">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className={styles.description}>{step.description}</p>
              {showDetails ? <CheckList items={step.details} size="sm" className={styles.details} /> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
