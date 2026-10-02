import { cn } from "./cn";

const FAQ: { q: string; a: string }[] = [
  {
    q: "How is my yearly Google Ads cost calculated?",
    a: "It is your daily Google Ads budget multiplied by 365 days. For example, 100 per day × 365 = 36,500 per year.",
  },
  {
    q: "How is the investment amount calculated?",
    a: "The investment is 50% of your yearly Google Ads cost, paid one time. For 100 per day, that is 50% of 36,500 = 18,250.",
  },
  {
    q: "When do the 12 months start?",
    a: "The 12-month waiting period is counted from the date your agreement and investment begin.",
  },
  {
    q: "What do I pay during the first 12 months?",
    a: "You pay your Google Ads as normal during the 12-month waiting period. After those 12 months you no longer need to pay Google Ads, up to your selected daily budget.",
  },
  {
    q: "What does Nordic Wide cover after 12 months?",
    a: "Nordic Wide covers your Google Ads cost up to the daily budget you selected. The selected daily coverage stays fixed and does not increase from year to year.",
  },
  {
    q: "How is the potential saving calculated?",
    a: "Over 5 years, without the plan you pay your yearly Google Ads cost every year. With the plan you pay the investment plus the first year of Google Ads, and the following years are covered. The saving is the difference between the two.",
  },
  {
    q: "Can I get my investment back?",
    a: "The refund amount is your investment, returned to the same bank account used for the original investment, unless you have informed Nordic Wide in advance of updated bank details. The final refund process is subject to applicable verification and agreement terms.",
  },
  {
    q: "Is this result a guarantee?",
    a: "No. The calculator gives an estimate based on the amounts you enter. Actual costs, coverage and contractual terms are subject to the final agreement.",
  },
  {
    q: "Do I need to give my name or email?",
    a: "No. There is no sign-up and no personal details are collected. Everything is calculated in your browser.",
  },
];

export function FaqSection() {
  return (
    <section className={cn("faq")} aria-labelledby="faq-title">
      <h2 id="faq-title" className={cn("faq-title")}>
        Questions &amp; answers
      </h2>
      {FAQ.map((item) => (
        <details key={item.q} className={cn("faq-item")}>
          <summary className={cn("faq-q")}>{item.q}</summary>
          <p className={cn("faq-a")}>{item.a}</p>
        </details>
      ))}
    </section>
  );
}
