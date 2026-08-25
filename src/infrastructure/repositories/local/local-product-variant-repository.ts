import type {
  ProductVariant,
} from "../../../domain/entities/product-variant";
import type {
  ProductVariantRepository,
} from "../../../domain/repositories/product-variant-repository";
import type {
  ProductId,
  ProductVariantId,
} from "../../../domain/types/identifiers";
import type {
  SKU,
} from "../../../domain/value-objects/sku";

export class LocalProductVariantRepository
  implements ProductVariantRepository
{
  private readonly items =
    new Map<
      ProductVariantId,
      ProductVariant
    >();

  constructor(
    initial:
      readonly ProductVariant[] =
        [],
  ) {
    for (const variant of initial) {
      this.items.set(
        variant.id,
        variant,
      );
    }
  }

  async findById(
    id: ProductVariantId,
  ): Promise<ProductVariant | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async findBySku(
    sku: SKU,
  ): Promise<ProductVariant | null> {
    for (
      const variant
      of this.items.values()
    ) {
      if (
        variant.sku === sku
      ) {
        return variant;
      }
    }

    return null;
  }

  async listByProductId(
    productId: ProductId,
  ): Promise<
    readonly ProductVariant[]
  > {
    return Object.freeze(
      Array.from(
        this.items.values(),
      ).filter(
        (variant) =>
          variant.productId ===
          productId,
      ),
    );
  }

  async save(
    variant: ProductVariant,
  ): Promise<void> {
    this.items.set(
      variant.id,
      variant,
    );
  }
}