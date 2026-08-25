import type {
  ProductCategory,
} from "../entities/product-category";
import type {
  ProductCategoryId,
} from "../types/identifiers";
import type {
  Slug,
} from "../value-objects/slug";

export interface ProductCategoryRepository {
  findById(
    id: ProductCategoryId,
  ): Promise<ProductCategory | null>;

  findBySlug(
    slug: Slug,
  ): Promise<ProductCategory | null>;

  list(): Promise<
    readonly ProductCategory[]
  >;

  save(
    category: ProductCategory,
  ): Promise<void>;
}