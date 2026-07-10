"use client";

import FormField from "@/components/shared/ui/FormField";
import { ProductFormData } from "@/features/products/schemas/product.schema";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import {
  MdDescription,
  MdKeyboardArrowDown,
  MdTag,
  MdTitle,
} from "react-icons/md";

interface ProductSeoFieldsProps {
  register: UseFormRegister<ProductFormData>;
}

export default function ProductSeoFields({ register }: ProductSeoFieldsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-neutral4 rounded-xl border p-4 shadow-lg">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center cursor-pointer group justify-between text-sm font-medium"
      >
        <span className="group-hover:text-primary text-base">⚙️ سئو </span>
        <span
          className={`text-neutral8 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <MdKeyboardArrowDown className="text-primary pointer-events-none size-6 transition-colors duration-200" />
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3">
            <FormField
              id="seo-title"
              label="عنوان سئو"
              type="text"
              icon={<MdTitle size={20} />}
              {...register("seo.title")}
            />

            <FormField
              id="seo-description"
              label="توضیحات سئو"
              type="text"
              icon={<MdDescription size={20} />}
              {...register("seo.description")}
            />

            <FormField
              id="seo-keywords"
              label="کلمات کلیدی"
              type="text"
              icon={<MdTag size={20} />}
              {...register("seo.keywords")}
            />
            <p className="text-neutral8 text-xs">
              کلمات را با کاما (،) یا فاصله جدا کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}