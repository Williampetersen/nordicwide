import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/types/content";

import { ServiceCard } from "./ServiceCard";
import styles from "./ServiceGrid.module.css";

interface ServiceGridProps {
  services: Service[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  /** Set false when the page already has a heading for this content. */
  showHeading?: boolean;
}

export function ServiceGrid({
  services,
  title = "A Complete Growth Solution",
  subtitle = "Built around the channels and infrastructure your business needs to grow sustainably.",
  eyebrow = "Services",
  showHeading = true,
}: ServiceGridProps) {
  return (
    <section className="section" aria-labelledby={showHeading ? "services-title" : undefined} aria-label={showHeading ? undefined : "Services"}>
      <div className="container">
        {showHeading ? (
          <SectionHeading
            id="services-title"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align="center"
            className="reveal"
          />
        ) : null}
        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.slug} className="reveal">
              <ServiceCard service={service} headingLevel={showHeading ? "h3" : "h2"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
