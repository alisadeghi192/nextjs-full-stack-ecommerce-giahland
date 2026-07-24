"use server";

import { IProductCardData } from "@/features/products/types/product.types";
import { PRODUCT_SORT_OPTIONS, PRODUCT_TABS, PRODUCTS_PER_PAGE } from "@/lib/constants";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

type Category = typeof PRODUCT_TABS[number]["id"];
type Sort = typeof PRODUCT_SORT_OPTIONS[number]["value"];

interface GetProductsParams {
  category?: Category;
  sort?: Sort;
  page?: number;
  limit?: number;
}

export async function getProducts({
  category = "all",
  sort = "newest",
  page = 1,
  limit = PRODUCTS_PER_PAGE,
}: GetProductsParams = {}) {
  await connectToDB();

  const filter: any = {};
  if (category === "discounted") {
    filter.discount = { $gt: 0 };
  } else if (category !== "all") {
    filter.category = category;
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
    Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select("name price image slug category discount potDimensions stock liked createdAt")
      .lean(),
    Product.countDocuments(filter),
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