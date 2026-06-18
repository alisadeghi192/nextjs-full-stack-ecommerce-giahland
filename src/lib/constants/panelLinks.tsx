import { ReactNode } from "react";
import { BsHeart, BsTruck } from "react-icons/bs";
import { FaRegUser, FaUserDoctor } from "react-icons/fa6";
import { LuNotebookPen, LuPenTool } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";

export interface PanelLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export const userLinks: PanelLink[] = [
  { href: "/user/profile", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" },
  { href: "/user/consultations", icon: <FaUserDoctor  size={24} />, label: "مشاوره با گیاه پزشک" },
  { href: "/user/tickets", icon: <LuNotebookPen size={24} />, label: "تیکت‌ها" },
  { href: "/user/wishlist", icon: <BsHeart size={24} />, label: "علاقمندی‌ها" },
  { href: "/user/orders", icon: <BsTruck size={24} />, label: "تاریخچه سفارش‌ها" },
];

export const plantDoctorLinks: PanelLink[] = [
  { href: "/user/profile", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" },
  { href: "/user/articles", icon: <MdOutlineArticle size={24} />, label: "مقالات من" },
  { href: "/user/consultations/list", icon: <FaUserDoctor size={24} />, label: "مشاوره‌ها" },
  { href: "/user/tickets", icon: <LuNotebookPen size={24} />, label: "تیکت‌ها" },
  { href: "/user/earnings", icon: <LuPenTool size={24} />, label: "درآمد من" },
];