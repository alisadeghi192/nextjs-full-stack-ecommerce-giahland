"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import { rm, stat } from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import path from "path";

export async function deleteProductAction(productId: string) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به حذف محصول نیستید.",
    };
  }

  await connectToDB();
  const product = await Product.findById(productId);
  if (!product) {
    return {
      success: false,
      message: "محصول یافت نشد.",
    };
  }

  const category = product.category;
  const slug = product.slug;

  const uploadPath = path.join(
    process.cwd(),
    "public/uploads/products",
    category,
    slug,
  );

  const staticPath = path.join(
    process.cwd(),
    "public/static/images/products",
    category,
    slug,
  );

  const deleteFolderIfExists = async (folderPath: string) => {
    try {
      await stat(folderPath);
      await rm(folderPath, { recursive: true, force: true });
    } catch {}
  };

  await Promise.all([
    deleteFolderIfExists(uploadPath),
    deleteFolderIfExists(staticPath),
  ]);

  await Product.findByIdAndDelete(productId);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidateTag("home-products");
  revalidateTag("admin-stats");
  revalidateTag("products");
  return {
    success: true,
    message: "محصول و تمام تصاویر آن با موفقیت حذف شد.",
  };
}
