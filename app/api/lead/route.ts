import { NextResponse } from "next/server";

import { MESSAGE_MAX, normalizePhone, validateLead } from "@/lib/leadValidation";

/**
 * Lead intake endpoint. Re-validates everything server-side (never trust the
 * client), silently drops honeypot hits, normalizes the phone, then forwards to
 * LEAD_FORM_ENDPOINT (a server-only env var — e.g. a Google Apps Script Web App)
 * if configured. Until that's set, it logs so the flow stays testable.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success, discard.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const values = {
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    city: String(body.city ?? ""),
    propertyType: String(body.propertyType ?? ""),
    bill: String(body.bill ?? ""),
    message: String(body.message ?? ""),
  };

  const errors = validateLead(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const payload = {
    name: values.name.trim(),
    phone: normalizePhone(values.phone),
    phoneE164: `+91${normalizePhone(values.phone)}`,
    city: values.city.trim(),
    propertyType: values.propertyType,
    bill: values.bill,
    message: values.message.slice(0, MESSAGE_MAX),
    source: String(body.source ?? "website"),
    submittedAt: new Date().toISOString(),
  };

  const endpoint = process.env.LEAD_FORM_ENDPOINT;
  try {
    if (endpoint) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Upstream ${res.status}`);
    } else {
      // eslint-disable-next-line no-console
      console.info("[api/lead] LEAD_FORM_ENDPOINT not set. Lead:", payload);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/lead] forward failed", err);
    return NextResponse.json({ ok: false, error: "Could not submit." }, { status: 502 });
  }
}
