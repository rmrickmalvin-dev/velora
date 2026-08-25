import type {
  InventoryMovement,
} from "../entities/inventory-movement";
import type {
  InventoryId,
} from "../types/identifiers";

export interface InventoryMovementRepository {
  listByInventoryId(
    inventoryId: InventoryId,
  ): Promise<
    readonly InventoryMovement[]
  >;

  append(
    movement: InventoryMovement,
  ): Promise<void>;
}