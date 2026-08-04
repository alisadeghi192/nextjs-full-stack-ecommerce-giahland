"use client";

import FormField from "@/components/shared/ui/FormField";
import { ProductFormData } from "@/features/products/schemas/product.schema";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { UseFormRegister } from "react-hook-form";
import {
  MdCategory,
  MdInventory,
  MdLink,
  MdOutlineAttachMoney,
  MdPercent,
  MdTitle,
} from "react-icons/md";

interface ProductBasicInfoProps {
  register: UseFormRegister<ProductFormData>;
}

export default function ProductBasicInfo({ register }: ProductBasicInfoProps) {
  const isSidebarOpen = useIsSidebarOpen();
  return (
    <div className="space-y-4">
      <div
        className={`mt-2 grid grid-cols-2 gap-4 ${isSidebarOpen ? "max-lg:grid-cols-1" : "max-md:grid-cols-1"} `}
      >
        <FormField
          icon={<MdTitle size={22} />}
          id="name"
          label="نام محصول"
          type="text"
          {...register("name")}
        />
        <FormField
          icon={<MdLink size={22} />}
          id="slug"
          label="اسلاگ (آدرس اینترنتی)"
          type="text"
          {...register("slug")}
        />
        <FormField
          icon={<MdOutlineAttachMoney size={20} />}
          id="price"
          label="قیمت (تومان)"
          type="number"
          {...register("price")}
        />
        <FormField
          icon={<MdPercent size={20} />}
          id="discount"
          label="تخفیف (درصد)"
          type="number"
          {...register("discount")}
        />
        <FormField
          icon={<MdInventory size={20} />}
          id="stock"
          label="موجودی"
          type="number"
          {...register("stock")}
        />
        <div className="border-neutral6 focus-within:border-primary dark:focus:border-primary-dark group relative flex h-14 items-center gap-x-2 rounded-xl border px-3.75 transition-colors duration-200 max-sm:h-12">
          <MdCategory className="text-neutral9 dark:text-neutral5 group-focus-within:text-primary dark:group-focus-within:text-primary-dark relative z-10 size-5.5 transition-colors duration-200" />
          <select
            id="category"
            required
            defaultValue="-1"
            className="peer text-neutral11 focus-within:border-primary dark:focus:border-primary-dark dark:text-neutral5 transition-colors invalid:text-neutral9 dark:invalid:text-neutral8 flex-1 appearance-none border-0 outline-0"
            {...register("category")}
          >
            <option
              className="text-neutral9 dark:text-neutral5 dark:bg-shade2"
              value="-1"
              disabled
            >
              دسته‌بندی را انتخاب کنید
            </option>
            <option
              className="text-neutral11 dark:bg-shade3 dark:text-text-dark bg-white"
              value="indoor"
            >
              آپارتمانی
            </option>
            <option
              className="text-neutral11 dark:bg-shade3 dark:text-text-dark bg-white"
              value="decoration"
            >
              دکوراتیو
            </option>
            <option
              className="text-neutral11 dark:bg-shade3 dark:text-text-dark bg-white"
              value="gift"
            >
              کادویی
            </option>
          </select>
          <label
            htmlFor="category"
            className="text-neutral9 dark:text-neutral5 dark:bg-shade5 peer-focus:text-primary dark:peer-focus:text-primary-dark absolute right-10.25 rounded-2xl bg-white px-1 transition-all duration-300 peer-focus:right-4 peer-focus:-translate-y-7 peer-[:not(:placeholder-shown)]:right-4 peer-[:not(:placeholder-shown)]:-translate-y-7 max-sm:peer-focus:text-sm max-sm:peer-[:not(:placeholder-shown)]:text-sm"
          >
            دسته‌بندی
          </label>
        </div>
      </div>
    </div>
  );
}
