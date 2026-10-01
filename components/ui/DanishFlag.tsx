interface DanishFlagProps {
  className?: string;
}

/** The Dannebrog in its official 37:28 proportions. Decorative — pair it with a text label. */
export function DanishFlag({ className }: DanishFlagProps) {
  return (
    <svg className={className} viewBox="0 0 37 28" aria-hidden="true" focusable="false">
      <rect width="37" height="28" fill="#C8102E" />
      <rect x="12" width="4" height="28" fill="#FFFFFF" />
      <rect y="12" width="37" height="4" fill="#FFFFFF" />
    </svg>
  );
}
