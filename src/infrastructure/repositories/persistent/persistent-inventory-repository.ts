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
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateInventory,
} from "./domain-hydrators";
import {
  mergeById,
} from "./repository-utils";

export class PersistentInventoryRepository
  implements InventoryRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
    private readonly baseline:
      readonly Inventory[] = [],
  ) {}

  async findById(
    id: InventoryId,
  ): Promise<Inventory | null> {
    const override =
      await this.provider.get<
        Inventory
      >(
        "inventory",
        id,
      );

    if (override) {
      return hydrateInventory(
        override,
      );
    }

    const baseline =
      this.baseline.find(
        (item) =>
          item.id === id,
      );

    return baseline
      ? hydrateInventory(
          baseline,
        )
      : null;
  }

  async findByProductVariantId(
    productVariantId: ProductVariantId,
  ): Promise<Inventory | null> {
    const all =
      await this.all();

    return (
      all.find(
        (item) =>
          item.productVariantId ===
          productVariantId,
      ) ?? null
    );
  }

  async save(
    inventory: Inventory,
  ): Promise<void> {
    await this.provider.put(
      "inventory",
      inventory,
    );
  }

  private async all(): Promise<
    readonly Inventory[]
  > {
    const overrides =
      (
        await this.provider.getAll<
          Inventory
        >(
          "inventory",
        )
      ).map(
        hydrateInventory,
      );

    return mergeById(
      this.baseline.map(
        hydrateInventory,
      ),
      overrides,
    );
  }
}