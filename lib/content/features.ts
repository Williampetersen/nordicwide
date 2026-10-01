import { images } from "@/lib/images";
import { routes } from "@/lib/routes";
import type { Feature } from "@/types/content";

export const whyNordicWide: Feature = {
  id: "why-nordic-wide",
  eyebrow: "Why Nordic Wide",
  heading: "Why Choose Nordic Wide?",
  bullets: [
    "Turn your capital into a long-term advertising engine",
    "Reduce ongoing Google & Meta advertising dependency over time",
    "Invest strategically and scale your marketing sustainably",
  ],
  paragraph:
    "With Nordic Wide, your capital is used strategically to build a stronger digital growth foundation. Instead of relying entirely on continuous advertising spend, we focus on creating marketing systems, campaigns and digital assets designed to support long-term growth.",
  primaryCta: { label: "Get Your Growth Plan", href: routes.contact },
  secondaryCta: { label: "Learn More About the Strategy", href: routes.growthStrategy },
  image: images.analyticsDashboard,
};

export const aboutApproach: Feature = {
  id: "about-approach",
  eyebrow: "How we work",
  heading: "One Partner for the Whole Growth System",
  bullets: [
    "Strategy, advertising, websites and analytics in one plan",
    "Clear agreements and transparent reporting",
    "Decisions based on measurable performance data",
  ],
  paragraph:
    "Many businesses work with separate suppliers for advertising, websites and email — and end up with disconnected data and unclear responsibility. Nordic Wide brings these pieces together, so every channel supports the same long-term plan.",
  primaryCta: { label: "Start a conversation", href: routes.contact },
  secondaryCta: { label: "See our services", href: routes.services },
  image: images.teamCollaboration,
};

export const sustainableGrowth: Feature = {
  id: "sustainable-growth",
  eyebrow: "Sustainable growth",
  heading: "Built for Sustainable Business Growth",
  bullets: [
    "Full transparency on strategy, costs and performance",
    "A long-term approach to digital customer acquisition",
    "A dedicated focus on building scalable marketing infrastructure",
  ],
  paragraph:
    "Nordic Wide focuses on more than individual campaigns. We build a connected digital growth system across advertising, websites, analytics and customer communication so your business can develop a stronger and more sustainable marketing foundation.",
  primaryCta: { label: "Start Your Growth Plan", href: routes.contact },
  secondaryCta: { label: "Learn How Our Growth Model Works", href: routes.howItWorks },
  image: images.teamGrowthReview,
};
