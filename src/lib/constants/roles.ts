export const ROLE_CONFIG = {
  admin: { label: "ادمین", className: "bg-green-200 text-green-600 dark:bg-green-600 dark:text-green-200 transition-colors" },
  user: { label: "کاربر", className: "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200 transition-colors" },
  "plant-doctor": { label: "پزشک", className: "bg-blue-200 text-blue-500 dark:bg-blue-500 dark:text-blue-200 transition-colors" },
};

export const USER_ROLES = ['admin', 'user', 'plant-doctor'] as const;
export type USER_ROLE = "admin" | "user" | "plant-doctor";