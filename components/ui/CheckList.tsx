import { cx } from "@/lib/cx";

import { CheckCircleIcon } from "./icons";
import styles from "./CheckList.module.css";

interface CheckListProps {
  items: string[];
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CheckList({ items, tone = "dark", size = "md", className }: CheckListProps) {
  return (
    <ul role="list" className={cx(styles.list, styles[size], tone === "light" && styles.light, className)}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <CheckCircleIcon className={styles.icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
