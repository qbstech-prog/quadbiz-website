"use client";

import { type ReactNode, useState } from "react";

import LeadForm, { type BillBand } from "@/components/LeadForm";
import Section from "@/components/Section";
import SubsidyCalculator from "@/components/SubsidyCalculator";

/**
 * Coordinates the subsidy calculator (Section 3) and the lead form (Section 7),
 * sharing the chosen bill bucket so "Get my exact quote" prefills the form.
 * The static in-between sections (eligibility, process, FAQ) are passed as
 * children so page order is preserved without lifting them into the client.
 */
export default function SubsidyLeadFlow({ children }: { children: ReactNode }) {
  const [bill, setBill] = useState<BillBand | undefined>(undefined);

  function handleGetQuote(chosen: BillBand) {
    setBill(chosen);
    // Let the prefill apply, then scroll the form into view.
    requestAnimationFrame(() => {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <>
      {/* Section 3 — Calculator */}
      <Section surface="white">
        <div className="mb-8 text-center">
          <h2 className="text-h2">Estimate Your Subsidy &amp; Savings</h2>
        </div>
        <SubsidyCalculator onGetQuote={handleGetQuote} />
      </Section>

      {/* Sections 4–6 (eligibility, process, FAQ) */}
      {children}

      {/* Section 7 — Lead form. key forces a fresh prefill when the bucket changes. */}
      <Section id="quote" surface="grey">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-h2">Start Your Subsidy Application</h2>
            <p className="mt-3 text-grey">
              Get a free eligibility check and a fixed quote — we&rsquo;ll call you within 24 hours.
            </p>
          </div>
          <LeadForm
            key={bill ?? "default"}
            source="subsidy-page"
            defaultPropertyType="Home"
            defaultBill={bill}
          />
        </div>
      </Section>
    </>
  );
}
