/**
 * Illustrative demo data for the analytics dashboard visual.
 * These numbers are NOT client results — the UI labels them as demo data.
 * Values are internally consistent: weekly leads sum to the lead total,
 * channel leads sum to the same total, and conversion = leads / sessions.
 */

export interface DemoMetric {
  label: string;
  value: string;
}

export interface WeeklyPoint {
  week: number;
  leads: number;
}

export interface ChannelValue {
  channel: string;
  leads: number;
}

export const demoPeriodLabel = "Last 12 weeks";

export const weeklyLeads: WeeklyPoint[] = [22, 25, 24, 28, 27, 31, 30, 34, 36, 35, 39, 41].map(
  (leads, index) => ({ week: index + 1, leads }),
);

export const channelLeads: ChannelValue[] = [
  { channel: "Google Ads", leads: 158 },
  { channel: "Meta Ads", leads: 96 },
  { channel: "Organic search", leads: 64 },
  { channel: "Email", leads: 54 },
];

const totalLeads = weeklyLeads.reduce((sum, point) => sum + point.leads, 0);
const sessions = 16_900;
const newCustomers = 46;

export const demoMetrics: DemoMetric[] = [
  { label: "Website sessions", value: `${(sessions / 1000).toFixed(1)}K` },
  { label: "Qualified leads", value: totalLeads.toLocaleString("en-US") },
  { label: "Conversion rate", value: `${((totalLeads / sessions) * 100).toFixed(1)}%` },
  { label: "New customers", value: newCustomers.toString() },
];
