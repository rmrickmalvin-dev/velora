import {
  veloraSeed,
  type VeloraSeed,
} from "../../seed";
import {
  IndexedDbProvider,
} from "../../persistence/indexeddb-provider";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  persistenceStoreNames,
} from "../../persistence/persistence-provider";
import {
  PersistentCartRepository,
} from "./persistent-cart-repository";
import {
  PersistentInventoryMovementRepository,
} from "./persistent-inventory-movement-repository";
import {
  PersistentInventoryRepository,
} from "./persistent-inventory-repository";
import {
  PersistentOrderRepository,
} from "./persistent-order-repository";
import {
  PersistentProductCategoryRepository,
} from "./persistent-product-category-repository";
import {
  PersistentProductMediaRepository,
} from "./persistent-product-media-repository";
import {
  PersistentProductRepository,
} from "./persistent-product-repository";
import {
  PersistentProductVariantRepository,
} from "./persistent-product-variant-repository";

export type PersistentRepositories =
  Readonly<{
    productCategories:
      PersistentProductCategoryRepository;
    products:
      PersistentProductRepository;
    productVariants:
      PersistentProductVariantRepository;
    productMedia:
      PersistentProductMediaRepository;
    inventory:
      PersistentInventoryRepository;
    inventoryMovements:
      PersistentInventoryMovementRepository;
    carts:
      PersistentCartRepository;
    orders:
      PersistentOrderRepository;
  }>;

export function createPersistentRepositories(
  provider:
    PersistenceProvider,
  seed: VeloraSeed =
    veloraSeed,
): PersistentRepositories {
  return Object.freeze({
    productCategories:
      new PersistentProductCategoryRepository(
        provider,
        seed.categories,
      ),
    products:
      new PersistentProductRepository(
        provider,
        seed.products,
      ),
    productVariants:
      new PersistentProductVariantRepository(
        provider,
        seed.variants,
      ),
    productMedia:
      new PersistentProductMediaRepository(
        provider,
        seed.media,
      ),
    inventory:
      new PersistentInventoryRepository(
        provider,
        seed.inventory,
      ),
    inventoryMovements:
      new PersistentInventoryMovementRepository(
        provider,
        seed.inventoryMovements,
      ),
    carts:
      new PersistentCartRepository(
        provider,
      ),
    orders:
      new PersistentOrderRepository(
        provider,
      ),
  });
}

export function createBrowserRepositories(
  databaseName =
    "velora-demo",
): PersistentRepositories {
  return createPersistentRepositories(
    new IndexedDbProvider({
      databaseName,
    }),
  );
}

export async function resetPersistentOverrides(
  provider:
    PersistenceProvider,
): Promise<void> {
  for (
    const store
    of persistenceStoreNames
  ) {
    await provider.clear(store);
  }
}