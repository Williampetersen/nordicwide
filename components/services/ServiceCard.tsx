import Image from "next/image";

import { CTAButton } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { routes } from "@/lib/routes";
import type { Service } from "@/types/content";

import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  service: Service;
  headingLevel?: "h2" | "h3";
}

export function ServiceCard({ service, headingLevel: Heading = "h3" }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 80rem) 600px, (min-width: 48rem) 50vw, 100vw"
          placeholder="blur"
          className={styles.image}
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <Heading className={styles.title}>{service.title}</Heading>
        <p className={styles.summary}>{service.summary}</p>
        <CheckList items={service.highlights} tone="light" size="sm" className={styles.checklist} />
        <CTAButton
          href={routes.service(service.slug)}
          variant="light"
          withArrow
          aria-label={`Learn more about ${service.title}`}
        >
          Learn more
        </CTAButton>
      </div>
    </article>
  );
}
