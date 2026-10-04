import { GROWTH_OPTIONS } from "@/lib/investment/plan";
import { cn } from "./cn";
import { OptionCard } from "./OptionCard";

interface Props {
  value: number;
  onChange: (growth: number) => void;
}

export function GrowthStep({ value, onChange }: Props) {
  return (
    <>
      <p className={cn("step-lead")}>
        Without the plan, your Google Ads cost may change over time. Coverage under the plan stays fixed at your selected
        daily budget, so your result shows honestly how much of your ad bill is covered.
      </p>
      <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-3")}>
        {GROWTH_OPTIONS.map((o) => (
          <OptionCard key={o.value} selected={value === o.value} onSelect={() => onChange(o.value)} className="info-card">
            <span className={cn("info-title")}>{o.title}</span>
            <span className={cn("big-unit")}>{o.text}</span>
          </OptionCard>
        ))}
      </div>
    </>
  );
}
