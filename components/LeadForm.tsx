"use client";

import { useState, type FormEvent } from "react";

import { site, whatsappUrl } from "@/lib/site";

/** Property type options — values double as the select value and label. */
const PROPERTY_TYPES = ["Home", "Commercial", "Agricultural"] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];

/** Average monthly electricity-bill bands. */
const BILL_BANDS = [
  "<₹1,500",
  "₹1,500–3,000",
  "₹3,000–6,000",
  "₹6,000–15,000",
  "₹15,000+",
] as const;
type BillBand = (typeof BILL_BANDS)[number];

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

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const INDIAN_MOBILE = /^[6-9]\d{9}$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!digits) {
    errors.phone = "Enter your phone number.";
  } else if (!INDIAN_MOBILE.test(digits)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  if (!values.city.trim()) {
    errors.city = "Tell us your city or town.";
  }

  if (!values.propertyType) {
    errors.propertyType = "Choose a property type.";
  }

  if (!values.bill) {
    errors.bill = "Choose your average monthly bill.";
  }

  return errors;
}

const EMPTY: FormValues = {
  name: "",
  phone: "",
  city: "",
  propertyType: "",
  bill: "",
  message: "",
};

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
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the field-level error as the user corrects it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");

    const payload = {
      ...values,
      phone: values.phone.replace(/\D/g, ""),
      source,
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
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        // No endpoint configured yet — log so the UI stays testable.
        // eslint-disable-next-line no-console
        console.info("[LeadForm] LEAD_FORM_ENDPOINT not set. Payload:", payload);
      }
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
        className={`rounded-card border border-green/30 bg-green/10 p-6 text-center sm:p-8 ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green text-white">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-h3 font-semibold">Thanks — we&rsquo;ll call you within 24 hours.</h3>
        <p className="mt-2 text-grey">Prefer to talk now? Message us on WhatsApp.</p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-eco mt-4 inline-block"
        >
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="lead-name" error={errors.name} required>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            placeholder="Your full name"
          />
        </Field>

        <Field label="Phone" htmlFor="lead-phone" error={errors.phone} required>
          <input
            id="lead-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile"
          />
        </Field>

        <Field label="City / Town" htmlFor="lead-city" error={errors.city} required>
          <input
            id="lead-city"
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            aria-invalid={!!errors.city}
            className={inputClass(!!errors.city)}
            placeholder="e.g. Madurai"
          />
        </Field>

        <Field label="Property type" htmlFor="lead-property" error={errors.propertyType} required>
          <select
            id="lead-property"
            value={values.propertyType}
            onChange={(e) => update("propertyType", e.target.value as PropertyType)}
            aria-invalid={!!errors.propertyType}
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
            id="lead-bill"
            value={values.bill}
            onChange={(e) => update("bill", e.target.value as BillBand)}
            aria-invalid={!!errors.bill}
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
        We&rsquo;ll only use your details to prepare your quote. No spam.
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
        <p className="mt-1 text-sm text-orange" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
