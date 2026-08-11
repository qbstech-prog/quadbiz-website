"use client";

import { useMemo, useState } from "react";

import { type BillBand } from "@/components/LeadForm";
import {
  calcSubsidy,
  estimateMonthlySavings,
  estimatePaybackYears,
  formatINR,
  suggestSizeFromBill,
} from "@/lib/subsidy";

/** Map a continuous monthly bill (₹) to a LeadForm bill bucket for handoff. */
function billToBand(bill: number): BillBand {
  if (bill < 1500) return "<₹1,500";
  if (bill < 3000) return "₹1,500–3,000";
  if (bill < 6000) return "₹3,000–6,000";
  if (bill < 15000) return "₹6,000–15,000";
  return "₹15,000+";
}

const SIZE_OPTIONS = [1, 2, 3, 5, 10] as const;

interface SubsidyCalculatorProps {
  /** Handoff — receives the chosen bill bucket so the lead form can prefill. */
  onGetQuote: (bill: BillBand) => void;
}

export default function SubsidyCalculator({ onGetQuote }: SubsidyCalculatorProps) {
  const [bill, setBill] = useState(3000);
  // null = size follows the bill; a number = user overrode the size directly.
  const [sizeOverride, setSizeOverride] = useState<number | null>(null);

  const results = useMemo(() => {
    const sizeKw = sizeOverride ?? suggestSizeFromBill(bill);
    const subsidy = calcSubsidy(sizeKw);
    const monthlySavings = estimateMonthlySavings(bill);
    const payback = estimatePaybackYears(sizeKw, monthlySavings);
    return { sizeKw, subsidy, monthlySavings, payback };
  }, [bill, sizeOverride]);

  return (
    <div className="mx-auto max-w-3xl rounded-card border border-black/5 bg-white p-6 shadow-card sm:p-8">
      {/* Bill slider */}
      <div>
        <div className="flex items-end justify-between">
          <label htmlFor="bill-slider" className="text-sm font-medium text-navy">
            Your average monthly electricity bill
          </label>
          <span className="font-heading text-2xl font-bold text-navy">{formatINR(bill)}</span>
        </div>
        <input
          id="bill-slider"
          type="range"
          min={500}
          max={20000}
          step={100}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
          className="mt-3 h-3 w-full cursor-pointer appearance-none rounded-full bg-[#F0F0F2] accent-glow"
          aria-describedby="bill-slider-hint"
        />
        <div id="bill-slider-hint" className="mt-1 flex justify-between text-xs text-grey">
          <span>₹500</span>
          <span>₹20,000</span>
        </div>
      </div>

      {/* Optional system-size override */}
      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-navy">
          Or choose a system size{" "}
          <span className="font-normal text-grey">(optional)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSizeOverride(null)}
            aria-pressed={sizeOverride === null}
            className={chipClass(sizeOverride === null)}
          >
            Auto
          </button>
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSizeOverride(size)}
              aria-pressed={sizeOverride === size}
              className={chipClass(sizeOverride === size)}
            >
              {size} kW
            </button>
          ))}
        </div>
      </fieldset>

      {/* Outputs */}
      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Output label="Suggested size" value={`${results.sizeKw} kW`} />
        <Output label="Indicative subsidy" value={formatINR(results.subsidy)} highlight />
        <Output label="Est. monthly savings" value={formatINR(results.monthlySavings)} />
        <Output
          label="Rough payback"
          value={`${results.payback.low}–${results.payback.high} yrs`}
        />
      </dl>
      <p className="mt-4 text-center text-xs text-grey">
        Estimate only — actual figures are confirmed after a free site survey and your subsidy
        application.
      </p>

      <button
        type="button"
        onClick={() => onGetQuote(billToBand(bill))}
        className="btn-primary mt-6 w-full"
      >
        Get my exact quote
      </button>
    </div>
  );
}

function chipClass(active: boolean): string {
  return [
    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    active
      ? "border-navy bg-navy text-white"
      : "border-black/15 bg-white text-navy hover:border-navy",
  ].join(" ");
}

function Output({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        highlight ? "bg-[#FFF1EA]" : "bg-[#F5F5F7]"
      }`}
    >
      <dd className={`text-xl font-semibold sm:text-2xl ${highlight ? "text-orange" : "text-navy"}`}>
        {value}
      </dd>
      <dt className="mt-1 text-xs text-grey">{label}</dt>
    </div>
  );
}
