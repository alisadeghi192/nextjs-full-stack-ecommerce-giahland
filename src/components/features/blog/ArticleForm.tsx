"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import FormField from "@/components/shared/ui/FormField";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import TextareaField from "@/components/shared/ui/TextareaField";
import { useIsAdmin } from "@/features/auth/selectors/auth.selectors";
import { createArticleAction } from "@/features/blog/actions/createArticle.actions";
import type { ContentBlock } from "@/features/blog/types/blog.types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { MdDescription, MdKeyboardArrowDown, MdLink, MdTitle } from "react-icons/md";
import ArticleImageUploader from "./ArticleImageUploader";
import ArticleSeoFields from "./ArticleSeoFields";
import TiptapEditor from "./TiptapEditor";

const initialFormData = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  coverImage: null as string | null,
  mainImage: null as string | null,
  content: [] as ContentBlock[],
  seo: { title: "", description: "", keywords: "" },
};

export default function ArticleForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isAdmin = useIsAdmin();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("slug", formData.slug);
    formDataObj.append("excerpt", formData.excerpt);
    formDataObj.append("category", formData.category);
    formDataObj.append("content", JSON.stringify(formData.content));

    if (formData.coverImage) {
      formDataObj.append("coverImage", formData.coverImage);
    }
    if (formData.mainImage) {
      formDataObj.append("mainImage", formData.mainImage);
    }
    if (formData.seo?.title) formDataObj.append("seoTitle", formData.seo.title);
    if (formData.seo?.description) formDataObj.append("seoDescription", formData.seo.description);
    if (formData.seo?.keywords) formDataObj.append("seoKeywords", formData.seo.keywords);

    startTransition(async () => {
      const result = await createArticleAction(null, formDataObj);
      if (result.success) {
        toast.success(result.message || "مقاله با موفقیت ثبت شد!");
        router.push(isAdmin ? "/admin/articles" : "/user/articles");
      } else {
        if (result.errors) {
          const firstError = Object.values(result.errors).flat()[0];
          if (firstError) toast.error(firstError);
        } else if (result.message) {
          toast.error(result.message);
        }
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-neutral3 dark:border-neutral-100 rounded-2xl border bg-white dark:bg-shade5 transition-colors p-6 shadow-lg"
      noValidate
    >
      <div className="flex flex-col gap-y-4">
        <div className="-mb-2 flex items-start gap-x-4 gap-y-4 max-lg:flex-col">
          <div className="w-full">
            <FormField
              id="title"
              name="title"
              label="عنوان مقاله"
              type="text"
              icon={<MdTitle size={22} />}
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="w-full">
            <FormField
              id="slug"
              name="slug"
              label="اسلاگ (آدرس اینترنتی)"
              type="text"
              icon={<MdLink size={22} />}
              value={formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
            />
          </div>
        </div>

        <TextareaField
          id="excerpt"
          name="excerpt"
          label="خلاصه مقاله"
          rows={3}
          icon={<MdDescription size={22} />}
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
        />

        <div className="relative">
          <select
            required
            name="category"
            id="category"
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value as "care" | "health" | "styling")}
            className="border-neutral6 text-neutral11 focus:border-primary invalid:text-neutral9 w-full appearance-none rounded-xl border px-4 py-3 outline-0 transition-colors"
          >
            <option value="" disabled className="text-neutral9">
              دسته بندی:
            </option>
            <option value="care">نگهداری</option>
            <option value="health">آفت‌ها و بیماری‌ها</option>
            <option value="styling">چیدمان</option>
          </select>
          <MdKeyboardArrowDown className="text-primary pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2 transition-colors duration-200" />
        </div>

        <div className="flex w-full gap-x-4 *:basis-1/2 max-sm:flex-col max-sm:gap-y-2">
          <ArticleImageUploader
            label="عکس کارت مقاله"
            name="coverImage"
            value={formData.coverImage}
            onChange={(file) => handleChange("coverImage", file)}
            required
          />
          <ArticleImageUploader
            label="عکس بنر مقاله"
            name="mainImage"
            value={formData.mainImage}
            onChange={(file) => handleChange("mainImage", file)}
            required
          />
        </div>

        <div className="space-y-1">
          <SectionTitle title="محتوا" className="mb-2! text-sm" />
          <TiptapEditor
            name="content"
            value={formData.content}
            onChange={(blocks: ContentBlock[]) => handleChange("content", blocks)}
            required
          />
        </div>

        <ArticleSeoFields
          values={formData.seo || { title: "", description: "", keywords: "" }}
          onChange={handleSeoChange}
        />
        <div className="flex items-center justify-between gap-y-2 max-lg:gap-x-4 max-md:flex-col-reverse">
          <p className="text-sm text-yellow-700">
            ⚠️ مقاله پس از انتشار غیرقابل ویرایش است و فقط ادمین می تواند آن را حذف کند.
          </p>
          <PrimaryButton
            disabled={isPending}
            className="h-12 w-37.5 self-end text-lg max-md:w-full"
          >
            {isPending ? "در حال ثبت..." : "ثبت مقاله"}
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}