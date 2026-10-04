import { mainNav } from "@/lib/content/navigation";
import { routes } from "@/lib/routes";
import type { FooterColumn, Link } from "@/types/content";

export const footerColumns: FooterColumn[] = [
  {
    title: "Menu",
    links: mainNav,
  },
  {
    title: "Knowledge",
    links: [
      { label: "Blog", href: routes.blog },
      { label: "Resources", href: routes.resources },
      { label: "Case Studies", href: routes.caseStudies },
      { label: "FAQ", href: routes.faq },
      { label: "Digital Marketing", href: routes.services },
      { label: "Growth Strategy", href: routes.growthStrategy },
      { label: "Google Ads Calculator", href: routes.calculator },
      { label: "Investors", href: routes.investors },
      { label: "How the Plan Works", href: routes.investmentPlan },
    ],
  },
  {
    title: "Other",
    links: [
      { label: "Terms & Documents", href: routes.terms },
      { label: "Privacy Policy", href: routes.privacy },
      { label: "Cookie Policy", href: routes.cookies },
      { label: "Contact", href: routes.contact },
    ],
  },
];

export const legalLinks: Link[] = [
  { label: "Terms & Conditions", href: routes.terms },
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Cookie Policy", href: routes.cookies },
];
