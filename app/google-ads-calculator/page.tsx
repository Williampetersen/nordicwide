import { InvestmentWizard } from "@/components/calculator/wizard/InvestmentWizard";
import { PageHero } from "@/components/sections/PageHero";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "./calculator.module.css";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: "Google Ads Investment Calculator",
  description:
    "Estimate your Google Ads costs with and without the Nordic Wide investment plan: choose your currency and daily budget to see your yearly cost and what the plan covers.",
  path: routes.calculator,
});

export default function GoogleAdsCalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title="What the Investment Plan Means for Your Google Ads"
        lead="Choose your currency and daily Google Ads budget to see what you pay today and what the Nordic Wide investment plan covers."
        breadcrumbs={[{ label: "Google Ads Calculator", href: routes.calculator }]}
      />
      <section className={styles.section} aria-label="Google Ads investment calculator">
        <div className="container">
          <InvestmentWizard />
        </div>
      </section>
    </>
  );
}
