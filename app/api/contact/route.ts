import { ContactDeliveryNotConfiguredError, deliverContactMessage } from "@/lib/contact/delivery";
import {
  type ContactApiResponse,
  hasErrors,
  HONEYPOT_FIELD,
  normalizeContactInput,
  validateContact,
} from "@/lib/contact/validation";
import { siteConfig } from "@/lib/site";

const MAX_BODY_BYTES = 20_000;

function respond(body: ContactApiResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return respond({ ok: false, message: "Your message is too long. Please shorten it and try again." }, 413);
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return respond({ ok: false, message: "Your message is too long. Please shorten it and try again." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return respond({ ok: false, message: "We could not read your request. Please try again." }, 400);
  }

  // Bots fill every field; quietly accept and drop the submission.
  const honeypot = (payload as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return respond({ ok: true }, 200);
  }

  const values = normalizeContactInput(payload);
  const errors = validateContact(values);
  if (hasErrors(errors)) {
    return respond({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }

  try {
    await deliverContactMessage(values);
    return respond({ ok: true }, 200);
  } catch (error) {
    const fallback = `Please email us at ${siteConfig.email} or call ${siteConfig.phone.display}.`;

    if (error instanceof ContactDeliveryNotConfiguredError) {
      console.error("[contact] Delivery is not configured. Set RESEND_* or CONTACT_WEBHOOK_URL.");
      return respond({ ok: false, message: `Our contact form is temporarily unavailable. ${fallback}` }, 503);
    }

    console.error("[contact] Delivery failed:", error);
    return respond({ ok: false, message: `We could not send your message right now. ${fallback}` }, 502);
  }
}
