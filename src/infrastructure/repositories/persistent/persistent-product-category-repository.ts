import type {
  ProductCategory,
} from "../../../domain/entities/product-category";
import type {
  ProductCategoryRepository,
} from "../../../domain/repositories/product-category-repository";
import type {
  ProductCategoryId,
} from "../../../domain/types/identifiers";
import type {
  Slug,
} from "../../../domain/value-objects/slug";
import type {
  PersistenceProvider,
} from "../../persistence/persistence-provider";
import {
  hydrateProductCategory,
} from "./domain-hydrators";
import {
  mergeById,
} from "./repository-utils";

export class PersistentProductCategoryRepository
  implements ProductCategoryRepository
{
  constructor(
    private readonly provider:
      PersistenceProvider,
    private readonly baseline:
      readonly ProductCategory[] =
        [],
  ) {}

  async findById(
    id: ProductCategoryId,
  ): Promise<ProductCategory | null> {
    const override =
      await this.provider.get<
        ProductCategory
      >(
        "productCategories",
        id,
      );

    if (override) {
      return hydrateProductCategory(
        override,
      );
    }

    const baseline =
      this.baseline.find(
        (item) =>
          item.id === id,
      );

    return baseline
      ? hydrateProductCategory(
          baseline,
        )
      : null;
  }

  async findBySlug(
    slug: Slug,
  ): Promise<ProductCategory | null> {
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
    readonly ProductCategory[]
  > {
    const overrides =
      (
        await this.provider.getAll<
          ProductCategory
        >(
          "productCategories",
        )
      ).map(
        hydrateProductCategory,
      );

    return mergeById(
      this.baseline.map(
        hydrateProductCategory,
      ),
      overrides,
    );
  }

  async save(
    category: ProductCategory,
  ): Promise<void> {
    await this.provider.put(
      "productCategories",
      category,
    );
  }
}