import {
  readFile,
} from "node:fs/promises";
import {
  join,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

async function source(
  relativePath: string,
) {
  return readFile(
    join(
      process.cwd(),
      relativePath,
    ),
    "utf8",
  );
}

describe(
  "BUILD 05 clean install and CI readiness",
  () => {
    it("uses the pinned Node version file in CI", async () => {
      const workflow =
        await source(
          ".github/workflows/quality.yml",
        );

      expect(workflow).toContain(
        "node-version-file: .nvmrc",
      );

      expect(
        await source(
          ".nvmrc",
        ),
      ).toContain(
        "24.13.0",
      );
    });

    it("aligns CI npm with the validated local npm version", async () => {
      expect(
        await source(
          ".github/workflows/quality.yml",
        ),
      ).toContain(
        "npm@11.6.2",
      );
    });

    it("uses npm ci as the CI dependency installation contract", async () => {
      expect(
        await source(
          ".github/workflows/quality.yml",
        ),
      ).toContain(
        "npm ci --no-audit --no-fund",
      );
    });

    it("installs the Chromium browser required by the quality harness", async () => {
      expect(
        await source(
          ".github/workflows/quality.yml",
        ),
      ).toContain(
        "playwright install --with-deps chromium",
      );
    });

    it("runs the canonical quality script in CI", async () => {
      const workflow =
        await source(
          ".github/workflows/quality.yml",
        );

      const packageJson =
        JSON.parse(
          await source(
            "package.json",
          ),
        ) as {
          scripts:
            Record<string, string>;
        };

      expect(workflow).toContain(
        "npm run quality",
      );

      expect(
        packageJson.scripts.quality,
      ).toBe(
        "npm run check && npm run test:e2e",
      );
    });

    it("documents the release origin without inventing a production host", async () => {
      const example =
        await source(
          ".env.example",
        );

      expect(example).toContain(
        "NEXT_PUBLIC_SITE_URL=",
      );

      expect(example).not.toContain(
        ".vercel.app",
      );
    });

    it("keeps the environment example trackable", async () => {
      expect(
        await source(
          ".gitignore",
        ),
      ).toContain(
        "!.env.example",
      );
    });

    it("keeps the package lock available for deterministic npm ci", async () => {
      const lock =
        JSON.parse(
          await source(
            "package-lock.json",
          ),
        ) as {
          lockfileVersion:
            number;
        };

      expect(
        lock.lockfileVersion,
      ).toBeGreaterThanOrEqual(
        3,
      );
    });
  },
);