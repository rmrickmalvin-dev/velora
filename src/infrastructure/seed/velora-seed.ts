import {
  createInventory,
  type Inventory,
} from "../../domain/entities/inventory";
import {
  createInventoryMovement,
  type InventoryMovement,
} from "../../domain/entities/inventory-movement";
import {
  createProductCategory,
  type ProductCategory,
} from "../../domain/entities/product-category";
import {
  createProductMedia,
  type ProductMedia,
} from "../../domain/entities/product-media";
import {
  createProductVariant,
  type ProductVariant,
} from "../../domain/entities/product-variant";
import {
  createProduct,
  type Product,
} from "../../domain/entities/product";
import {
  BRL,
} from "../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../domain/value-objects/money";

export type VeloraSeed = Readonly<{
  categories:
    readonly ProductCategory[];
  products:
    readonly Product[];
  variants:
    readonly ProductVariant[];
  media:
    readonly ProductMedia[];
  inventory:
    readonly Inventory[];
  inventoryMovements:
    readonly InventoryMovement[];
}>;

function freezeList<T>(
  items: T[],
): readonly T[] {
  return Object.freeze(items);
}

export function createVeloraSeed(): VeloraSeed {
  const categories =
    freezeList([
      createProductCategory({
        id: "category-smartphones",
        slug: "smartphones",
        name: "Smartphones",
        description:
          "Premium mobile devices for everyday performance.",
      }),
      createProductCategory({
        id: "category-audio",
        slug: "audio",
        name: "Audio",
        description:
          "Wireless audio for personal and professional routines.",
      }),
      createProductCategory({
        id: "category-power",
        slug: "power",
        name: "Power",
        description:
          "Charging and power accessories for mobile technology.",
      }),
      createProductCategory({
        id: "category-protection",
        slug: "protection",
        name: "Protection",
        description:
          "Cases and protective accessories for daily use.",
      }),
    ]);

  const products =
    freezeList([
      createProduct({
        id: "product-aster-one-x-pro",
        slug: "aster-one-x-pro",
        name: "Aster One X Pro",
        brand: "Aster",
        model: "One X Pro",
        categoryId:
          "category-smartphones",
        status: "ACTIVE",
        featured: true,
      }),
      createProduct({
        id: "product-aster-air",
        slug: "aster-air",
        name: "Aster Air",
        brand: "Aster",
        model: "Air",
        categoryId:
          "category-smartphones",
        status: "ACTIVE",
        featured: true,
      }),
      createProduct({
        id: "product-nivalis-fold-s",
        slug: "nivalis-fold-s",
        name: "Nivalis Fold S",
        brand: "Nivalis",
        model: "Fold S",
        categoryId:
          "category-smartphones",
        status: "ACTIVE",
        featured: true,
      }),
      createProduct({
        id: "product-halo-buds-pro",
        slug: "halo-buds-pro",
        name: "Halo Buds Pro",
        brand: "Halo",
        model: "Buds Pro",
        categoryId:
          "category-audio",
        status: "ACTIVE",
        featured: true,
      }),
      createProduct({
        id: "product-halo-studio",
        slug: "halo-studio",
        name: "Halo Studio",
        brand: "Halo",
        model: "Studio",
        categoryId:
          "category-audio",
        status: "ACTIVE",
      }),
      createProduct({
        id: "product-flux-gan-65w",
        slug: "flux-gan-65w",
        name: "Flux GaN 65W",
        brand: "Flux",
        model: "GaN 65W",
        categoryId:
          "category-power",
        status: "ACTIVE",
      }),
      createProduct({
        id: "product-flux-magdock",
        slug: "flux-magdock",
        name: "Flux MagDock",
        brand: "Flux",
        model: "MagDock",
        categoryId:
          "category-power",
        status: "ACTIVE",
      }),
      createProduct({
        id: "product-veil-shield-case",
        slug: "veil-shield-case",
        name: "Veil Shield Case",
        brand: "Veil",
        model: "Shield",
        categoryId:
          "category-protection",
        status: "ACTIVE",
      }),
    ]);

  const variants =
    freezeList([
      createProductVariant({
        id:
          "variant-aster-xp-256-graphite",
        productId:
          "product-aster-one-x-pro",
        sku:
          "VEL-ASTER-XP-256-GRA",
        price:
          createMoney(
            499900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "256 GB",
          color: "Graphite",
        },
      }),
      createProductVariant({
        id:
          "variant-aster-xp-256-pearl",
        productId:
          "product-aster-one-x-pro",
        sku:
          "VEL-ASTER-XP-256-PEA",
        price:
          createMoney(
            499900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "256 GB",
          color: "Pearl",
        },
      }),
      createProductVariant({
        id:
          "variant-aster-xp-512-graphite",
        productId:
          "product-aster-one-x-pro",
        sku:
          "VEL-ASTER-XP-512-GRA",
        price:
          createMoney(
            549900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "512 GB",
          color: "Graphite",
        },
      }),
      createProductVariant({
        id:
          "variant-aster-air-128-sky",
        productId:
          "product-aster-air",
        sku:
          "VEL-ASTER-AIR-128-SKY",
        price:
          createMoney(
            329900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "128 GB",
          color: "Sky",
        },
      }),
      createProductVariant({
        id:
          "variant-aster-air-256-pearl",
        productId:
          "product-aster-air",
        sku:
          "VEL-ASTER-AIR-256-PEA",
        price:
          createMoney(
            379900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "256 GB",
          color: "Pearl",
        },
      }),
      createProductVariant({
        id:
          "variant-nivalis-fold-256-black",
        productId:
          "product-nivalis-fold-s",
        sku:
          "VEL-NIVALIS-FOLD-256-BLK",
        price:
          createMoney(
            699900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "256 GB",
          color: "Obsidian",
        },
      }),
      createProductVariant({
        id:
          "variant-nivalis-fold-512-silver",
        productId:
          "product-nivalis-fold-s",
        sku:
          "VEL-NIVALIS-FOLD-512-SIL",
        price:
          createMoney(
            779900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          storage: "512 GB",
          color: "Silver",
        },
      }),
      createProductVariant({
        id:
          "variant-halo-buds-black",
        productId:
          "product-halo-buds-pro",
        sku:
          "VEL-HALO-BUDS-BLK",
        price:
          createMoney(
            89900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          color: "Obsidian",
          connection: "Bluetooth",
        },
      }),
      createProductVariant({
        id:
          "variant-halo-buds-pearl",
        productId:
          "product-halo-buds-pro",
        sku:
          "VEL-HALO-BUDS-PEA",
        price:
          createMoney(
            89900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          color: "Pearl",
          connection: "Bluetooth",
        },
      }),
      createProductVariant({
        id:
          "variant-halo-studio-graphite",
        productId:
          "product-halo-studio",
        sku:
          "VEL-HALO-STUDIO-GRA",
        price:
          createMoney(
            149900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          color: "Graphite",
          connection: "Bluetooth",
        },
      }),
      createProductVariant({
        id:
          "variant-flux-gan65-black",
        productId:
          "product-flux-gan-65w",
        sku:
          "VEL-FLUX-GAN65-BLK",
        price:
          createMoney(
            34900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          power: "65 W",
          color: "Graphite",
        },
      }),
      createProductVariant({
        id:
          "variant-flux-gan65-pearl",
        productId:
          "product-flux-gan-65w",
        sku:
          "VEL-FLUX-GAN65-PEA",
        price:
          createMoney(
            34900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          power: "65 W",
          color: "Pearl",
        },
      }),
      createProductVariant({
        id:
          "variant-flux-magdock-pearl",
        productId:
          "product-flux-magdock",
        sku:
          "VEL-FLUX-MAGDOCK-PEA",
        price:
          createMoney(
            27900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          power: "15 W",
          color: "Pearl",
        },
      }),
      createProductVariant({
        id:
          "variant-veil-shield-graphite",
        productId:
          "product-veil-shield-case",
        sku:
          "VEL-VEIL-SHIELD-XP-GRA",
        price:
          createMoney(
            15900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          compatibility:
            "Aster One X Pro",
          color: "Graphite",
        },
      }),
      createProductVariant({
        id:
          "variant-veil-shield-clear",
        productId:
          "product-veil-shield-case",
        sku:
          "VEL-VEIL-SHIELD-XP-CLR",
        price:
          createMoney(
            15900,
            BRL,
          ),
        status: "ACTIVE",
        attributes: {
          compatibility:
            "Aster One X Pro",
          color: "Clear",
        },
      }),
    ]);

  const media =
    freezeList([
      createProductMedia({
        id:
          "media-aster-xp-front",
        productId:
          "product-aster-one-x-pro",
        url:
          "/images/catalog/aster-one-x-pro/front.webp",
        alt:
          "Aster One X Pro front view",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-aster-xp-graphite",
        productId:
          "product-aster-one-x-pro",
        variantId:
          "variant-aster-xp-256-graphite",
        url:
          "/images/catalog/aster-one-x-pro/graphite.webp",
        alt:
          "Aster One X Pro in Graphite",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-aster-air-front",
        productId:
          "product-aster-air",
        url:
          "/images/catalog/aster-air/front.webp",
        alt:
          "Aster Air front view",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-aster-air-sky",
        productId:
          "product-aster-air",
        variantId:
          "variant-aster-air-128-sky",
        url:
          "/images/catalog/aster-air/sky.webp",
        alt:
          "Aster Air in Sky",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-nivalis-fold-front",
        productId:
          "product-nivalis-fold-s",
        url:
          "/images/catalog/nivalis-fold-s/front.webp",
        alt:
          "Nivalis Fold S front view",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-nivalis-fold-silver",
        productId:
          "product-nivalis-fold-s",
        variantId:
          "variant-nivalis-fold-512-silver",
        url:
          "/images/catalog/nivalis-fold-s/silver.webp",
        alt:
          "Nivalis Fold S in Silver",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-halo-buds-case",
        productId:
          "product-halo-buds-pro",
        url:
          "/images/catalog/halo-buds-pro/case.webp",
        alt:
          "Halo Buds Pro with charging case",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-halo-buds-pearl",
        productId:
          "product-halo-buds-pro",
        variantId:
          "variant-halo-buds-pearl",
        url:
          "/images/catalog/halo-buds-pro/pearl.webp",
        alt:
          "Halo Buds Pro in Pearl",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-halo-studio-front",
        productId:
          "product-halo-studio",
        url:
          "/images/catalog/halo-studio/front.webp",
        alt:
          "Halo Studio headphones front view",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-halo-studio-side",
        productId:
          "product-halo-studio",
        variantId:
          "variant-halo-studio-graphite",
        url:
          "/images/catalog/halo-studio/graphite.webp",
        alt:
          "Halo Studio headphones in Graphite",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-flux-gan65-front",
        productId:
          "product-flux-gan-65w",
        url:
          "/images/catalog/flux-gan-65w/front.webp",
        alt:
          "Flux GaN 65W charger",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-flux-gan65-pearl",
        productId:
          "product-flux-gan-65w",
        variantId:
          "variant-flux-gan65-pearl",
        url:
          "/images/catalog/flux-gan-65w/pearl.webp",
        alt:
          "Flux GaN 65W charger in Pearl",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-flux-magdock-front",
        productId:
          "product-flux-magdock",
        url:
          "/images/catalog/flux-magdock/front.webp",
        alt:
          "Flux MagDock wireless charger",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-flux-magdock-angle",
        productId:
          "product-flux-magdock",
        variantId:
          "variant-flux-magdock-pearl",
        url:
          "/images/catalog/flux-magdock/angle.webp",
        alt:
          "Flux MagDock angled view",
        position: 1,
      }),
      createProductMedia({
        id:
          "media-veil-shield-front",
        productId:
          "product-veil-shield-case",
        url:
          "/images/catalog/veil-shield-case/front.webp",
        alt:
          "Veil Shield Case front view",
        position: 0,
      }),
      createProductMedia({
        id:
          "media-veil-shield-clear",
        productId:
          "product-veil-shield-case",
        variantId:
          "variant-veil-shield-clear",
        url:
          "/images/catalog/veil-shield-case/clear.webp",
        alt:
          "Veil Shield Case in Clear",
        position: 1,
      }),
    ]);

  const stockByVariant =
    new Map<string, number>([
      [
        "variant-aster-xp-256-graphite",
        7,
      ],
      [
        "variant-aster-xp-256-pearl",
        6,
      ],
      [
        "variant-aster-xp-512-graphite",
        4,
      ],
      [
        "variant-aster-air-128-sky",
        11,
      ],
      [
        "variant-aster-air-256-pearl",
        8,
      ],
      [
        "variant-nivalis-fold-256-black",
        3,
      ],
      [
        "variant-nivalis-fold-512-silver",
        2,
      ],
      [
        "variant-halo-buds-black",
        18,
      ],
      [
        "variant-halo-buds-pearl",
        16,
      ],
      [
        "variant-halo-studio-graphite",
        9,
      ],
      [
        "variant-flux-gan65-black",
        24,
      ],
      [
        "variant-flux-gan65-pearl",
        22,
      ],
      [
        "variant-flux-magdock-pearl",
        27,
      ],
      [
        "variant-veil-shield-graphite",
        32,
      ],
      [
        "variant-veil-shield-clear",
        35,
      ],
    ]);

  const inventory =
    freezeList(
      variants.map(
        (variant) => {
          const quantityOnHand =
            stockByVariant.get(
              variant.id,
            );

          if (
            quantityOnHand ===
            undefined
          ) {
            throw new Error(
              `Missing seed stock for variant: ${variant.id}`,
            );
          }

          return createInventory({
            id:
              `inventory-${variant.id}`,
            productVariantId:
              variant.id,
            quantityOnHand,
          });
        },
      ),
    );

  const inventoryMovements =
    freezeList(
      inventory.map(
        (
          stock,
          index,
        ) =>
          createInventoryMovement({
            id:
              `movement-seed-${index + 1}`,
            inventoryId:
              stock.id,
            type: "ENTRY",
            delta:
              stock.quantityOnHand,
            reason:
              "Initial seed stock",
          }),
      ),
    );

  return Object.freeze({
    categories,
    products,
    variants,
    media,
    inventory,
    inventoryMovements,
  });
}

export const veloraSeed =
  createVeloraSeed();