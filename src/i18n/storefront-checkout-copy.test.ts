import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getStorefrontCheckoutCopy,
} from "./storefront-checkout-copy";

describe(
  "Storefront Checkout Copy",
  () => {
    it("provides a PT-BR checkout CTA", () => {
      expect(
        getStorefrontCheckoutCopy(
          "pt-BR",
        ).checkoutCta,
      ).toContain(
        "checkout",
      );
    });

    it("provides an English demo notice", () => {
      expect(
        getStorefrontCheckoutCopy(
          "en",
        ).demoNotice,
      ).toContain(
        "No charge",
      );
    });

    it("provides a Spanish checkout title", () => {
      expect(
        getStorefrontCheckoutCopy(
          "es",
        ).title,
      ).toContain(
        "Prepara",
      );
    });

    it("provides localized contact labels", () => {
      expect(
        getStorefrontCheckoutCopy(
          "en",
        ).email,
      ).toBe("Email");
    });

    it("provides localized delivery labels", () => {
      expect(
        getStorefrontCheckoutCopy(
          "pt-BR",
        ).city,
      ).toBe("Cidade");
    });

    it("states that the valid submission is local-only", () => {
      expect(
        getStorefrontCheckoutCopy(
          "en",
        ).submittedBody,
      ).toContain(
        "locally",
      );
    });

    it("provides an empty Cart state", () => {
      expect(
        getStorefrontCheckoutCopy(
          "es",
        ).emptyTitle,
      ).toContain(
        "vacio",
      );
    });

    it("provides localized validation feedback", () => {
      expect(
        getStorefrontCheckoutCopy(
          "pt-BR",
        ).errorRequired,
      ).toContain(
        "obrigatorio",
      );
    });

    it("provides a localized demo Order completion state", () => {
      expect(
        getStorefrontCheckoutCopy(
          "en",
        ).confirmationTitle,
      ).toContain(
        "completed",
      );
    });

    it("keeps completion language explicit about no charge", () => {
      expect(
        getStorefrontCheckoutCopy(
          "en",
        ).confirmationBody,
      ).toContain(
        "No charge",
      );
    });
  },
);