/** Every internal path in one place, so links never drift out of sync. */
export const routes = {
  home: "/",
  howItWorks: "/how-it-works",
  services: "/services",
  service: (slug: string) => `/services/${slug}`,
  growthStrategy: "/growth-strategy",
  calculator: "/google-ads-calculator",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  blog: "/blog",
  resources: "/resources",
  caseStudies: "/case-studies",
  terms: "/terms",
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
} as const;
