import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontCartCopy,
} from "./storefront-cart-copy";

describe(
  "Storefront Cart Copy",
  () => {
    it("provides PT-BR Cart label", () => {
      expect(
        getStorefrontCartCopy(
          "pt-BR",
        ).cartLabel,
      ).toBe("Carrinho");
    });

    it("provides English Cart label", () => {
      expect(
        getStorefrontCartCopy(
          "en",
        ).cartLabel,
      ).toBe("Cart");
    });

    it("provides Spanish Cart label", () => {
      expect(
        getStorefrontCartCopy(
          "es",
        ).cartLabel,
      ).toBe("Carrito");
    });

    it("provides localized add action", () => {
      expect(
        getStorefrontCartCopy(
          "en",
        ).addToCart,
      ).toBe(
        "Add to cart",
      );
    });

    it("provides localized success feedback", () => {
      expect(
        getStorefrontCartCopy(
          "pt-BR",
        ).added,
      ).toContain(
        "Adicionado",
      );
    });

    it("keeps an unavailable state", () => {
      expect(
        getStorefrontCartCopy(
          "es",
        ).unavailable,
      ).toBe(
        "No disponible",
      );
    });
  },
);