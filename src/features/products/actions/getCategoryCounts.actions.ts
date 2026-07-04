"use server";

import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

export async function getCategoryCounts() {
  await connectToDB();

  const [indoor, decoration, gift] = await Promise.all([
    Product.countDocuments({ category: "indoor" }),
    Product.countDocuments({ category: "decoration" }),
    Product.countDocuments({ category: "gift" }),
  ]);

  return {
    indoor,
    decoration,
    gift,
  };
}