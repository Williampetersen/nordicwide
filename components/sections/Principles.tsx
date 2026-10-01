import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import type { Principle } from "@/types/content";

import styles from "./Principles.module.css";

interface PrinciplesProps {
  principles: Principle[];
  title: string;
  subtitle?: string;
  eyebrow?: string;
  surface?: boolean;
}

export function Principles({ principles, title, subtitle, eyebrow, surface = false }: PrinciplesProps) {
  return (
    <section className={cx("section", surface && "section-surface")} aria-labelledby="principles-title">
      <div className="container">
        <SectionHeading id="principles-title" eyebrow={eyebrow} title={title} subtitle={subtitle} className="reveal" />
        <ul role="list" className={styles.grid}>
          {principles.map((principle) => (
            <li key={principle.title} className={cx(styles.card, "reveal")}>
              <span className={styles.accent} aria-hidden="true" />
              <h3 className={styles.title}>{principle.title}</h3>
              <p className={styles.text}>{principle.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
