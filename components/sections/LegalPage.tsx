import type { ReactNode } from "react";

import { Prose } from "@/components/ui/Prose";

import { PageHero } from "./PageHero";
import styles from "./LegalPage.module.css";

interface LegalPageProps {
  title: string;
  lead: string;
  path: string;
  lastUpdated: string;
  children: ReactNode;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function LegalPage({ title, lead, path, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} lead={lead} breadcrumbs={[{ label: title, href: path }]} />
      <section className={styles.section} aria-label={title}>
        <div className="container-narrow">
          <p className={styles.updated}>
            Last updated: <time dateTime={lastUpdated}>{dateFormatter.format(new Date(lastUpdated))}</time>
          </p>
          <Prose>{children}</Prose>
        </div>
      </section>
    </>
  );
}
