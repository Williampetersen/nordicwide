import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqItems } from "@/lib/content/faq";
import { routes } from "@/lib/routes";
import { createPageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Nordic Wide: how it works, services, getting started, agreements, repayments and guarantees.",
  path: routes.faq,
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        lead="Clear answers about how Nordic Wide works, our agreements and what you can expect."
        breadcrumbs={[{ label: "FAQ", href: routes.faq }]}
      />
      <FAQSection items={faqItems} />
      <FinalCTA />
      <JsonLd data={faqJsonLd(faqItems)} />
    </>
  );
}
