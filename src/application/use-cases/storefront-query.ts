import type {
  Inventory,
} from "../../domain/entities/inventory";
import type {
  Product,
} from "../../domain/entities/product";
import type {
  ProductMedia,
} from "../../domain/entities/product-media";
import type {
  ProductVariant,
} from "../../domain/entities/product-variant";
import type {
  InventoryRepository,
} from "../../domain/repositories/inventory-repository";
import type {
  ProductMediaRepository,
} from "../../domain/repositories/product-media-repository";
import type {
  ProductRepository,
} from "../../domain/repositories/product-repository";
import type {
  ProductVariantRepository,
} from "../../domain/repositories/product-variant-repository";
import type {
  Slug,
} from "../../domain/value-objects/slug";

export type StorefrontVariant =
  Readonly<{
    variant: ProductVariant;
    inventory: Inventory | null;
  }>;

export type StorefrontProduct =
  Readonly<{
    product: Product;
    variants:
      readonly StorefrontVariant[];
    media:
      readonly ProductMedia[];
  }>;

export type StorefrontQueryDependencies =
  Readonly<{
    products: ProductRepository;
    productVariants:
      ProductVariantRepository;
    productMedia:
      ProductMediaRepository;
    inventory:
      InventoryRepository;
  }>;

async function buildStorefrontProduct(
  dependencies:
    StorefrontQueryDependencies,
  product: Product,
): Promise<StorefrontProduct> {
  const variants =
    (
      await dependencies
        .productVariants
        .listByProductId(
          product.id,
        )
    ).filter(
      (variant) =>
        variant.status ===
        "ACTIVE",
    );

  const storefrontVariants =
    await Promise.all(
      variants.map(
        async (variant) =>
          Object.freeze({
            variant,
            inventory:
              await dependencies
                .inventory
                .findByProductVariantId(
                  variant.id,
                ),
          }),
      ),
    );

  const media =
    await dependencies
      .productMedia
      .listByProductId(
        product.id,
      );

  return Object.freeze({
    product,
    variants:
      Object.freeze(
        storefrontVariants,
      ),
    media:
      Object.freeze(
        [...media],
      ),
  });
}

export async function listStorefrontProducts(
  dependencies:
    StorefrontQueryDependencies,
): Promise<
  readonly StorefrontProduct[]
> {
  const products =
    (
      await dependencies
        .products
        .list()
    )
      .filter(
        (product) =>
          product.status ===
          "ACTIVE",
      )
      .sort((left, right) => {
        if (
          left.featured !==
          right.featured
        ) {
          return left.featured
            ? -1
            : 1;
        }

        return left.name.localeCompare(
          right.name,
        );
      });

  const result =
    await Promise.all(
      products.map(
        (product) =>
          buildStorefrontProduct(
            dependencies,
            product,
          ),
      ),
    );

  return Object.freeze(result);
}

export async function getStorefrontProductBySlug(
  dependencies:
    StorefrontQueryDependencies,
  slug: Slug,
): Promise<
  StorefrontProduct | null
> {
  const product =
    await dependencies
      .products
      .findBySlug(slug);

  if (
    !product ||
    product.status !==
      "ACTIVE"
  ) {
    return null;
  }

  return buildStorefrontProduct(
    dependencies,
    product,
  );
}