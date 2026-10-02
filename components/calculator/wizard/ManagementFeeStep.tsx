import type { CurrencyCode } from "@/lib/investment/currencies";
import { OptionCard } from "./OptionCard";
import { cn } from "./cn";

interface Props {
  currency: CurrencyCode;
  hasFee: boolean | null;
  fee: string;
  onHasFeeChange: (v: boolean) => void;
  onFeeChange: (v: string) => void;
}

/** Keeps only digits and a single decimal point. */
export function cleanFeeInput(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const [whole, ...rest] = cleaned.split(".");
  const trimmed = whole.replace(/^0+(?=\d)/, "").slice(0, 9);
  return rest.length ? `${trimmed}.${rest.join("").slice(0, 2)}` : trimmed;
}

export function ManagementFeeStep({ currency, hasFee, fee, onHasFeeChange, onFeeChange }: Props) {
  return (
    <>
      <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-2")}>
        <OptionCard selected={hasFee === true} onSelect={() => onHasFeeChange(true)} className={cn("big-card")}>
          <span className={cn("big-number")}>Yes</span>
          <span className={cn("big-unit")}>I pay a monthly fee</span>
        </OptionCard>
        <OptionCard selected={hasFee === false} onSelect={() => onHasFeeChange(false)} className={cn("big-card")}>
          <span className={cn("big-number")}>No</span>
          <span className={cn("big-unit")}>Management fee: {currency} 0</span>
        </OptionCard>
      </div>

      {hasFee === true && (
        <div className={cn("field")}>
          <label htmlFor="mgmt-fee">Monthly management fee</label>
          <div className={cn("input-wrap")}>
            <input
              id="mgmt-fee"
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 650"
              value={fee}
              onChange={(e) => onFeeChange(cleanFeeInput(e.target.value))}
            />
            <span className={cn("input-suffix")}>{currency} / month</span>
          </div>
        </div>
      )}
    </>
  );
}
