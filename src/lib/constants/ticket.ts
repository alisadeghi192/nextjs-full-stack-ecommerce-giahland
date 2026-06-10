export const TICKET_DEPARTMENTS = [
  { value: "support", label: "پشتیبانی" },
  { value: "sales", label: "فروش و سفارشات" },
  { value: "complaint", label: "شکایات" },
  { value: "other", label: "سایر" },
] as const;
export type TicketDepartment = "support" | "sales" | "complaint" | "other";
