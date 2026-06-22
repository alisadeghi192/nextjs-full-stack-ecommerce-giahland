"use server";

import { ProductType } from "@/features/products/types/product.types";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

export async function getProductBySlug(
  slug: string,
): Promise<ProductType | null> {
  await connectToDB();
  const product = await Product.findOne({ slug }).lean();
  if (!product) {
    return null;
  }
  return { ...product, _id: product._id.toString() } as ProductType;
}
