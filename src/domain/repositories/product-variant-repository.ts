import type {
  ProductVariant,
} from "../entities/product-variant";
import type {
  ProductId,
  ProductVariantId,
} from "../types/identifiers";
import type {
  SKU,
} from "../value-objects/sku";

export interface ProductVariantRepository {
  findById(
    id: ProductVariantId,
  ): Promise<ProductVariant | null>;

  findBySku(
    sku: SKU,
  ): Promise<ProductVariant | null>;

  listByProductId(
    productId: ProductId,
  ): Promise<
    readonly ProductVariant[]
  >;

  save(
    variant: ProductVariant,
  ): Promise<void>;
}