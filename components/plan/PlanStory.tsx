"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

import { cx } from "@/lib/cx";
import { sanitizeBudget } from "@/lib/investment/calculator";
import { formatMoney } from "@/lib/investment/format";
import { WAITING_MONTHS } from "@/lib/investment/plan";

import {
  STEP_RANGES,
  TIMELINE,
  coinsAt,
  makeLayout,
  monthAt,
  moneyAt,
  pathD,
  phaseAt,
  stepAt,
  switchPulse,
  type Layout,
  type PhaseId,
} from "./scene";
import styles from "./PlanStory.module.css";

const dkk = (v: number) => formatMoney(v, "DKK");
const signed = (v: number) => `${v > 0.5 ? "+" : ""}${dkk(v)}`;
const BUDGETS = [100, 150, 200, 250] as const;
const SPEEDS = [1, 2, 4] as const;

type NodeId = "company" | "nordic" | "google";

function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function NodeIcon({ id }: { id: NodeId }) {
  if (id === "company") {
    return (
      <g className={styles.icon}>
        <rect x={-13} y={-14} width={26} height={28} rx={3} />
        <g className={styles.iconCut}>
          <rect x={-7} y={-8} width={5} height={5} />
          <rect x={2} y={-8} width={5} height={5} />
          <rect x={-7} y={1} width={5} height={5} />
          <rect x={2} y={1} width={5} height={5} />
        </g>
      </g>
    );
  }
  if (id === "nordic") {
    return (
      <g className={styles.icon}>
        <rect x={-15} y={-15} width={30} height={30} rx={8} />
        <text className={styles.iconLetter} y={7} textAnchor="middle">
          N
        </text>
      </g>
    );
  }
  return (
    <g className={styles.icon}>
      <rect x={-16} y={-13} width={32} height={26} rx={6} />
      <g className={styles.iconCut}>
        <rect x={-9} y={0} width={5} height={8} />
        <rect x={-2} y={-5} width={5} height={13} />
        <rect x={5} y={-10} width={5} height={18} />
      </g>
    </g>
  );
}

interface NodeProps {
  id: NodeId;
  layout: Layout;
  title: string;
  status: string;
  active: boolean;
  onHover: (id: NodeId | null) => void;
}

function SceneNode({ id, layout, title, status, active, onHover }: NodeProps) {
  const pos = layout[id];
  const { nodeW: w, nodeH: h } = layout;
  return (
    <g
      className={cx(styles.node, active && styles.nodeActive, id === "nordic" && styles.nodeBrand)}
      transform={`translate(${pos.x},${pos.y})`}
      tabIndex={0}
      role="group"
      aria-label={`${title}. ${status}`}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
    >
      <rect className={styles.ring} x={-w / 2} y={-h / 2} width={w} height={h} rx={24} />
      <g className={styles.nodeInner}>
        <rect className={styles.nodeBox} x={-w / 2} y={-h / 2} width={w} height={h} rx={22} />
        <g transform={`translate(0,${-h / 2 + 34})`}>
          <circle className={styles.iconBg} r={25} />
          <NodeIcon id={id} />
        </g>
        <text className={styles.nodeTitle} y={h / 2 - 38} textAnchor="middle">
          {title}
        </text>
        <text className={styles.nodeStatus} y={h / 2 - 16} textAnchor="middle">
          {status}
        </text>
      </g>
    </g>
  );
}

const PHASE_TEXT: Record<PhaseId, (m: ReturnType<typeof moneyAt>, daily: number) => { title: string; text: string }> = {
  invest: (m) => ({
    title: "Step 1 · Invest once",
    text: `The company invests ${dkk(m.investment)} one time, which is 50% of its yearly Google Ads cost of ${dkk(m.annual)}. The money goes to Nordic Wide.`,
  }),
  wait: (m, d) => ({
    title: `Step 2 · Wait ${WAITING_MONTHS} months`,
    text: `The ${WAITING_MONTHS} months are counted from the date the agreement and investment begin. Nothing changes day to day: the company keeps paying Google Ads itself (${dkk(d)} per day).`,
  }),
  switch: () => ({
    title: "Month 12 · The switch",
    text: "The waiting period is over. The company's own payments to Google stop here.",
  }),
  covered: (_m, d) => ({
    title: "Step 3 · Nordic Wide pays Google",
    text: `From month ${WAITING_MONTHS + 1} the company no longer pays Google Ads. Nordic Wide pays Google directly, up to the fixed daily budget of ${dkk(d)} per day.`,
  }),
};

