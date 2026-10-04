import { DAYS_PER_YEAR, INVESTMENT_SHARE } from "@/lib/investment/plan";

/** Scene clock, in seconds. One month of the plan = one second of the wait / coverage acts. */
export const TIMELINE = { investEnd: 3, waitEnd: 15, switchEnd: 16, total: 28 } as const;

export type PhaseId = "invest" | "wait" | "switch" | "covered";

export function phaseAt(sec: number): PhaseId {
  if (sec < TIMELINE.investEnd) return "invest";
  if (sec < TIMELINE.waitEnd) return "wait";
  if (sec < TIMELINE.switchEnd) return "switch";
  return "covered";
}

/** Index of the highlighted step card (0 invest, 1 wait, 2 Nordic Wide pays). */
export function stepAt(sec: number): 0 | 1 | 2 {
  const p = phaseAt(sec);
  return p === "invest" ? 0 : p === "wait" ? 1 : 2;
}

/** Plan month (0 to 24) shown at a scene second. */
export function monthAt(sec: number): number {
  if (sec < TIMELINE.investEnd) return 0;
  if (sec < TIMELINE.waitEnd) return sec - TIMELINE.investEnd;
  if (sec < TIMELINE.switchEnd) return 12;
  return 12 + (sec - TIMELINE.switchEnd);
}

/** Start second and end second of each step, for the step-card progress bars and jumps. */
export const STEP_RANGES: readonly [number, number][] = [
  [0, TIMELINE.investEnd],
  [TIMELINE.investEnd, TIMELINE.waitEnd],
  [TIMELINE.waitEnd, TIMELINE.total],
];

export interface Money {
  annual: number;
  investment: number;
  /** Google Ads the company has paid itself so far. */
  companyPaid: number;
  /** Google Ads Nordic Wide has paid directly to Google so far. */
  covered: number;
  /** Everything Google has received for the company's ads. */
  googleReceived: number;
  /** Total the company is out of pocket with the plan (investment + ads it paid). */
  withPlan: number;
  /** What the company would have paid by now without the plan. */
  withoutPlan: number;
  /** withoutPlan − withPlan (negative until the investment is recovered). */
  net: number;
}

export function moneyAt(sec: number, dailyBudget: number): Money {
  const month = monthAt(sec);
  const annual = dailyBudget * DAYS_PER_YEAR;
  const investment = Math.round(annual * INVESTMENT_SHARE);
  const perMonth = annual / 12;
  const invested = sec >= 1.9 ? investment : 0;
  const companyPaid = perMonth * Math.min(month, 12);
  const covered = perMonth * Math.max(0, month - 12);
  const withPlan = invested + companyPaid;
  const withoutPlan = perMonth * month;
  return {
    annual,
    investment,
    companyPaid,
    covered,
    googleReceived: companyPaid + covered,
    withPlan,
    withoutPlan,
    net: withoutPlan - withPlan,
  };
}

/* ---------- geometry ---------- */

export interface Pt {
  x: number;
  y: number;
}
export interface Curve {
  a: Pt;
  c: Pt;
  b: Pt;
}

export const pointAt = (p: Curve, t: number): Pt => ({
  x: (1 - t) ** 2 * p.a.x + 2 * (1 - t) * t * p.c.x + t * t * p.b.x,
  y: (1 - t) ** 2 * p.a.y + 2 * (1 - t) * t * p.c.y + t * t * p.b.y,
});

export const pathD = (p: Curve) => `M${p.a.x},${p.a.y} Q${p.c.x},${p.c.y} ${p.b.x},${p.b.y}`;

const line = (a: Pt, b: Pt): Curve => ({ a, b, c: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } });

export interface Layout {
  w: number;
  h: number;
  nodeW: number;
  nodeH: number;
  company: Pt;
  nordic: Pt;
  google: Pt;
  /** Company → Nordic Wide (the investment). */
  invest: Curve;
  /** Company → Google (the company paying its own ads). */
  ads: Curve;
  /** Nordic Wide → Google (Nordic Wide paying the ads). */
  cover: Curve;
  /** Where the "stopped" badge sits on the company → Google path. */
  badge: Pt;
}

