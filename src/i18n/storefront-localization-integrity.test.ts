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
  "Storefront localization integrity",
  () => {
    it("restores PT-BR accents in Storefront identity copy", async () => {
      const content =
        await source(
          "src/i18n/storefront-copy.ts",
        );

      expect(
        content,
      ).toContain(
        "acess\\u00f3rios",
      );

      expect(
        content,
      ).toContain(
        "portf\\u00f3lio",
      );
    });

    it("restores Spanish orthography in Storefront identity copy", async () => {
      const content =
        await source(
          "src/i18n/storefront-copy.ts",
        );

      expect(
        content,
      ).toContain(
        "dise\\u00f1o",
      );

      expect(
        content,
      ).toContain(
        "m\\u00e1s clara",
      );
    });

    it("restores the PT-BR unavailable interaction state", async () => {
      expect(
        await source(
          "src/i18n/storefront-interaction-copy.ts",
        ),
      ).toContain(
        "Indispon\\u00edvel",
      );
    });

    it("restores PT-BR Cart error orthography", async () => {
      const content =
        await source(
          "src/i18n/storefront-cart-copy.ts",
        );

      expect(
        content,
      ).toContain(
        "N\\u00e3o foi poss\\u00edvel adicionar.",
      );
    });

    it("restores Spanish Cart accents", async () => {
      const content =
        await source(
          "src/i18n/storefront-cart-copy.ts",
        );

      expect(
        content,
      ).toContain(
        "Carrito vac\\u00edo",
      );

      expect(
        content,
      ).toContain(
        "art\\u00edculo",
      );
    });

    it("restores PT-BR Checkout accents", async () => {
      const content =
        await source(
          "src/i18n/storefront-checkout-copy.ts",
        );

      expect(
        content,
      ).toContain(
        "Endere\\u00e7o",
      );

      expect(
        content,
      ).toContain(
        "N\\u00e3o \\u00e9 poss\\u00edvel",
      );

      expect(
        content,
      ).toContain(
        "cobran\\u00e7a",
      );
    });

    it("restores Spanish Checkout accents", async () => {
      const content =
        await source(
          "src/i18n/storefront-checkout-copy.ts",
        );

      expect(
        content,
      ).toContain(
        "Direcci\\u00f3n",
      );

      expect(
        content,
      ).toContain(
        "demostraci\\u00f3n",
      );

      expect(
        content,
      ).toContain(
        "ning\\u00fan",
      );
    });

    it("keeps the known unaccented regression phrases out of localized production copy", async () => {
      const content =
        (
          await Promise.all(
            [
              "src/i18n/storefront-copy.ts",
              "src/i18n/storefront-interaction-copy.ts",
              "src/i18n/storefront-cart-copy.ts",
              "src/i18n/storefront-checkout-copy.ts",
            ].map(
              source,
            ),
          )
        ).join(
          "\n",
        );

      for (
        const forbidden of
        [
          "Smartphones e acessorios selecionados",
          '"Indisponivel"',
          "Nao foi possivel adicionar.",
          "Carrito vacio",
          '"articulo"',
          '"articulos"',
          '"Endereco"',
          "Nao e possivel continuar",
          '"Direccion"',
          '"Codigo postal"',
          "Validar datos de demostracion",
          "El carrito necesita revision.",
        ]
      ) {
        expect(
          content,
        ).not.toContain(
          forbidden,
        );
      }
    });
  },
);