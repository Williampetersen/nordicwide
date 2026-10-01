import { CheckList } from "@/components/ui/CheckList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import type { Service } from "@/types/content";

import styles from "./ServiceDetail.module.css";

interface ServiceIncludedProps {
  service: Service;
}

export function ServiceIncluded({ service }: ServiceIncludedProps) {
  return (
    <section className="section" aria-labelledby="included-title">
      <div className={cx("container", styles.layout)}>
        <div className={styles.intro}>
          <SectionHeading
            id="included-title"
            eyebrow="What’s included"
            title={`${service.title}, done properly`}
            subtitle={service.intro}
          />
          <div className={styles.approach}>
            <h3 className={styles.approachTitle}>Our approach</h3>
            <CheckList items={service.approach} />
          </div>
        </div>

        <ul role="list" className={styles.included}>
          {service.included.map((item, index) => (
            <li key={item.title} className={cx(styles.includedItem, "reveal")}>
              <span className={styles.includedNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.includedTitle}>{item.title}</h3>
                <p className={styles.includedText}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
