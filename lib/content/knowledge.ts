import { routes } from "@/lib/routes";
import type { BlogPost, CaseStudy, Resource, Testimonial } from "@/types/content";

/*
 * Collections that will be filled from a CMS or database later.
 * They are intentionally empty: the site never shows invented articles,
 * case studies or testimonials. Pages render an empty state until real
 * content is added.
 */

export const blogPosts: BlogPost[] = [];

export const caseStudies: CaseStudy[] = [];

export const testimonials: Testimonial[] = [];

export const resources: Resource[] = [
  {
    title: "How the growth model works",
    description: "The four steps from understanding your business to scaling what works.",
    href: routes.howItWorks,
  },
  {
    title: "Growth strategy",
    description: "Why we treat marketing as infrastructure rather than a recurring expense.",
    href: routes.growthStrategy,
  },
  {
    title: "Digital marketing services",
    description: "Google Ads, Meta Ads, email marketing and website design explained.",
    href: routes.services,
  },
  {
    title: "Frequently asked questions",
    description: "Agreements, repayments, timelines and what to expect.",
    href: routes.faq,
  },
];
