import type { StaticImageData } from "next/image";

/**
 * Content models for the site. Everything rendered from `lib/content` follows
 * these shapes so the data source can later move to a CMS or database without
 * touching the components.
 */

export interface Link {
  label: string;
  href: string;
}

export type NavItem = Link;

export type CTA = Link;

export interface SiteImage {
  src: StaticImageData;
  alt: string;
}

export interface FooterColumn {
  title: string;
  links: Link[];
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short description shown on cards. */
  summary: string;
  /** Checklist shown on cards. */
  highlights: string[];
  image: SiteImage;
  /** Used for the detail page meta description. */
  metaDescription: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  included: ServiceFeature[];
  approach: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface Feature {
  id: string;
  eyebrow?: string;
  heading: string;
  bullets: string[];
  paragraph: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  image: SiteImage;
}

export interface GrowthStage {
  id: string;
  title: string;
  description: string;
}

export interface Principle {
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  services: Service["slug"][];
  publishedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface Resource {
  title: string;
  description: string;
  href: string;
}
