import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  IBM_Plex_Mono,
  Manrope,
} from "next/font/google";

import { notFound } from "next/navigation";

import {
  isLocale,
  localeMeta,
  locales,
  type Locale,
} from "@/i18n/config";

import "@/styles/globals.css";

/*
 * VELORA TYPOGRAPHY
 *
 * Manrope:
 * Interface principal, títulos e textos.
 *
 * IBM Plex Mono:
 * Dados técnicos, SKU, estoque, métricas
 * e pequenos elementos operacionais.
 */

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

type LocaleLayoutProps = Readonly<{
  children: ReactNode;

  params: Promise<{
    locale: string;
  }>;
}>;

type LocalizedMetadata = {
  title: string;
  description: string;
};

const metadataByLocale = {
  "pt-BR": {
    title: "VELORA — Tecnologia no seu ritmo",
    description:
      "Descubra smartphones, acessórios e tecnologia em uma experiência clara, rápida e sofisticada.",
  },

  en: {
    title: "VELORA — Technology at your pace",
    description:
      "Discover smartphones, accessories, and technology through a clear, fast, and sophisticated experience.",
  },

  es: {
    title: "VELORA — Tecnología a tu ritmo",
    description:
      "Descubre smartphones, accesorios y tecnología mediante una experiencia clara, rápida y sofisticada.",
  },
} satisfies Record<Locale, LocalizedMetadata>;

/*
 * Informa ao Next.js quais versões conhecidas
 * do segmento [locale] podem ser pré-renderizadas.
 */

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/*
 * Neste momento da arquitetura VELORA,
 * somente os locales registrados são válidos.
 */

export const dynamicParams = false;

/*
 * Metadata localizada.
 *
 * Nada de title em português aparecendo
 * acidentalmente na versão inglesa ou espanhola.
 */

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const metadata = metadataByLocale[locale];

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const metadata = localeMeta[locale];

  return (
    <html
      lang={metadata.htmlLang}
      className={`${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}