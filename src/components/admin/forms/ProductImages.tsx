"use client";

import {
  ProductFormData,
  ProductFormDefaultValues,
} from "@/features/products/schemas/product.schema";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { UseFormSetValue } from "react-hook-form";
import ProductImageUploader from "./ProductImageUploader";

interface ProductImagesProps {
  setValue: UseFormSetValue<ProductFormData>;
  defaultValues?: ProductFormDefaultValues;
}

export default function ProductImages({
  setValue,
  defaultValues,
}: ProductImagesProps) {
  const isSidebarOpen = useIsSidebarOpen();
  return (
    <div
      className={`grid grid-cols-2 gap-4 ${isSidebarOpen ? "max-lg:grid-cols-1" : "max-md:grid-cols-1"}`}
    >
      <ProductImageUploader
        label="تصویر اصلی (برای نمایش بهتر ابعاد مربع باشد)"
        name="mainImage"
        value={(defaultValues as any)?.mainImage || null}
        onChange={(file) => setValue("mainImage", file as any)}
        required
      />

      <ProductImageUploader
        label="تصویر گالری ۱"
        name="gallery1"
        value={(defaultValues as any)?.gallery1 || null}
        onChange={(file) => setValue("gallery1", file as any)}
        required
      />
      <ProductImageUploader
        label="تصویر گالری ۲"
        name="gallery2"
        value={(defaultValues as any)?.gallery2 || null}
        onChange={(file) => setValue("gallery2", file as any)}
        required
      />
      <ProductImageUploader
        label="تصویر گالری ۳"
        name="gallery3"
        value={(defaultValues as any)?.gallery3 || null}
        onChange={(file) => setValue("gallery3", file as any)}
        required
      />
    </div>
  );
}
