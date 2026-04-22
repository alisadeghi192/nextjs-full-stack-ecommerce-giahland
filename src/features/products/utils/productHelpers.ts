import { fakeProducts } from "@/data/products";
import { ProductType } from "../types/product.types";

export const getLatestProducts = (
  products: ProductType[],
  category: string,
  count: number = 8,
) => {
  return products
    .filter((p) => p.category === category)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, count);
};

export const getAllProducts = (): ProductType[] => {
  return fakeProducts;
};

export const filterByCategory = (products: ProductType[], category: string) => {
  return products.filter((p) => p.category === category);
};
export const filterProductsByTab = (products: ProductType[], tab: string) => {
  if (tab === "all") return products;
  if (tab === "discounted") return products.filter((p) => p.discount > 0);
  return filterByCategory(products, tab); 
};

export const sortProducts = (products: ProductType[], sortBy: string) => {
  switch (sortBy) {
    case "price_asc":
      return [...products].sort((a, b) => a.price - b.price);
    case "price_desc":
      return [...products].sort((a, b) => b.price - a.price);
    case "newest":
      return [...products].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      );
    case "popular":
      return [...products].sort((a, b) => b.liked - a.liked);
    default:
      return products;
  }
};

export const paginateProducts = (
  products: ProductType[],
  page: number,
  pageSize: number = 12,
) => {
  const start = (page - 1) * pageSize;
  return products.slice(start, start + pageSize);
};

export const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};
