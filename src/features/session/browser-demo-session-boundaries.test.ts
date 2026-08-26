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
  "Browser Demo Session boundaries",
  () => {
    it("uses one explicit localStorage key", async () => {
      expect(
        await source(
          "src/features/session/browser-demo-session.ts",
        ),
      ).toContain(
        "velora.demo.session.v1",
      );
    });

    it("stores only demo role state in the session adapter", async () => {
      const content =
        await source(
          "src/features/session/browser-demo-session.ts",
        );

      expect(content).toContain(
        "DemoSessionRole",
      );

      expect(content).not.toContain(
        "password",
      );
    });

    it("uses GUEST as the server snapshot", async () => {
      expect(
        await source(
          "src/features/session/browser-demo-session.ts",
        ),
      ).toContain(
        "defaultDemoSessionRole",
      );
    });

    it("guards browser storage access", async () => {
      expect(
        await source(
          "src/features/session/browser-demo-session.ts",
        ),
      ).toContain(
        'typeof window ===',
      );
    });

    it("emits a same-document session event", async () => {
      expect(
        await source(
          "src/features/session/browser-demo-session.ts",
        ),
      ).toContain(
        "velora:session-changed",
      );
    });

    it("subscribes to cross-tab storage changes", async () => {
      expect(
        await source(
          "src/features/session/browser-demo-session.ts",
        ),
      ).toContain(
        '"storage"',
      );
    });

    it("does not import Domain persistence", async () => {
      const content =
        await source(
          "src/features/session/browser-demo-session.ts",
        );

      expect(content).not.toContain(
        "IndexedDbProvider",
      );

      expect(content).not.toContain(
        "Repository",
      );
    });

    it("removes persisted state when returning to GUEST", async () => {
      expect(
        await source(
          "src/features/session/browser-demo-session.ts",
        ),
      ).toContain(
        ".removeItem(",
      );
    });
  },
);