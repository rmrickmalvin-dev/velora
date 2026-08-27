import {
  readFile,
  readdir,
} from "node:fs/promises";
import {
  join,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

async function listCssFiles(
  directory: string,
): Promise<
  readonly string[]
> {
  const entries =
    await readdir(
      directory,
      {
        withFileTypes:
          true,
      },
    );

  const files:
    string[] = [];

  for (const entry of entries) {
    const path =
      join(
        directory,
        entry.name,
      );

    if (
      entry.isDirectory()
    ) {
      files.push(
        ...await listCssFiles(
          path,
        ),
      );
    } else if (
      entry.isFile() &&
      entry.name.endsWith(
        ".css",
      )
    ) {
      files.push(
        path,
      );
    }
  }

  return files;
}

function getPrimaryRootBlock(
  source: string,
): string {
  const match =
    source.match(
      /:root\s*\{([\s\S]*?)\}/,
    );

  if (!match) {
    throw new Error(
      "Primary :root Design Token block not found.",
    );
  }

  return match[1];
}

function getTokenDefinitions(
  source: string,
): readonly string[] {
  return Array.from(
    source.matchAll(
      /(--velora-[a-z0-9-]+)\s*:/gi,
    ),
  ).map(
    (match) =>
      match[1],
  );
}

describe(
  "Design Token Reference Contract",
  () => {
    it("defines every referenced VELORA CSS variable in the primary token registry", async () => {
      const tokenSource =
        await readFile(
          join(
            process.cwd(),
            "src/styles/design-tokens.css",
          ),
          "utf8",
        );

      const rootBlock =
        getPrimaryRootBlock(
          tokenSource,
        );

      const definitions =
        new Set(
          getTokenDefinitions(
            rootBlock,
          ),
        );

      const cssFiles =
        await listCssFiles(
          join(
            process.cwd(),
            "src",
          ),
        );

      const missing =
        new Set<string>();

      for (
        const file of
        cssFiles
      ) {
        const content =
          await readFile(
            file,
            "utf8",
          );

        for (
          const match of
          content.matchAll(
            /var\((--velora-[a-z0-9-]+)/gi,
          )
        ) {
          if (
            !definitions.has(
              match[1],
            )
          ) {
            missing.add(
              match[1],
            );
          }
        }
      }

      expect(
        [...missing],
      ).toEqual([]);
    });

    it("keeps primary token definitions unique while allowing scoped overrides of registered tokens", async () => {
      const tokenSource =
        await readFile(
          join(
            process.cwd(),
            "src/styles/design-tokens.css",
          ),
          "utf8",
        );

      const rootBlock =
        getPrimaryRootBlock(
          tokenSource,
        );

      const primaryDefinitions =
        getTokenDefinitions(
          rootBlock,
        );

      expect(
        new Set(
          primaryDefinitions,
        ).size,
      ).toBe(
        primaryDefinitions.length,
      );

      const registered =
        new Set(
          primaryDefinitions,
        );

      const withoutPrimaryRoot =
        tokenSource.replace(
          /:root\s*\{[\s\S]*?\}/,
          "",
        );

      const scopedOverrides =
        getTokenDefinitions(
          withoutPrimaryRoot,
        );

      expect(
        scopedOverrides.filter(
          (token) =>
            !registered.has(
              token,
            ),
        ),
      ).toEqual([]);
    });

    it("includes the corrected intermediate color tokens", async () => {
      const tokenSource =
        await readFile(
          join(
            process.cwd(),
            "src/styles/design-tokens.css",
          ),
          "utf8",
        );

      expect(
        tokenSource,
      ).toContain(
        "--velora-gold-400",
      );

      expect(
        tokenSource,
      ).toContain(
        "--velora-ink-400",
      );

      expect(
        tokenSource,
      ).toContain(
        "--velora-gold-800",
      );
    });

    it("includes the corrected space-7 token", async () => {
      expect(
        await readFile(
          join(
            process.cwd(),
            "src/styles/design-tokens.css",
          ),
          "utf8",
        ),
      ).toContain(
        "--velora-space-7",
      );
    });
  },
);