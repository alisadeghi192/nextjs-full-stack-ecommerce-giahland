import { ProductCardData } from "@/features/products/types/product.types";

export function filterProductsByTab(products: ProductCardData[], tab: string): ProductCardData[] {
  if (tab === "all") return products;
  if (tab === "discounted") return products.filter((p) => p.discount > 0);
  return products.filter((p) => p.category === tab);
}

export function sortProducts(products: ProductCardData[], sortBy: string): ProductCardData[] {
  const sorted = [...products];
  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "popular":
      return sorted.sort((a, b) => b.liked - a.liked);
    default:
      return sorted;
  }
}

export function paginateProducts<T>(products: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return products.slice(start, start + pageSize);
}