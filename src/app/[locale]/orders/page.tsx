import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import {
  DemoOrdersPage,
} from "../../../components/commerce/demo-orders-page";
import {
  getStorefrontOrdersCopy,
} from "../../../i18n/storefront-orders-copy";
import {
  isStorefrontLocale,
  storefrontLocales,
} from "../../../i18n/storefront-copy";
import {
  buildStorefrontSeoModel,
} from "../../../presentation/storefront/storefront-seo-model";

type DemoOrdersRouteProps =
  Readonly<{
    params:
      Promise<{
        locale: string;
      }>;
  }>;

export function generateStaticParams() {
  return storefrontLocales.map(
    (locale) => ({
      locale,
    }),
  );
}

export async function generateMetadata({
  params,
}: DemoOrdersRouteProps): Promise<Metadata> {
  const {
    locale,
  } = await params;

  if (
    !isStorefrontLocale(
      locale,
    )
  ) {
    return {};
  }

  const copy =
    getStorefrontOrdersCopy(
      locale,
    );

  const seo =
    buildStorefrontSeoModel(
      locale,
      `${copy.eyebrow} | VELORA`,
      copy.noPaymentNotice,
      "/orders",
    );

  return {
    title: seo.title,
    description:
      seo.description,
    alternates: {
      canonical:
        seo.canonicalPath,
      languages:
        seo.languageAlternates,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DemoOrdersRoute({
  params,
}: DemoOrdersRouteProps) {
  const {
    locale,
  } = await params;

  if (
    !isStorefrontLocale(
      locale,
    )
  ) {
    notFound();
  }

  return (
    <DemoOrdersPage
      locale={locale}
    />
  );
}