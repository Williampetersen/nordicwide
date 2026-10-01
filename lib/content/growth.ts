import type { GrowthStage, Principle } from "@/types/content";

/** The four stages of the Nordic Wide growth model. */
export const growthStages: GrowthStage[] = [
  {
    id: "capital",
    title: "Strategic capital",
    description: "Capital is allocated to a defined growth plan instead of open-ended advertising spend.",
  },
  {
    id: "infrastructure",
    title: "Growth infrastructure",
    description: "Websites, tracking, automation and campaigns are built as lasting digital assets.",
  },
  {
    id: "acquisition",
    title: "Customer acquisition",
    description: "Paid and owned channels work together to reach, convert and follow up with customers.",
  },
  {
    id: "value",
    title: "Long-term value",
    description: "Performance data guides where to invest next, so growth does not depend on a single campaign.",
  },
];

export const investmentBullets: string[] = [
  "Build reusable digital assets",
  "Create stronger customer acquisition systems",
  "Reduce unnecessary dependence on individual campaigns",
  "Make decisions using measurable performance data",
];

export const principles: Principle[] = [
  {
    title: "Transparency",
    description: "Strategy, costs and performance are shared openly, in plain language.",
  },
  {
    title: "Long-term partnership",
    description: "We plan for years, not weeks — and build assets that keep their value.",
  },
  {
    title: "Data-driven decisions",
    description: "Investment follows measurable performance, not assumptions.",
  },
  {
    title: "Scandinavian simplicity",
    description: "Clear processes, clean design and no unnecessary complexity.",
  },
];

/** Areas the analytics setup covers — shown next to the dashboard visual. */
export const measurementAreas: string[] = [
  "Website traffic",
  "Leads & conversions",
  "Campaign performance",
  "Customer acquisition",
];
