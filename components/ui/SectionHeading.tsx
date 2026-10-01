import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: ReactNode;
  eyebrow?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  /** Pass to connect the heading to its section via aria-labelledby. */
  id?: string;
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cx(styles.heading, align === "center" && styles.center, tone === "light" && styles.light, className)}>
      {eyebrow ? <p className={cx("eyebrow", tone === "light" && "eyebrow-light")}>{eyebrow}</p> : null}
      <Heading id={id} className={cx(styles.title, Heading === "h1" && styles.titleLarge)}>
        {title}
      </Heading>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
