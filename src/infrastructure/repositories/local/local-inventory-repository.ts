import type {
  Inventory,
} from "../../../domain/entities/inventory";
import type {
  InventoryRepository,
} from "../../../domain/repositories/inventory-repository";
import type {
  InventoryId,
  ProductVariantId,
} from "../../../domain/types/identifiers";

export class LocalInventoryRepository
  implements InventoryRepository
{
  private readonly items =
    new Map<
      InventoryId,
      Inventory
    >();

  constructor(
    initial:
      readonly Inventory[] =
        [],
  ) {
    for (const inventory of initial) {
      this.items.set(
        inventory.id,
        inventory,
      );
    }
  }

  async findById(
    id: InventoryId,
  ): Promise<Inventory | null> {
    return (
      this.items.get(id) ??
      null
    );
  }

  async findByProductVariantId(
    productVariantId: ProductVariantId,
  ): Promise<Inventory | null> {
    for (
      const inventory
      of this.items.values()
    ) {
      if (
        inventory.productVariantId ===
        productVariantId
      ) {
        return inventory;
      }
    }

    return null;
  }

  async save(
    inventory: Inventory,
  ): Promise<void> {
    this.items.set(
      inventory.id,
      inventory,
    );
  }
}