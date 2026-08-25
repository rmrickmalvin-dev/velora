import {
  veloraSeed,
  type VeloraSeed,
} from "../../seed";
import {
  LocalCartRepository,
} from "./local-cart-repository";
import {
  LocalInventoryMovementRepository,
} from "./local-inventory-movement-repository";
import {
  LocalInventoryRepository,
} from "./local-inventory-repository";
import {
  LocalOrderRepository,
} from "./local-order-repository";
import {
  LocalProductCategoryRepository,
} from "./local-product-category-repository";
import {
  LocalProductMediaRepository,
} from "./local-product-media-repository";
import {
  LocalProductRepository,
} from "./local-product-repository";
import {
  LocalProductVariantRepository,
} from "./local-product-variant-repository";

export type LocalRepositories =
  Readonly<{
    productCategories:
      LocalProductCategoryRepository;
    products:
      LocalProductRepository;
    productVariants:
      LocalProductVariantRepository;
    productMedia:
      LocalProductMediaRepository;
    inventory:
      LocalInventoryRepository;
    inventoryMovements:
      LocalInventoryMovementRepository;
    carts:
      LocalCartRepository;
    orders:
      LocalOrderRepository;
  }>;

export function createLocalRepositories(
  seed: VeloraSeed =
    veloraSeed,
): LocalRepositories {
  return Object.freeze({
    productCategories:
      new LocalProductCategoryRepository(
        seed.categories,
      ),
    products:
      new LocalProductRepository(
        seed.products,
      ),
    productVariants:
      new LocalProductVariantRepository(
        seed.variants,
      ),
    productMedia:
      new LocalProductMediaRepository(
        seed.media,
      ),
    inventory:
      new LocalInventoryRepository(
        seed.inventory,
      ),
    inventoryMovements:
      new LocalInventoryMovementRepository(
        seed.inventoryMovements,
      ),
    carts:
      new LocalCartRepository(),
    orders:
      new LocalOrderRepository(),
  });
}