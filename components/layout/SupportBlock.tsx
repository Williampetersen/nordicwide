import { DanishFlag } from "@/components/ui/DanishFlag";
import { siteConfig } from "@/lib/site";

import styles from "./SupportBlock.module.css";

export function SupportBlock() {
  return (
    <section className={styles.block} aria-labelledby="support-heading">
      <h2 id="support-heading" className={styles.heading}>
        Here to answer your questions
      </h2>
      <a href={siteConfig.phone.href} className={styles.phone}>
        {siteConfig.phone.display}
      </a>
      <p className={styles.label}>
        <DanishFlag className={styles.flag} />
        <span>{siteConfig.supportLabel}</span>
      </p>
    </section>
  );
}
