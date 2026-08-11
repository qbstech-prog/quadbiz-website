"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

import { site, whatsappUrl } from "@/lib/site";
import {
  BILL_BANDS,
  MESSAGE_MAX,
  PROPERTY_TYPES,
  normalizePhone,
  validateField,
  validateLead,
  type BillBand,
  type LeadErrors,
  type LeadField,
  type PropertyType,
} from "@/lib/leadValidation";

// Re-exported so existing importers (subsidy calculator, handoff flow) keep working.
export { BILL_BANDS, PROPERTY_TYPES } from "@/lib/leadValidation";
export type { BillBand, PropertyType } from "@/lib/leadValidation";

export interface LeadFormProps {
  /** Prefill the property type (e.g. handed off from the subsidy calculator). */
  defaultPropertyType?: PropertyType;
  /** Prefill the average monthly bill band. */
  defaultBill?: BillBand;
  /** Free-text tag identifying where the lead came from. */
  source?: string;
  className?: string;
}

interface FormValues {
  name: string;
  phone: string;
  city: string;
  propertyType: PropertyType | "";
  bill: BillBand | "";
  message: string;
}

const EMPTY: FormValues = {
  name: "",
  phone: "",
  city: "",
  propertyType: "",
  bill: "",
  message: "",
};

/** Order used to focus the first invalid field on submit. */
const FIELD_ORDER: LeadField[] = ["name", "phone", "city", "propertyType", "bill"];

export default function LeadForm({
  defaultPropertyType,
  defaultBill,
  source = "website",
  className = "",
}: LeadFormProps) {
  const [values, setValues] = useState<FormValues>({
    ...EMPTY,
    propertyType: defaultPropertyType ?? "",
    bill: defaultBill ?? "",
  });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const honeypot = useRef("");

  // Refs to focus the first invalid field on submit.
  const fieldRefs = useRef<Record<LeadField, HTMLInputElement | HTMLSelectElement | null>>({
    name: null,
    phone: null,
    city: null,
    propertyType: null,
    bill: null,
  });

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      // Clear a field's error the moment it becomes valid.
      if (key !== "message" && errors[key as LeadField]) {
        const stillInvalid = validateField(key as LeadField, next);
        setErrors((e) => ({ ...e, [key]: stillInvalid }));
      }
      return next;
    });
  }

  function handleBlur(field: LeadField) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Honeypot: silently "succeed" without sending anything.
    if (honeypot.current.trim() !== "") {
      setStatus("success");
      return;
    }

    const nextErrors = validateLead(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
      if (firstInvalid) fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: normalizePhone(values.phone),
          city: values.city.trim(),
          propertyType: values.propertyType,
          bill: values.bill,
          message: values.message.slice(0, MESSAGE_MAX),
          source,
          company: honeypot.current, // honeypot passthrough (server double-checks)
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[LeadForm] submission failed", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-card border border-orange/30 bg-orange/10 p-6 text-center sm:p-8 ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-h3 font-semibold">Thanks — we&rsquo;ll call you within 24 hours.</h3>
        <p className="mt-2 text-grey">Prefer to talk now? Message us on WhatsApp.</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="link-eco mt-4 inline-block">
          Chat on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-card border border-black/5 bg-white p-6 shadow-card sm:p-8 ${className}`}
      aria-label="Request a free solar quote"
    >
      {/* Honeypot — visually hidden, off the tab order; bots fill it, humans don't. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-company">Company (leave blank)</label>
        <input
          id="lead-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => (honeypot.current = e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="lead-name" error={errors.name} required>
          <input
            ref={(el) => {
              fieldRefs.current.name = el;
            }}
            id="lead-name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
          />
        </Field>

        <Field label="Phone" htmlFor="lead-phone" error={errors.phone} required>
          <input
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            id="lead-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile"
          />
        </Field>

        <Field label="City / Town" htmlFor="lead-city" error={errors.city} required>
          <input
            ref={(el) => {
              fieldRefs.current.city = el;
            }}
            id="lead-city"
            type="text"
            autoComplete="address-level2"
            autoCapitalize="words"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "lead-city-error" : undefined}
            className={inputClass(!!errors.city)}
            placeholder="e.g. Madurai"
          />
        </Field>

        <Field label="Property type" htmlFor="lead-property" error={errors.propertyType} required>
          <select
            ref={(el) => {
              fieldRefs.current.propertyType = el;
            }}
            id="lead-property"
            value={values.propertyType}
            onChange={(e) => update("propertyType", e.target.value as PropertyType)}
            onBlur={() => handleBlur("propertyType")}
            aria-invalid={!!errors.propertyType}
            aria-describedby={errors.propertyType ? "lead-property-error" : undefined}
            className={inputClass(!!errors.propertyType)}
          >
            <option value="" disabled>
              Select…
            </option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Average monthly electricity bill"
          htmlFor="lead-bill"
          error={errors.bill}
          required
          className="sm:col-span-2"
        >
          <select
            ref={(el) => {
              fieldRefs.current.bill = el;
            }}
            id="lead-bill"
            value={values.bill}
            onChange={(e) => update("bill", e.target.value as BillBand)}
            onBlur={() => handleBlur("bill")}
            aria-invalid={!!errors.bill}
            aria-describedby={errors.bill ? "lead-bill-error" : undefined}
            className={inputClass(!!errors.bill)}
          >
            <option value="" disabled>
              Select a range…
            </option>
            {BILL_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" htmlFor="lead-message" optional className="sm:col-span-2">
          <textarea
            id="lead-message"
            rows={3}
            maxLength={MESSAGE_MAX}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClass(false)}
            placeholder="Anything you'd like us to know (optional)"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-orange" role="alert">
          Something went wrong sending your request. Please call us on {site.phonePrimaryDisplay} or
          try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Get My Free Quote"}
      </button>

      <p className="mt-3 text-center text-xs text-grey">
        By submitting this form, you agree to our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-navy">
          Privacy Policy
        </Link>{" "}
        and consent to being contacted about your enquiry.
      </p>
    </form>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-ink placeholder:text-grey/60",
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber",
    hasError ? "border-orange" : "border-black/15 focus:border-navy",
  ].join(" ");
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, error, required, optional, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-orange">*</span>}
        {optional && <span className="ml-1 font-normal text-grey">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1 text-sm text-orange" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
