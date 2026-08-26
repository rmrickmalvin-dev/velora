import type {
  Product,
} from "../../../domain/entities/product";
import type {
  ProductRepository,
} from "../../../domain/repositories/product-repository";
import type {
  ProductId,
} from "../../../domain/types/identifiers";
import type {
  Slug,
} from "../../../domain/value-objects/slug";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateProduct,
} from "./domain-hydrators";
import {
  mergeById,
} from "./repository-utils";

export class PersistentProductRepository
  implements ProductRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
    private readonly baseline:
      readonly Product[] = [],
  ) {}

  async findById(
    id: ProductId,
  ): Promise<Product | null> {
    const override =
      await this.provider.get<
        Product
      >(
        "products",
        id,
      );

    if (override) {
      return hydrateProduct(
        override,
      );
    }

    const baseline =
      this.baseline.find(
        (item) =>
          item.id === id,
      );

    return baseline
      ? hydrateProduct(
          baseline,
        )
      : null;
  }

  async findBySlug(
    slug: Slug,
  ): Promise<Product | null> {
    const all =
      await this.list();

    return (
      all.find(
        (item) =>
          item.slug === slug,
      ) ?? null
    );
  }

  async list(): Promise<
    readonly Product[]
  > {
    const overrides =
      (
        await this.provider.getAll<
          Product
        >(
          "products",
        )
      ).map(
        hydrateProduct,
      );

    return mergeById(
      this.baseline.map(
        hydrateProduct,
      ),
      overrides,
    );
  }

  async save(
    product: Product,
  ): Promise<void> {
    await this.provider.put(
      "products",
      product,
    );
  }
}