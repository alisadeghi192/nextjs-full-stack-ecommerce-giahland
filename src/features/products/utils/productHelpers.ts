import { Product } from "../types/product.types";

export const getLatestProducts = (products: Product[], category: string, count: number = 8) => {
  return products
    .filter(p => p.category === category)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, count);
};