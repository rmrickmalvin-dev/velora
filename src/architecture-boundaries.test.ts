import {
  readdir,
  readFile,
} from "node:fs/promises";
import {
  join,
  relative,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

async function productionTsFiles(
  root: string,
): Promise<readonly string[]> {
  const result:
    string[] = [];

  async function visit(
    directory: string,
  ) {
    const entries =
      await readdir(
        directory,
        {
          withFileTypes: true,
        },
      );

    for (
      const entry
      of entries
    ) {
      const path =
        join(
          directory,
          entry.name,
        );

      if (entry.isDirectory()) {
        await visit(path);
        continue;
      }

      if (
        entry.isFile() &&
        entry.name.endsWith(
          ".ts",
        ) &&
        !entry.name.endsWith(
          ".test.ts",
        )
      ) {
        result.push(path);
      }
    }
  }

  await visit(root);

  return Object.freeze(
    result,
  );
}

async function violations(
  root: string,
  patterns:
    readonly RegExp[],
): Promise<
  readonly string[]
> {
  const files =
    await productionTsFiles(
      root,
    );

  const found:
    string[] = [];

  for (
    const file
    of files
  ) {
    const source =
      await readFile(
        file,
        "utf8",
      );

    if (
      patterns.some(
        (pattern) =>
          pattern.test(
            source,
          ),
      )
    ) {
      found.push(
        relative(
          process.cwd(),
          file,
        ),
      );
    }
  }

  return found;
}

describe(
  "CODAL dependency boundaries",
  () => {
    it("keeps Domain independent from Application, Infrastructure, React and Next", async () => {
      expect(
        await violations(
          join(
            process.cwd(),
            "src",
            "domain",
          ),
          [
            /from\s+["'][^"']*application/i,
            /from\s+["'][^"']*infrastructure/i,
            /from\s+["']react(?:\/|["'])/i,
            /from\s+["']next(?:\/|["'])/i,
          ],
        ),
      ).toEqual([]);
    });

    it("keeps Application independent from Infrastructure, React and Next", async () => {
      expect(
        await violations(
          join(
            process.cwd(),
            "src",
            "application",
          ),
          [
            /from\s+["'][^"']*infrastructure/i,
            /from\s+["']react(?:\/|["'])/i,
            /from\s+["']next(?:\/|["'])/i,
          ],
        ),
      ).toEqual([]);
    });
  },
);