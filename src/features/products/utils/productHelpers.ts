import { fakeProducts } from "@/data/products";
import { Product } from "../types/product.types";

export const getLatestProducts = (
  products: Product[],
  category: string,
  count: number = 8,
) => {
  return products
    .filter((p) => p.category === category)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, count);
};

export const getAllProducts = (): Product[] => {
  return fakeProducts;
};

export const filterByCategory = (products: Product[], category: string) => {
  return products.filter((p) => p.category === category);
};

export const sortProducts = (products: Product[], sortBy: string) => {
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
  products: Product[],
  page: number,
  pageSize: number = 12,
) => {
  const start = (page - 1) * pageSize;
  return products.slice(start, start + pageSize);
};

export const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};
