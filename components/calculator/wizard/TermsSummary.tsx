import { cn } from "./cn";
﻿const TERMS = [
  "One-time investment",
  "12-month waiting period",
  "Google Ads coverage begins after 12 months",
  "Coverage is limited to the selected daily budget",
  "Management fee becomes 0 after joining the plan",
  "The selected daily coverage remains fixed",
  "The plan remains valid while the investment remains with Nordic Wide",
  "Contractual terms are governed by the final agreement",
];

export function TermsSummary() {
  return (
    <section className={cn("card")} aria-labelledby="terms-title">
      <h3 id="terms-title" className={cn("eyebrow")}>Plan terms</h3>
      <ul className={cn("terms")}>
        {TERMS.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
