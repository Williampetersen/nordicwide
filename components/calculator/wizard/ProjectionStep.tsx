import { YEAR_OPTIONS, type ProjectionYears } from "@/lib/investment/plans";
import { OptionCard } from "./OptionCard";
import { cn } from "./cn";

interface Props {
  value: ProjectionYears | null;
  onChange: (years: ProjectionYears) => void;
}

export function ProjectionStep({ value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-2")}>
      {YEAR_OPTIONS.map((y) => (
        <OptionCard key={y} selected={value === y} onSelect={() => onChange(y)} className={cn("big-card")}>
          <span className={cn("big-number")}>{y}</span>
          <span className={cn("big-unit")}>Years</span>
        </OptionCard>
      ))}
    </div>
  );
}
