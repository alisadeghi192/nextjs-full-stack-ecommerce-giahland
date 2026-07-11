"use server";

import { getMeAction } from "@/features/auth/actions/me.actions";
import { ProductFormSchema } from "@/features/products/schemas/product.schema";
import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import { mkdir, rm, stat, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";
import sharp from "sharp";

const isEqual = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export async function updateProductAction(prevState: any, formData: FormData) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "شما مجاز به ویرایش محصول نیستید.",
    };
  }

  const productId = formData.get("productId") as string;
  if (!productId) {
    return {
      success: false,
      message: "شناسه محصول الزامی است.",
    };
  }

  console.log(productId);

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const price = Number(formData.get("price"));
  const discount = Number(formData.get("discount") || 0);
  const stock = Number(formData.get("stock"));
  const category = formData.get("category") as string;

  const mainImage = formData.get("mainImage") as File | null;
  const gallery1 = formData.get("gallery1") as File | null;
  const gallery2 = formData.get("gallery2") as File | null;
  const gallery3 = formData.get("gallery3") as File | null;

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
    mainImage,
    gallery1,
    gallery2,
    gallery3,
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
  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    return {
      success: false,
      message: "محصول یافت نشد.",
    };
  }

  if (data.slug !== existingProduct.slug) {
    const slugExists = await Product.findOne({
      slug: data.slug,
      _id: { $ne: productId },
    });
    if (slugExists) {
      return {
        success: false,
        message: "این اسلاگ قبلاً استفاده شده است.",
      };
    }
  }

  const hasNewImages =
    mainImage instanceof File ||
    gallery1 instanceof File ||
    gallery2 instanceof File ||
    gallery3 instanceof File;
  const normalizeSeo = (seo: any) => {
    if (!seo) return { title: "", description: "", keywords: [] };
    return {
      title: seo.title || "",
      description: seo.description || "",
      keywords: seo.keywords
        ? Array.isArray(seo.keywords)
          ? seo.keywords
          : seo.keywords.split(/[،,、\s]+/).filter(Boolean)
        : [],
    };
  };

  const currentSeo = normalizeSeo(data.seo);
  const existingSeo = normalizeSeo(existingProduct.seo);

  const hasChanges =
    data.name !== existingProduct.name ||
    data.slug !== existingProduct.slug ||
    data.price !== existingProduct.price ||
    data.discount !== existingProduct.discount ||
    data.stock !== existingProduct.stock ||
    data.category !== existingProduct.category ||
    data.potMaterial !== existingProduct.potMaterial ||
    data.soilType !== existingProduct.soilType ||
    data.weight !== existingProduct.weight ||
    data.sunlight !== existingProduct.sunlight ||
    !isEqual(data.potDimensions, existingProduct.potDimensions) ||
    !isEqual(data.features, existingProduct.features) ||
    !isEqual(data.cares, existingProduct.cares) ||
    !isEqual(currentSeo, existingSeo) ||
    hasNewImages;

  if (!hasChanges) {
    return {
      success: false,
      message: "تغییری در اطلاعات محصول ایجاد نشده است.",
    };
  }

  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/products",
    data.category,
    data.slug,
  );
  await mkdir(uploadDir, { recursive: true });

  const saveImage = async (
    file: File | string | null,
    fileName: string,
  ): Promise<string | null> => {
    if (typeof file === "string") {
      return file;
    }

    if (!file || !(file instanceof File) || file.size === 0) {
      return null;
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
    const filePath = path.join(uploadDir, `${fileName}.webp`);
    await writeFile(filePath, webpBuffer);
    return `/uploads/products/${data.category}/${data.slug}/${fileName}.webp`;
  };

  const deleteFolderIfExists = async (folderPath: string) => {
    try {
      await stat(folderPath);
      await rm(folderPath, { recursive: true, force: true });
    } catch {}
  };

  if (
    data.slug !== existingProduct.slug ||
    data.category !== existingProduct.category
  ) {
    const oldPath = path.join(
      process.cwd(),
      "public/uploads/products",
      existingProduct.category,
      existingProduct.slug,
    );
    await deleteFolderIfExists(oldPath);
  }

  const mainImagePath = await saveImage(data.mainImage, "main");
  const gallery1Path = await saveImage(data.gallery1, "1");
  const gallery2Path = await saveImage(data.gallery2, "2");
  const gallery3Path = await saveImage(data.gallery3, "3");

  const imagesArray = [
    mainImagePath || existingProduct.image,
    gallery1Path || existingProduct.images?.[1] || null,
    gallery2Path || existingProduct.images?.[2] || null,
    gallery3Path || existingProduct.images?.[3] || null,
  ].filter((p): p is string => p !== null);

  const seoData = {
    title: data.seo?.title || "",
    description: data.seo?.description || "",
    keywords: data.seo?.keywords
      ? data.seo.keywords.split(/[،,、\s]+/).filter((k) => k.trim())
      : [],
    ogImage: mainImagePath || existingProduct.image || "",
  };

  await Product.findByIdAndUpdate(productId, {
    name: data.name,
    slug: data.slug,
    price: data.price,
    discount: data.discount,
    stock: data.stock,
    category: data.category,
    image: mainImagePath || existingProduct.image,
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

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.category}/${data.slug}`);

  return {
    success: true,
    message: "محصول با موفقیت ویرایش شد.",
  };
}
