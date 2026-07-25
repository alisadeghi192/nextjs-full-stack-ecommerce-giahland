import z from "zod";

const AdminProfileSchema = z.object({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  email: z
    .string()
    .email("ایمیل معتبر نیست")
    .optional()
    .nullable(),
});

export default AdminProfileSchema