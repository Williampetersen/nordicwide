# Nordic Wide — nordicwide.com

Marketing website for Nordic Wide, built with Next.js 16 (App Router), React 19 and TypeScript.
No UI libraries: styling is a single design system (`app/globals.css` tokens) plus CSS Modules per component.

## Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Development server on http://localhost:3000   |
| `npm run build`     | Production build                              |
| `npm start`         | Serve the production build                    |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript) |
| `npm run typecheck` | Generate route types and run `tsc --noEmit`   |

## Project structure

```
app/                    Routes (App Router), metadata files, API route
  api/contact/          POST /api/contact — validates and delivers enquiries
  services/[slug]/      Service detail pages, generated from lib/content/services.ts
components/
  layout/               Header, MobileMenu, Footer, FooterColumn, SupportBlock
  home/                 Homepage-only sections (Hero, GrowthModel, Analytics…)
  sections/             Reusable page sections (FeatureSection, ProcessSteps, FAQ, FinalCTA, PageHero…)
  services/             ServiceCard, ServiceGrid, service detail blocks
  contact/              ContactForm, FormField
  ui/                   Primitives (Button/CTAButton, SectionHeading, CheckList, Logo, icons…)
lib/
  content/              All site content as typed data (navigation, services, FAQ, footer…)
  contact/              Shared validation + pluggable delivery providers
  routes.ts             Every internal path in one place
  site.ts               Brand, contact details and site URL
  seo.ts                Metadata factory and schema.org builders
  images.ts             Image registry (static imports + alt text)
types/content.ts        Content models (Service, FAQItem, NavItem, FooterColumn, CaseStudy, BlogPost…)
public/images/          Photography (Unsplash licence)
```

## Editing content

All copy lives in `lib/content/*.ts` and is typed by `types/content.ts`, so it can later move to a CMS
without changing components.

- **New service:** add an entry to `lib/content/services.ts` (+ an image in `lib/images.ts`). The card,
  `/services/<slug>` page, sitemap entry and structured data are generated automatically.
- **FAQ:** edit `lib/content/faq.ts`.
- **Blog posts, case studies, testimonials:** `lib/content/knowledge.ts`. These are intentionally empty —
  the pages show an empty state until real content is added.
- **Contact details:** `lib/site.ts`.
- **Legal pages:** `app/terms`, `app/privacy-policy`, `app/cookie-policy`; bump `lib/content/legal.ts`
  when they change. These are a starting point and should be reviewed by legal counsel.

## Contact form

The form validates in the browser and again in `app/api/contact/route.ts` (same rules,
`lib/contact/validation.ts`). Delivery is chosen from environment variables in `lib/contact/delivery.ts`:

1. **Resend email** — `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
2. **Webhook** (CRM, Zapier, Make, Slack…) — `CONTACT_WEBHOOK_URL`, optional `CONTACT_WEBHOOK_SECRET`
3. **Development** — submissions are logged to the server console

In production without a provider the form shows a "temporarily unavailable" message with the email and
phone number, so no enquiry is silently lost. See `.env.example`.

## Notes

- Example numbers in the analytics dashboard are labelled as illustrative demo data.
- Section entrance animations are pure CSS (scroll-driven animations) and respect `prefers-reduced-motion`.
- Photography: Unsplash (free to use under the Unsplash License).
