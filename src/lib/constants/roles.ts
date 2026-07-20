export const roleConfig = {
  admin: { label: "ادمین", className: "bg-green-100 text-green-600" },
  user: { label: "کاربر", className: "bg-gray-100 text-gray-600" },
  "plant-doctor": { label: "پزشک", className: "bg-blue-100 text-blue-500" },
};

export const USER_ROLES = ['admin', 'user', 'plant-doctor'] as const;
export type UserRole = "admin" | "user" | "plant-doctor";