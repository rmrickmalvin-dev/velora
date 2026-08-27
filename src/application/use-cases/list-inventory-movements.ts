import type {
  InventoryMovement,
} from "../../domain/entities/inventory-movement";
import type {
  InventoryMovementRepository,
} from "../../domain/repositories/inventory-movement-repository";
import type {
  InventoryId,
} from "../../domain/types/identifiers";

export async function listInventoryMovements(
  movements:
    InventoryMovementRepository,
  inventoryId:
    InventoryId,
): Promise<
  readonly InventoryMovement[]
> {
  return movements
    .listByInventoryId(
      inventoryId,
    );
}