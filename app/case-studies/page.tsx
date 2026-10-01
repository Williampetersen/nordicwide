import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { caseStudies } from "@/lib/content/knowledge";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "../knowledge.module.css";

export const metadata = createPageMetadata({
  title: "Case Studies",
  description: "Case studies showing how Nordic Wide builds long-term digital growth systems for businesses.",
  path: routes.caseStudies,
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Case Studies"
        lead="Real examples of growth systems we have built — published with our clients’ permission."
        breadcrumbs={[{ label: "Case Studies", href: routes.caseStudies }]}
      />
      <section className={styles.section} aria-label="Case studies">
        <div className="container">
          {caseStudies.length === 0 ? (
            <EmptyState
              title="Case studies are coming soon"
              description="We only publish case studies with real results and our clients’ approval. Want to know how we would approach your business? Let’s talk."
              action={
                <CTAButton href={routes.contact} withArrow>
                  Start a conversation
                </CTAButton>
              }
            />
          ) : (
            <ul role="list" className={styles.grid}>
              {caseStudies.map((study) => (
                <li key={study.slug} className={styles.card}>
                  <p className={styles.meta}>
                    {study.client} · {study.industry}
                  </p>
                  <h2 className={styles.cardTitle}>{study.title}</h2>
                  <p className={styles.cardText}>{study.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
