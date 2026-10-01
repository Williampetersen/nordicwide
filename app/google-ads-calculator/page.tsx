import { CalculatorScript } from "@/components/calculator/CalculatorScript";
import { PageHero } from "@/components/sections/PageHero";
import { calculatorSnippetPath, loadCalculatorEmbed } from "@/lib/calculator";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "./calculator.module.css";

export const dynamic = "force-static";

export const metadata = createPageMetadata({
  title: "Google Ads Investment Calculator",
  description:
    "Estimate your Google Ads costs with and without the Nordic Wide investment plan: choose your currency, daily budget, manager fee and period to see a year-by-year comparison.",
  path: routes.calculator,
});

export default function GoogleAdsCalculatorPage() {
  const { css, markup, script } = loadCalculatorEmbed();

  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title="What the Investment Plan Means for Your Google Ads"
        lead="Answer six short questions to see your estimated advertising costs with and without the Nordic Wide investment plan, year by year."
        breadcrumbs={[{ label: "Google Ads Calculator", href: routes.calculator }]}
      />
      <section className={styles.section} aria-label="Google Ads investment calculator">
        <div className="container">
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div className={styles.host} dangerouslySetInnerHTML={{ __html: markup }} />
          <CalculatorScript code={script} />
          <p className={styles.embedNote}>
            Using WordPress? The same calculator is available as a{" "}
            <a href={calculatorSnippetPath}>ready-to-paste HTML snippet</a>.
          </p>
        </div>
      </section>
    </>
  );
}
