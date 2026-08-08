import Link from "next/link";

import { site } from "@/lib/site";

/**
 * Minimal layout for focused landing pages (e.g. the Contact lead-capture page).
 * No site navigation — only the page content and a legal-only footer. Legal
 * links are kept for compliance/consent, not as site navigation.
 */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-container flex-col items-center gap-2 px-4 py-6 text-center text-xs text-grey sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {site.foundingDate} {site.name}
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-navy">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-navy">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
