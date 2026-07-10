"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import FormField from "@/components/shared/ui/FormField";
import { ProductFormData } from "@/features/products/schemas/product.schema";
import { UseFormRegister } from "react-hook-form";
import { FaWeight } from "react-icons/fa";
import { FaSunPlantWilt } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiPottedPlantBold } from "react-icons/pi";
import { RxDimensions } from "react-icons/rx";
interface ProductPhysicalInfoProps {
  register: UseFormRegister<ProductFormData>;
}

export default function ProductPhysicalInfo({
  register,
}: ProductPhysicalInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid max-md:grid-cols-1 gap-4 grid-cols-2 mt-2">
        <FormField
          icon={<PiPottedPlantBold  size={20} />}
          id="potMaterial"
          label="جنس گلدان"
          type="text"
          {...register("potMaterial")}
        />
        <FormField
          icon={<MdDriveFileRenameOutline size={20} />}
          id="soilType"
          label="نوع خاک"
          type="text"
          {...register("soilType")}
        />
        <FormField
          icon={<FaWeight size={20} />}
          id="weight"
          label="وزن (گرم)"
          type="number"
          {...register("weight", { valueAsNumber: true })}
        />
        <FormField
          icon={<FaSunPlantWilt size={20} />}
          id="sunlight"
          label="نور مورد نیاز"
          type="text"
          {...register("sunlight")}
        />
        <div className="md:col-span-2">
          <SectionTitle title="ابعاد گلدان (سانتی‌متر)" className="text-sm!" />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              icon={<RxDimensions  size={20} />}
              id="length"
              label="طول"
              type="number"
              {...register("potDimensions.length", { valueAsNumber: true })}
            />
            <FormField
              icon={<RxDimensions  size={20} />}
              id="width"
              label="عرض"
              type="number"
              {...register("potDimensions.width", { valueAsNumber: true })}
            />
            <FormField
              icon={<RxDimensions  size={20} />}
              id="height"
              label="ارتفاع"
              type="number"
              {...register("potDimensions.height", { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}