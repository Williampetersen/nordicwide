import { CURRENCIES, type CurrencyCode } from "@/lib/investment/currencies";
import { OptionCard } from "./OptionCard";
import { cn } from "./cn";

interface Props {
  value: CurrencyCode | null;
  onChange: (code: CurrencyCode) => void;
}

export function CurrencyStep({ value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-labelledby="step-title" className={cn("grid grid-currency")}>
      {CURRENCIES.map((c) => (
        <OptionCard key={c.code} selected={value === c.code} onSelect={() => onChange(c.code)} className={cn("currency-card")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.flag} alt="" width={40} height={40} className={cn("flag")} loading="lazy" />
          <span className={cn("currency-text")}>
            <strong>{c.code}</strong>
            <span>{c.region}</span>
          </span>
        </OptionCard>
      ))}
    </div>
  );
}
