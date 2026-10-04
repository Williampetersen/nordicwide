import Image from "next/image";

import { DanishFlag } from "@/components/ui/DanishFlag";
import { siteConfig } from "@/lib/site";

import styles from "./SupportBlock.module.css";

export function SupportBlock() {
  return (
    <section className={styles.block} aria-labelledby="support-heading">
      <h2 id="support-heading" className={styles.heading}>
        Here to answer your questions
      </h2>
      <div className={styles.contact}>
        <span className={styles.avatar}>
          <Image
            src="/images/WilliamPetersen.png"
            alt="William Petersen"
            width={1024}
            height={576}
            sizes="320px"
            className={styles.photo}
          />
        </span>
        <div className={styles.details}>
          <p className={styles.name}>William Petersen</p>
          <a href={siteConfig.phone.href} className={styles.phone}>
            {siteConfig.phone.display}
          </a>
          <p className={styles.label}>
            <DanishFlag className={styles.flag} />
            <span>{siteConfig.supportLabel}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
