import {
  describe,
  expect,
  it,
} from "vitest";

import type { ProductStatus } from "../types/statuses";
import { createProduct } from "./product";

const validProduct = {
  id: "product-aster-one-x-pro",
  slug: "Aster One X Pro",
  name: "Aster One X Pro",
  brand: "Aster",
  model: "One X Pro",
  categoryId:
    "category-smartphones",
  status: "ACTIVE" as const,
};

describe("Product", () => {
  it("creates a product", () => {
    const product =
      createProduct(
        validProduct,
      );

    expect(product).toEqual({
      id:
        "product-aster-one-x-pro",
      slug:
        "aster-one-x-pro",
      name:
        "Aster One X Pro",
      brand:
        "Aster",
      model:
        "One X Pro",
      categoryId:
        "category-smartphones",
      status:
        "ACTIVE",
      featured:
        false,
    });
  });

  it("rejects an empty id", () => {
    expect(() =>
      createProduct({
        ...validProduct,
        id: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty category id", () => {
    expect(() =>
      createProduct({
        ...validProduct,
        categoryId: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_CATEGORY_ID_REQUIRED",
      }),
    );
  });

  it("rejects an empty name", () => {
    expect(() =>
      createProduct({
        ...validProduct,
        name: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_NAME_REQUIRED",
      }),
    );
  });

  it("rejects an unsupported status at runtime", () => {
    expect(() =>
      createProduct({
        ...validProduct,
        status:
          "BROKEN" as ProductStatus,
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_STATUS_INVALID",
      }),
    );
  });
});