const NODE_TEXT: Record<NodeId, (daily: number) => { title: string; text: string }> = {
  company: () => ({
    title: "The company",
    text: "Invests once, pays Google Ads as normal for 12 months, then stops paying for its Google Ads.",
  }),
  nordic: (d) => ({
    title: "Nordic Wide",
    text: `Receives the one-time investment. After 12 months it pays Google for the company's ads, up to ${dkk(d)} per day, fixed for the whole period.`,
  }),
  google: () => ({
    title: "Google Ads",
    text: "Keeps receiving the same ad budget. What changes is who pays: first the company, then Nordic Wide.",
  }),
};

interface PlanStoryProps {
  /** Start the scene frozen at this second (0 to 28) instead of auto-playing. */
  startAt?: number;
}

export function PlanStory({ startAt }: PlanStoryProps = {}) {
  const [sec, setSec] = useState(startAt ?? 0);
  const [userPlay, setUserPlay] = useState<boolean | null>(startAt === undefined ? null : false);
  const [speed, setSpeed] = useState<number>(1);
  const [daily, setDaily] = useState<number>(200);
  const [customOpen, setCustomOpen] = useState(false);
  const [hover, setHover] = useState<NodeId | null>(null);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const playing = userPlay ?? !reduced;
  const running = playing && visible;

  // Only animate while the stage is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Real-time clock.
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      setSec((s) => (s + dt * speed) % TIMELINE.total);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed]);

  const layouts = useMemo(() => ({ wide: makeLayout(false), tall: makeLayout(true) }), []);
  const phase = phaseAt(sec);
  const step = stepAt(sec);
  const month = monthAt(sec);
  const money = moneyAt(sec, daily);
  const pulse = switchPulse(sec);
  const stopped = phase === "switch" || phase === "covered";
  const recovered = sec > TIMELINE.waitEnd && money.net >= 0;
  const recoveredShare = Math.min(1, money.covered / money.investment);

  const info = hover ? NODE_TEXT[hover](daily) : PHASE_TEXT[phase](money, daily);
  const activeNodes: Record<NodeId, boolean> = {
    company: phase === "invest" || phase === "wait",
    nordic: phase === "invest" || phase === "switch" || phase === "covered",
    google: phase === "wait" || phase === "covered",
  };

  const status = {
    company: phase === "invest" ? `Invests ${dkk(money.investment)}` : phase === "wait" ? "Pays Google Ads" : "Pays nothing for ads",
    nordic: sec < 1.9 ? "Waiting for the investment" : phase === "covered" ? `Paid Google ${dkk(money.covered)}` : `Holds ${dkk(money.investment)}`,
    google: `Received ${dkk(money.googleReceived)}`,
  };

  const jump = (s: number) => {
    setSec(s);
    setUserPlay(true);
  };

  const withWidth = Math.min(100, (money.withPlan / (money.annual * 2)) * 100);
  const withoutWidth = Math.min(100, (money.withoutPlan / (money.annual * 2)) * 100);
  const monthLabel = month === 0 ? (sec < TIMELINE.investEnd ? "Day 1" : "Month 0") : `Month ${Math.floor(month + 0.0001)}`;

  const renderSvg = (k: "wide" | "tall") => {
    const layout = layouts[k];
    const coins = coinsAt(sec, layout);
    return (
        <svg key={k} className={cx(styles.svg, k === "wide" ? styles.wideOnly : styles.tallOnly)} viewBox={`0 0 ${layout.w} ${layout.h}`} role="img" aria-label="Diagram: the company invests in Nordic Wide, waits 12 months, then Nordic Wide pays Google Ads">
        <defs>
          <radialGradient id={`coin-invest-${k}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#a9a8ff" />
            <stop offset="100%" stopColor="#4b48ff" />
          </radialGradient>
          <radialGradient id={`coin-ads-${k}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#ffd98a" />
            <stop offset="100%" stopColor="#e8890c" />
          </radialGradient>
          <radialGradient id={`coin-cover-${k}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#8af0c1" />
            <stop offset="100%" stopColor="#12a566" />
          </radialGradient>
          <filter id={`glow-${k}`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={pathD(layout.invest)} className={cx(styles.link, phase === "invest" && styles.linkInvest)} />
        <path d={pathD(layout.ads)} className={cx(styles.link, phase === "wait" && styles.linkAds, stopped && styles.linkStopped)} />
        <path d={pathD(layout.cover)} className={cx(styles.link, phase === "covered" && styles.linkCover)} />

        {stopped && (
          <g transform={`translate(${layout.badge.x},${layout.badge.y})`}>
            <g className={styles.badge}>
              <rect x={k === "tall" ? -52 : -84} y={-16} width={k === "tall" ? 104 : 168} height={32} rx={16} />
              <text textAnchor="middle" y={5}>
                {k === "tall" ? "✕ Stopped" : "✕ Company stops paying"}
              </text>
            </g>
          </g>
        )}

        {pulse > 0 && (
          <circle
            cx={layout.nordic.x}
            cy={layout.nordic.y}
            r={60 + (1 - pulse) * 120}
            className={styles.shock}
            style={{ opacity: pulse * 0.7 }}
          />
        )}

        <SceneNode id="company" layout={layout} title="The company" status={status.company} active={activeNodes.company} onHover={setHover} />
        <SceneNode id="nordic" layout={layout} title="Nordic Wide" status={status.nordic} active={activeNodes.nordic} onHover={setHover} />
        <SceneNode id="google" layout={layout} title="Google Ads" status={status.google} active={activeNodes.google} onHover={setHover} />

        {coins.map((c) => (
          <g key={c.key} transform={`translate(${c.x},${c.y}) scale(${c.scale})`} opacity={c.opacity} filter={`url(#glow-${k})`}>
            <circle r={10} fill={`url(#coin-${c.kind}-${k})`} />
            <text className={styles.coinText} textAnchor="middle" y={3.5}>
              kr
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <section ref={rootRef} className={styles.story} aria-label="Animated explanation of the investment plan">
      <div className={styles.bar}>
        <div className={styles.budget} role="group" aria-label="Daily Google Ads budget">
          <span className={styles.barLabel}>Daily Google Ads budget</span>
          <div className={styles.chips}>
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                className={cx(styles.chip, daily === b && !customOpen && styles.chipOn)}
                aria-pressed={daily === b && !customOpen}
                onClick={() => {
                  setDaily(b);
                  setCustomOpen(false);
                }}
              >
                {b} DKK
              </button>
            ))}
            <button type="button" className={cx(styles.chip, customOpen && styles.chipOn)} aria-pressed={customOpen} onClick={() => setCustomOpen((o) => !o)}>
              Custom
            </button>
            {customOpen && (
              <label className={styles.custom}>
                <span className={styles.srOnly}>Custom daily budget in DKK</span>
                <input
                  inputMode="numeric"
                  value={daily || ""}
                  placeholder="DKK / day"
                  onChange={(e) => setDaily(sanitizeBudget(e.target.value.replace(/\D/g, "").slice(0, 6)))}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.clock} style={{ "--p": month / 24 } as CSSProperties} aria-hidden="true">
          <div className={styles.clockInner}>
            <strong>{monthLabel}</strong>
            <span>of 24</span>
          </div>
        </div>

        {(["wide", "tall"] as const).map((k) => renderSvg(k))}

        <div className={styles.legend} aria-hidden="true">
          <span>
            <i className={styles.dotInvest} /> Investment
          </span>
          <span>
            <i className={styles.dotAds} /> Company pays Google
          </span>
          <span>
            <i className={styles.dotCover} /> Nordic Wide pays Google
          </span>
        </div>
      </div>

      <div className={styles.info} key={hover ?? phase}>
        <h3>{info.title}</h3>
        <p>{info.text}</p>
      </div>
      <p className={styles.srOnly} role="status">
        {PHASE_TEXT[phase](money, daily).title}
      </p>

      <div className={styles.controls}>
        <button type="button" className={styles.play} onClick={() => setUserPlay(!playing)} aria-label={playing ? "Pause animation" : "Play animation"}>
          {playing ? "❚❚ Pause" : "▶ Play"}
        </button>
        <button type="button" className={styles.ghost} onClick={() => jump(0)}>
          ↺ Restart
        </button>
        <div className={styles.speeds} role="group" aria-label="Speed">
          {SPEEDS.map((s) => (
            <button key={s} type="button" className={cx(styles.speed, speed === s && styles.speedOn)} aria-pressed={speed === s} onClick={() => setSpeed(s)}>
              {s}×
            </button>
          ))}
        </div>
        <div className={styles.scrub}>
          <input
            type="range"
            min={0}
            max={TIMELINE.total}
            step={0.01}
            value={sec}
            aria-label="Timeline"
            aria-valuetext={`${monthLabel} of 24`}
            style={{ "--v": `${(sec / TIMELINE.total) * 100}%` } as CSSProperties}
            onChange={(e) => {
              setUserPlay(false);
              setSec(Number(e.target.value));
            }}
          />
          <div className={styles.marks} aria-hidden="true">
            <span style={{ left: "0%" }}>Day 1</span>
            <span style={{ left: `${(TIMELINE.waitEnd / TIMELINE.total) * 100}%` }}>Month 12</span>
            <span style={{ left: "100%" }}>Month 24</span>
          </div>
        </div>
      </div>

      <ol className={styles.steps}>
        {[
          { t: "Invest once", d: "50% of the yearly Google Ads cost goes to Nordic Wide, one time." },
          { t: "Wait 12 months", d: "The company pays Google Ads as normal while the 12 months run." },
          { t: "Nordic Wide pays Google", d: "The company stops paying. Nordic Wide pays Google directly, every year." },
        ].map((s, i) => {
          const [a, b] = STEP_RANGES[i];
          const pr = Math.min(1, Math.max(0, (sec - a) / (b - a)));
          return (
            <li key={s.t}>
              <button type="button" className={cx(styles.stepCard, step === i && styles.stepOn, step > i && styles.stepDone)} onClick={() => jump(a)} aria-current={step === i ? "step" : undefined}>
                <span className={styles.stepNum}>{step > i ? "✓" : i + 1}</span>
                <strong>{s.t}</strong>
                <span>{s.d}</span>
                <span className={styles.stepBar}>
                  <i style={{ width: `${(step > i ? 1 : step === i ? pr : 0) * 100}%` }} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className={styles.live}>
        <div className={cx(styles.kpi, styles.kpiAds)}>
          <span>The company has paid Google</span>
          <strong>{dkk(money.companyPaid)}</strong>
          <small>{stopped ? "Stopped at month 12" : "Still paying as normal"}</small>
        </div>
        <div className={cx(styles.kpi, styles.kpiCover)}>
          <span>Nordic Wide has paid Google</span>
          <strong>{dkk(money.covered)}</strong>
          <small>{money.covered > 0 ? `${dkk(daily)} per day` : "Starts after month 12"}</small>
        </div>
        <div className={cx(styles.kpi, money.net >= 0 && sec > TIMELINE.waitEnd ? styles.kpiCover : styles.kpiNeutral)}>
          <span>Net result vs. no plan</span>
          <strong>{signed(sec < 1.9 ? 0 : money.net)}</strong>
          <small>{recovered ? "Investment recovered" : "After the investment"}</small>
        </div>
        <div className={styles.kpi}>
          <span>Investment recovered</span>
          <strong>{Math.round(recoveredShare * 100)}%</strong>
          <span className={styles.meter}>
            <i style={{ width: `${recoveredShare * 100}%` }} />
          </span>
        </div>
      </div>

      <div className={styles.compare}>
        <h3>What the company has paid so far</h3>
        <div className={styles.row}>
          <span>Without the plan</span>
          <div className={styles.track}>
            <i className={styles.fillWithout} style={{ width: `${withoutWidth}%` }} />
          </div>
          <strong>{dkk(money.withoutPlan)}</strong>
        </div>
        <div className={styles.row}>
          <span>With the plan</span>
          <div className={styles.track}>
            <i className={styles.fillWith} style={{ width: `${withWidth}%` }} />
          </div>
          <strong>{dkk(money.withPlan)}</strong>
        </div>
        {recovered && (
          <p key="recovered" className={styles.recovered}>
            ✓ Investment recovered. From here the company is ahead of paying for Google Ads itself.
          </p>
        )}
      </div>
    </section>
  );
}
