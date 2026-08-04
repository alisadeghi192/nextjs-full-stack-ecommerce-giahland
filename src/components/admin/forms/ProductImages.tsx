"use client";

import { UseFormSetValue } from "react-hook-form";
import ProductImageUploader from "./ProductImageUploader";

interface ProductImagesProps {
  setValue: UseFormSetValue<any>;
  defaultValues?: any;
}

export default function ProductImages({ setValue, defaultValues }: ProductImagesProps) {
  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      <ProductImageUploader
        label="تصویر اصلی"
        name="mainImage"
        value={defaultValues?.mainImage || null}
        onChange={(base64) => setValue("mainImage", base64 as any)}
        required
      />
      <ProductImageUploader
        label="تصویر گالری ۱"
        name="gallery1"
        value={defaultValues?.gallery1 || null}
        onChange={(base64) => setValue("gallery1", base64 as any)}
        required
      />
      <ProductImageUploader
        label="تصویر گالری ۲"
        name="gallery2"
        value={defaultValues?.gallery2 || null}
        onChange={(base64) => setValue("gallery2", base64 as any)}
        required
      />
      <ProductImageUploader
        label="تصویر گالری ۳"
        name="gallery3"
        value={defaultValues?.gallery3 || null}
        onChange={(base64) => setValue("gallery3", base64 as any)}
        required
      />
    </div>
  );
}