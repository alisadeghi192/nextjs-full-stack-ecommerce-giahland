import { z } from "zod";

const isValidImage = (val: unknown): boolean => {
  if (typeof val === "string" && val.startsWith("data:image/")) {
    return val.length > 0;
  }
  if (val instanceof File) {
    if (val.size > 5 * 1024 * 1024) return false;
    if (!val.type.startsWith("image/")) return false;
    return val.size > 0;
  }
  return false;
};

export const ArticleFormSchema = z.object({
  title: z.string().min(3, "عنوان حداقل ۳ کاراکتر است."),
  slug: z
    .string()
    .min(1, "اسلاگ الزامی است.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "اسلاگ فقط شامل حروف کوچک لاتین،اعداد و خط تیره می‌باشد.",
    ),
  excerpt: z.string().min(10, "خلاصه حداقل ۱۰ کاراکتر است."),
  category: z
    .string()
    .min(1, "انتخاب دسته‌بندی الزامی است.")
    .refine((val) => ["care", "health", "styling"].includes(val), {
      message: "دسته‌بندی نامعتبر است.",
    }),
  coverImage: z.any().refine(isValidImage, {
    message: "عکس کارت مقاله الزامی است.",
  }),
  mainImage: z.any().refine(isValidImage, {
    message: "عکس بنر مقاله الزامی است.",
  }),
  content: z.array(z.any()).min(1, "محتوای مقاله نمی‌تواند خالی باشد."),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.string().optional(),
    })
    .optional(),
});

export type ArticleFormData = z.infer<typeof ArticleFormSchema>;