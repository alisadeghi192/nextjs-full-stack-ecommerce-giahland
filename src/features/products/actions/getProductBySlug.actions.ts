"use server";

import { IProductType } from "@/features/products/types/product.types";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";

export async function getProductBySlug(
  slug: string,
): Promise<IProductType | null> {
  await connectToDB();
  const product = await Product.findOne({ slug })
    .populate({
      path: "comments",
      match: { isApproved: true },
      populate: [
        {
          path: "user",
          select: "name avatar role",
        },
        {
          path: "reply.user",
          select: "name avatar role",
        },
      ],
    })
    .lean();

  if (!product) {
    return null;
  }
 return {
    _id: product._id.toString(),
    name: product.name,
    price: product.price,
    image: product.image,
    slug: product.slug,
    category: product.category,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    liked: product.liked,
    discount: product.discount,
    stock: product.stock,
    potMaterial: product.potMaterial,
    soilType: product.soilType,
    weight: product.weight,
    potDimensions: product.potDimensions,
    sunlight: product.sunlight,
    images: product.images || [],
    features: product.features,
    cares: product.cares,
    seo: product.seo,
    comments: (product.comments || []).map((comment: any) => ({
      _id: comment._id.toString(),
      user: {
        _id: comment.user?._id?.toString() || "",
        name: comment.user?.name || "",
        avatar: comment.user?.avatar || "/static/images/default-user.webp",
        role: comment.user?.role || "user",
      },
      text: comment.text,
      date: comment.date,
      reply: comment.reply
        ? {
            user: {
              _id: comment.reply.user?._id?.toString() || "",
              name: comment.reply.user?.name || "",
              avatar:
                comment.reply.user?.avatar ||
                "/static/images/default-user.webp",
              role: comment.reply.user?.role || "user",
            },
            text: comment.reply.text,
            date: comment.reply.date,
          }
        : undefined,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    })),
  } as IProductType;
}