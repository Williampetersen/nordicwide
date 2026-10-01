import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cx } from "@/lib/cx";

import { ArrowRightIcon } from "./icons";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "light" | "outline-light";
export type ButtonSize = "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to full width on small screens. */
  block?: boolean;
  className?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  light: styles.light,
  "outline-light": styles.outlineLight,
};

export function buttonClassName({ variant = "primary", size = "md", block, className }: ButtonStyleOptions = {}) {
  return cx(styles.button, variantClass[variant], size === "lg" && styles.lg, block && styles.block, className);
}

type CTAButtonProps = ButtonStyleOptions & {
  href: string;
  children: ReactNode;
  withArrow?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/** A link styled as a button. Uses next/link for internal routes. */
export function CTAButton({ href, children, withArrow, variant, size, block, className, ...rest }: CTAButtonProps) {
  const classes = buttonClassName({ variant, size, block, className });
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowRightIcon className={styles.arrow} /> : null}
    </>
  );

  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...rest}>
      {content}
    </NextLink>
  );
}

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}

/** Secondary text link with an arrow, e.g. "Learn more". */
export function ArrowLink({ href, children, tone = "dark", className }: ArrowLinkProps) {
  const classes = cx(styles.arrowLink, tone === "light" && styles.arrowLinkLight, className);

  return (
    <NextLink href={href} className={classes}>
      <span>{children}</span>
      <ArrowRightIcon className={styles.arrow} />
    </NextLink>
  );
}
