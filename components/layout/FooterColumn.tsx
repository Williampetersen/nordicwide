import Link from "next/link";

import type { FooterColumn as FooterColumnData } from "@/types/content";

import styles from "./Footer.module.css";

interface FooterColumnProps {
  column: FooterColumnData;
}

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>{column.title}</h2>
      <ul role="list" className={styles.links}>
        {column.links.map((link) => (
          <li key={`${column.title}-${link.href}-${link.label}`}>
            <Link href={link.href} className={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
