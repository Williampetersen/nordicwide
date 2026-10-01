import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { RelatedServices } from "@/components/services/RelatedServices";
import { ServiceIncluded } from "@/components/services/ServiceIncluded";
import { ArrowLink, CTAButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { getService, services } from "@/lib/content/services";
import { routes } from "@/lib/routes";
import { createPageMetadata, serviceJsonLd } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Only the services defined in lib/content/services.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: routes.service(service.slug),
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = routes.service(service.slug);
  const related = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        lead={service.summary}
        image={service.image}
        breadcrumbs={[
          { label: "Services", href: routes.services },
          { label: service.title, href: path },
        ]}
        actions={
          <>
            <CTAButton href={routes.contact} size="lg" withArrow block>
              Discuss {service.title}
            </CTAButton>
            <ArrowLink href={routes.howItWorks}>How we work</ArrowLink>
          </>
        }
      />
      <ServiceIncluded service={service} />
      <RelatedServices services={related} />
      <FinalCTA />
      <JsonLd data={serviceJsonLd(service, path)} />
    </>
  );
}
