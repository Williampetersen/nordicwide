import { PageHero } from "@/components/sections/PageHero";
import { CTAButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { blogPosts } from "@/lib/content/knowledge";
import { routes } from "@/lib/routes";
import { createPageMetadata } from "@/lib/seo";

import styles from "../knowledge.module.css";

export const metadata = createPageMetadata({
  title: "Blog",
  description: "Articles from Nordic Wide on digital marketing, advertising, websites, analytics and long-term growth.",
  path: routes.blog,
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights on Long-Term Digital Growth"
        lead="Practical thinking on advertising, websites, analytics and building marketing that lasts."
        breadcrumbs={[{ label: "Blog", href: routes.blog }]}
      />
      <section className={styles.section} aria-label="Articles">
        <div className="container">
          {blogPosts.length === 0 ? (
            <EmptyState
              title="No articles published yet"
              description="We are preparing our first articles. In the meantime, our resources explain how the Nordic Wide growth model works."
              action={
                <CTAButton href={routes.resources} variant="secondary" withArrow>
                  Browse resources
                </CTAButton>
              }
            />
          ) : (
            <ul role="list" className={styles.grid}>
              {blogPosts.map((post) => (
                <li key={post.slug} className={styles.card}>
                  <p className={styles.meta}>
                    <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(post.publishedAt))}</time>
                  </p>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardText}>{post.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
