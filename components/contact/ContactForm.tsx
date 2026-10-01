"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { buttonClassName } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/ui/icons";
import {
  type ContactApiResponse,
  contactFields,
  type ContactFormErrors,
  contactLimits,
  hasErrors,
  HONEYPOT_FIELD,
  normalizeContactInput,
  validateContact,
} from "@/lib/contact/validation";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

import { FormField } from "./FormField";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const CONTACT_ENDPOINT = "/api/contact";

function readValues(form: HTMLFormElement) {
  return normalizeContactInput(Object.fromEntries(new FormData(form)));
}

function focusFirstInvalid(form: HTMLFormElement, errors: ContactFormErrors) {
  const firstInvalid = contactFields.find((field) => errors[field]);
  if (!firstInvalid) return;
  const element = form.elements.namedItem(firstInvalid);
  if (element instanceof HTMLElement) element.focus();
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [hasAttempted, setHasAttempted] = useState(false);

  const isSubmitting = status === "submitting";

  // After the first submit attempt, re-validate as the user types so errors clear.
  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    if (hasAttempted) setErrors(validateContact(readValues(event.currentTarget)));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = readValues(form);
    const validationErrors = validateContact(values);

    setHasAttempted(true);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      setStatus("error");
      setStatusMessage("Please check the highlighted fields.");
      focusFirstInvalid(form, validationErrors);
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    const honeypotField = form.elements.namedItem(HONEYPOT_FIELD);
    const honeypot = honeypotField instanceof HTMLInputElement ? honeypotField.value : "";

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: honeypot }),
      });
      const result = (await response.json()) as ContactApiResponse;

      if (result.ok) {
        setStatus("success");
        setErrors({});
        setHasAttempted(false);
        return;
      }

      setStatus("error");
      setStatusMessage(result.message);
      if (result.errors) {
        setErrors(result.errors);
        focusFirstInvalid(form, result.errors);
      }
    } catch {
      setStatus("error");
      setStatusMessage(
        `We could not reach our server. Please check your connection, or email us at ${siteConfig.email}.`,
      );
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckCircleIcon className={styles.successIcon} />
        <h2 className={styles.successTitle} tabIndex={-1} ref={(element) => element?.focus()}>
          Thank you — your request has been sent
        </h2>
        <p className={styles.successText}>
          We will get back to you shortly to arrange a conversation. If your enquiry is urgent, call us on{" "}
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
        </p>
        <button type="button" className={buttonClassName({ variant: "secondary" })} onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit}
      onChange={handleChange}
      aria-describedby="contact-form-note"
      aria-busy={isSubmitting}
    >
      {status === "error" && statusMessage ? (
        <div className={styles.alert} role="alert">
          {statusMessage}
        </div>
      ) : null}

      <p id="contact-form-note" className={styles.note}>
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      <div className={styles.row}>
        <FormField name="name" label="Name" autoComplete="name" required maxLength={contactLimits.name} error={errors.name} />
        <FormField
          name="company"
          label="Company"
          autoComplete="organization"
          maxLength={contactLimits.company}
          error={errors.company}
        />
      </div>
      <div className={styles.row}>
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          maxLength={contactLimits.email}
          error={errors.email}
        />
        <FormField
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          maxLength={contactLimits.phone}
          error={errors.phone}
        />
      </div>
      <FormField
        name="website"
        label="Website"
        type="url"
        autoComplete="url"
        maxLength={contactLimits.website}
        error={errors.website}
      />
      <FormField
        name="message"
        label="Message"
        multiline
        required
        maxLength={contactLimits.messageMax}
        hint="Tell us about your business, your current marketing and what you would like to achieve."
        error={errors.message}
      />

      {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`contact-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input id={`contact-${HONEYPOT_FIELD}`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <button
          type="submit"
          className={buttonClassName({ size: "lg", block: true })}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            "Request a Conversation"
          )}
        </button>
        <p className={styles.privacy}>
          We use your details only to respond to your enquiry. Read our{" "}
          <Link href={routes.privacy}>Privacy Policy</Link>.
        </p>
      </div>

      <p className="visually-hidden" role="status">
        {isSubmitting ? "Sending your request…" : ""}
      </p>
    </form>
  );
}
