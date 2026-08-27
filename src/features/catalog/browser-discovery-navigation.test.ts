import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildBrowserDiscoveryUrl,
  parseBrowserDiscoveryState,
} from "./browser-discovery-navigation";

describe(
  "Browser Discovery Navigation",
  () => {
    it("defaults to an empty search and all Categories", () => {
      expect(
        parseBrowserDiscoveryState(
          "https://velora.test/pt-BR",
        ),
      ).toEqual({
        query: "",
        category:
          "all",
      });
    });

    it("reads a search query", () => {
      expect(
        parseBrowserDiscoveryState(
          "https://velora.test/en?q=Aster",
        ).query,
      ).toBe(
        "Aster",
      );
    });

    it("reads a supported Category", () => {
      expect(
        parseBrowserDiscoveryState(
          "https://velora.test/es?category=audio",
        ).category,
      ).toBe(
        "audio",
      );
    });

    it("falls back from an unknown Category", () => {
      expect(
        parseBrowserDiscoveryState(
          "https://velora.test/en?category=unknown",
        ).category,
      ).toBe(
        "all",
      );
    });

    it("writes a query without changing the locale path", () => {
      expect(
        buildBrowserDiscoveryUrl(
          "https://velora.test/pt-BR",
          {
            query:
              "Aster Air",
            category:
              "all",
          },
        ),
      ).toBe(
        "/pt-BR?q=Aster+Air",
      );
    });

    it("writes a Category query parameter", () => {
      expect(
        buildBrowserDiscoveryUrl(
          "https://velora.test/en",
          {
            query: "",
            category:
              "audio",
          },
        ),
      ).toBe(
        "/en?category=audio",
      );
    });

    it("removes empty query parameters", () => {
      expect(
        buildBrowserDiscoveryUrl(
          "https://velora.test/es?q=old",
          {
            query: "",
            category:
              "all",
          },
        ),
      ).toBe(
        "/es",
      );
    });

    it("preserves unrelated query parameters", () => {
      expect(
        buildBrowserDiscoveryUrl(
          "https://velora.test/en?ref=portfolio",
          {
            query:
              "Halo",
            category:
              "all",
          },
        ),
      ).toContain(
        "ref=portfolio",
      );
    });

    it("preserves the URL hash", () => {
      expect(
        buildBrowserDiscoveryUrl(
          "https://velora.test/en#catalog",
          {
            query:
              "Flux",
            category:
              "power",
          },
        ),
      ).toContain(
        "#catalog",
      );
    });

    it("does not create a Category parameter for all", () => {
      expect(
        buildBrowserDiscoveryUrl(
          "https://velora.test/en?category=audio",
          {
            query:
              "Aster",
            category:
              "all",
          },
        ),
      ).not.toContain(
        "category=",
      );
    });
  },
);