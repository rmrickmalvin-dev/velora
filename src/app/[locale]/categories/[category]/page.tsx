import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import {
  CategoryPage,
} from "../../../../components/commerce/category-page";
import {
  isStorefrontLocale,
} from "../../../../i18n/storefront-copy";
import {
  createStaticVeloraRuntime,
} from "../../../../infrastructure/composition/create-static-velora-runtime";
import {
  buildStorefrontCategoryModel,
  isStorefrontCategoryRouteKey,
  storefrontCategoryRouteKeys,
} from "../../../../presentation/storefront/storefront-category-model";

type CategoryRouteProps =
  Readonly<{
    params:
      Promise<{
        locale: string;
        category: string;
      }>;
  }>;

export function generateStaticParams() {
  return storefrontCategoryRouteKeys.map(
    (category) => ({
      category,
    }),
  );
}

export async function generateMetadata({
  params,
}: CategoryRouteProps): Promise<Metadata> {
  const {
    locale,
    category,
  } = await params;

  if (
    !isStorefrontLocale(
      locale,
    ) ||
    !isStorefrontCategoryRouteKey(
      category,
    )
  ) {
    return {};
  }

  const products =
    await createStaticVeloraRuntime()
      .application
      .listStorefrontProducts();

  const model =
    buildStorefrontCategoryModel(
      locale,
      category,
      products,
    );

  return {
    title:
      `${model.title} | VELORA`,
    description:
      model.body,
  };
}

export default async function CategoryRoute({
  params,
}: CategoryRouteProps) {
  const {
    locale,
    category,
  } = await params;

  if (
    !isStorefrontLocale(
      locale,
    ) ||
    !isStorefrontCategoryRouteKey(
      category,
    )
  ) {
    notFound();
  }

  const products =
    await createStaticVeloraRuntime()
      .application
      .listStorefrontProducts();

  return (
    <CategoryPage
      model={
        buildStorefrontCategoryModel(
          locale,
          category,
          products,
        )
      }
    />
  );
}