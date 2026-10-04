import { cn } from "./cn";

interface ProgressBarProps {
  /** 0-based index of the current step; equal to `labels.length` on the result page. */
  current: number;
  labels: readonly string[];
  /** Called when the user clicks a step they already completed. */
  onJump?: (step: number) => void;
}

export function ProgressBar({ current, labels, onJump }: ProgressBarProps) {
  const total = labels.length;
  const done = current >= total;
  const percent = Math.round((Math.min(current, total) / total) * 100);
  return (
    <div
      className={cn("progress")}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={done ? "Calculation complete" : `Step ${current + 1} of ${total}: ${labels[current]}`}
    >
      <div className={cn("progress-label")}>
        {done ? "Your calculation is ready" : `Step ${current + 1} of ${total} · ${labels[current]}`}
      </div>
      <ol className={cn("stepper")}>
        {labels.map((label, i) => {
          const state = i < current ? "is-done" : i === current ? "is-current" : "";
          const clickable = !!onJump && i < current && !done;
          return (
            <li key={label} className={cn("stepper-item", state)}>
              {clickable ? (
                <button type="button" className={cn("stepper-dot")} onClick={() => onJump(i)} aria-label={`Go back to ${label}`}>
                  ✓
                </button>
              ) : (
                <span className={cn("stepper-dot")} aria-hidden="true">
                  {i < current ? "✓" : i + 1}
                </span>
              )}
              <span className={cn("stepper-name")}>{label}</span>
            </li>
          );
        })}
      </ol>
      <div className={cn("progress-track")}>
        <div className={cn("progress-fill")} style={{ width: `${done ? 100 : Math.max(percent, 6)}%` }} />
      </div>
    </div>
  );
}
