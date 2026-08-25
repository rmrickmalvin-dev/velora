import type {
  ProductMedia,
} from "../entities/product-media";
import type {
  ProductId,
  ProductMediaId,
  ProductVariantId,
} from "../types/identifiers";

export interface ProductMediaRepository {
  findById(
    id: ProductMediaId,
  ): Promise<ProductMedia | null>;

  listByProductId(
    productId: ProductId,
  ): Promise<
    readonly ProductMedia[]
  >;

  listByVariantId(
    variantId: ProductVariantId,
  ): Promise<
    readonly ProductMedia[]
  >;

  save(
    media: ProductMedia,
  ): Promise<void>;
}