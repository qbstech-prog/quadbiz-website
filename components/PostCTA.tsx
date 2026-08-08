import Link from "next/link";

import { whatsappUrl } from "@/lib/site";

/** Standard conversion block appended to the end of every blog post. */
export default function PostCTA() {
  return (
    <div className="mt-12 rounded-card bg-cta-gradient p-6 text-center text-white shadow-card sm:p-8">
      <h2 className="text-h3 font-bold text-white">Get a free solar quote</h2>
      <p className="mx-auto mt-2 max-w-xl text-white/90">
        Free site survey, a fixed written quote, and full subsidy &amp; net-metering support — from a
        local Madurai team. We&rsquo;ll call you within 24 hours.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-navy transition-transform duration-200 hover:-translate-y-0.5"
        >
          Get Free Quote
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
