import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/ui/JsonLd";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import type { Link as LinkItem, SiteImage } from "@/types/content";

import styles from "./PageHero.module.css";

interface PageHeroProps {
  title: string;
  lead: string;
  eyebrow?: string;
  /** Trail after "Home"; the last item is the current page. */
  breadcrumbs: LinkItem[];
  image?: SiteImage;
  actions?: ReactNode;
}

/** Hero for inner pages, with visible breadcrumbs and matching BreadcrumbList data. */
export function PageHero({ title, lead, eyebrow, breadcrumbs, image, actions }: PageHeroProps) {
  const trail: LinkItem[] = [{ label: "Home", href: routes.home }, ...breadcrumbs];

  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={cx("container", styles.inner, image && styles.withImage)}>
        <div className={styles.content}>
          <nav aria-label="Breadcrumb">
            <ol role="list" className={styles.breadcrumbs}>
              {trail.map((item, index) => {
                const isCurrent = index === trail.length - 1;
                return (
                  <li key={item.href}>
                    {isCurrent ? (
                      <span aria-current="page">{item.label}</span>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 id="page-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.lead}>{lead}</p>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>

        {image ? (
          <div className={styles.media}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 64rem) 45vw, 100vw"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              className={styles.image}
            />
          </div>
        ) : null}
      </div>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </section>
  );
}
