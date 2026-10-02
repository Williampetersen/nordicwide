import type { CurrencyCode } from "@/lib/investment/currencies";
import { BUDGET_OPTIONS } from "@/lib/investment/plans";
import { OptionCard } from "./OptionCard";
import { cn } from "./cn";

interface Props {
  currency: CurrencyCode;
  value: number | null;
  onChange: (budget: number) => void;
}

export function BudgetStep({ currency, value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-3")}>
      {BUDGET_OPTIONS.map((b) => (
        <OptionCard key={b} selected={value === b} onSelect={() => onChange(b)} className={cn("big-card")}>
          <span className={cn("big-number")}>{b}</span>
          <span className={cn("big-unit")}>
            {currency} / day
          </span>
        </OptionCard>
      ))}
    </div>
  );
}
