import { CTAButton } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

import styles from "./FinalCTA.module.css";

interface FinalCTAProps {
  title?: string;
  text?: string;
}

export function FinalCTA({
  title = "Ready to Build a Stronger Growth System?",
  text = "Let’s discuss your business, your current marketing setup and where Nordic Wide can help create a more sustainable path to growth.",
}: FinalCTAProps) {
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className="container-wide">
        <div className={cx(styles.panel, "reveal")}>
          <h2 id="final-cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.text}>{text}</p>
          <div className={styles.actions}>
            <CTAButton href={routes.contact} variant="light" size="lg" withArrow block>
              Start a Conversation
            </CTAButton>
            <CTAButton href={`mailto:${siteConfig.email}`} variant="outline-light" size="lg" block>
              Contact Nordic Wide
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
