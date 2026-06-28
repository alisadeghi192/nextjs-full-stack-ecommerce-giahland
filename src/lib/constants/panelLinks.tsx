import { ReactNode } from "react";
import { BsHeart, BsTruck } from "react-icons/bs";
import { FaRegUser, FaUserDoctor } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { MdDashboard, MdOutlineArticle, MdOutlineShoppingCart } from "react-icons/md";

export interface PanelLink {
  href: string;
  icon: ReactNode;
  label: string;
  tooltipLabel? : string
}

export const userLinks: PanelLink[] = [
  { href: "/user/profile", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" , tooltipLabel : 'پروفایل' },
  { href: "/user/consultations", icon: <FaUserDoctor  size={24} />, label: "مشاوره با گیاه پزشک" , tooltipLabel : 'مشاوره‌ها'},
  { href: "/user/tickets", icon: <LuNotebookPen size={24} />, label: "تیکت‌ها" , tooltipLabel : 'تیکت‌ها'},
  { href: "/user/wishlist", icon: <BsHeart size={24} />, label: "علاقمندی‌ها" , tooltipLabel : 'علاقمندی'},
  { href: "/user/orders", icon: <BsTruck size={24} />, label: "تاریخچه سفارش‌ها" , tooltipLabel : 'سفارش'},
];

export const plantDoctorLinks: PanelLink[] = [
  { href: "/user/profile", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" , tooltipLabel : 'پروفایل'},
  { href: "/user/articles", icon: <MdOutlineArticle size={24} />, label: "مقالات من" , tooltipLabel : 'مقاله‌ها'},
  { href: "/user/consultations/list", icon: <FaUserDoctor size={24} />, label: "مشاوره‌ها" , tooltipLabel : 'مشاوره‌ها'},
  { href: "/user/tickets", icon: <LuNotebookPen size={24} />, label: "تیکت‌ها" , tooltipLabel : 'تیکت‌ها'},
];

export const adminLinks: PanelLink[] = [
  { href: "/admin/dashboard", icon: <MdDashboard size={24} />, label: "داشبورد", tooltipLabel: "داشبورد" },
  { href: "/admin/profile", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" , tooltipLabel : 'پروفایل'},
  { href: "/admin/articles", icon: <MdOutlineArticle size={24} />, label: "مقالات", tooltipLabel: "مقالات" },
  { href: "/admin/users", icon: <FaRegUser size={24} />, label: "کاربران", tooltipLabel: "کاربران" },
  { href: "/admin/products", icon: <MdOutlineShoppingCart size={24} />, label: "محصولات", tooltipLabel: "محصولات" },
  { href: "/admin/tickets", icon: <LuNotebookPen size={24} />, label: "تیکت‌ها", tooltipLabel: "تیکت‌ها" },
  { href: "/admin/consultations", icon: <FaUserDoctor size={24} />, label: "مشاوره‌ها", tooltipLabel: "مشاوره‌ها" },
];