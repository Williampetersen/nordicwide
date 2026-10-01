import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";
import { socialImage } from "@/lib/social";
import type { FAQItem, Link, Service } from "@/types/content";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

const { width, height, alt } = socialImage;

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter tags.
 * A page-level `openGraph`/`twitter` object replaces the inherited one, so the
 * shared social images (app/opengraph-image.tsx, app/twitter-image.tsx) are
 * referenced explicitly here.
 */
export function createPageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: socialTitle,
      description,
      images: [{ url: socialImage.openGraphPath, width, height, alt, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: socialImage.twitterPath, width, height, alt }],
    },
  };
}

const organizationId = `${siteConfig.url}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo-512.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone.e164,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: siteConfig.phone.e164,
      email: siteConfig.email,
      availableLanguage: ["Danish", "English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbJsonLd(trail: Link[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceJsonLd(service: Service, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(path),
    provider: { "@id": organizationId },
  };
}
