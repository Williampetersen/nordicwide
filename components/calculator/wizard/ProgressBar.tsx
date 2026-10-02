import { cn } from "./cn";
interface ProgressBarProps {
  /** 0-based index of the current step; equal to `total` on the result page. */
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const done = current >= total;
  const percent = Math.round((Math.min(current, total) / total) * 100);
  return (
    <div className={cn("progress")} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
      <div className={cn("progress-label")}>
        {done ? "Your calculation" : `Step ${current + 1} of ${total}`}
      </div>
      <div className={cn("progress-track")}>
        <div className={cn("progress-fill")} style={{ width: `${done ? 100 : Math.max(percent, 6)}%` }} />
      </div>
    </div>
  );
}
