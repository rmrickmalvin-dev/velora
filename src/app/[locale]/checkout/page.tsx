import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import {
  CheckoutPage,
} from "../../../components/commerce/checkout-page";
import {
  getStorefrontCheckoutCopy,
} from "../../../i18n/storefront-checkout-copy";
import {
  isStorefrontLocale,
  storefrontLocales,
} from "../../../i18n/storefront-copy";
import {
  buildStorefrontSeoModel,
} from "../../../presentation/storefront/storefront-seo-model";

type CheckoutRouteProps =
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
}: CheckoutRouteProps): Promise<Metadata> {
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
    getStorefrontCheckoutCopy(
      locale,
    );

  const seo =
    buildStorefrontSeoModel(
      locale,
      `${copy.eyebrow} | VELORA`,
      copy.demoNotice,
      "/checkout",
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
    robots: seo.robots,
  };
}

export default async function CheckoutRoute({
  params,
}: CheckoutRouteProps) {
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
    <CheckoutPage
      locale={locale}
    />
  );
}