import { GrowthModel } from "@/components/home/GrowthModel";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { CTAButton } from "@/components/ui/Button";
import { services } from "@/lib/content/services";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Digital Marketing Services",
  description:
    "Google Ads, Meta Ads, email marketing and website design from Nordic Wide — planned together as one connected, long-term growth system.",
  path: routes.services,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital Marketing Services Built for Long-Term Growth"
        lead="Google Ads, Meta Ads, email marketing and website design — planned together as one connected growth system instead of isolated campaigns."
        breadcrumbs={[{ label: "Services", href: routes.services }]}
        actions={
          <CTAButton href={routes.contact} size="lg" withArrow block>
            Build Your Growth Plan
          </CTAButton>
        }
      />
      <ServiceGrid services={services} showHeading={false} />
      <GrowthModel />
      <FinalCTA />
    </>
  );
}
