import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import {
  ProductDetail,
} from "../../../../components/commerce/product-detail";
import {
  isStorefrontLocale,
} from "../../../../i18n/storefront-copy";
import {
  createStaticVeloraRuntime,
} from "../../../../infrastructure/composition/create-static-velora-runtime";
import {
  buildStorefrontProductDetailModel,
} from "../../../../presentation/storefront/storefront-product-detail-model";
import {
  createSlug,
} from "../../../../domain/value-objects/slug";
import {
  buildStorefrontSeoModel,
} from "../../../../presentation/storefront/storefront-seo-model";

type ProductPageProps =
  Readonly<{
    params:
      Promise<{
        locale: string;
        slug: string;
      }>;
  }>;

export async function generateStaticParams() {
  const products =
    await createStaticVeloraRuntime()
      .application
      .listStorefrontProducts();

  return products.map(
    (product) => ({
      slug:
        product.product.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const {
    locale,
    slug,
  } = await params;

  if (
    !isStorefrontLocale(
      locale,
    )
  ) {
    return {};
  }

  const product =
    await createStaticVeloraRuntime()
      .application
      .getStorefrontProductBySlug(
        createSlug(slug),
      );

  if (!product) {
    return {};
  }

  const seo =
    buildStorefrontSeoModel(
      locale,
      `${product.product.name} | VELORA`,
      `${product.product.brand} ${product.product.name} - VELORA`,
      `/products/${slug}`,
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

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const {
    locale,
    slug,
  } = await params;

  if (
    !isStorefrontLocale(
      locale,
    )
  ) {
    notFound();
  }

  const product =
    await createStaticVeloraRuntime()
      .application
      .getStorefrontProductBySlug(
        createSlug(slug),
      );

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      model={
        buildStorefrontProductDetailModel(
          locale,
          product,
        )
      }
    />
  );
}