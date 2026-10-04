"use client";

import { useState } from "react";
import type { CalculationResult } from "@/lib/investment/calculator";
import { cn } from "./cn";

/** Print / save-as-PDF and copy-a-link actions so an investor can keep or forward the calculation. */
export function ShareBar({ result }: { result: CalculationResult }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams({
      c: result.currency,
      b: String(result.dailyBudget),
      y: String(result.savingsYears),
      g: String(result.growth),
    }).toString();
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this link", url.toString());
    }
  };

  return (
    <div className={cn("share-bar")}>
      <button type="button" className={cn("btn btn-ghost")} onClick={() => window.print()}>
        Print / save as PDF
      </button>
      <button type="button" className={cn("btn btn-ghost")} onClick={copyLink}>
        {copied ? "Link copied ✓" : "Copy link to this calculation"}
      </button>
      <span className={cn("visually-hidden")} role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
