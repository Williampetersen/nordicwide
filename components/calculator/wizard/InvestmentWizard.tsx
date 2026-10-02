"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculateInvestmentPlan, sanitizeBudget } from "@/lib/investment/calculator";
import type { CurrencyCode } from "@/lib/investment/currencies";
import { routes } from "@/lib/routes";
import { BudgetStep, type BudgetChoice } from "./BudgetStep";
import { CurrencyStep } from "./CurrencyStep";
import { FaqSection } from "./FaqSection";
import { ProgressBar } from "./ProgressBar";
import { RefundSummary } from "./RefundSummary";
import { ResultSummary } from "./ResultSummary";
import { cn } from "./cn";

const TOTAL_STEPS = 2;

const TITLES = ["Choose your currency", "What is your daily Google Ads budget?"];

export function InvestmentWizard() {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode | null>(null);
  const [choice, setChoice] = useState<BudgetChoice>(null);
  const [custom, setCustom] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const dailyBudget = choice === "custom" ? sanitizeBudget(custom) : (choice ?? 0);

  const canContinue = step === 0 ? currency !== null : dailyBudget > 0;

  const result = useMemo(() => {
    if (step < TOTAL_STEPS || !currency || dailyBudget <= 0) return null;
    return calculateInvestmentPlan({ currency, dailyBudget });
  }, [step, currency, dailyBudget]);

  const startOver = () => {
    setStep(0);
    setCurrency(null);
    setChoice(null);
    setCustom("");
  };

  const next = () => canContinue && setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className={cn("wizard")}>
      <header className={cn("wizard-header")}>
        <ProgressBar current={result ? TOTAL_STEPS : step} total={TOTAL_STEPS} />
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

          <div className={cn("actions result-actions")}>
            <button type="button" className={cn("btn btn-ghost")} onClick={back}>
              Back
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
                {step === TOTAL_STEPS - 1 ? "See result" : "Continue"}
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
