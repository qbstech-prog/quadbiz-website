/**
 * Shared lead-form validation — imported by BOTH the client `LeadForm` and the
 * `/api/lead` server route so the rules can never be bypassed by the client.
 * Pure module (no "use client"): safe on server and client.
 */

export const PROPERTY_TYPES = ["Home", "Commercial", "Agricultural"] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const BILL_BANDS = [
  "<₹1,500",
  "₹1,500–3,000",
  "₹3,000–6,000",
  "₹6,000–15,000",
  "₹15,000+",
] as const;
export type BillBand = (typeof BILL_BANDS)[number];

export const MESSAGE_MAX = 1000;

export const LEAD_ERRORS = {
  name: "Please enter your name.",
  phone: "Enter a valid 10-digit mobile number.",
  city: "Please enter your city or town.",
  propertyType: "Please select a property type.",
  bill: "Please select your monthly bill range.",
} as const;

export interface LeadValues {
  name: string;
  phone: string;
  city: string;
  propertyType: string;
  bill: string;
  message?: string;
}

export type LeadField = "name" | "phone" | "city" | "propertyType" | "bill";
export type LeadErrors = Partial<Record<LeadField, string>>;

// --- helpers ---------------------------------------------------------------

const KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

/** True if the string contains a run of 3+ horizontally-adjacent keyboard keys
 *  (e.g. "asd", "qwe", "lkj") — a strong signal of keyboard-mash. */
function hasKeyboardMash(input: string): boolean {
  const s = input.toLowerCase().replace(/[^a-z]/g, "");
  let run = 1;
  for (let i = 1; i < s.length; i++) {
    const prevCh = s[i - 1];
    const curCh = s[i];
    if (!prevCh || !curCh) continue;
    const prev = keyPos(prevCh);
    const cur = keyPos(curCh);
    if (prev && cur && prev.row === cur.row && Math.abs(prev.col - cur.col) === 1) {
      run += 1;
      if (run >= 3) return true;
    } else {
      run = 1;
    }
  }
  return false;
}

function keyPos(ch: string): { row: number; col: number } | null {
  for (let row = 0; row < KEYBOARD_ROWS.length; row++) {
    const rowStr = KEYBOARD_ROWS[row];
    if (!rowStr) continue;
    const col = rowStr.indexOf(ch);
    if (col >= 0) return { row, col };
  }
  return null;
}

/**
 * Normalize an Indian mobile number: strip spaces/dashes/dots/parens and a
 * leading +91, 91, or 0. Returns digits only (ideally the 10-digit number).
 */
export function normalizePhone(raw: string): string {
  let digits = String(raw).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

// --- field validators (return an error message or undefined) ----------------

export function validateName(raw: string): string | undefined {
  const v = raw.trim();
  if (v.length < 2) return LEAD_ERRORS.name;
  const letters = v.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 2) return LEAD_ERRORS.name; // must contain letters
  if (!/[aeiou]/i.test(letters)) return LEAD_ERRORS.name; // no vowels → junk
  if (new Set(letters.toLowerCase()).size < 2) return LEAD_ERRORS.name; // same char repeated
  if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(v)) return LEAD_ERRORS.name; // only name chars
  if (hasKeyboardMash(v)) return LEAD_ERRORS.name; // "asdnajs" etc.
  return undefined;
}

export function validatePhone(raw: string): string | undefined {
  const d = normalizePhone(raw);
  if (!/^[6-9]\d{9}$/.test(d)) return LEAD_ERRORS.phone; // 10 digits, starts 6–9
  if (/^(\d)\1{9}$/.test(d)) return LEAD_ERRORS.phone; // all same digit → junk
  return undefined;
}

export function validateCity(raw: string): string | undefined {
  const v = raw.trim();
  if (v.length < 2) return LEAD_ERRORS.city;
  const letters = v.replace(/[^a-zA-Z]/g, "");
  if (letters.length < 2) return LEAD_ERRORS.city;
  if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(v)) return LEAD_ERRORS.city;
  return undefined;
}

export function validatePropertyType(v: string): string | undefined {
  return PROPERTY_TYPES.includes(v as PropertyType) ? undefined : LEAD_ERRORS.propertyType;
}

export function validateBill(v: string): string | undefined {
  return BILL_BANDS.includes(v as BillBand) ? undefined : LEAD_ERRORS.bill;
}

/** Validate a single field by key. */
export function validateField(field: LeadField, values: LeadValues): string | undefined {
  switch (field) {
    case "name":
      return validateName(values.name);
    case "phone":
      return validatePhone(values.phone);
    case "city":
      return validateCity(values.city);
    case "propertyType":
      return validatePropertyType(values.propertyType);
    case "bill":
      return validateBill(values.bill);
  }
}

/** Validate all required fields; returns a map of field → error (empty = valid). */
export function validateLead(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {};
  (["name", "phone", "city", "propertyType", "bill"] as LeadField[]).forEach((field) => {
    const err = validateField(field, values);
    if (err) errors[field] = err;
  });
  return errors;
}
