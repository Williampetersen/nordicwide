"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { CTAButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { headerCta, mainNav } from "@/lib/content/navigation";
import { cx } from "@/lib/cx";
import { routes } from "@/lib/routes";

import { isActivePath } from "./isActivePath";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);

  // A zero-height sentinel at the top of the page tells us when the user has
  // scrolled — cheaper than listening to every scroll event.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => setIsCompact(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <header className={cx(styles.header, isCompact && styles.compact)}>
        <div className={cx("container-wide", styles.inner)}>
          <Link href={routes.home} className={styles.logoLink} aria-label="Nordic Wide — home">
            <Logo />
          </Link>

          <nav aria-label="Main" className={styles.nav}>
            <ul role="list" className={styles.navList}>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.navLink}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <CTAButton href={headerCta.href} className={styles.cta}>
              {headerCta.label}
            </CTAButton>
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </header>
    </>
  );
}
