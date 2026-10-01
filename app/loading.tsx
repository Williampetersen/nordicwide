import styles from "./loading.module.css";

/** Shown while a route segment streams in. Static pages usually render instantly. */
export default function Loading() {
  return (
    <div className={styles.loading} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}
