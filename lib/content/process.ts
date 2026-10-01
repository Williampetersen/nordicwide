import type { ProcessStep } from "@/types/content";

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    title: "Understand Your Business",
    description:
      "We begin by understanding your business, market, customers and current acquisition channels.",
    details: [
      "Your goals, margins and capacity",
      "Current channels, spend and tracking",
      "Customers, competitors and market",
    ],
  },
  {
    id: "strategy",
    title: "Build the Strategy",
    description:
      "We identify the digital channels and infrastructure required to support your long-term growth.",
    details: [
      "Channel mix and priorities",
      "Website and tracking requirements",
      "Scope, timeline and agreement",
    ],
  },
  {
    id: "launch",
    title: "Launch & Optimize",
    description:
      "Campaigns, tracking, landing pages and customer journeys are launched and continuously improved.",
    details: [
      "Campaign and landing page launch",
      "Conversion tracking verified",
      "Regular optimization and reporting",
    ],
  },
  {
    id: "scale",
    title: "Scale Over Time",
    description:
      "As the system develops, we use performance data to identify opportunities for sustainable growth.",
    details: [
      "Performance reviews with clear data",
      "Investment in what works",
      "New channels when the foundation is ready",
    ],
  },
];
