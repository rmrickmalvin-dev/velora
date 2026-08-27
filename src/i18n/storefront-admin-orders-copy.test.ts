import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontAdminOrdersCopy,
} from "./storefront-admin-orders-copy";

describe(
  "Storefront Admin Orders Copy",
  () => {
    it("provides PT-BR Admin Orders title", () => {
      expect(
        getStorefrontAdminOrdersCopy(
          "pt-BR",
        ).title,
      ).toContain(
        "pedidos",
      );
    });

    it("provides English Domain transition guidance", () => {
      expect(
        getStorefrontAdminOrdersCopy(
          "en",
        ).body,
      ).toContain(
        "Domain",
      );
    });

    it("provides Spanish status filter copy", () => {
      expect(
        getStorefrontAdminOrdersCopy(
          "es",
        ).filterLabel,
      ).toContain(
        "estado",
      );
    });

    it("discloses that status is not payment capture", () => {
      expect(
        getStorefrontAdminOrdersCopy(
          "en",
        ).noPaymentNotice,
      ).toContain(
        "does not represent payment",
      );
    });

    it("provides explicit confirmation copy", () => {
      expect(
        getStorefrontAdminOrdersCopy(
          "en",
        ).confirm,
      ).toContain(
        "Confirm",
      );
    });

    it("provides terminal workflow copy", () => {
      expect(
        getStorefrontAdminOrdersCopy(
          "pt-BR",
        ).terminal.length,
      ).toBeGreaterThan(5);
    });

    it("localizes every Domain Order status", () => {
      expect(
        Object.keys(
          getStorefrontAdminOrdersCopy(
            "es",
          ).statusLabels,
        ),
      ).toHaveLength(6);
    });

    it("distinguishes guest and Customer identity labels", () => {
      const copy =
        getStorefrontAdminOrdersCopy(
          "en",
        );

      expect(
        copy.guest,
      ).not.toBe(
        copy.customer,
      );
    });
  },
);