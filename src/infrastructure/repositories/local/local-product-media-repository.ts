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

export class LocalProductMediaRepository
  implements ProductMediaRepository
{
  private readonly items =
    new Map<
      ProductMediaId,
      ProductMedia
    >();

  constructor(
    initial:
      readonly ProductMedia[] =
        [],
  ) {
    for (const media of initial) {
      this.items.set(
        media.id,
        media,
      );
    }
  }

  async findById(
    id: ProductMediaId,
  ): Promise<ProductMedia | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async listByProductId(
    productId: ProductId,
  ): Promise<
    readonly ProductMedia[]
  > {
    return Object.freeze(
      Array.from(
        this.items.values(),
      ).filter(
        (media) =>
          media.productId ===
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
      Array.from(
        this.items.values(),
      ).filter(
        (media) =>
          media.variantId ===
          variantId,
      ),
    );
  }

  async save(
    media: ProductMedia,
  ): Promise<void> {
    this.items.set(
      media.id,
      media,
    );
  }
}