"use client";

import FormField from "@/components/shared/ui/FormField";
import { ProductFormData } from "@/features/products/schemas/product.schema";
import { toPersianNumber } from "@/lib/utils/format";
import { Control, useFieldArray } from "react-hook-form";
import { MdAdd, MdDelete, MdDriveFileRenameOutline } from "react-icons/md";

interface ProductFeaturesFieldsProps {
  control: Control<ProductFormData>;
  register: any;
}

export default function ProductFeaturesFields({
  control,
  register,
}: ProductFeaturesFieldsProps) {
  // ====== overview ======
  const {
    fields: overviewFields,
    append: appendOverview,
    remove: removeOverview,
  } = useFieldArray({
    control,
    name: "features.overview",
  });

  // ====== appearance ======
  const {
    fields: appearanceFields,
    append: appendAppearance,
    remove: removeAppearance,
  } = useFieldArray({
    control,
    name: "features.appearance",
  });

  // ====== warnings ======
  const {
    fields: warningsFields,
    append: appendWarnings,
    remove: removeWarnings,
  } = useFieldArray({
    control,
    name: "features.warnings",
  });

  // ====== propagation ======
  const {
    fields: propagationFields,
    append: appendPropagation,
    remove: removePropagation,
  } = useFieldArray({
    control,
    name: "features.propagation",
  });

  // ====== summary ======
  const {
    fields: summaryFields,
    append: appendSummary,
    remove: removeSummary,
  } = useFieldArray({
    control,
    name: "features.summary",
  });

  return (
    <div className="space-y-6">
      {/* ====== Overview ====== */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2 font-medium">معرفی کلی </h4>
            <p className="text-neutral8 dark:text-text-dark text-xs">حداقل ۱ مورد</p>
          </div>
          <button
            type="button"
            onClick={() => appendOverview("")}
            className="text-primary dark:text-text-dark hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <MdAdd className="size-5" />
            افزودن
          </button>
        </div>
        {overviewFields.map((field, index) => (
          <div
            key={field.id}
            className="mt-3 mb-2 flex w-full items-center justify-between gap-2"
          >
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`overview-${index}`}
                name={`features.overview.${index}`}
                label={`متن ${toPersianNumber(index + 1)}`}
                type="text"
                {...register(`features.overview.${index}`)}
              />
            </div>

            <button
              type="button"
              onClick={() => removeOverview(index)}
              className="text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-colors"
              disabled={overviewFields.length <= 1}
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        ))}
      </div>

      {/* ====== Appearance ====== */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2 font-medium">ویژگی‌های ظاهری</h4>
            <p className="text-neutral8 dark:text-text-dark text-xs">حداقل ۳ مورد</p>
          </div>
          <button
            type="button"
            onClick={() => appendAppearance("")}
            className="text-primary dark:text-text-dark hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <MdAdd className="size-5" />
            افزودن
          </button>
        </div>
        {appearanceFields.map((field, index) => (
          <div
            key={field.id}
            className="mt-3 mb-2 flex w-full items-center justify-between gap-2"
          >
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`appearance-${index}`}
                name={`features.appearance.${index}`}
                label={`متن ${toPersianNumber(index + 1)}`}
                type="text"
                {...register(`features.appearance.${index}`)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeAppearance(index)}
              className="text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-colors"
              disabled={appearanceFields.length <= 3}
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        ))}
      </div>

      {/* ====== Warnings ====== */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2 font-medium">نکات ویژه و هشدارها</h4>
            <p className="text-neutral8 dark:text-text-dark text-xs">حداقل ۳ مورد</p>
          </div>
          <button
            type="button"
            onClick={() => appendWarnings("")}
            className="text-primary dark:text-text-dark hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <MdAdd className="size-5" />
            افزودن
          </button>
        </div>
        {warningsFields.map((field, index) => (
          <div
            key={field.id}
            className="mt-3 mb-2 flex w-full items-center justify-between gap-2"
          >
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`warnings-${index}`}
                name={`features.warnings.${index}`}
                label={`متن ${toPersianNumber(index + 1)}`}
                type="text"
                {...register(`features.warnings.${index}`)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeWarnings(index)}
              className="text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-colors"
              disabled={warningsFields.length <= 3}
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        ))}
      </div>

      {/* ====== Propagation ====== */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2 font-medium">تکثیر</h4>
            <p className="text-neutral8 dark:text-text-dark text-xs">حداقل ۳ مورد</p>
          </div>
          <button
            type="button"
            onClick={() => appendPropagation("")}
            className="text-primary dark:text-text-dark hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <MdAdd className="size-5" />
            افزودن
          </button>
        </div>
        {propagationFields.map((field, index) => (
          <div
            key={field.id}
            className="mt-3 mb-2 flex w-full items-center justify-between gap-2"
          >
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`propagation-${index}`}
                name={`features.propagation.${index}`}
                label={`متن ${toPersianNumber(index + 1)}`}
                type="text"
                {...register(`features.propagation.${index}`)}
              />
            </div>
            <button
              type="button"
              onClick={() => removePropagation(index)}
              className="text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-colors"
              disabled={propagationFields.length <= 3}
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        ))}
      </div>

      {/* ====== Summary ====== */}
      <div className="border-neutral4 dark:border-neutral10 dark:shadow-shade6 rounded-xl border px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2 font-medium">جمع‌بندی</h4>
            <p className="text-neutral8 dark:text-text-dark text-xs">حداقل ۱ مورد</p>
          </div>
          <button
            type="button"
            onClick={() => appendSummary("")}
            className="text-primary dark:text-text-dark hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <MdAdd className="size-5" />
            افزودن
          </button>
        </div>
        {summaryFields.map((field, index) => (
          <div
            key={field.id}
            className="mt-3 mb-2 flex w-full items-center justify-between gap-2"
          >
            <div className="w-full">
              <FormField
                icon={<MdDriveFileRenameOutline size={20} />}
                id={`summary-${index}`}
                name={`features.summary.${index}`}
                label={`متن ${toPersianNumber(index + 1)}`}
                type="text"
                {...register(`features.summary.${index}`)}
              />
            </div>
            <button
              type="button"
              onClick={() => removeSummary(index)}
              className="text-error hover:bg-error/10 cursor-pointer rounded-lg p-2 transition-colors"
              disabled={summaryFields.length <= 1}
            >
              <MdDelete className="size-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
