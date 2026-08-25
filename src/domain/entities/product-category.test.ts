import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createProductCategory,
} from "./product-category";

describe("ProductCategory", () => {
  it("creates a normalized category", () => {
    const category =
      createProductCategory({
        id:
          " category-smartphones ",
        slug:
          " Smartphones Premium ",
        name: " Smartphones ",
        description:
          " Mobile devices ",
      });

    expect(category).toEqual({
      id:
        "category-smartphones",
      slug:
        "smartphones-premium",
      name:
        "Smartphones",
      description:
        "Mobile devices",
    });
  });

  it("rejects an empty id", () => {
    expect(() =>
      createProductCategory({
        id: " ",
        slug: "smartphones",
        name: "Smartphones",
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
      createProductCategory({
        id:
          "category-smartphones",
        slug: "smartphones",
        name: " ",
      }),
    ).toThrowError(
      expect.objectContaining({
        code:
          "PRODUCT_CATEGORY_NAME_REQUIRED",
      }),
    );
  });

  it("creates an immutable category", () => {
    const category =
      createProductCategory({
        id:
          "category-smartphones",
        slug: "smartphones",
        name: "Smartphones",
      });

    expect(
      Object.isFrozen(category),
    ).toBe(true);
  });
});