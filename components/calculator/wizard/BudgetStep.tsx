import type { CurrencyCode } from "@/lib/investment/currencies";
import { BUDGET_PRESETS } from "@/lib/investment/plan";
import { cn } from "./cn";
import { OptionCard } from "./OptionCard";

export type BudgetChoice = number | "custom" | null;

interface Props {
  currency: CurrencyCode;
  choice: BudgetChoice;
  custom: string;
  onChoiceChange: (choice: Exclude<BudgetChoice, null>) => void;
  onCustomChange: (value: string) => void;
}

/** Keeps digits only, at most 7 characters. */
export function cleanBudgetInput(raw: string): string {
  return raw.replace(/\D/g, "").replace(/^0+/, "").slice(0, 7);
}

export function BudgetStep({ currency, choice, custom, onChoiceChange, onCustomChange }: Props) {
  return (
    <>
      <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-budget")}>
        {BUDGET_PRESETS.map((b) => (
          <OptionCard key={b} selected={choice === b} onSelect={() => onChoiceChange(b)} className="big-card">
            <span className={cn("big-number")}>{b}</span>
            <span className={cn("big-unit")}>{currency} / day</span>
          </OptionCard>
        ))}
        <OptionCard
          selected={choice === "custom"}
          onSelect={() => onChoiceChange("custom")}
          className="big-card custom-card"
        >
          <span className={cn("big-number custom-label")}>Custom</span>
          <span className={cn("big-unit")}>Enter your own amount</span>
        </OptionCard>
      </div>

      {choice === "custom" && (
        <div className={cn("field")}>
          <label htmlFor="custom-budget">Your daily Google Ads budget</label>
          <div className={cn("input-wrap")}>
            <input
              id="custom-budget"
              inputMode="numeric"
              autoComplete="off"
              placeholder="e.g. 120"
              autoFocus
              value={custom}
              onChange={(e) => onCustomChange(cleanBudgetInput(e.target.value))}
            />
            <span className={cn("input-suffix")}>{currency} / day</span>
          </div>
        </div>
      )}
    </>
  );
}