export function makeLayout(tall: boolean): Layout {
  if (!tall) {
    const nodeW = 190;
    const nodeH = 130;
    const company = { x: 125, y: 150 };
    const nordic = { x: 450, y: 150 };
    const google = { x: 775, y: 150 };
    const ads: Curve = { a: { x: company.x, y: company.y + nodeH / 2 }, c: { x: 450, y: 470 }, b: { x: google.x, y: google.y + nodeH / 2 } };
    return {
      w: 900,
      h: 410,
      nodeW,
      nodeH,
      company,
      nordic,
      google,
      invest: line({ x: company.x + nodeW / 2, y: 150 }, { x: nordic.x - nodeW / 2, y: 150 }),
      cover: line({ x: nordic.x + nodeW / 2, y: 150 }, { x: google.x - nodeW / 2, y: 150 }),
      ads,
      badge: pointAt(ads, 0.5),
    };
  }
  const nodeW = 250;
  const nodeH = 120;
  const company = { x: 170, y: 80 };
  const nordic = { x: 170, y: 360 };
  const google = { x: 170, y: 640 };
  const ads: Curve = { a: { x: company.x + nodeW / 2, y: company.y }, c: { x: 445, y: 360 }, b: { x: google.x + nodeW / 2, y: google.y } };
  return {
    w: 440,
    h: 720,
    nodeW,
    nodeH,
    company,
    nordic,
    google,
    invest: line({ x: 170, y: company.y + nodeH / 2 }, { x: 170, y: nordic.y - nodeH / 2 }),
    cover: line({ x: 170, y: nordic.y + nodeH / 2 }, { x: 170, y: google.y - nodeH / 2 }),
    ads,
    badge: pointAt(ads, 0.5),
  };
}

/* ---------- coins ---------- */

export type CoinKind = "invest" | "ads" | "cover";
export interface Coin {
  key: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  kind: CoinKind;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t);

/** Every coin that is on screen at a scene second. */
export function coinsAt(sec: number, layout: Layout): Coin[] {
  const coins: Coin[] = [];

  // Act 1: a burst of coins from the company into Nordic Wide.
  for (let i = 0; i < 9; i++) {
    const p = (sec - 0.15 - i * 0.24) / 0.95;
    if (p > 0 && p < 1) {
      const pt = pointAt(layout.invest, ease(p));
      coins.push({ key: `i${i}`, ...pt, opacity: Math.min(1, p * 6, (1 - p) * 6), scale: 1.15, kind: "invest" });
    }
  }

  // Act 2: the company keeps paying Google itself.
  const gateAds = clamp01((sec - 3) / 0.6) * clamp01((15.9 - sec) / 0.9);
  if (gateAds > 0) {
    for (let i = 0; i < 10; i++) {
      const p = (sec / 3.2 + i / 10) % 1;
      const pt = pointAt(layout.ads, p);
      coins.push({ key: `a${i}`, ...pt, opacity: gateAds * Math.min(1, p * 8, (1 - p) * 8), scale: 1, kind: "ads" });
    }
  }

  // Act 3: Nordic Wide pays Google instead.
  const gateCover = clamp01((sec - 16) / 0.6);
  if (gateCover > 0) {
    for (let i = 0; i < 5; i++) {
      const p = (sec / 2.2 + i / 5) % 1;
      const pt = pointAt(layout.cover, p);
      coins.push({ key: `c${i}`, ...pt, opacity: gateCover * Math.min(1, p * 8, (1 - p) * 8), scale: 1.1, kind: "cover" });
    }
  }
  return coins;
}

/** 0 → 1 pulse used for the "switch" moment at month 12. */
export function switchPulse(sec: number): number {
  return clamp01((sec - 15) / 1.4) * clamp01((17.6 - sec) / 1.4);
}
