"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ProductFormSchema } from "@/features/products/schemas/product.schema";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import { revalidateTag } from "next/cache";

export async function createProductAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به ایجاد محصول نیستید.",
    };
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const discount = Number(formData.get("discount") || 0);
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;

  const mainImage = formData.get("mainImage") as string | null;
  const gallery1 = formData.get("gallery1") as string | null;
  const gallery2 = formData.get("gallery2") as string | null;
  const gallery3 = formData.get("gallery3") as string | null;

  const potMaterial = formData.get("potMaterial") as string;
  const soilType = formData.get("soilType") as string;
  const weight = Number(formData.get("weight"));
  const sunlight = formData.get("sunlight") as string;
  const potDimensions = JSON.parse(
    (formData.get("potDimensions") as string) || "{}",
  );
  const features = JSON.parse((formData.get("features") as string) || "{}");
  const cares = JSON.parse((formData.get("cares") as string) || "{}");
  const seoRaw = formData.get("seo")
    ? JSON.parse(formData.get("seo") as string)
    : undefined;

  const result = ProductFormSchema.safeParse({
    name,
    slug,
    price,
    discount,
    stock,
    category: category as "indoor" | "decoration" | "gift",
    mainImage: mainImage || undefined ,
    gallery1: gallery1 || undefined,
    gallery2: gallery2 || undefined,
    gallery3: gallery3 || undefined,
    potMaterial,
    soilType,
    weight,
    sunlight,
    potDimensions,
    features,
    cares,
    seo: seoRaw,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  await connectToDB();
  const existing = await Product.findOne({ slug: data.slug });
  if (existing) {
    return {
      success: false,
      message: "این اسلاگ قبلاً استفاده شده است.",
    };
  }

  const imagesArray = [mainImage, gallery1, gallery2, gallery3].filter(
    (p): p is string => p !== null && p !== undefined && p !== "",
  );

  const seoData = {
    title: data.seo?.title || "",
    description: data.seo?.description || "",
    keywords: data.seo?.keywords
      ? data.seo.keywords.split(/[،,、\s]+/).filter((k) => k.trim())
      : [],
    ogImage: mainImage || "",
  };

  const categoryType = data.category as "indoor" | "decoration" | "gift";

  await Product.create({
    name: data.name,
    slug: data.slug,
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    category: categoryType,
    image: mainImage || "",
    images: imagesArray,
    potMaterial: data.potMaterial,
    soilType: data.soilType,
    weight: data.weight,
    potDimensions: data.potDimensions,
    sunlight: data.sunlight,
    features: data.features,
    cares: data.cares,
    seo: seoData,
  });

  revalidateTag("home-products");
  revalidateTag("admin-stats");
  revalidateTag("products");
  return {
    success: true,
    message: "محصول با موفقیت ثبت شد.",
  };
}