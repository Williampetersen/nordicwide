import { routes } from "@/lib/routes";
import type { CTA, NavItem } from "@/types/content";

export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "How It Works", href: routes.howItWorks },
  { label: "Services", href: routes.services },
  { label: "Growth Strategy", href: routes.growthStrategy },
  { label: "About", href: routes.about },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

export const headerCta: CTA = {
  label: "Start a conversation",
  href: routes.contact,
};
