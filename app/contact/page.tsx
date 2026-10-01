import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { DanishFlag } from "@/components/ui/DanishFlag";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

import styles from "./contact.module.css";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Start a conversation with Nordic Wide. Tell us about your business and current marketing, and we will discuss how to build a more sustainable path to growth.",
  path: routes.contact,
});

const nextSteps = [
  { title: "We review your message", text: "A member of our team reads your enquiry and prepares for the conversation." },
  { title: "We schedule a call", text: "We arrange a call to understand your business, goals and current setup." },
  { title: "You receive a proposal", text: "If there is a good fit, we outline a strategy, scope and agreement terms." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a Conversation"
        lead="Tell us about your business and your current marketing. We will get back to you to arrange a conversation — with no obligation."
        breadcrumbs={[{ label: "Contact", href: routes.contact }]}
      />

      <section className={styles.section} aria-label="Contact Nordic Wide">
        <div className={`container ${styles.layout}`}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Request a conversation</h2>
            <ContactForm />
          </div>

          <aside className={styles.aside} aria-label="Contact details">
            <div className={styles.detailsCard}>
              <h2 className={styles.asideTitle}>Contact details</h2>
              <dl className={styles.details}>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
                  </dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </dd>
                </div>
              </dl>
              <p className={styles.support}>
                <DanishFlag className={styles.flag} />
                <span>{siteConfig.supportLabel}</span>
              </p>
            </div>

            <div className={styles.stepsCard}>
              <h2 className={styles.asideTitle}>What happens next</h2>
              <ol role="list" className={styles.steps}>
                {nextSteps.map((step, index) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <p className={styles.stepTitle}>{step.title}</p>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
