import { AnalyticsSection } from "@/components/home/AnalyticsSection";
import { GrowthModel } from "@/components/home/GrowthModel";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/ui/Button";
import { whyNordicWide } from "@/lib/content/features";
import { images } from "@/lib/images";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Growth Strategy",
  description:
    "The Nordic Wide growth strategy: using capital strategically to build marketing infrastructure — campaigns, websites, tracking and automation — that supports long-term growth.",
  path: routes.growthStrategy,
});

export default function GrowthStrategyPage() {
  return (
    <>
      <PageHero
        eyebrow="Growth strategy"
        title="Marketing as Infrastructure, Not Just an Expense"
        lead="Nordic Wide uses capital strategically to build the campaigns, websites, tracking and automation your business needs — assets designed to keep supporting growth after each campaign ends."
        image={images.performanceMetrics}
        breadcrumbs={[{ label: "Growth Strategy", href: routes.growthStrategy }]}
        actions={
          <CTAButton href={routes.contact} size="lg" withArrow block>
            Get Your Growth Plan
          </CTAButton>
        }
      />
      <GrowthModel showCta={false} />
      <FeatureSection feature={{ ...whyNordicWide, secondaryCta: { label: "See how it works", href: routes.howItWorks } }} />
      <InvestmentSection />
      <AnalyticsSection />
      <FinalCTA />
    </>
  );
}
