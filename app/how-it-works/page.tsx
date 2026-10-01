import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Principles } from "@/components/sections/Principles";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CTAButton } from "@/components/ui/Button";
import { faqItems } from "@/lib/content/faq";
import { principles } from "@/lib/content/growth";
import { processSteps } from "@/lib/content/process";
import { images } from "@/lib/images";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

const PROCESS_FAQ_IDS = new Set(["how-it-works", "investment-size", "getting-started", "guarantees"]);

export const metadata = createPageMetadata({
  title: "How It Works",
  description:
    "How Nordic Wide works: we understand your business, build the strategy, launch and optimize campaigns, and scale your growth system over time using performance data.",
  path: routes.howItWorks,
});

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="A Clear Path From Strategy to Sustainable Growth"
        lead="Every engagement follows the same four steps — so you always know what happens next, what it costs and how progress is measured."
        image={images.strategySession}
        breadcrumbs={[{ label: "How It Works", href: routes.howItWorks }]}
        actions={
          <CTAButton href={routes.contact} size="lg" withArrow block>
            Start a Conversation
          </CTAButton>
        }
      />
      <ProcessSteps
        steps={processSteps}
        title="Four Steps, One Long-Term System"
        subtitle="We start with your business — not with a channel or a package."
        showDetails
      />
      <Principles
        principles={principles}
        eyebrow="What to expect"
        title="How We Work With You"
        subtitle="The principles behind every Nordic Wide engagement."
        surface
      />
      <FAQSection
        items={faqItems.filter((item) => PROCESS_FAQ_IDS.has(item.id))}
        title="Common Questions About Getting Started"
        showAllLink
      />
      <FinalCTA />
    </>
  );
}
