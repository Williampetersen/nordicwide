import { cn } from "./cn";
import type { ReactNode } from "react";

interface OptionCardProps {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}

/** A radio-style selectable card (keyboard accessible: Tab + Space/Enter). */
export function OptionCard({ selected, onSelect, children, className = "" }: OptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn("option-card", selected && "is-selected", className)}
    >
      {children}
      <span className={cn("option-check")} aria-hidden="true">
        {selected ? "✓" : ""}
      </span>
    </button>
  );
}
