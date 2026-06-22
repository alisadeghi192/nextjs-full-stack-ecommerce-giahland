"use server";

import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

export async function searchProducts(query: string) {
  if (!query || query.trim().length < 1) {
    return [];
  }
  
  await connectToDB();

  const regexQuery = query.trim().replace(/\s+/g, "[-\\s]*");

  const products = await Product.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { slug: { $regex: regexQuery, $options: "i" } },
    ],
  })
    .select("name slug category price image")
    .lean();

  return products.map((p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: p.price,
    image: p.image,
    _id: p._id.toString(),
  }));
}
