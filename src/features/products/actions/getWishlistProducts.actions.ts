"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { IProductCardData } from "@/features/products/types/product.types";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import User from "@/lib/db/models/User";

interface GetWishlistProductsParams {
  sort?: "newest" | "price_asc" | "price_desc" | "popular";
  page?: number;
  limit?: number;
}

export async function getWishlistProducts({
  sort = "newest",
  page = 1,
  limit = PRODUCTS_PER_PAGE,
}: GetWishlistProductsParams = {}) {
  const { user } = await getMeAction();
  if (!user) {
    return { products: [], total: 0, totalPages: 0, page: 1 };
  }

  await connectToDB();

  const currentUser = await User.findById(user._id).select("wishlist").lean();
  const wishlistIds = currentUser?.wishlist || [];

  if (wishlistIds.length === 0) {
    return { products: [], total: 0, totalPages: 0, page: 1 };
  }

  let sortOption: any = { createdAt: -1 };
  switch (sort) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "newest":
      sortOption = { createdAt: -1 };
      break;
    case "popular":
      sortOption = { liked: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find({ _id: { $in: wishlistIds } })
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select("name price image slug category discount potDimensions stock liked createdAt")
      .lean(),
    Product.countDocuments({ _id: { $in: wishlistIds } }),
  ]);

  return {
    products: products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    })) as IProductCardData[],
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}