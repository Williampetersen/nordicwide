import Image from "next/image";

import { CTAButton } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { DanishFlag } from "@/components/ui/DanishFlag";
import { cx } from "@/lib/cx";
import { images } from "@/lib/images";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

import styles from "./Hero.module.css";

const channels = ["Google Ads", "Meta Ads", "Websites", "Email", "Analytics"];

const growthSystem = ["Strategy & planning", "Advertising campaigns", "Website & tracking", "Reporting & optimization"];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={cx("container", styles.inner)}>
        <div className={styles.content}>
          <p className="eyebrow">Strategic marketing investment</p>
          <h1 id="hero-title" className={styles.title}>
            Turn Marketing Into a Long-Term <span className={styles.highlight}>Growth Engine</span>
          </h1>
          <p className={styles.lead}>
            Nordic Wide combines strategic investment with proven digital marketing channels to help businesses build
            sustainable growth and reduce long-term advertising dependency.
          </p>
          <div className={styles.actions}>
            <CTAButton href={routes.contact} size="lg" withArrow block>
              Build Your Growth Plan
            </CTAButton>
            <CTAButton href={routes.howItWorks} size="lg" variant="secondary" block>
              How It Works
            </CTAButton>
          </div>
          <div className={styles.channels}>
            <p className={styles.channelsLabel}>Built across</p>
            <ul role="list" className={styles.channelList}>
              {channels.map((channel) => (
                <li key={channel}>{channel}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.imageFrame}>
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              sizes="(min-width: 64rem) 46vw, (min-width: 40rem) 90vw, 100vw"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              className={styles.image}
            />
          </div>

          <div className={styles.locationChip}>
            <DanishFlag className={styles.flag} />
            <span>
              Based in {siteConfig.address.city}, {siteConfig.address.country}
            </span>
          </div>

          <div className={styles.systemCard}>
            <p className={styles.systemTitle}>Your growth system</p>
            <CheckList items={growthSystem} size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
