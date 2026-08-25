import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createProductMedia,
} from "./product-media";

const validMedia = {
  id:
    "media-aster-xp-graphite-front",
  productId:
    "product-aster-one-x-pro",
  url:
    "/images/products/aster-one-x-pro/graphite-front.webp",
  alt:
    "Aster One X Pro Graphite front view",
};

describe("ProductMedia", () => {
  it("creates product-level media", () => {
    expect(
      createProductMedia(
        validMedia,
      ),
    ).toEqual({
      id:
        "media-aster-xp-graphite-front",
      productId:
        "product-aster-one-x-pro",
      url:
        "/images/products/aster-one-x-pro/graphite-front.webp",
      alt:
        "Aster One X Pro Graphite front view",
      position: 0,
    });
  });

  it("creates variant-level media", () => {
    const media =
      createProductMedia({
        ...validMedia,
        variantId:
          "variant-aster-xp-256-graphite",
        position: 2,
      });

    expect(
      media.variantId,
    ).toBe(
      "variant-aster-xp-256-graphite",
    );

    expect(
      media.position,
    ).toBe(2);
  });

  it("rejects an empty id", () => {
    expect(() =>
      createProductMedia({
        ...validMedia,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_MEDIA_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty product id", () => {
    expect(() =>
      createProductMedia({
        ...validMedia,
        productId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_MEDIA_PRODUCT_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty URL", () => {
    expect(() =>
      createProductMedia({
        ...validMedia,
        url: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_MEDIA_URL_REQUIRED",
      }),
    );
  });

  it("rejects an empty alt description", () => {
    expect(() =>
      createProductMedia({
        ...validMedia,
        alt: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_MEDIA_ALT_REQUIRED",
      }),
    );
  });

  it("rejects an invalid position", () => {
    expect(() =>
      createProductMedia({
        ...validMedia,
        position: -1,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_MEDIA_POSITION_INVALID",
      }),
    );
  });
});