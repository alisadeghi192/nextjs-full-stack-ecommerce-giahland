import z from "zod";

const CommentSchema = z.object({
  targetType: z.enum(["products", "blog"]),
  targetId: z.string().min(1, "شناسه هدف الزامی است."),
  targetSlug: z.string().min(1, "اسلاگ هدف الزامی است."),
  targetCategory: z.string().min(1, "دسته‌بندی هدف الزامی است."),
  name: z.string().min(2, "نام حداقل ۲ کاراکتر است.").max(50),
  email: z.string().email("ایمیل معتبر نیست.").optional().nullable(),
  text: z.string().min(3, "متن کامنت حداقل ۳ کاراکتر است.").max(1000 , "متن کامنت خیلی طولانیست."),
});

export default CommentSchema