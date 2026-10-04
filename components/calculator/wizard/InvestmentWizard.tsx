"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculateInvestmentPlan, sanitizeBudget, sanitizeGrowth, sanitizeYears } from "@/lib/investment/calculator";
import { CURRENCIES, type CurrencyCode } from "@/lib/investment/currencies";
import { DEFAULT_GROWTH, SAVINGS_YEARS } from "@/lib/investment/plan";
import { routes } from "@/lib/routes";
import { BudgetStep, type BudgetChoice } from "./BudgetStep";
import { CurrencyStep } from "./CurrencyStep";
import { FaqSection } from "./FaqSection";
import { GrowthStep } from "./GrowthStep";
import { HorizonStep } from "./HorizonStep";
import { ProgressBar } from "./ProgressBar";
import { RefundSummary } from "./RefundSummary";
import { ResultSummary } from "./ResultSummary";
import { ReviewStep } from "./ReviewStep";
import { ShareBar } from "./ShareBar";
import { cn } from "./cn";

const LABELS = ["Currency", "Budget", "Period", "Outlook", "Review"] as const;
const TOTAL_STEPS = LABELS.length;
const REVIEW_STEP = TOTAL_STEPS - 1;

const TITLES = [
  "Choose your currency",
  "What is your daily Google Ads budget?",
  "Over how many years do you want to compare?",
  "How will your ad cost develop without the plan?",
  "Review before you see the result",
];

export function InvestmentWizard() {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode | null>(null);
  const [choice, setChoice] = useState<BudgetChoice>(null);
  const [custom, setCustom] = useState("");
  const [years, setYears] = useState<number>(SAVINGS_YEARS);
  const [growth, setGrowth] = useState<number>(DEFAULT_GROWTH);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Restore a calculation from a shared link (?c=EUR&b=100&y=5&g=0).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("c");
    const b = sanitizeBudget(p.get("b"));
    if (!c || !b || !CURRENCIES.some((o) => o.code === c)) return;
    // Deferred so the static page hydrates first, then switches to the shared result.
    const t = window.setTimeout(() => {
      setCurrency(c as CurrencyCode);
      setChoice("custom");
      setCustom(String(b));
      setYears(sanitizeYears(p.get("y")));
      setGrowth(sanitizeGrowth(p.get("g")));
      setAcknowledged(true);
      setStep(REVIEW_STEP);
      setShowResult(true);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, showResult]);

  const dailyBudget = choice === "custom" ? sanitizeBudget(custom) : (choice ?? 0);

  const canContinue =
    step === 0 ? currency !== null : step === 1 ? dailyBudget > 0 : step === REVIEW_STEP ? acknowledged : true;

  const result = useMemo(() => {
    if (!showResult || !currency || dailyBudget <= 0) return null;
    return calculateInvestmentPlan({ currency, dailyBudget, years, growth });
  }, [showResult, currency, dailyBudget, years, growth]);

  const startOver = () => {
    setStep(0);
    setCurrency(null);
    setChoice(null);
    setCustom("");
    setYears(SAVINGS_YEARS);
    setGrowth(DEFAULT_GROWTH);
    setAcknowledged(false);
    setShowResult(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const next = () => {
    if (!canContinue) return;
    if (step === REVIEW_STEP) setShowResult(true);
    else setStep((s) => s + 1);
  };
  const back = () => {
    setShowResult(false);
    setStep((s) => Math.max(s - 1, 0));
  };
  const jump = (s: number) => {
    setShowResult(false);
    setStep(s);
  };

  return (
    <div className={cn("wizard")}>
      <header className={cn("wizard-header")}>
        <ProgressBar current={result ? TOTAL_STEPS : step} labels={LABELS} onJump={jump} />
      </header>

      {result ? (
        <div className={cn("result fade-in")} key="result">
          <h2 ref={headingRef} tabIndex={-1} className={cn("visually-hidden")}>
            Your Google Ads investment calculation
          </h2>
          <ResultSummary result={result} />
          <RefundSummary result={result} />

          <p className={cn("disclaimer")}>
            This calculator provides an estimate based on the assumptions entered above. Actual costs, coverage and
            contractual terms are subject to the final agreement.
          </p>

          <ShareBar result={result} />

          <div className={cn("actions result-actions")}>
            <button type="button" className={cn("btn btn-ghost")} onClick={() => jump(REVIEW_STEP)}>
              Change inputs
            </button>
            <button type="button" className={cn("btn btn-ghost")} onClick={startOver}>
              Start over
            </button>
            <Link className={cn("btn btn-primary")} href={routes.contact}>
              Talk to Nordic Wide
            </Link>
          </div>
        </div>
      ) : (
        <div className={cn("step fade-in")} key={step}>
          <h2 id="step-title" ref={headingRef} tabIndex={-1} className={cn("step-title")}>
            {TITLES[step]}
          </h2>

          {step === 0 && <CurrencyStep value={currency} onChange={setCurrency} />}
          {step === 1 && currency && (
            <BudgetStep
              currency={currency}
              choice={choice}
              custom={custom}
              onChoiceChange={setChoice}
              onCustomChange={setCustom}
            />
          )}
          {step === 2 && <HorizonStep value={years} onChange={setYears} />}
          {step === 3 && <GrowthStep value={growth} onChange={setGrowth} />}
          {step === REVIEW_STEP && currency && (
            <ReviewStep
              currency={currency}
              dailyBudget={dailyBudget}
              years={years}
              growth={growth}
              acknowledged={acknowledged}
              onAcknowledge={setAcknowledged}
              onEdit={jump}
            />
          )}

          <div className={cn("actions")}>
            {step > 0 ? (
              <button type="button" className={cn("btn btn-ghost")} onClick={back}>
                Back
              </button>
            ) : (
              <span />
            )}
            <div className={cn("actions-right")}>
              {step > 0 && (
                <button type="button" className={cn("btn btn-ghost")} onClick={startOver}>
                  Start over
                </button>
              )}
              <button type="button" className={cn("btn btn-primary")} onClick={next} disabled={!canContinue}>
                {step === REVIEW_STEP ? "See my result" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      <p className={cn("privacy")}>No sign-up, no personal details. Everything is calculated in your browser.</p>

      <FaqSection />
    </div>
  );
}
