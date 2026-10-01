import { useId } from "react";

import { cx } from "@/lib/cx";

import styles from "./Logo.module.css";

interface LogoProps {
  /** `dark` for light backgrounds, `light` for the gradient footer. */
  tone?: "dark" | "light";
  className?: string;
}

export function LogoMark({ tone = "dark" }: Pick<LogoProps, "tone">) {
  const gradientId = useId();
  const isLight = tone === "light";

  return (
    <svg className={styles.mark} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#252078" />
          <stop offset="1" stopColor="#5653FF" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={isLight ? "#FFFFFF" : `url(#${gradientId})`} />
      <path
        d="M13 25.5V11.5l14 14V11.5"
        fill="none"
        stroke={isLight ? "#252078" : "#FFFFFF"}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.5 31h21" fill="none" stroke={isLight ? "#4B48FF" : "#FFFFFF"} strokeOpacity="0.6" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: LogoProps) {
  return (
    <span className={cx(styles.logo, tone === "light" && styles.light, className)}>
      <LogoMark tone={tone} />
      <span className={styles.wordmark}>
        Nordic <span className={styles.wide}>Wide</span>
      </span>
    </span>
  );
}
