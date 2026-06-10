"use server";

import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import { ProductType , ProductCardData } from "@/features/products/types/product.types";

export async function getLatestProductsByCategory(
  category: "indoor" | "decoration" | "gift",
  limit: number = 8
):Promise<ProductCardData[]> {
  await connectToDB();
  const products = await Product.find({ category })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("name price image slug category discount potDimensions stock") 
    .lean();

  return products.map((p) => ({ ...p, _id: p._id.toString()})) as ProductCardData[];
}

export async function getProductsByCategory(
  category: "indoor" | "decoration" | "gift"
): Promise<ProductType[]> {
  await connectToDB();
  const products = await Product.find({ category }).lean();
  return products.map((product) => ({ ...product, _id: product._id.toString() })) as ProductType[];

}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
  await connectToDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;
  return { ...product, _id: product._id.toString() } as ProductType;
  
}