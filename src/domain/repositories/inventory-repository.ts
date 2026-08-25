import type {
  Inventory,
} from "../entities/inventory";
import type {
  InventoryId,
  ProductVariantId,
} from "../types/identifiers";

export interface InventoryRepository {
  findById(
    id: InventoryId,
  ): Promise<Inventory | null>;

  findByProductVariantId(
    productVariantId: ProductVariantId,
  ): Promise<Inventory | null>;

  save(
    inventory: Inventory,
  ): Promise<void>;
}