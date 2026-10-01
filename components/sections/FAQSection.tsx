import { ArrowLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";
import type { FAQItem } from "@/types/content";

import { FAQAccordion } from "./FAQAccordion";
import styles from "./FAQSection.module.css";

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  /** Link to the full FAQ page (hidden on the FAQ page itself). */
  showAllLink?: boolean;
}

export function FAQSection({
  items,
  title = "Answers to Your Questions",
  subtitle = "Everything you need to know about how Nordic Wide works, our agreements and what to expect.",
  showAllLink = false,
}: FAQSectionProps) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className={cx("container", styles.inner)}>
        <div className={styles.intro}>
          <SectionHeading id="faq-title" eyebrow="FAQ" title={title} subtitle={subtitle} />
          <div className={styles.contactCard}>
            <p className={styles.contactTitle}>Still have questions?</p>
            <p className={styles.contactText}>
              Call us on <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a> or write to{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
            <ArrowLink href={showAllLink ? routes.faq : routes.contact}>
              {showAllLink ? "View all questions" : "Contact Nordic Wide"}
            </ArrowLink>
          </div>
        </div>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
