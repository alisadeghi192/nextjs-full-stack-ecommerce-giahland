"use client";

import FormField from "@/components/shared/ui/FormField";
import TextareaField from "@/components/shared/ui/TextareaField";
import { useState } from "react";
import {
  MdDescription,
  MdKeyboardArrowDown,
  MdTag,
  MdTitle,
} from "react-icons/md";

interface ArticleSeoFieldsProps {
  values: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function ArticleSeoFields({
  values,
  onChange,
}: ArticleSeoFieldsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const title = values.title || "";
  const description = values.description || "";
  const keywords = values.keywords || "";

  return (
    <div className="border-neutral4 rounded-xl border p-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-medium"
      >
        <span>⚙️ سئو (اختیاری)</span>
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
          <div className="space-y-3 mt-2">
            <FormField
              id="seo-title"
              name="seoTitle"
              label="عنوان سئو"
              type="text"
              icon={<MdTitle size={20} />}
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
            />

            <TextareaField
              id="seo-description"
              name="seoDescription"
              label="توضیحات سئو"
              rows={2}
              icon={<MdDescription size={20} />}
              value={description}
              onChange={(e) => onChange("description", e.target.value)}
            />

            <FormField
              id="seo-keywords"
              name="seoKeywords"
              label="کلمات کلیدی"
              type="text"
              icon={<MdTag size={20} />}
              value={keywords}
              onChange={(e) => onChange("keywords", e.target.value)}
            />
            <p className="text-neutral8 dark:text-text-dark text-xs">
              کلمات را با کاما (،) یا فاصله جدا کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}