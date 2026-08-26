import type {
  ProductMedia,
} from "../../../domain/entities/product-media";
import type {
  ProductMediaRepository,
} from "../../../domain/repositories/product-media-repository";
import type {
  ProductId,
  ProductMediaId,
  ProductVariantId,
} from "../../../domain/types/identifiers";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateProductMedia,
} from "./domain-hydrators";
import {
  mergeById,
} from "./repository-utils";

export class PersistentProductMediaRepository
  implements ProductMediaRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
    private readonly baseline:
      readonly ProductMedia[] =
        [],
  ) {}

  async findById(
    id: ProductMediaId,
  ): Promise<ProductMedia | null> {
    const override =
      await this.provider.get<
        ProductMedia
      >(
        "productMedia",
        id,
      );

    if (override) {
      return hydrateProductMedia(
        override,
      );
    }

    const baseline =
      this.baseline.find(
        (item) =>
          item.id === id,
      );

    return baseline
      ? hydrateProductMedia(
          baseline,
        )
      : null;
  }

  async listByProductId(
    productId: ProductId,
  ): Promise<
    readonly ProductMedia[]
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

  async listByVariantId(
    variantId: ProductVariantId,
  ): Promise<
    readonly ProductMedia[]
  > {
    return Object.freeze(
      (
        await this.all()
      ).filter(
        (item) =>
          item.variantId ===
          variantId,
      ),
    );
  }

  async save(
    media: ProductMedia,
  ): Promise<void> {
    await this.provider.put(
      "productMedia",
      media,
    );
  }

  private async all(): Promise<
    readonly ProductMedia[]
  > {
    const overrides =
      (
        await this.provider.getAll<
          ProductMedia
        >(
          "productMedia",
        )
      ).map(
        hydrateProductMedia,
      );

    return mergeById(
      this.baseline.map(
        hydrateProductMedia,
      ),
      overrides,
    );
  }
}