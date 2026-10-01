import { FeatureSection } from "@/components/sections/FeatureSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { Principles } from "@/components/sections/Principles";
import { aboutApproach } from "@/lib/content/features";
import { principles } from "@/lib/content/growth";
import { images } from "@/lib/images";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import styles from "./about.module.css";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Nordic Wide is a Copenhagen-based digital growth company helping businesses build long-term marketing infrastructure across advertising, websites, analytics and email.",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Nordic Wide"
        title="A Scandinavian Partner for Long-Term Digital Growth"
        lead={`Based in ${siteConfig.address.city}, Nordic Wide helps businesses turn marketing from a recurring cost into a lasting growth system.`}
        image={images.nordicOffice}
        breadcrumbs={[{ label: "About", href: routes.about }]}
      />

      <section className="section" aria-labelledby="story-title">
        <div className={`container ${styles.story}`}>
          <h2 id="story-title" className={styles.storyTitle}>
            Who we are
          </h2>
          <div className={styles.storyText}>
            <p>
              Nordic Wide is a digital growth company for businesses that want more from their marketing than another
              month of advertising spend. We combine strategic investment with proven channels — Google Ads, Meta Ads,
              websites, email and analytics — to build a connected system that keeps its value over time.
            </p>
            <p>
              Our approach is shaped by Scandinavian business values: clarity, honesty and long-term thinking. We explain
              what we do and why, we report openly on costs and performance, and we never promise outcomes that no one can
              guarantee.
            </p>
          </div>
        </div>
      </section>

      <Principles
        principles={principles}
        eyebrow="Our principles"
        title="What We Stand For"
        subtitle="Four principles guide how we plan, build and report."
        surface
      />
      <FeatureSection feature={aboutApproach} />
      <FinalCTA />
    </>
  );
}
