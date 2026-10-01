import type { Metadata } from "next";

import { AnalyticsSection } from "@/components/home/AnalyticsSection";
import { GrowthModel } from "@/components/home/GrowthModel";
import { Hero } from "@/components/home/Hero";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { faqItems } from "@/lib/content/faq";
import { sustainableGrowth, whyNordicWide } from "@/lib/content/features";
import { processSteps } from "@/lib/content/process";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <GrowthModel />
      <ServiceGrid services={services} />
      <FeatureSection feature={whyNordicWide} />
      <FeatureSection feature={sustainableGrowth} reverse surface />
      <ProcessSteps steps={processSteps} />
      <AnalyticsSection />
      <InvestmentSection />
      <FAQSection items={faqItems} />
      <FinalCTA />
    </>
  );
}
