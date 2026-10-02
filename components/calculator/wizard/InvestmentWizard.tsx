"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { routes } from "@/lib/routes";
import { calculateInvestmentPlan, sanitizeAmount } from "@/lib/investment/calculator";
import type { CurrencyCode } from "@/lib/investment/currencies";
import type { ProjectionYears } from "@/lib/investment/plans";
import { BudgetStep } from "./BudgetStep";
import { ComparisonPanels } from "./ComparisonPanels";
import { CurrencyStep } from "./CurrencyStep";
import { ManagementFeeStep } from "./ManagementFeeStep";
import { PlanSummary } from "./PlanSummary";
import { ProgressBar } from "./ProgressBar";
import { ProjectionStep } from "./ProjectionStep";
import { RefundSummary } from "./RefundSummary";
import { TermsSummary } from "./TermsSummary";
import { YearlyProjectionTable } from "./YearlyProjectionTable";
import { cn } from "./cn";

const TOTAL_STEPS = 4;

const TITLES = [
  "Choose your currency",
  "What is your daily Google Ads budget?",
  "Do you currently pay a monthly Google Ads management fee?",
  "How long would you like to see the projection?",
];

export function InvestmentWizard() {
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState<CurrencyCode | null>(null);
  const [dailyBudget, setDailyBudget] = useState<number | null>(null);
  const [hasFee, setHasFee] = useState<boolean | null>(null);
  const [fee, setFee] = useState("");
  const [years, setYears] = useState<ProjectionYears | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: false });
  }, [step]);

  const monthlyFee = hasFee ? sanitizeAmount(fee) : 0;

  const canContinue = [
    currency !== null,
    dailyBudget !== null,
    hasFee === false || (hasFee === true && monthlyFee > 0),
    years !== null,
  ][step];

  const result = useMemo(() => {
    if (step < TOTAL_STEPS || !currency || dailyBudget === null || years === null) return null;
    return calculateInvestmentPlan({ currency, dailyBudget, monthlyManagementFee: monthlyFee, years });
  }, [step, currency, dailyBudget, monthlyFee, years]);

  const startOver = () => {
    setStep(0);
    setCurrency(null);
    setDailyBudget(null);
    setHasFee(null);
    setFee("");
    setYears(null);
  };

  const next = () => canContinue && setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const isResult = step >= TOTAL_STEPS && result !== null;

  return (
    <div className={cn("wizard")}>
      <header className={cn("wizard-header")}>
        <ProgressBar current={isResult ? TOTAL_STEPS : step} total={TOTAL_STEPS} />
      </header>

      {isResult ? (
        <div className={cn("result fade-in")} key="result">
          <h2 ref={headingRef} tabIndex={-1} className={cn("visually-hidden")}>
            Your Google Ads investment calculation
          </h2>
          <PlanSummary result={result} />
          <ComparisonPanels result={result} />
          <YearlyProjectionTable result={result} />
          <TermsSummary />
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
          {step === 1 && currency && <BudgetStep currency={currency} value={dailyBudget} onChange={setDailyBudget} />}
          {step === 2 && currency && (
            <ManagementFeeStep
              currency={currency}
              hasFee={hasFee}
              fee={fee}
              onHasFeeChange={(v) => {
                setHasFee(v);
                if (!v) setFee("");
              }}
              onFeeChange={setFee}
            />
          )}
          {step === 3 && <ProjectionStep value={years} onChange={setYears} />}

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
                {step === TOTAL_STEPS - 1 ? "See calculation" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      <p className={cn("privacy")}>No sign-up, no personal details. Everything is calculated in your browser.</p>
    </div>
  );
}
