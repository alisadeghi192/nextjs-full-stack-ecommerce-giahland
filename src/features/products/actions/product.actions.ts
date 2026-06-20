"use server";

import {
  ProductCardData,
  ProductType,
} from "@/features/products/types/product.types";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

export async function getLatestProductsByCategory(
  category: "indoor" | "decoration" | "gift",
  limit: number = 8,
): Promise<ProductCardData[]> {
  await connectToDB();
  const products = await Product.find({ category })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("name price image slug category discount potDimensions stock")
    .lean();

  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  })) as ProductCardData[];
}

export async function getRelatedProducts(
  category: "indoor" | "decoration" | "gift",
  currentSlug: string,
  limit: number = 8,
): Promise<ProductCardData[]> {
  await connectToDB();
  const products = await Product.find({
    category,
    slug: { $ne: currentSlug },
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select(
      "name price image slug category discount potDimensions stock liked createdAt",
    )
    .lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  })) as ProductCardData[];
}

export async function getProductsCardByCategory(
  category: "indoor" | "decoration" | "gift",
): Promise<ProductCardData[]> {
  await connectToDB();
  const products = await Product.find({ category })
    .select("name price image slug category discount potDimensions stock")
    .lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  })) as ProductCardData[];
}

export async function getAllProductsCard(): Promise<ProductCardData[]> {
  await connectToDB();
  const products = await Product.find({})
    .select(
      "name price image slug category discount potDimensions stock liked createdAt",
    )
    .lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  })) as ProductCardData[];
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductType | null> {
  await connectToDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) return null;
  return { ...product, _id: product._id.toString() } as ProductType;
}
export async function searchProducts(query: string) {
  if (!query || query.trim().length < 1) return [];

  await connectToDB();

  const products = await Product.find({
    $or: [
      { name: { $regex: query } },
      { slug: { $regex: query, $options: "i" } },
    ],
  })
    .select("name slug category price image")
    .lean();

  return products.map((p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: p.price,
    image : p.image,
    _id: p._id.toString(),
  }));
}
