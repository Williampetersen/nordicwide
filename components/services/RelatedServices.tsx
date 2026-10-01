import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/routes";
import type { Service } from "@/types/content";

import styles from "./ServiceDetail.module.css";

interface RelatedServicesProps {
  services: Service[];
}

export function RelatedServices({ services }: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="section section-surface" aria-labelledby="related-title">
      <div className="container">
        <SectionHeading
          id="related-title"
          eyebrow="Connected services"
          title="Part of one growth system"
          subtitle="Each channel works better when it is connected to the others."
        />
        <ul role="list" className={styles.related}>
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={routes.service(service.slug)} className={styles.relatedCard}>
                <span className={styles.relatedImage}>
                  <Image
                    src={service.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 64rem) 120px, 96px"
                    className={styles.relatedImg}
                  />
                </span>
                <span className={styles.relatedBody}>
                  <span className={styles.relatedTitle}>{service.title}</span>
                  <span className={styles.relatedText}>{service.summary}</span>
                </span>
                <ArrowRightIcon className={styles.relatedArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
