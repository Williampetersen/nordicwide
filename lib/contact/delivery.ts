import type { ContactFormValues } from "./validation";

/**
 * Delivery of contact form submissions. Providers are chosen from environment
 * variables, so a new email/CRM provider can be added here without touching
 * the form or the API route.
 *
 *   1. Resend (email)  — RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 *   2. Webhook (CRM, Zapier, Make, Slack …) — CONTACT_WEBHOOK_URL (+ optional CONTACT_WEBHOOK_SECRET)
 *   3. Development only — logs the message to the server console
 */

interface ContactProvider {
  name: string;
  send: (values: ContactFormValues) => Promise<void>;
}

export class ContactDeliveryNotConfiguredError extends Error {
  constructor() {
    super("No contact delivery provider is configured.");
    this.name = "ContactDeliveryNotConfiguredError";
  }
}

const REQUEST_TIMEOUT_MS = 10_000;

const fieldLabels: Record<keyof ContactFormValues, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  website: "Website",
  message: "Message",
};

function formatText(values: ContactFormValues): string {
  return (Object.keys(fieldLabels) as Array<keyof ContactFormValues>)
    .map((field) => `${fieldLabels[field]}: ${values[field] || "—"}`)
    .join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatHtml(values: ContactFormValues): string {
  const rows = (Object.keys(fieldLabels) as Array<keyof ContactFormValues>)
    .map(
      (field) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top">${fieldLabels[field]}</th>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(values[field] || "—")}</td></tr>`,
    )
    .join("");
  return `<h2>New enquiry from nordicwide.com</h2><table>${rows}</table>`;
}

function subjectFor(values: ContactFormValues): string {
  return `New enquiry from ${values.name}${values.company ? ` (${values.company})` : ""}`;
}

function resendProvider(): ContactProvider | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return null;

  return {
    name: "resend",
    async send(values) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((address) => address.trim()),
          reply_to: values.email,
          subject: subjectFor(values),
          text: formatText(values),
          html: formatHtml(values),
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`Resend responded with status ${response.status}`);
    },
  };
}

function webhookProvider(): ContactProvider | null {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return null;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;

  return {
    name: "webhook",
    async send(values) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({ type: "contact_request", submittedAt: new Date().toISOString(), ...values }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new Error(`Webhook responded with status ${response.status}`);
    },
  };
}

function developmentProvider(): ContactProvider | null {
  if (process.env.NODE_ENV === "production") return null;

  return {
    name: "development-log",
    async send(values) {
      console.info("[contact] No provider configured — development submission:\n" + formatText(values));
    },
  };
}

export async function deliverContactMessage(values: ContactFormValues): Promise<void> {
  const provider = resendProvider() ?? webhookProvider() ?? developmentProvider();
  if (!provider) throw new ContactDeliveryNotConfiguredError();
  await provider.send(values);
}
