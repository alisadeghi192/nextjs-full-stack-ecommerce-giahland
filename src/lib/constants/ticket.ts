export const TICKET_DEPARTMENTS = [
  { value: "support", label: "پشتیبانی" },
  { value: "sales", label: "فروش و سفارشات" },
  { value: "complaint", label: "شکایات" },
  { value: "other", label: "سایر" },
] as const;
export type TicketDepartment = "support" | "sales" | "complaint" | "other";

export const TICKET_SORT_OPTIONS = [
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
];

export const TICKET_ROLE_OPTIONS = [
  { value: "", label: "همه نقش‌ها" },
  { value: "user", label: "کاربر" },
  { value: "plant-doctor", label: "پزشک" },
];

export const TICKET_STATUS_OPTIONS = [
  { value: "", label: "همه وضعیت‌ها" },
  { value: "pending", label: "بی پاسخ" },
  { value: "answered", label: "پاسخ داده شده" },
];

export const TICKET_DEPARTMENT_SORT_OPTIONS = [
  { value: "", label: "همه دپارتمان‌ها" },
  { value: "support", label: "پشتیبانی" },
  { value: "sales", label: "فروش و سفارشات" },
  { value: "complaint", label: "شکایات" },
  { value: "other", label: "سایر" },
];
