"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";

import SectionTitle from "@/components/panel/SectionTitle";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { createProductAction } from "@/features/products/actions/createProduct.actions";
import {
  ProductFormData,
  ProductFormDefaultValues,
  ProductFormSchema,
} from "@/features/products/schemas/product.schema";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductCareFields from "./ProductCareFields";
import ProductFeaturesFields from "./ProductFeaturesFields";
import ProductImages from "./ProductImages";
import ProductPhysicalInfo from "./ProductPhysicalInfo";
import ProductSeoFields from "./ProductSeoFields";

interface ProductFormProps {
  defaultValues?: ProductFormDefaultValues;
  isEdit?: boolean;
  productId?: string;
}

type OpenSections = {
  basic: boolean;
  images: boolean;
  physical: boolean;
  features: boolean;
  cares: boolean;
  seo: boolean;
};

const getFirstError = (
  errors: FieldErrors<ProductFormData>,
): string | undefined => {
  const getAllErrors = (obj: any): string[] => {
    if (!obj) {
      return [];
    }
    if (obj.message && typeof obj.message === "string") {
      return [obj.message];
    }
    if (typeof obj === "object") {
      let errors: string[] = [];
      for (const key of Object.keys(obj)) {
        errors = [...errors, ...getAllErrors(obj[key])];
      }
      return errors;
    }
    return [];
  };

  const allErrors = getAllErrors(errors);
  return allErrors[0];
};

export default function ProductForm({
  defaultValues,
  isEdit = false,
  productId,
}: ProductFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductFormSchema) as any,
    defaultValues: defaultValues as any,
  });

  const [openSections, setOpenSections] = useState<OpenSections>({
    basic: false,
    images: false,
    physical: false,
    features: false,
    cares: false,
    seo: false,
  });

  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const onError = (errors: FieldErrors<ProductFormData>) => {
    const firstError = getFirstError(errors);
    if (firstError) {
      toast.error(firstError);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsPending(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("price", String(Number(data.price) || 0));
      formData.append("discount", String(Number(data.discount) || 0));
      formData.append("stock", String(Number(data.stock) || 0));
      formData.append("category", data.category);

      if (data.mainImage instanceof File) {
        formData.append("mainImage", data.mainImage);
      }
      if (data.gallery1 instanceof File) {
        formData.append("gallery1", data.gallery1);
      }
      if (data.gallery2 instanceof File) {
        formData.append("gallery2", data.gallery2);
      }
      if (data.gallery3 instanceof File) {
        formData.append("gallery3", data.gallery3);
      }

      formData.append("potMaterial", data.potMaterial);
      formData.append("soilType", data.soilType);
      formData.append("weight", String(Number(data.weight) || 0));
      formData.append("sunlight", data.sunlight);
      formData.append(
        "potDimensions",
        JSON.stringify({
          length: Number(data.potDimensions.length) || 0,
          width: Number(data.potDimensions.width) || 0,
          height: Number(data.potDimensions.height) || 0,
        }),
      );
      formData.append("features", JSON.stringify(data.features));
      formData.append("cares", JSON.stringify(data.cares));

      if (data.seo) {
        formData.append("seo", JSON.stringify(data.seo));
      }

      if (isEdit && productId) {
        formData.append("productId", productId);
      }

      const result = await createProductAction(null, formData);

      if (result?.success) {
        toast.success(result.message || "محصول با موفقیت ثبت شد.");
        router.push("/admin/products");
      } else if (result?.errors) {
        const firstError = Object.values(result.errors).flat()[0];
        if (firstError) {
          toast.error(String(firstError));
        }
      } else if (result?.message) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("خطا در ثبت محصول");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-4"
      noValidate
    >
      {/* product basic info */}
      <div className="border-neutral4 rounded-xl border p-4 shadow-lg">
        <button
          type="button"
          onClick={() => toggleSection("basic")}
          className="group flex w-full cursor-pointer items-center justify-between"
        >
          <SectionTitle
            title="اطلاعات پایه"
            className="group-hover:text-primary mb-0! transition-colors"
          />
          <MdKeyboardArrowDown
            className={`size-6 transition-transform duration-200 ${
              openSections.basic ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            openSections.basic
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ProductBasicInfo register={register} />
          </div>
        </div>
      </div>

      {/* product images */}
      <div className="border-neutral4 rounded-xl border p-4 shadow-lg">
        <button
          type="button"
          onClick={() => toggleSection("images")}
          className="group flex w-full cursor-pointer items-center justify-between"
        >
          <SectionTitle
            title="تصاویر محصول"
            className="group-hover:text-primary mb-0! transition-colors"
          />
          <MdKeyboardArrowDown
            className={`size-6 transition-transform duration-200 ${
              openSections.images ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            openSections.images
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ProductImages setValue={setValue} defaultValues={defaultValues} />
          </div>
        </div>
      </div>

      {/* product physical info */}

      <div className="border-neutral4 rounded-xl border p-4 shadow-lg">
        <button
          type="button"
          onClick={() => toggleSection("physical")}
          className="group flex w-full cursor-pointer items-center justify-between"
        >
          <SectionTitle
            title="مشخصات فیزیکی"
            className="group-hover:text-primary mb-0! transition-colors"
          />
          <MdKeyboardArrowDown
            className={`size-6 transition-transform duration-200 ${
              openSections.physical ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            openSections.physical
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ProductPhysicalInfo register={register} />
          </div>
        </div>
      </div>

      {/* product features */}
      <div className="border-neutral4 rounded-xl border p-4 shadow-lg">
        <button
          type="button"
          onClick={() => toggleSection("features")}
          className="group flex w-full cursor-pointer items-center justify-between"
        >
          <SectionTitle
            title="ویژگی‌ها"
            className="group-hover:text-primary mb-0! transition-colors"
          />
          <MdKeyboardArrowDown
            className={`size-6 transition-transform duration-200 ${
              openSections.features ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            openSections.features
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ProductFeaturesFields control={control} register={register} />
          </div>
        </div>
      </div>

      {/* product cares */}
      <div className="border-neutral4 rounded-xl border p-4 shadow-lg">
        <button
          type="button"
          onClick={() => toggleSection("cares")}
          className="group flex w-full cursor-pointer items-center justify-between"
        >
          <SectionTitle
            title="مراقبت‌ها"
            className="group-hover:text-primary mb-0! transition-colors"
          />
          <MdKeyboardArrowDown
            className={`size-6 transition-transform duration-200 ${
              openSections.cares ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ${
            openSections.cares
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ProductCareFields register={register} />
          </div>
        </div>
      </div>

      {/* SEO */}
      <ProductSeoFields register={register} />

      <div className="flex items-center justify-between gap-y-2 max-md:flex-col-reverse max-md:h-50">
        <p className="text-sm text-yellow-700 max-md:mb-auto">
          ⚠️ پس از ثبت، محصول قابل ویرایش است.
        </p>
        <PrimaryButton
          disabled={isPending}
          className="h-12 w-37.5 md:self-end text-lg max-md:fixed max-md:bottom-6 max-md:shadow-2xl max-md:shadow-primary max-md:w-8/10 max-md:mx-auto"
        >
          {isPending ? "در حال ثبت..." : isEdit ? "ویرایش محصول" : "ثبت محصول"}
        </PrimaryButton>
      </div>
    </form>
  );
}
