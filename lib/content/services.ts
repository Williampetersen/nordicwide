import { images } from "@/lib/images";
import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    slug: "google-ads",
    title: "Google Ads",
    summary: "High-intent traffic designed to generate qualified leads and measurable business results.",
    highlights: ["Search & performance campaigns", "Conversion tracking", "Continuous optimization"],
    image: images.googleAds,
    metaDescription:
      "Google Ads management from Nordic Wide: search and performance campaigns, conversion tracking and continuous optimization built around your business goals.",
    intro:
      "Google Ads reaches people at the moment they search for what your business offers. We plan, build and manage campaigns around clear business goals, with tracking in place from the start so every decision can be based on measurable data.",
    included: [
      {
        title: "Account structure & keyword strategy",
        description:
          "Campaigns organized around your services, locations and margins, with keyword research grounded in real search demand.",
      },
      {
        title: "Search & performance campaigns",
        description:
          "Search, Performance Max and remarketing campaigns configured to match how your customers research and buy.",
      },
      {
        title: "Conversion tracking",
        description:
          "Google Ads, Google Analytics 4 and Google Tag Manager set up to measure the actions that matter — leads, calls, bookings or purchases.",
      },
      {
        title: "Continuous optimization",
        description:
          "Regular reviews of search terms, bids, budgets, ad copy and landing pages to improve efficiency over time.",
      },
      {
        title: "Transparent reporting",
        description: "Clear reporting on spend, conversions and cost per acquisition, explained in plain language.",
      },
    ],
    approach: [
      "Start with the searches closest to purchase intent",
      "Measure every meaningful conversion before scaling budgets",
      "Improve landing pages alongside the ads, not separately",
      "Scale only what the performance data supports",
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    summary: "Scalable campaigns across Facebook and Instagram to build awareness and generate demand.",
    highlights: ["Creative strategy", "Audience targeting", "Retargeting", "Lead generation"],
    image: images.metaAds,
    metaDescription:
      "Meta Ads campaigns on Facebook and Instagram: creative strategy, audience targeting, retargeting and lead generation from Nordic Wide.",
    intro:
      "Facebook and Instagram let you reach the right people before they start searching. We combine creative strategy with structured testing so campaigns build awareness, generate demand and bring people back when they are ready to act.",
    included: [
      {
        title: "Creative strategy",
        description:
          "Ad concepts, formats and messaging developed for each stage of the customer journey, with a clear plan for testing.",
      },
      {
        title: "Audience targeting",
        description:
          "Audiences built from your customer data, interests and behavior — refined as campaign data comes in.",
      },
      {
        title: "Retargeting",
        description:
          "Follow-up campaigns for people who have visited your website or engaged with your content but have not yet converted.",
      },
      {
        title: "Lead generation",
        description:
          "Lead forms and landing page campaigns connected to your follow-up process so new enquiries are handled quickly.",
      },
      {
        title: "Measurement setup",
        description: "Meta Pixel and Conversions API configured so results can be measured as accurately as possible.",
      },
    ],
    approach: [
      "Lead with creative — it is the biggest lever on Meta platforms",
      "Test a few clear ideas at a time instead of many small variations",
      "Connect paid social to email and website follow-up",
      "Shift budget toward what the data shows is working",
    ],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    summary: "Automated customer journeys designed to increase retention, follow-up and repeat business.",
    highlights: ["Automated sequences", "Segmentation", "Testing"],
    image: images.emailMarketing,
    metaDescription:
      "Email marketing from Nordic Wide: automated sequences, segmentation and testing to improve follow-up, retention and repeat business.",
    intro:
      "Email is one of the few channels your business fully owns. We design automated journeys that follow up on new leads, keep customers informed and encourage repeat business — without relying on paid media for every interaction.",
    included: [
      {
        title: "Automated sequences",
        description: "Welcome, follow-up, onboarding and re-engagement flows that run automatically in the background.",
      },
      {
        title: "Segmentation",
        description: "Lists organized by interests, behavior and customer stage so each message is relevant to the reader.",
      },
      {
        title: "Testing",
        description: "Structured testing of subject lines, content and timing to learn what your audience responds to.",
      },
      {
        title: "Templates & design",
        description: "Clean, mobile-friendly templates that reflect your brand and are easy to update.",
      },
      {
        title: "Consent & list health",
        description: "Sign-up, consent and unsubscribe handling set up with GDPR requirements in mind.",
      },
    ],
    approach: [
      "Automate the follow-up that should always happen",
      "Send fewer, more relevant messages",
      "Use engagement data to keep lists healthy",
      "Treat email as a long-term owned asset",
    ],
  },
  {
    slug: "website-design",
    title: "Website Design",
    summary: "Fast, conversion-focused websites designed for SEO, advertising and customer trust.",
    highlights: ["Landing pages", "Mobile optimization", "Tracking-ready setup"],
    image: images.websiteDesign,
    metaDescription:
      "Website design and development from Nordic Wide: fast, conversion-focused websites and landing pages built for SEO, advertising and tracking.",
    intro:
      "Every campaign ends on a page. We design and build fast, clear websites and landing pages that earn trust, explain your offer and make it easy for visitors to take the next step — with tracking built in from day one.",
    included: [
      {
        title: "Landing pages",
        description: "Focused pages for specific campaigns, services and audiences, built to support advertising.",
      },
      {
        title: "Mobile optimization",
        description: "Layouts, navigation and forms designed for phones first, where most visitors arrive.",
      },
      {
        title: "Tracking-ready setup",
        description: "Analytics, conversion events and consent handling configured before launch.",
      },
      {
        title: "SEO foundations",
        description: "Technical SEO, metadata, structured data and fast loading as part of the build — not an afterthought.",
      },
      {
        title: "Conversion-focused structure",
        description: "Clear messaging, proof points and calls to action arranged around how customers make decisions.",
      },
    ],
    approach: [
      "Design around the customer’s questions and decisions",
      "Keep pages fast — speed affects both SEO and advertising costs",
      "Build reusable sections that make new pages quick to launch",
      "Measure and refine after launch",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
