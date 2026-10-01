"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";

import { CTAButton } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { headerCta, mainNav } from "@/lib/content/navigation";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

import { isActivePath } from "./isActivePath";
import styles from "./MobileMenu.module.css";

/** Matches the breakpoint where the desktop navigation appears (Header.module.css). */
const DESKTOP_QUERY = "(min-width: 70rem)";

interface MobileMenuProps {
  pathname: string;
}

/**
 * Mobile navigation drawer built on the native <dialog> element, which gives
 * us focus trapping, Escape-to-close, an inert background and focus return
 * to the toggle button for free.
 */
export function MobileMenu({ pathname }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const close = () => dialogRef.current?.close();

  // Close the drawer if the viewport grows to the desktop layout while open.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Clicks on the backdrop target the <dialog> itself; clicks inside hit the panel.
  const handleDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={open}
      >
        <MenuIcon width={24} height={24} />
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.drawer}
        aria-label="Menu"
        onClose={() => setIsOpen(false)}
        onClick={handleDialogClick}
      >
        <div className={styles.panel}>
          <div className={styles.top}>
            <Link href={routes.home} className={styles.logoLink} aria-label="Nordic Wide — home" onClick={close}>
              <Logo />
            </Link>
            <button type="button" className={styles.close} aria-label="Close menu" onClick={close}>
              <CloseIcon width={24} height={24} />
            </button>
          </div>

          <nav aria-label="Mobile">
            <ul role="list" className={styles.list}>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.link}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.footer}>
            <CTAButton href={headerCta.href} size="lg" withArrow className={styles.cta} onClick={close}>
              {headerCta.label}
            </CTAButton>
            <div className={styles.contact}>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
