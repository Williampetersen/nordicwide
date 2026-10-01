import Link from "next/link";

import { LegalPage } from "@/components/sections/LegalPage";
import { legalLastUpdated } from "@/lib/content/legal";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Nordic Wide collects, uses and protects personal data submitted through nordicwide.com.",
  path: routes.privacy,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lead="How we handle the personal data you share with us through this website."
      path={routes.privacy}
      lastUpdated={legalLastUpdated}
    >
      <h2>Who is responsible for your data</h2>
      <p>
        {siteConfig.name}, {siteConfig.address.city}, {siteConfig.address.country}, is the data controller for personal
        data collected through this website. You can contact us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or{" "}
        <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
      </p>

      <h2>What we collect</h2>
      <p>When you use our contact form, we receive the information you choose to give us:</p>
      <ul>
        <li>Your name, company, email address and phone number</li>
        <li>Your website address</li>
        <li>The content of your message</li>
      </ul>
      <p>
        Our hosting provider also processes technical data, such as IP addresses, in server logs to deliver the website
        securely. We do not use this data to identify you.
      </p>

      <h2>Why we use it</h2>
      <p>
        We use the information you send us to respond to your enquiry and, if you wish, to prepare a proposal. The legal
        basis is our legitimate interest in answering enquiries and taking steps at your request before entering into an
        agreement (Article 6(1)(b) and (f) of the GDPR).
      </p>

      <h2>Who we share it with</h2>
      <p>
        We do not sell your personal data. We use carefully selected service providers — for example for website hosting
        and email delivery — who process data on our behalf under data processing agreements. Where a provider is
        located outside the EU/EEA, we rely on appropriate safeguards such as the European Commission’s standard
        contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as needed to handle them and to follow up. If no agreement is made, we delete
        enquiries when they are no longer relevant. If you become a customer, your data is handled under the terms of
        your agreement and applicable accounting rules.
      </p>

      <h2>Your rights</h2>
      <p>Under the GDPR you have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Have inaccurate data corrected</li>
        <li>Have your data deleted or its processing restricted</li>
        <li>Object to our processing</li>
        <li>Receive your data in a portable format</li>
      </ul>
      <p>
        To use your rights, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. You can also
        lodge a complaint with the Danish Data Protection Agency (Datatilsynet).
      </p>

      <h2>Cookies</h2>
      <p>
        Read about our use of cookies in our <Link href={routes.cookies}>Cookie Policy</Link>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy when our services or legal requirements change. The date at the top of this page shows
        when it was last updated.
      </p>
    </LegalPage>
  );
}
