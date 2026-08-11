"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accessible FAQ accordion. Keyboard operable (native buttons), with
 * aria-expanded / aria-controls and a labelled region per answer.
 * Note: pair this with faqSchema(items) in the page for FAQPage structured data.
 */
export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-black/10 overflow-hidden rounded-card border border-black/5 bg-white shadow-card">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const btnId = `faq-btn-${i}`;
        const panelId = `faq-panel-${i}`;
        return (
          <div key={item.question}>
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-navy transition-colors hover:bg-[#F7F7F8] sm:px-6"
            >
              <span>{item.question}</span>
              <svg
                viewBox="0 0 24 24"
                className={`h-5 w-5 flex-shrink-0 text-orange transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-body text-grey sm:px-6"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
