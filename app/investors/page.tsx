import { InvestorDashboard } from "@/components/investors/InvestorDashboard";
import { PageHero } from "@/components/sections/PageHero";
import { PORTFOLIO, companyStatus, summarize } from "@/lib/investors/portfolio";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "./investors.module.css";

/** Re-generated daily so "months in the plan" and "covered to date" stay current. */
export const revalidate = 86_400;

export const metadata = createPageMetadata({
  title: "Investor Dashboard",
  description:
    "See how the Nordic Wide investment plan works in practice: Courier Copenhagen, Washmax and Eluxus, with investment, waiting period and Google Ads covered to date.",
  path: routes.investors,
});

export default function InvestorsPage() {
  const asOf = new Date();
  const statuses = PORTFOLIO.map((company) => companyStatus(company, asOf));
  const summary = summarize(statuses);

  return (
    <>
      <PageHero
        eyebrow="Investors"
        title="Investor Dashboard"
        lead="Three Danish companies already in the Nordic Wide investment plan: what each invested, where they are in the 12-month waiting period, and how much Google Ads is already covered."
        breadcrumbs={[{ label: "Investors", href: routes.investors }]}
      />
      <section className={styles.section} aria-label="Investor dashboard">
        <div className="container">
          <InvestorDashboard statuses={statuses} summary={summary} asOf={asOf} />
        </div>
      </section>
    </>
  );
}
