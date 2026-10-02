import type { CalculationResult } from "@/lib/investment/calculator";
import { formatMoney } from "@/lib/investment/format";
import { cn } from "./cn";

export function RefundSummary({ result }: { result: CalculationResult }) {
  return (
    <section className={cn("card refund")} aria-labelledby="refund-title">
      <h3 id="refund-title" className={cn("eyebrow")}>Refund</h3>
      <p>
        The refund amount is the selected plan Investment Amount (
        <strong>{formatMoney(result.investmentAmount, result.currency)}</strong>), returned to the same bank account
        used for the original investment, unless the investor has informed Nordic Wide in advance of updated bank
        details.
      </p>
      <p className={cn("note")}>
        The final refund process is subject to applicable verification and agreement terms.
      </p>
    </section>
  );
}
