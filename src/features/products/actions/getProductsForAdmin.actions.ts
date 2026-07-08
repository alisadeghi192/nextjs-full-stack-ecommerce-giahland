"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

interface GetProductsForAdminParams {
  page?: number;
  limit?: number;
  category?: string;
  sort?: string;
  search?: string;
}

export async function getProductsForAdmin({
  page = 1,
  limit = 10,
  category = "all",
  sort = "newest",
  search = "",
}: GetProductsForAdminParams = {}) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await connectToDB();

  const filter: any = {};
  if (category === "discounted") {
    filter.discount = { $gt: 0 };
  } else if (category !== "all") {
    filter.category = category;
  }
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  let sortOption: any = { createdAt: -1 };
  switch (sort) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "popular":
      sortOption = { liked: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products: products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    })),
    total,
    totalPages: Math.ceil(total / limit),
  };
}
