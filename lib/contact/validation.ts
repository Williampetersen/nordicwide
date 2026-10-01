/**
 * Contact form validation shared by the browser (instant feedback) and the
 * API route (the source of truth). Keep this file free of browser/server APIs.
 */

export const contactFields = ["name", "company", "email", "phone", "website", "message"] as const;

export type ContactField = (typeof contactFields)[number];
export type ContactFormValues = Record<ContactField, string>;
export type ContactFormErrors = Partial<Record<ContactField, string>>;

/** Hidden field that only bots fill in. */
export const HONEYPOT_FIELD = "fax";

export const contactLimits = {
  name: 100,
  company: 120,
  email: 200,
  phone: 40,
  website: 200,
  messageMin: 10,
  messageMax: 4000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{6,}$/;
const WEBSITE_PATTERN = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i;

export function normalizeContactInput(input: unknown): ContactFormValues {
  const source = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  const read = (field: ContactField) => {
    const value = source[field];
    return typeof value === "string" ? value.trim() : "";
  };

  return {
    name: read("name"),
    company: read("company"),
    email: read("email"),
    phone: read("phone"),
    website: read("website"),
    message: read("message"),
  };
}

export function validateContact(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  } else if (values.name.length > contactLimits.name) {
    errors.name = `Please keep your name under ${contactLimits.name} characters.`;
  }

  if (values.company.length > contactLimits.company) {
    errors.company = `Please keep the company name under ${contactLimits.company} characters.`;
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (values.email.length > contactLimits.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address, for example name@company.com.";
  }

  if (values.phone && (values.phone.length > contactLimits.phone || !PHONE_PATTERN.test(values.phone))) {
    errors.phone = "Please enter a valid phone number, for example +45 12 34 56 78.";
  }

  if (values.website && (values.website.length > contactLimits.website || !WEBSITE_PATTERN.test(values.website))) {
    errors.website = "Please enter a valid website address, for example company.com.";
  }

  if (!values.message) {
    errors.message = "Please tell us a little about your business and what you would like to discuss.";
  } else if (values.message.length < contactLimits.messageMin) {
    errors.message = `Please write at least ${contactLimits.messageMin} characters.`;
  } else if (values.message.length > contactLimits.messageMax) {
    errors.message = `Please keep your message under ${contactLimits.messageMax} characters.`;
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Response shape of POST /api/contact. */
export type ContactApiResponse =
  | { ok: true }
  | { ok: false; message: string; errors?: ContactFormErrors };
