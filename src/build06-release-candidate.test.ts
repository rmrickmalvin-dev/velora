import {
  existsSync,
  readFileSync,
} from "node:fs";

import {
  describe,
  expect,
  it,
} from "vitest";

function read(
  path: string,
): string {
  return readFileSync(
    path,
    "utf8",
  );
}

describe(
  "BUILD 06 Release Candidate contract",
  () => {
    it("adds provider-neutral release scripts", () => {
      const packageJson =
        JSON.parse(
          read(
            "package.json",
          ),
        ) as {
          scripts:
            Record<
              string,
              string
            >;
        };

      expect(
        packageJson
          .scripts[
            "release:preflight"
          ],
      ).toBe(
        "node scripts/release-readiness.mjs",
      );

      expect(
        packageJson
          .scripts[
            "release:deploy-check"
          ],
      ).toContain(
        "--require-origin",
      );

      expect(
        packageJson
          .scripts[
            "release:candidate"
          ],
      ).toBe(
        "npm run quality && npm run release:preflight",
      );
    });

    it("keeps the public site origin blank in the committed environment template", () => {
      const environment =
        read(
          ".env.example",
        );

      expect(
        environment,
      ).toContain(
        "NEXT_PUBLIC_SITE_URL=",
      );

      expect(
        environment,
      ).not.toMatch(
        /NEXT_PUBLIC_SITE_URL=https?:\/\//,
      );
    });

    it("defines an explicit repository LF policy", () => {
      const attributes =
        read(
          ".gitattributes",
        );

      expect(
        attributes,
      ).toContain(
        "* text=auto eol=lf",
      );

      expect(
        attributes,
      ).toContain(
        "*.png binary",
      );
    });

    it("keeps Next platform-neutral and removes the generated placeholder comment", () => {
      const config =
        read(
          "next.config.ts",
        );

      expect(
        config,
      ).not.toContain(
        "config options here",
      );

      expect(
        config,
      ).not.toMatch(
        /\boutput\s*:/,
      );

      expect(
        config,
      ).not.toMatch(
        /\bassetPrefix\s*:/,
      );

      expect(
        config,
      ).not.toMatch(
        /\bbasePath\s*:/,
      );
    });

    it("requires a real origin only in strict deployment mode", () => {
      const script =
        read(
          "scripts/release-readiness.mjs",
        );

      expect(
        script,
      ).toContain(
        "--require-origin",
      );

      expect(
        script,
      ).toContain(
        "NEXT_PUBLIC_SITE_URL",
      );

      expect(
        script,
      ).toContain(
        "placeholder host",
      );
    });

    it("requires remote, upstream and clean tree in strict deployment mode", () => {
      const packageJson =
        JSON.parse(
          read(
            "package.json",
          ),
        ) as {
          scripts:
            Record<
              string,
              string
            >;
        };

      const deployCheck =
        packageJson
          .scripts[
            "release:deploy-check"
          ];

      expect(
        deployCheck,
      ).toContain(
        "--require-remote",
      );

      expect(
        deployCheck,
      ).toContain(
        "--require-upstream",
      );

      expect(
        deployCheck,
      ).toContain(
        "--require-clean",
      );
    });

    it("keeps the existing remote CI quality gate unchanged", () => {
      const workflow =
        read(
          ".github/workflows/quality.yml",
        );

      expect(
        workflow,
      ).toContain(
        "npm run quality",
      );

      expect(
        workflow,
      ).toContain(
        "npm ci --no-audit --no-fund",
      );
    });

    it("documents external release blockers without inventing a provider", () => {
      expect(
        existsSync(
          "docs/RELEASE.md",
        ),
      ).toBe(
        true,
      );

      const release =
        read(
          "docs/RELEASE.md",
        );

      expect(
        release,
      ).toContain(
        "Git remote",
      );

      expect(
        release,
      ).toContain(
        "NEXT_PUBLIC_SITE_URL",
      );

      expect(
        release,
      ).toContain(
        "deployment provider",
      );
    });
  },
);