import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getVeloraSiteOrigin,
} from "./site-origin";

describe(
  "VELORA Site Origin",
  () => {
    it("returns null when no deployment origin is configured", () => {
      expect(
        getVeloraSiteOrigin(
          undefined,
        ),
      ).toBeNull();
    });

    it("normalizes an HTTPS deployment URL to its origin", () => {
      expect(
        getVeloraSiteOrigin(
          "https://velora.example/store",
        ),
      ).toBe(
        "https://velora.example",
      );
    });

    it("accepts an HTTP loopback origin for local quality tooling", () => {
      expect(
        getVeloraSiteOrigin(
          "http://127.0.0.1:3100/path",
        ),
      ).toBe(
        "http://127.0.0.1:3100",
      );
    });

    it("rejects invalid and non-HTTP origins", () => {
      expect(
        getVeloraSiteOrigin(
          "not-a-url",
        ),
      ).toBeNull();

      expect(
        getVeloraSiteOrigin(
          "ftp://velora.example",
        ),
      ).toBeNull();
    });
  },
);