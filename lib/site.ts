const DEFAULT_SITE_URL = "https://nordicwide.com";

function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Nordic Wide",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL),
  title: "Nordic Wide | Long-Term Digital Growth & Marketing",
  description:
    "Nordic Wide helps businesses build sustainable digital growth through strategic marketing, advertising, websites, analytics and long-term growth solutions.",
  tagline: "Marketing and digital growth solutions for businesses.",
  locale: "en_US",
  email: "info@nordicwide.com",
  phone: {
    display: "+45 42 50 45 51",
    href: "tel:+4542504551",
    e164: "+4542504551",
  },
  address: {
    city: "Copenhagen",
    country: "Denmark",
    countryCode: "DK",
  },
  supportLabel: "Danish customer support",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}
