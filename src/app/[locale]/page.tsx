import Link from "next/link";
import { notFound } from "next/navigation";

import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import {
  isLocale,
  type Locale,
} from "@/i18n/config";
import { getFoundationMessages } from "@/i18n/messages";

import styles from "./page.module.css";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({
  params,
}: HomePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const messages = getFoundationMessages(locale);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link
            href={`/${locale}`}
            className={styles.brand}
            aria-label={messages.navigation.homeLabel}
          >
            {messages.brand.name}
          </Link>

          <LocaleSwitcher
            currentLocale={locale}
            ariaLabel={
              messages.navigation.languageSelectorLabel
            }
          />
        </header>

        <section
          className={styles.hero}
          aria-labelledby="velora-title"
        >
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>
              {messages.hero.eyebrow}
            </p>

            <h1
              id="velora-title"
              className={styles.title}
            >
              {messages.hero.title}
            </h1>

            <p className={styles.description}>
              {messages.hero.description}
            </p>
          </div>

          <div
            className={styles.heroVisual}
            aria-hidden="true"
          >
            <div className={styles.orbitOuter}>
              <div className={styles.orbitMiddle}>
                <div className={styles.orbitCore}>
                  <span>V</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.foundation}
          aria-labelledby="foundation-title"
        >
          <div className={styles.foundationHeader}>
            <div className={styles.foundationStatus}>
              <span
                className={styles.statusDot}
                aria-hidden="true"
              />

              <span className={styles.statusText}>
                {messages.brand.buildLabel}
              </span>
            </div>

            <h2
              id="foundation-title"
              className={styles.foundationTitle}
            >
              {messages.foundation.title}
            </h2>
          </div>

          <div className={styles.foundationGrid}>
            {messages.foundation.items.map(
              (item, index) => (
                <article
                  key={item.title}
                  className={styles.foundationCard}
                >
                  <span
                    className={styles.cardNumber}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className={styles.cardTitle}>
                    {item.title}
                  </h3>

                  <p className={styles.cardDescription}>
                    {item.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerBrand}>
            {messages.brand.name}
          </span>

          <span className={styles.footerBuild}>
            {messages.footer.projectLabel}
          </span>
        </footer>
      </div>
    </main>
  );
}