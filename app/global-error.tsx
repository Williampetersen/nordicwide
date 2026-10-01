"use client";

import { useEffect } from "react";

import styles from "./global-error.module.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

/** Replaces the root layout when it fails, so it must render its own document. */
export default function GlobalError({ error, retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className={styles.body}>
        <title>Something went wrong | Nordic Wide</title>
        <main className={styles.main}>
          <p className={styles.brand}>Nordic Wide</p>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.text}>We could not load the website. Please try again in a moment.</p>
          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={() => retry()}>
              Try again
            </button>
            <a className={styles.link} href="mailto:info@nordicwide.com">
              info@nordicwide.com
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
