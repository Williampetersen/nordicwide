import type { SiteImage } from "@/types/content";

import analyticsDashboard from "@/public/images/analytics-dashboard.jpg";
import emailMarketingInbox from "@/public/images/email-marketing-inbox.jpg";
import googleAdsDashboard from "@/public/images/google-ads-dashboard.jpg";
import heroStrategyOffice from "@/public/images/hero-strategy-office.jpg";
import metaAdsSocial from "@/public/images/meta-ads-social.jpg";
import nordicOffice from "@/public/images/nordic-office.jpg";
import performanceMetrics from "@/public/images/performance-metrics.jpg";
import strategySession from "@/public/images/strategy-session.jpg";
import teamCollaboration from "@/public/images/team-collaboration.jpg";
import teamGrowthReview from "@/public/images/team-growth-review.jpg";
import websiteDesignLanding from "@/public/images/website-design-landing.jpg";

/**
 * Central image registry. Statically imported so Next.js knows the intrinsic
 * size (no layout shift) and can generate blur placeholders automatically.
 */
export const images = {
  hero: {
    src: heroStrategyOffice,
    alt: "Two colleagues working on digital marketing data at their desks in a bright, modern office",
  },
  googleAds: {
    src: googleAdsDashboard,
    alt: "Laptop showing an advertising performance dashboard with charts",
  },
  metaAds: {
    src: metaAdsSocial,
    alt: "Smartphone screen with a folder of social media apps",
  },
  emailMarketing: {
    src: emailMarketingInbox,
    alt: "Laptop screen showing an email inbox",
  },
  websiteDesign: {
    src: websiteDesignLanding,
    alt: "Desktop monitor and devices showing landing page designs",
  },
  analyticsDashboard: {
    src: analyticsDashboard,
    alt: "Marketing analytics dashboard with traffic and conversion charts on a large monitor",
  },
  teamGrowthReview: {
    src: teamGrowthReview,
    alt: "Team reviewing growth charts on a large screen during a meeting in a modern office",
  },
  strategySession: {
    src: strategySession,
    alt: "Team planning a marketing strategy with notes on a glass wall",
  },
  nordicOffice: {
    src: nordicOffice,
    alt: "Bright, minimal office with large windows and a meeting table",
  },
  performanceMetrics: {
    src: performanceMetrics,
    alt: "Close-up of a performance dashboard showing campaign metrics",
  },
  teamCollaboration: {
    src: teamCollaboration,
    alt: "Colleagues collaborating around a table in a bright office",
  },
} satisfies Record<string, SiteImage>;
