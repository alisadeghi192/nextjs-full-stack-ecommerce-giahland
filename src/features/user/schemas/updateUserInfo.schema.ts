import { z } from "zod";

export const UpdateUserInfoSchema = z.object({
  userId: z.string().min(1, "شناسه کاربر الزامی است"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  specialties: z.string().optional(),
  yearsOfExperience: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), z.number().min(0).optional()),
  consultationFee: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), z.number().min(0).optional()),
});

export type UpdateUserInfoInput = z.infer<typeof UpdateUserInfoSchema>;