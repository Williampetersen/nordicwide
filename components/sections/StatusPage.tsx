import type { ReactNode } from "react";

import styles from "./StatusPage.module.css";

interface StatusPageProps {
  code: string;
  title: string;
  text: string;
  actions: ReactNode;
}

/** Shared layout for 404 and error pages. */
export function StatusPage({ code, title, text, actions }: StatusPageProps) {
  return (
    <section className={styles.status} aria-labelledby="status-title">
      <div className="container-narrow">
        <p className={styles.code}>{code}</p>
        <h1 id="status-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.text}>{text}</p>
        <div className={styles.actions}>{actions}</div>
      </div>
    </section>
  );
}
