"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ProductCardData } from "@/features/products/types/product.types";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import { User } from "@/lib/db/models/User";
import { revalidatePath } from "next/cache";

export async function toggleLike(productId: string) {
  const { user } = await getMeAction();
   if (!user || user.role !== "user") throw new Error("Unauthorized");

  await connectToDB();

  const currentUser = await User.findById(user._id);
  if (!currentUser) throw new Error("User not found");
  const wishlistStrings =
    currentUser.wishlist?.map((id: any) => id.toString()) || [];
  const isLiked = wishlistStrings.includes(productId);

  if (isLiked) {
    await User.findByIdAndUpdate(user._id, {
      $pull: { wishlist: productId },
    });
    await Product.findByIdAndUpdate(productId, {
      $inc: { liked: -1 },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { wishlist: productId },
    });
    await Product.findByIdAndUpdate(productId, {
      $inc: { liked: 1 },
    });
  }

  revalidatePath("/products");
  revalidatePath(`/products/${productId}`);
  return { success: true, isLiked: !isLiked };
}

export async function getUserWishlist(): Promise<ProductCardData[]> {
  const { user } = await getMeAction();
  if (!user || user.role !== "user") return [];

  await connectToDB();
  const currentUser = await User.findById(user._id).populate("wishlist");


   if (!currentUser?.wishlist || currentUser.wishlist.length === 0) return [];

  return currentUser.wishlist.map((product: any) => ({
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    image: product.image,
    slug: product.slug,
    category: product.category,
    discount: product.discount,
    potDimensions: product.potDimensions,
    stock: product.stock,
    liked: product.liked,
    createdAt: product.createdAt,
  })) as ProductCardData[];
}

export async function isProductLiked(productId: string): Promise<boolean> {
  const { user } = await getMeAction();
  if (!user || user.role !== "user") return false;

  await connectToDB();
  const currentUser = await User.findById(user._id).select("wishlist");
  const wishlistStrings =
    currentUser?.wishlist?.map((id: any) => id.toString()) || [];
  return wishlistStrings.includes(productId);
}

export async function getBulkLikeStatus(productIds: string[]): Promise<Record<string, boolean>> {
  const { user } = await getMeAction();
  if (!user || user.role !== "user") return {};

  await connectToDB();
  const currentUser = await User.findById(user._id).select("wishlist");
  const wishlistStrings =
    currentUser?.wishlist?.map((id: any) => id.toString()) || [];

  const result: Record<string, boolean> = {};
  productIds.forEach((id) => {
    result[id] = wishlistStrings.includes(id);
  });
  return result;
}