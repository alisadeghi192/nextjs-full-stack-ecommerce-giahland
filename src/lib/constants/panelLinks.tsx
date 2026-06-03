import { ReactNode } from "react";
import { FaRegUser } from "react-icons/fa6";
import { BsHeart, BsTruck } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { MdOutlineLocalPharmacy } from "react-icons/md";

export interface PanelLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export const userLinks: PanelLink[] = [
  { href: "/user", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" },
  { href: "/user/consultations", icon: <MdOutlineLocalPharmacy size={24} />, label: "مشاوره با گیاه پزشک" },
  { href: "/user/tickets", icon: <LuNotebookPen size={24} />, label: "تیکت‌ها" },
  { href: "/user/wishlist", icon: <BsHeart size={24} />, label: "علاقمندی‌ها" },
  { href: "/user/orders", icon: <BsTruck size={24} />, label: "تاریخچه سفارش‌ها" },
];