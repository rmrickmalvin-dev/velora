import {
  describe,
  expect,
  it,
} from "vitest";

import { createSlug } from "./slug";

describe("Slug", () => {
  it("normalizes text into a slug", () => {
    expect(
      createSlug(
        " Aster One X Pro ",
      ),
    ).toBe(
      "aster-one-x-pro",
    );
  });

  it("removes diacritics", () => {
    expect(
      createSlug(
        "Áudio Premium",
      ),
    ).toBe(
      "audio-premium",
    );
  });

  it("collapses separators", () => {
    expect(
      createSlug(
        "Aster___One   X---Pro",
      ),
    ).toBe(
      "aster-one-x-pro",
    );
  });

  it("rejects a value that becomes empty", () => {
    expect(() =>
      createSlug("!!!"),
    ).toThrowError(
      expect.objectContaining({
        code: "SLUG_EMPTY",
      }),
    );
  });

  it("rejects slugs above the maximum length", () => {
    expect(() =>
      createSlug(
        "a".repeat(97),
      ),
    ).toThrowError(
      expect.objectContaining({
        code:
          "SLUG_LENGTH_INVALID",
      }),
    );
  });
});