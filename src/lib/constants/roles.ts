export const roleConfig = {
  admin: { label: "ادمین", className: "bg-primary/10 text-primary" },
  user: { label: "کاربر", className: "bg-neutral3 text-neutral9" },
  "plant-doctor": { label: "گیاه پزشک", className: "bg-blue-50 text-blue-600" },
};

export const USER_ROLES = ['admin', 'user', 'plant-doctor'] as const;
export type UserRole = "admin" | "user" | "plant-doctor";