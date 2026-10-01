import type { HTMLInputTypeAttribute } from "react";

import { cx } from "@/lib/cx";
import type { ContactField } from "@/lib/contact/validation";

import styles from "./ContactForm.module.css";

interface FormFieldProps {
  name: ContactField;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  maxLength?: number;
  hint?: string;
  error?: string;
  className?: string;
}

export function FormField({
  name,
  label,
  type = "text",
  autoComplete,
  required = false,
  multiline = false,
  maxLength,
  hint,
  error,
  className,
}: FormFieldProps) {
  const inputId = `contact-${name}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const sharedProps = {
    id: inputId,
    name,
    autoComplete,
    maxLength,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: cx(styles.control, error && styles.controlInvalid),
  };

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : (
          <span className={styles.optional}>Optional</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {multiline ? <textarea rows={6} {...sharedProps} /> : <input type={type} {...sharedProps} />}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
