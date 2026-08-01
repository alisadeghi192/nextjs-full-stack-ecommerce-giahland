"use client";

import FormField from "@/components/shared/ui/FormField";
import { ProductFormData } from "@/features/products/schemas/product.schema";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { UseFormRegister } from "react-hook-form";
import { MdDriveFileRenameOutline } from "react-icons/md";

interface ProductCareFieldsProps {
  register: UseFormRegister<ProductFormData>;
}

export default function ProductCareFields({
  register,
}: ProductCareFieldsProps) {
  // titles
  const lightTitles = ["نیاز نوری", "مکان مناسب", "نکته مهم"];
  const wateringTitles = ["قانون طلایی", "برنامه منظم", "هشدار مهم"];
  const soilTitles = ["ترکیب عالی", "زهکشی حیاتی", "تعویض گلدان"];
  const temperatureTitles = ["دمای ایده‌آل", "رطوبت مورد نیاز", "نکته فصلی"];
  const fertilizationTitles = ["زمان کوددهی", "نوع و غلظت", "بسامد مناسب"];

  const isSidebarOpen = useIsSidebarOpen();
  return (
    <div className="space-y-6">
      {/* light */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
        <h4 className="mb-4 font-medium">نور</h4>
        {lightTitles.map((title, index) => (
          <div
            key={index}
            className="mb-4 flex items-center gap-x-1.5 gap-y-2 max-lg:flex-col"
          >
            <div
              className={`max-lg:self-start ${isSidebarOpen ? "w-1/5 max-xl:w-1/3 max-lg:w-2/3" : "w-1/7 max-xl:w-1/5 max-lg:w-1/3  max-sm:w-2/3"}`}
            >
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`light-title-${index}`}
                label={"عنوان"}
                type="text"
                defaultValue={title}
                disabled={true}
                {...register(`cares.light.${index}.title`)}
              />
            </div>
            <span className="max-lg:hidden">:</span>
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`light-desc-${index}`}
                label={"توضیحات"}
                type="text"
                {...register(`cares.light.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* watering */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
        <h4 className="mb-4 font-medium">آبیاری</h4>
        {wateringTitles.map((title, index) => (
          <div key={index} className="mb-4 flex items-center gap-x-1.5 gap-y-2 max-lg:flex-col">
            <div className={`max-lg:self-start ${isSidebarOpen ? "w-1/5 max-xl:w-1/3 max-lg:w-2/3" : "w-1/7 max-xl:w-1/5 max-lg:w-1/3  max-sm:w-2/3"}`}>
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`watering-title-${index}`}
                label={"عنوان"}
                type="text"
                defaultValue={title}
                disabled={true}
                {...register(`cares.watering.${index}.title`)}
              />
            </div>
            <span className="max-lg:hidden">:</span>
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`watering-desc-${index}`}
                label={"توضیحات"}
                type="text"
                {...register(`cares.watering.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* soil */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
        <h4 className="mb-4 font-medium">خاک</h4>
        {soilTitles.map((title, index) => (
          <div key={index} className="mb-4 flex items-center gap-x-1.5 gap-y-2 max-lg:flex-col">
            <div className={`max-lg:self-start ${isSidebarOpen ? "w-1/5 max-xl:w-1/3 max-lg:w-2/3" : "w-1/7 max-xl:w-1/5 max-lg:w-1/3  max-sm:w-2/3"}`}>
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`soil-title-${index}`}
                label={"عنوان"}
                type="text"
                defaultValue={title}
                disabled={true}
                {...register(`cares.soil.${index}.title`)}
              />
            </div>
            <span className="max-lg:hidden">:</span>
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`soil-desc-${index}`}
                label={"توضیحات"}
                type="text"
                {...register(`cares.soil.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* temperature */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
        <h4 className="mb-4 font-medium">دما و رطوبت</h4>
        {temperatureTitles.map((title, index) => (
          <div key={index} className="mb-4 flex items-center gap-x-1.5 gap-y-2 max-lg:flex-col">
            <div className={`max-lg:self-start ${isSidebarOpen ? "w-1/5 max-xl:w-1/3 max-lg:w-2/3" : "w-1/7 max-xl:w-1/5 max-lg:w-1/3  max-sm:w-2/3"}`}>
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`temperature-title-${index}`}
                label={"عنوان"}
                type="text"
                defaultValue={title}
                disabled={true}
                {...register(`cares.temperature.${index}.title`)}
              />
            </div>
            <span className="max-lg:hidden">:</span>
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`temperature-desc-${index}`}
                label={"توضیحات"}
                type="text"
                {...register(`cares.temperature.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* fertilization */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
        <h4 className="mb-4 font-medium">کوددهی</h4>
        {fertilizationTitles.map((title, index) => (
          <div
            key={index}
            className="mb-4 flex items-center gap-x-1.5 gap-y-2 max-lg:flex-col"
          >
            <div className={`max-lg:self-start ${isSidebarOpen ? "w-1/5 max-xl:w-1/3 max-lg:w-2/3" : "w-1/7 max-xl:w-1/5 max-lg:w-1/3  max-sm:w-2/3"}`}>
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`fertilization-title-${index}`}
                label={`عنوان `}
                type="text"
                defaultValue={title}
                disabled={true}
                {...register(`cares.fertilization.${index}.title`)}
              />
            </div>
            <span className="max-lg:hidden">:</span>
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`fertilization-desc-${index}`}
                label={"توضیحات"}
                type="text"
                {...register(`cares.fertilization.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
