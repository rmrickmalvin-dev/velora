import {
  describe,
  expect,
  it,
} from "vitest";

import { createSku } from "./sku";

describe("SKU", () => {
  it("normalizes spaces and underscores", () => {
    expect(
      createSku(
        " vl_aster xp 256 gra ",
      ),
    ).toBe(
      "VL-ASTER-XP-256-GRA",
    );
  });

  it("preserves an already valid SKU", () => {
    expect(
      createSku(
        "VL-ASTER-XP-512-PEA",
      ),
    ).toBe(
      "VL-ASTER-XP-512-PEA",
    );
  });

  it("rejects an empty SKU", () => {
    expect(() =>
      createSku(""),
    ).toThrowError(
      expect.objectContaining({
        code: "SKU_LENGTH_INVALID",
      }),
    );
  });

  it("rejects unsupported characters", () => {
    expect(() =>
      createSku(
        "VL/ASTER/XP",
      ),
    ).toThrowError(
      expect.objectContaining({
        code: "SKU_FORMAT_INVALID",
      }),
    );
  });

  it("collapses repeated separators", () => {
    expect(
      createSku(
        "VL---ASTER___XP",
      ),
    ).toBe(
      "VL-ASTER-XP",
    );
  });
});