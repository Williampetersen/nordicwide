import type { ReactNode } from "react";

import styles from "./Prose.module.css";

interface ProseProps {
  children: ReactNode;
}

/** Typography for long-form text such as legal pages. */
export function Prose({ children }: ProseProps) {
  return <div className={styles.prose}>{children}</div>;
}
