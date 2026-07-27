import { z } from "zod";

const CareItemSchema = z.object({
  title: z.string().min(1, "عنوان مراقبت الزامی است."),
  description: z.string().min(1, "توضیحات مراقبت الزامی است."),
});

const ProductFeaturesSchema = z.object({
  overview: z.array(z.string()).min(1, "حداقل ۱ مورد برای معرفی وارد کنید."),
  appearance: z
    .array(z.string())
    .min(3, "حداقل ۳ مورد برای ویژگی‌های ظاهری وارد کنید."),
  warnings: z.array(z.string()).min(3, "حداقل ۳ مورد برای هشدارها وارد کنید."),
  propagation: z.array(z.string()).min(3, "حداقل ۳ مورد برای تکثیر وارد کنید."),
  summary: z.array(z.string()).min(1, "حداقل ۱ مورد برای جمع‌بندی وارد کنید."),
});

const ProductCaresSchema = z.object({
  light: z.array(CareItemSchema).length(3, "دقیقاً ۳ مورد برای نور وارد کنید."),
  watering: z
    .array(CareItemSchema)
    .length(3, "دقیقاً ۳ مورد برای آبیاری وارد کنید."),
  soil: z.array(CareItemSchema).length(3, "دقیقاً ۳ مورد برای خاک وارد کنید."),
  temperature: z
    .array(CareItemSchema)
    .length(3, "دقیقاً ۳ مورد برای دما و رطوبت وارد کنید."),
  fertilization: z
    .array(CareItemSchema)
    .length(3, "دقیقاً ۳ مورد برای کوددهی وارد کنید."),
});

const ProductSEOSchema = z.object({
  title: z.string().min(1, "عنوان سئو الزامی است."),
  description: z.string().min(1, "توضیحات سئو الزامی است."),
  keywords: z.string().min(1, "کلمات کلیدی سئو الزامی است."),
});

const toNumber = (val: unknown) => {
  if (val === "" || val === null || val === undefined) {
    return undefined;
  }
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

const isValidImage = (val: unknown): boolean => {
  if (val instanceof File) {
    if (val.size > 5 * 1024 * 1024) {
      return false;
    }
    if (!val.type.startsWith("image/")) {
      return false;
    }
    return val.size > 0;
  }
  if (typeof val === "string") {
    return val.length > 0;
  }
  return false;
};

export const ProductFormSchema = z.object({
  name: z.string().min(3, "نام محصول حداقل ۳ کاراکتر است."),
  slug: z
    .string()
    .min(1, "اسلاگ الزامی است.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "اسلاگ فقط شامل حروف کوچک، اعداد و خط تیره است.",
    ),

  price: z.preprocess(
    toNumber,
    z.number({ message: "قیمت الزامی است." }).min(1, "قیمت باید حداقل ۱ باشد."),
  ),

  discount: z.preprocess(
    toNumber,
    z
      .number({ message: "تخفیف باید یک عدد باشد." })
      .min(0, "تخفیف نمی‌تواند منفی باشد.")
      .max(100, "تخفیف حداکثر ۱۰۰ درصد است."),
  ),

  stock: z.preprocess(
    toNumber,
    z
      .number({ message: "موجودی باید یک عدد باشد." })
      .min(0, "موجودی نمی‌تواند منفی باشد."),
  ),

  category: z
    .string()
    .min(1, "انتخاب دسته‌بندی الزامی است.")
    .refine((val) => ["indoor", "decoration", "gift"].includes(val), {
      message: "دسته‌بندی نامعتبر است.",
    }),

  mainImage: z.any().refine(isValidImage, {
    message: "تصویر اصلی الزامی است.",
  }),
  gallery1: z.any().refine(isValidImage, {
    message: "تصویر گالری ۱ الزامی است.",
  }),
  gallery2: z.any().refine(isValidImage, {
    message: "تصویر گالری ۲ الزامی است.",
  }),
  gallery3: z.any().refine(isValidImage, {
    message: "تصویر گالری ۳ الزامی است.",
  }),

  potMaterial: z.string().min(1, "جنس گلدان الزامی است."),
  soilType: z.string().min(1, "نوع خاک الزامی است."),
  weight: z.preprocess(
    toNumber,
    z
      .number({ message: "وزن الزامی است." })
      .min(1, "وزن باید حداقل ۱ گرم باشد."),
  ),
  sunlight: z.string().min(1, "نور مورد نیاز الزامی است."),

  potDimensions: z.object({
    length: z.preprocess(
      toNumber,
      z
        .number({ message: "طول الزامی است." })
        .min(1, "طول باید حداقل ۱ سانتی‌متر باشد."),
    ),
    width: z.preprocess(
      toNumber,
      z
        .number({ message: "عرض الزامی است." })
        .min(1, "عرض باید حداقل ۱ سانتی‌متر باشد."),
    ),
    height: z.preprocess(
      toNumber,
      z
        .number({ message: "ارتفاع الزامی است." })
        .min(1, "ارتفاع باید حداقل ۱ سانتی‌متر باشد."),
    ),
  }),

  features: ProductFeaturesSchema,
  cares: ProductCaresSchema,
  seo: ProductSEOSchema,
});

export type ProductFormData = z.infer<typeof ProductFormSchema>;

export type ProductFormDefaultValues = Omit<
  ProductFormData,
  "mainImage" | "gallery1" | "gallery2" | "gallery3"
> & {
  mainImage?: string | File | null;
  gallery1?: string | File | null;
  gallery2?: string | File | null;
  gallery3?: string | File | null;
};
