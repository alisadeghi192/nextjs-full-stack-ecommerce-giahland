"use server";

import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

export async function getProductById(productId: string) {
  await connectToDB();
  const product = await Product.findById(productId).lean();

  if (!product) {
    return null;
  }

  return {
    ...product,
    _id: product._id.toString(),
  };
}