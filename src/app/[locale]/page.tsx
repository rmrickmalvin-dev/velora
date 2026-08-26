import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import {
  StorefrontShell,
} from "../../components/commerce/storefront-shell";
import {
  getStorefrontCopy,
  isStorefrontLocale,
} from "../../i18n/storefront-copy";
import {
  createStaticVeloraRuntime,
} from "../../infrastructure/composition/create-static-velora-runtime";
import {
  buildStorefrontHomeModel,
} from "../../presentation/storefront/storefront-home-model";

type LocalePageProps =
  Readonly<{
    params:
      Promise<{
        locale: string;
      }>;
  }>;

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
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
    getStorefrontCopy(
      locale,
    );

  return {
    title:
      copy.metadata.title,
    description:
      copy.metadata
        .description,
  };
}

export default async function LocalePage({
  params,
}: LocalePageProps) {
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

  const runtime =
    createStaticVeloraRuntime();

  const products =
    await runtime.application
      .listStorefrontProducts();

  const model =
    buildStorefrontHomeModel(
      locale,
      products,
    );

  return (
    <StorefrontShell
      model={model}
    />
  );
}