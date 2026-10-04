import { HORIZON_OPTIONS } from "@/lib/investment/plan";
import { cn } from "./cn";
import { OptionCard } from "./OptionCard";

interface Props {
  value: number;
  onChange: (years: number) => void;
}

const HINTS: Record<number, string> = {
  3: "Short view",
  5: "Standard view",
  7: "Medium-long view",
  10: "Long-term view",
};

export function HorizonStep({ value, onChange }: Props) {
  return (
    <>
      <p className={cn("step-lead")}>
        Investors compare plans over different periods. Pick the horizon you want to evaluate. You can change it later
        without starting over.
      </p>
      <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-4")}>
        {HORIZON_OPTIONS.map((y) => (
          <OptionCard key={y} selected={value === y} onSelect={() => onChange(y)} className="big-card">
            <span className={cn("big-number")}>{y}</span>
            <span className={cn("big-unit")}>years</span>
            <span className={cn("hint")}>{HINTS[y]}</span>
          </OptionCard>
        ))}
      </div>
    </>
  );
}
