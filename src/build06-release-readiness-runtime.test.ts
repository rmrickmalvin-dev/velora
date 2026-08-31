import {
  execFileSync,
} from "node:child_process";
import process from "node:process";

import {
  describe,
  expect,
  it,
} from "vitest";

describe(
  "BUILD 06 direct release-readiness runtime",
  () => {
    it("resolves npm 11.6.2 without npm_execpath", () => {
      const environment = {
        ...process.env,
      };

      delete environment
        .npm_execpath;

      const output =
        execFileSync(
          process.execPath,
          [
            "scripts/release-readiness.mjs",
          ],
          {
            cwd:
              process.cwd(),
            encoding:
              "utf8",
            env:
              environment,
          },
        );

      expect(
        output,
      ).toContain(
        "[PASS] npm: 11.6.2",
      );

      expect(
        output,
      ).not.toContain(
        "[FAIL] npm:",
      );
    });
  },
);