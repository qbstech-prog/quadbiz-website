import type { Metadata } from "next";

import Section from "@/components/Section";
import { SITE_URL, site } from "@/lib/site";

const PATH = "/terms-of-service";

// Fill before go-live (have an advocate review). See also the Privacy Policy.
const EFFECTIVE_DATE = "[EFFECTIVE_DATE]";
const DOMAIN = new URL(SITE_URL).host;

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the Quadbiz Solar Solutions website and enquiries, under Indian law.",
  alternates: { canonical: PATH },
};

export default function TermsOfServicePage() {
  return (
    <Section>
      <div className="legal mx-auto max-w-3xl">
        <h1 className="text-h1 text-navy">Terms of Service</h1>
        <p className="mt-2 text-sm text-grey">Last updated: {EFFECTIVE_DATE}</p>

        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website {DOMAIN} (the
          &ldquo;Website&rdquo;) operated by Quadbiz Solar Solutions (&ldquo;Quadbiz&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing or using the
          Website, you agree to these Terms. If you do not agree, please do not use the Website.
        </p>

        <h2>1. About us and our services</h2>
        <p>
          Quadbiz Solar Solutions provides solar energy products and services — including residential
          rooftop solar, commercial and industrial solar, agricultural solar and solar water pumps,
          subsidy assistance, net metering, and maintenance — primarily across Tamil Nadu, India. The
          Website provides information about our services and allows you to submit an enquiry.
        </p>

        <h2>2. Enquiries, quotations and estimates</h2>
        <ul>
          <li>
            Submitting an enquiry does not create a binding contract for the supply of any product or
            service. It is a request for us to contact you.
          </li>
          <li>
            Any prices, savings figures, payback periods, system sizes, subsidy amounts, or other
            estimates shown on the Website or provided in response to an enquiry are{" "}
            <strong>indicative only</strong>. Actual figures depend on a site survey, your
            consumption, roof/site conditions, component availability, and prevailing government
            schemes and tariffs.
          </li>
          <li>
            Government subsidy amounts and eligibility (including under the PM Surya Ghar and PM-KUSUM
            schemes) are set by the relevant authorities and are subject to change. We do not
            guarantee any specific subsidy amount, approval, or timeline.
          </li>
          <li>
            A binding contract arises only when set out in a separate written agreement or order
            confirmation signed or accepted by both parties.
          </li>
        </ul>

        <h2>3. Warranties</h2>
        <p>
          Product warranties (for example, on solar panels and inverters) are provided by the
          respective manufacturers and/or as specified in your separate written agreement with us.
          The warranty periods referenced on the Website (such as 25 years on panels and 10 years on
          inverters) are indicative of typical manufacturer warranties and are subject to the terms,
          conditions, and exclusions of the applicable manufacturer and installation agreement.
          Nothing on the Website itself constitutes a warranty.
        </p>

        <h2>4. Use of the Website</h2>
        <p>You agree to use the Website lawfully and not to:</p>
        <ul>
          <li>Use it in any way that breaches applicable laws or regulations.</li>
          <li>Attempt to gain unauthorised access to, interfere with, or disrupt the Website or its servers.</li>
          <li>Submit false, misleading, or another person&rsquo;s information without authorisation.</li>
          <li>Copy, reproduce, or exploit Website content except as permitted in Section 5.</li>
        </ul>

        <h2>5. Intellectual property</h2>
        <p>
          All content on the Website — including text, graphics, logos, the Quadbiz name and logo,
          images, and design — is owned by or licensed to Quadbiz Solar Solutions and is protected by
          applicable intellectual property laws. You may view and use the Website for your personal,
          non-commercial purposes. You may not reproduce, distribute, or use our content or branding
          without our prior written permission.
        </p>

        <h2>6. Third-party links and services</h2>
        <p>
          The Website may contain links to third-party websites or reference third-party products,
          schemes, or services (for example, government portals or component manufacturers). We are
          not responsible for the content, accuracy, or practices of third parties, and such links do
          not imply our endorsement.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>
            The Website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis, without warranties of any kind, express or implied.
          </li>
          <li>
            We are not liable for any indirect, incidental, or consequential loss arising from your
            use of, or inability to use, the Website, or from reliance on any indicative information
            provided on it.
          </li>
          <li>
            Nothing in these Terms excludes or limits liability that cannot be excluded or limited
            under applicable Indian law.
          </li>
        </ul>

        <h2>8. Privacy</h2>
        <p>
          Your use of the Website is also governed by our Privacy Policy, which explains how we
          handle your personal data. Please review it at {DOMAIN}/privacy-policy.
        </p>

        <h2>9. Governing law and jurisdiction</h2>
        <p>
          These Terms are governed by the laws of India. Any dispute arising out of or in connection
          with these Terms or the Website shall be subject to the exclusive jurisdiction of the
          courts at Madurai, Tamil Nadu, India.
        </p>

        <h2>10. Changes to these Terms</h2>
        <p>
          We may revise these Terms from time to time. The &ldquo;Last updated&rdquo; date reflects
          the latest version. Your continued use of the Website after changes are posted constitutes
          acceptance of the revised Terms.
        </p>

        <h2>11. Contact us</h2>
        <p>
          For any questions about these Terms, contact:
          <br />
          Quadbiz Solar Solutions · {site.address.street}, {site.address.locality},{" "}
          {site.address.region} {site.address.postalCode} · {site.phonePrimaryDisplay} ·{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </Section>
  );
}
