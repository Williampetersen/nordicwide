import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { footerColumns, legalLinks } from "@/lib/content/footer";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

import { FooterColumn } from "./FooterColumn";
import { SupportBlock } from "./SupportBlock";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container-wide">
        <SupportBlock />

        <div className={styles.columns}>
          <div className={styles.brand}>
            <Link href={routes.home} className={styles.logoLink} aria-label="Nordic Wide — home">
              <Logo tone="light" />
            </Link>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Info</h2>
            <address className={styles.info}>
              <span className={styles.infoName}>{siteConfig.name}</span>
              <span>
                {siteConfig.address.city}, {siteConfig.address.country}
              </span>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
            </address>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn key={column.title} column={column} />
          ))}
        </div>

        <div className={styles.legal}>
          <div className={styles.legalBrand}>
            <p className={styles.legalName}>{siteConfig.name}</p>
            <p>{siteConfig.tagline}</p>
          </div>

          <nav aria-label="Legal">
            <ul role="list" className={styles.legalLinks}>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className={styles.copyright}>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
