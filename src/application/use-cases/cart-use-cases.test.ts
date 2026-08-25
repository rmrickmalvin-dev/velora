import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createInventory,
} from "../../domain/entities/inventory";
import {
  createProductVariant,
} from "../../domain/entities/product-variant";
import {
  BRL,
} from "../../domain/value-objects/currency-code";
import {
  createMoney,
} from "../../domain/value-objects/money";
import {
  createLocalRepositories,
} from "../../infrastructure/repositories/local";
import {
  addProductToCart,
  getCartSummary,
  removeProductFromCart,
  updateCartQuantity,
} from "./cart-use-cases";

describe(
  "Cart Application Use Cases",
  () => {
    it("creates a Cart and adds an available ProductVariant", async () => {
      const repositories =
        createLocalRepositories();

      const cart =
        await addProductToCart(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            productVariantId:
              "variant-aster-xp-256-graphite",
            quantity: 1,
          },
        );

      expect(
        cart.items,
      ).toHaveLength(1);

      expect(
        cart.items[0]
          .quantity,
      ).toBe(1);
    });

    it("uses the current ProductVariant price when creating CartItem", async () => {
      const repositories =
        createLocalRepositories();

      const variant =
        await repositories
          .productVariants
          .findById(
            "variant-aster-xp-256-graphite",
          );

      const cart =
        await addProductToCart(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            productVariantId:
              "variant-aster-xp-256-graphite",
            quantity: 1,
          },
        );

      expect(
        cart.items[0]
          .unitPrice,
      ).toEqual(
        variant?.price,
      );
    });

    it("merges repeated additions into the existing ProductVariant line", async () => {
      const repositories =
        createLocalRepositories();

      await addProductToCart(
        repositories,
        {
          cartId: "cart-1",
          cartItemId:
            "cart-item-1",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        },
      );

      const cart =
        await addProductToCart(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "ignored-new-id",
            productVariantId:
              "variant-aster-xp-256-graphite",
            quantity: 2,
          },
        );

      expect(
        cart.items,
      ).toHaveLength(1);

      expect(
        cart.items[0].id,
      ).toBe(
        "cart-item-1",
      );

      expect(
        cart.items[0]
          .quantity,
      ).toBe(3);
    });

    it("rejects adding more than available Inventory", async () => {
      const repositories =
        createLocalRepositories();

      await expect(
        addProductToCart(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            productVariantId:
              "variant-nivalis-fold-512-silver",
            quantity: 3,
          },
        ),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_STOCK_INSUFFICIENT",
      });
    });

    it("rejects a missing ProductVariant", async () => {
      const repositories =
        createLocalRepositories();

      await expect(
        addProductToCart(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            productVariantId:
              "missing-variant",
            quantity: 1,
          },
        ),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_VARIANT_NOT_FOUND",
      });
    });

    it("rejects an inactive ProductVariant", async () => {
      const repositories =
        createLocalRepositories();

      const current =
        await repositories
          .productVariants
          .findById(
            "variant-aster-air-128-sky",
          );

      expect(current).not.toBeNull();

      await repositories
        .productVariants
        .save(
          createProductVariant({
            id: current!.id,
            productId:
              current!.productId,
            sku: current!.sku,
            price:
              current!.price,
            status:
              "INACTIVE",
            attributes:
              current!.attributes,
          }),
        );

      await expect(
        addProductToCart(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            productVariantId:
              current!.id,
            quantity: 1,
          },
        ),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_VARIANT_UNAVAILABLE",
      });
    });

    it("updates Cart quantity when stock is sufficient", async () => {
      const repositories =
        createLocalRepositories();

      await addProductToCart(
        repositories,
        {
          cartId: "cart-1",
          cartItemId:
            "cart-item-1",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        },
      );

      const cart =
        await updateCartQuantity(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            quantity: 4,
          },
        );

      expect(
        cart.items[0]
          .quantity,
      ).toBe(4);
    });

    it("rejects Cart quantity updates above stock", async () => {
      const repositories =
        createLocalRepositories();

      await addProductToCart(
        repositories,
        {
          cartId: "cart-1",
          cartItemId:
            "cart-item-1",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        },
      );

      await expect(
        updateCartQuantity(
          repositories,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
            quantity: 99,
          },
        ),
      ).rejects.toMatchObject({
        code:
          "APPLICATION_STOCK_INSUFFICIENT",
      });
    });

    it("removes a CartItem through Application orchestration", async () => {
      const repositories =
        createLocalRepositories();

      await addProductToCart(
        repositories,
        {
          cartId: "cart-1",
          cartItemId:
            "cart-item-1",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 1,
        },
      );

      const cart =
        await removeProductFromCart(
          repositories.carts,
          {
            cartId: "cart-1",
            cartItemId:
              "cart-item-1",
          },
        );

      expect(
        cart.items,
      ).toHaveLength(0);
    });

    it("returns Cart summary with Money subtotal", async () => {
      const repositories =
        createLocalRepositories();

      await addProductToCart(
        repositories,
        {
          cartId: "cart-1",
          cartItemId:
            "cart-item-1",
          productVariantId:
            "variant-aster-xp-256-graphite",
          quantity: 2,
        },
      );

      const summary =
        await getCartSummary(
          repositories.carts,
          "cart-1",
        );

      expect(
        summary?.subtotal,
      ).toEqual(
        createMoney(
          999800,
          BRL,
        ),
      );
    });
  },
);