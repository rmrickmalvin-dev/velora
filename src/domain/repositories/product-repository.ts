import type {
  Product,
} from "../entities/product";
import type {
  ProductId,
} from "../types/identifiers";
import type {
  Slug,
} from "../value-objects/slug";

export interface ProductRepository {
  findById(
    id: ProductId,
  ): Promise<Product | null>;

  findBySlug(
    slug: Slug,
  ): Promise<Product | null>;

  list(): Promise<
    readonly Product[]
  >;

  save(
    product: Product,
  ): Promise<void>;
}