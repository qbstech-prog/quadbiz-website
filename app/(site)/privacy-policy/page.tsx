import type { Metadata } from "next";

import Section from "@/components/Section";
import { SITE_URL, site } from "@/lib/site";

const PATH = "/privacy-policy";

// ---------------------------------------------------------------------------
// Placeholders to fill before this page goes live (have an advocate review).
// EFFECTIVE_DATE: set to the go-live date.
// GRIEVANCE_OFFICER_NAME: a named person responsible for privacy queries.
// ---------------------------------------------------------------------------
const EFFECTIVE_DATE = "[EFFECTIVE_DATE]";
const GRIEVANCE_OFFICER_NAME = "[GRIEVANCE_OFFICER_NAME]";
const GRIEVANCE_OFFICER_EMAIL = site.email; // may be replaced with a dedicated address
const DOMAIN = new URL(SITE_URL).host;
const ADDRESS = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, India`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Quadbiz Solar Solutions collects, uses, stores and protects your personal data under India's DPDP Act, 2023.",
  alternates: { canonical: PATH },
};

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <div className="legal mx-auto max-w-3xl">
        <h1 className="text-h1 font-bold text-navy">Privacy Policy</h1>
        <p className="mt-2 text-sm text-grey">Last updated: {EFFECTIVE_DATE}</p>

        <p>
          Quadbiz Solar Solutions (&ldquo;Quadbiz&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) is committed to protecting your privacy and handling your personal data
          responsibly. This Privacy Policy explains how we collect, use, store, share and protect
          your personal data when you visit our website {DOMAIN} (the &ldquo;Website&rdquo;) or
          contact us for our solar products and services. We process personal data in accordance
          with the Digital Personal Data Protection Act, 2023, the Digital Personal Data Protection
          Rules, 2025, and the Information Technology Act, 2000, and rules made thereunder.
        </p>
        <p>
          By using our Website or submitting your information through our enquiry form, WhatsApp,
          phone, or email, you consent to the practices described in this Policy.
        </p>

        <h2>1. Who we are (Data Fiduciary)</h2>
        <p>Quadbiz Solar Solutions is the &ldquo;Data Fiduciary&rdquo; responsible for your personal data.</p>
        <ul>
          <li>Address: {ADDRESS}</li>
          <li>
            Phone: {site.phonePrimaryDisplay} / {site.phoneSecondaryDisplay}
          </li>
          <li>Email: {site.email}</li>
        </ul>

        <h2>2. What personal data we collect</h2>
        <p>When you enquire with us, we may collect:</p>
        <ul>
          <li>
            <strong>Identity &amp; contact data:</strong> your name, phone number, and (if provided)
            email address.
          </li>
          <li>
            <strong>Enquiry data:</strong> your city/town, property type (home, commercial, or
            agricultural), your average monthly electricity bill range, and any message or details
            you share about your requirements.
          </li>
          <li>
            <strong>Communication data:</strong> records of your calls, WhatsApp messages, or emails
            with us.
          </li>
          <li>
            <strong>Technical &amp; usage data (automatically):</strong> IP address, browser type,
            device information, pages visited, and similar analytics data collected via cookies and
            similar technologies (see Section 9).
          </li>
        </ul>
        <p>
          We do <strong>not</strong> intentionally collect sensitive personal data (such as
          financial account details, health, or biometric data) through the Website. Please do not
          submit such information through our enquiry form.
        </p>

        <h2>3. How and why we use your data (Purpose)</h2>
        <p>We use your personal data only for the purposes for which you provide it, namely:</p>
        <ul>
          <li>To respond to your enquiry and provide a quotation, site survey, or consultation.</li>
          <li>
            To contact you (by phone, WhatsApp, email, or SMS) about your enquiry and our solar
            products and services.
          </li>
          <li>
            To assist with subsidy applications (e.g. PM Surya Ghar), net metering, and related
            paperwork, where you engage us for these services.
          </li>
          <li>To provide, operate, and improve our services and the Website.</li>
          <li>To comply with applicable legal obligations.</li>
          <li>To maintain business records.</li>
        </ul>
        <p>
          We rely on your <strong>consent</strong> as the legal basis for processing your enquiry
          data. You provide this consent when you submit the enquiry form or otherwise contact us.
          Where processing is necessary for a legitimate use permitted under the DPDP Act (such as
          responding to a request you have made), we may rely on that basis.
        </p>

        <h2>4. How we collect your data</h2>
        <ul>
          <li>Directly from you, when you complete the enquiry form, call, WhatsApp, or email us.</li>
          <li>Automatically, through cookies and analytics tools when you browse the Website.</li>
        </ul>

        <h2>5. Sharing your data (Data Processors and third parties)</h2>
        <p>We do not sell your personal data. We may share it only with:</p>
        <ul>
          <li>
            <strong>Service providers (&ldquo;Data Processors&rdquo;)</strong> who help us operate
            the Website and communicate with you, under appropriate contractual safeguards. These
            may include: our website hosting provider (Vercel), our content management system
            (Sanity), our email delivery provider (Resend), and analytics/review providers (such as
            Google), and messaging platforms (such as WhatsApp) where you choose to contact us
            through them.
          </li>
          <li>
            <strong>Government authorities or agencies</strong>, where required to process a subsidy
            or net-metering application you have engaged us for, or where required by law.
          </li>
          <li>
            <strong>Legal and regulatory bodies</strong>, where disclosure is required to comply
            with applicable law, a court order, or to protect our rights.
          </li>
        </ul>
        <p>
          Some providers may process or store data on servers located outside India. Where this
          occurs, we take reasonable steps to ensure your data is handled in accordance with
          applicable law.
        </p>

        <h2>6. How long we keep your data (Retention)</h2>
        <p>
          We retain your personal data only for as long as necessary to fulfil the purposes
          described in this Policy, to maintain business records, and to comply with legal
          obligations. When your data is no longer required, we will delete or anonymise it. You may
          ask us to erase your data at any time (see Section 8).
        </p>

        <h2>7. How we protect your data (Security)</h2>
        <p>
          We implement reasonable security safeguards to protect your personal data against
          unauthorised access, disclosure, alteration, or loss, consistent with the DPDP Act and the
          IT Act. However, no method of transmission over the internet is completely secure, and we
          cannot guarantee absolute security. In the event of a personal data breach, we will act in
          accordance with our obligations under applicable law.
        </p>

        <h2>8. Your rights as a Data Principal</h2>
        <p>Under the Digital Personal Data Protection Act, 2023, you have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong> — request a summary of the personal data we hold about you and
            how we process it.
          </li>
          <li>
            <strong>Correction and updating</strong> — request correction of inaccurate or
            incomplete data.
          </li>
          <li>
            <strong>Erasure</strong> — request deletion of your personal data, subject to legal
            retention requirements.
          </li>
          <li>
            <strong>Withdraw consent</strong> — withdraw your consent at any time; this will not
            affect the lawfulness of processing carried out before withdrawal.
          </li>
          <li>
            <strong>Grievance redressal</strong> — raise a complaint about how we handle your data.
          </li>
          <li>
            <strong>Nomination</strong> — nominate another individual to exercise your rights in the
            event of death or incapacity.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact our Grievance Officer (Section 10). We will
          respond within the timelines required under applicable law.
        </p>

        <h2>9. Cookies and analytics</h2>
        <p>
          Our Website may use cookies and similar technologies to help it function, remember your
          preferences, and understand how visitors use the site (for example, through analytics). You
          can control or disable cookies through your browser settings, though some features may not
          work as intended if you do. Where we use analytics or review services (such as Google),
          those providers may process limited data in accordance with their own privacy terms.
        </p>

        <h2>10. Grievance Officer</h2>
        <p>
          If you have any questions, concerns, or complaints about this Policy or how we handle your
          personal data, please contact:
        </p>
        <ul>
          <li>
            <strong>Grievance Officer:</strong> {GRIEVANCE_OFFICER_NAME}
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${GRIEVANCE_OFFICER_EMAIL}`}>{GRIEVANCE_OFFICER_EMAIL}</a>
          </li>
          <li>
            <strong>Address:</strong> {ADDRESS}
          </li>
          <li>
            <strong>Phone:</strong> {site.phonePrimaryDisplay}
          </li>
        </ul>
        <p>
          If you are not satisfied with our response, you may have the right to escalate your
          complaint to the Data Protection Board of India, in accordance with the DPDP Act.
        </p>

        <h2>11. Children&rsquo;s data</h2>
        <p>
          Our Website and services are intended for adults. We do not knowingly collect personal
          data of children (individuals under 18 years). If you believe a child has provided us data
          without appropriate consent, please contact us and we will take steps to delete it.
        </p>

        <h2>12. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at
          the top reflects the latest version. We encourage you to review this Policy periodically.
        </p>
      </div>
    </Section>
  );
}
