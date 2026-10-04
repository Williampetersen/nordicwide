import type { MetadataRoute } from "next";

import { services } from "@/lib/content/services";
import { routes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

const staticEntries: Entry[] = [
  { path: routes.home, priority: 1, changeFrequency: "weekly" },
  { path: routes.services, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.howItWorks, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.growthStrategy, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.calculator, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.investors, priority: 0.7, changeFrequency: "weekly" },
  { path: routes.investmentPlan, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.about, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.faq, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.8, changeFrequency: "yearly" },
  { path: routes.resources, priority: 0.5, changeFrequency: "monthly" },
  { path: routes.blog, priority: 0.5, changeFrequency: "weekly" },
  { path: routes.caseStudies, priority: 0.5, changeFrequency: "monthly" },
  { path: routes.terms, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.privacy, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.cookies, priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries: Entry[] = services.map((service) => ({
    path: routes.service(service.slug),
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticEntries, ...serviceEntries].map((entry) => ({
    url: absoluteUrl(entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
