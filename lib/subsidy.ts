/**
 * PM Surya Ghar subsidy math — the single source of truth for rate figures.
 *
 * ⚠️  VERIFY BEFORE LAUNCH  ⚠️
 * All figures below are INDICATIVE and must be confirmed against the official
 * portal (https://pmsuryaghar.gov.in) before going live. They are grouped here
 * so they are trivial to update in one place. Do not present them as guaranteed.
 */

export const SUBSIDY_RATES = {
  /** ₹ per kW for the first 2 kW. */
  perKwFirst2: 30000,
  /** ₹ per kW for the 3rd kW (the 2–3 kW band). */
  perKw3rd: 18000,
  /** ₹ cap applied at 3 kW and above (a typical 3 kW home). */
  cap: 78000,
} as const;

/**
 * Indicative gross installed cost per kW (₹), BEFORE subsidy. Used only for the
 * rough payback estimate in the calculator. Also verify/update before launch.
 */
export const INDICATIVE_COST_PER_KW = 60000;

/** Indicative central subsidy (₹) for a given system size in kW. */
export function calcSubsidy(sizeKw: number): number {
  if (sizeKw <= 0) return 0;
  if (sizeKw <= 2) return sizeKw * SUBSIDY_RATES.perKwFirst2;
  if (sizeKw < 3) {
    return 2 * SUBSIDY_RATES.perKwFirst2 + (sizeKw - 2) * SUBSIDY_RATES.perKw3rd;
  }
  // 3 kW and above are capped.
  return SUBSIDY_RATES.cap;
}

/** Map an average monthly bill (₹) to an approximate suggested system size (kW). */
export function suggestSizeFromBill(bill: number): number {
  if (bill < 1500) return 1;
  if (bill < 3000) return 2;
  if (bill < 6000) return 3;
  if (bill < 10000) return 5;
  if (bill < 15000) return 8;
  return 10;
}

/**
 * Estimated monthly savings (₹). Simple model: a correctly-sized system offsets
 * most of the bill. Labelled as an estimate in the UI.
 */
export function estimateMonthlySavings(bill: number): number {
  return Math.round(bill * 0.9);
}

/** Rough payback window (years) as a low–high range. */
export function estimatePaybackYears(
  sizeKw: number,
  monthlySavings: number,
): { low: number; high: number } {
  const gross = sizeKw * INDICATIVE_COST_PER_KW;
  const net = Math.max(0, gross - calcSubsidy(sizeKw));
  const annual = monthlySavings * 12;
  const years = annual > 0 ? net / annual : 0;
  const low = Math.max(1, Math.floor(years));
  const high = Math.max(low + 1, Math.ceil(years));
  return { low, high };
}

/** Format a number as Indian-grouped rupees, e.g. 150000 → "₹1,50,000". */
export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}
