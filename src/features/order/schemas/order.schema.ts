import { z } from "zod";

const UserInfoBaseSchema = z.object({
  firstName: z
    .string()
    .min(1, "نام الزامی است.")
    .max(10, "نام حداکثر ۱۰ کاراکتر است."),
  lastName: z
    .string()
    .min(1, "نام خانوادگی الزامی است.")
    .max(12, "نام خانوادگی حداکثر ۱۲ کاراکتر است."),
  mobile: z
    .string()
    .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)"),
});

export const UserInfoPickupSchema = UserInfoBaseSchema.extend({
  postalCode: z.string().optional(),
  address: z.string().optional(),
});

export const UserInfoCourierSchema = UserInfoBaseSchema.extend({
  postalCode: z
    .string()
    .regex(/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد."),
  address: z
    .string()
    .min(5, "آدرس حداقل ۵ کاراکتر است.")
    .max(200, "آدرس حداکثر ۲۰۰ کاراکتر است."),
});

export const CreateOrderSchema = z.discriminatedUnion("deliveryMethod", [
  z.object({
    deliveryMethod: z.literal("pickup"),
    userInfo: UserInfoPickupSchema,
  }),
  z.object({
    deliveryMethod: z.literal("courier"),
    userInfo: UserInfoCourierSchema,
  }),
]);

export type UserInfoFormData = z.infer<typeof UserInfoPickupSchema>; 
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;