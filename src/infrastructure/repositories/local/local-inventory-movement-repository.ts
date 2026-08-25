import type {
  InventoryMovement,
} from "../../../domain/entities/inventory-movement";
import type {
  InventoryMovementRepository,
} from "../../../domain/repositories/inventory-movement-repository";
import type {
  InventoryId,
} from "../../../domain/types/identifiers";

export class LocalInventoryMovementRepository
  implements InventoryMovementRepository
{
  private readonly items:
    InventoryMovement[];

  constructor(
    initial:
      readonly InventoryMovement[] =
        [],
  ) {
    this.items = [
      ...initial,
    ];
  }

  async listByInventoryId(
    inventoryId: InventoryId,
  ): Promise<
    readonly InventoryMovement[]
  > {
    return Object.freeze(
      this.items.filter(
        (movement) =>
          movement.inventoryId ===
          inventoryId,
      ),
    );
  }

  async append(
    movement: InventoryMovement,
  ): Promise<void> {
    this.items.push(
      movement,
    );
  }
}