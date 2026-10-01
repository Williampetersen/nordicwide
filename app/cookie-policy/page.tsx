import Link from "next/link";

import { LegalPage } from "@/components/sections/LegalPage";
import { legalLastUpdated } from "@/lib/content/legal";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Information about cookies and similar technologies on nordicwide.com.",
  path: routes.cookies,
});

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lead="Which cookies and similar technologies this website uses — and which it does not."
      path={routes.cookies}
      lastUpdated={legalLastUpdated}
    >
      <h2>What cookies are</h2>
      <p>
        Cookies are small text files stored in your browser. Similar technologies, such as local storage, work in a
        comparable way. They can be used to make a website work, to remember preferences, or to measure and target
        advertising.
      </p>

      <h2>Cookies on this website</h2>
      <p>
        This website does <strong>not</strong> currently use analytics, advertising or tracking cookies, and it does not
        load third-party tracking scripts. Fonts are served from our own domain, so no data is sent to font providers
        when you visit.
      </p>
      <p>
        Our hosting provider may use strictly necessary technical mechanisms to deliver the website securely. These do
        not require consent.
      </p>

      <h2>If this changes</h2>
      <p>
        If we introduce analytics or marketing cookies in the future, we will update this policy and ask for your consent
        before any non-essential cookies are set.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can delete or block cookies at any time in your browser settings. Blocking strictly necessary mechanisms may
        affect how the website works.
      </p>

      <h2>Questions</h2>
      <p>
        Contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. See also our{" "}
        <Link href={routes.privacy}>Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
