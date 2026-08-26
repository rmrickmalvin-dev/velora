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
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateProductVariant,
} from "./domain-hydrators";
import {
  mergeById,
} from "./repository-utils";

export class PersistentProductVariantRepository
  implements ProductVariantRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
    private readonly baseline:
      readonly ProductVariant[] =
        [],
  ) {}

  async findById(
    id: ProductVariantId,
  ): Promise<ProductVariant | null> {
    const override =
      await this.provider.get<
        ProductVariant
      >(
        "productVariants",
        id,
      );

    if (override) {
      return hydrateProductVariant(
        override,
      );
    }

    const baseline =
      this.baseline.find(
        (item) =>
          item.id === id,
      );

    return baseline
      ? hydrateProductVariant(
          baseline,
        )
      : null;
  }

  async findBySku(
    sku: SKU,
  ): Promise<ProductVariant | null> {
    const all =
      await this.all();

    return (
      all.find(
        (item) =>
          item.sku === sku,
      ) ?? null
    );
  }

  async listByProductId(
    productId: ProductId,
  ): Promise<
    readonly ProductVariant[]
  > {
    return Object.freeze(
      (
        await this.all()
      ).filter(
        (item) =>
          item.productId ===
          productId,
      ),
    );
  }

  async save(
    variant: ProductVariant,
  ): Promise<void> {
    await this.provider.put(
      "productVariants",
      variant,
    );
  }

  private async all(): Promise<
    readonly ProductVariant[]
  > {
    const overrides =
      (
        await this.provider.getAll<
          ProductVariant
        >(
          "productVariants",
        )
      ).map(
        hydrateProductVariant,
      );

    return mergeById(
      this.baseline.map(
        hydrateProductVariant,
      ),
      overrides,
    );
  }
}