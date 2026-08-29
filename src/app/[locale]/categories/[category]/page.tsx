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
import {
  buildStorefrontSeoModel,
} from "../../../../presentation/storefront/storefront-seo-model";

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

  const seo =
    buildStorefrontSeoModel(
      locale,
      `${model.title} | VELORA`,
      model.body,
      `/categories/${category}`,
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
    openGraph:
      seo.openGraph,
    twitter:
      seo.twitter,
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