import Image from "next/image";

import { ArrowLink, CTAButton } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { cx } from "@/lib/cx";
import type { Feature } from "@/types/content";

import styles from "./FeatureSection.module.css";

interface FeatureSectionProps {
  feature: Feature;
  /** Place the image on the right instead of the left. */
  reverse?: boolean;
  surface?: boolean;
}

export function FeatureSection({ feature, reverse = false, surface = false }: FeatureSectionProps) {
  const headingId = `${feature.id}-title`;

  return (
    <section className={cx("section", surface && "section-surface")} aria-labelledby={headingId}>
      <div className={cx("container", styles.inner, reverse && styles.reverse)}>
        <div className={cx(styles.media, "reveal")}>
          <Image
            src={feature.image.src}
            alt={feature.image.alt}
            fill
            sizes="(min-width: 64rem) 50vw, 100vw"
            placeholder="blur"
            className={styles.image}
          />
        </div>

        <div className={cx(styles.content, "reveal")}>
          {feature.eyebrow ? <p className="eyebrow">{feature.eyebrow}</p> : null}
          <h2 id={headingId} className={styles.title}>
            {feature.heading}
          </h2>
          <CheckList items={feature.bullets} size="lg" />
          <p className={styles.paragraph}>{feature.paragraph}</p>
          <div className={styles.actions}>
            <CTAButton href={feature.primaryCta.href} size="lg" withArrow block>
              {feature.primaryCta.label}
            </CTAButton>
            <ArrowLink href={feature.secondaryCta.href}>{feature.secondaryCta.label}</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
