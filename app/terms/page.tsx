import Link from "next/link";

import { LegalPage } from "@/components/sections/LegalPage";
import { legalLastUpdated } from "@/lib/content/legal";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Terms & Documents",
  description: "Terms of use for nordicwide.com and information about Nordic Wide agreements and documentation.",
  path: routes.terms,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Documents"
      lead="Terms for using this website, and how our customer agreements work."
      path={routes.terms}
      lastUpdated={legalLastUpdated}
    >
      <h2>Customer agreements</h2>
      <p>
        Services from {siteConfig.name} are provided under a signed agreement. The agreement and its supporting
        documentation define the scope, prices, payment terms, notice periods, refund or repayment conditions and any
        other applicable terms. In case of any difference between this website and a signed agreement, the agreement
        applies.
      </p>
      <p>
        Please review the agreement carefully before signing. If you have questions about your agreement, contact us at{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content on this website is general information about our services. It is not financial, legal or investment
        advice. Marketing performance depends on many factors, including market conditions, competition, customer demand
        and campaign performance, and no advertising or financial outcome is guaranteed unless explicitly stated in a
        signed agreement.
      </p>
      <p>
        Figures shown as examples or illustrations on this website — for instance in dashboard visuals — are demo data
        and not results from real clients.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Texts, graphics, the {siteConfig.name} name and logo, and the design of this website belong to {siteConfig.name}{" "}
        or its licensors. You may not copy or reuse them without our written permission, except as permitted by law.
      </p>

      <h2>Liability</h2>
      <p>
        We work to keep the information on this website accurate and up to date, but we cannot guarantee that it is
        complete or free of errors at all times. To the extent permitted by law, we are not liable for losses resulting
        from the use of this website.
      </p>

      <h2>Personal data and cookies</h2>
      <p>
        Read how we handle personal data in our <Link href={routes.privacy}>Privacy Policy</Link> and our use of cookies
        in our <Link href={routes.cookies}>Cookie Policy</Link>.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by Danish law.</p>
    </LegalPage>
  );
}
