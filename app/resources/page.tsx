import Link from "next/link";

import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowRightIcon } from "@/components/ui/icons";
import { resources } from "@/lib/content/knowledge";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "../knowledge.module.css";

export const metadata = createPageMetadata({
  title: "Resources",
  description:
    "Guides and explanations from Nordic Wide: how the growth model works, our services, growth strategy and frequently asked questions.",
  path: routes.resources,
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Resources"
        lead="Everything you need to understand the Nordic Wide growth model before we talk."
        breadcrumbs={[{ label: "Resources", href: routes.resources }]}
      />
      <section className={styles.section} aria-label="Resources">
        <div className="container">
          <ul role="list" className={styles.grid}>
            {resources.map((resource) => (
              <li key={resource.href}>
                <Link href={resource.href} className={styles.linkCard}>
                  <h2 className={styles.cardTitle}>{resource.title}</h2>
                  <p className={styles.cardText}>{resource.description}</p>
                  <span className={styles.cardLink}>
                    Read more <ArrowRightIcon className={styles.cardArrow} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
