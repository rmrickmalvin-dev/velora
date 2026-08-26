import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import {
  DemoRoleAreaPage,
} from "../../../components/session/demo-role-area-page";
import {
  isStorefrontLocale,
  storefrontLocales,
} from "../../../i18n/storefront-copy";
import {
  buildDemoSessionMetadata,
} from "../../../features/session/demo-session-route-metadata";

type DemoSessionRouteProps =
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
}: DemoSessionRouteProps): Promise<Metadata> {
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

  return buildDemoSessionMetadata(
    locale,
    "account",
  );
}

export default async function DemoSessionRoute({
  params,
}: DemoSessionRouteProps) {
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
    <DemoRoleAreaPage
      locale={locale}
      area="CUSTOMER"
    />
  );
}