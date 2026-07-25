import { ReactNode } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { GrUserSettings } from "react-icons/gr";
import { HiOutlineMail, HiOutlineTicket } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { LuLayoutDashboard, LuNotebookPen } from "react-icons/lu";
import { MdOutlineComment, MdOutlineShoppingCart } from "react-icons/md";
import { PiArticleNyTimesBold } from "react-icons/pi";

export interface PanelLink {
  href: string;
  icon: ReactNode;
  label: string;
  tooltipLabel?: string;
}

export const USER_PANEL_LINKS: PanelLink[] = [
  {
    href: "/user/orders",
    icon: <MdOutlineShoppingCart size={24} />,
    label: "تاریخچه سفارش‌ها",
    tooltipLabel: "سفارش",
  },
  {
    href: "/user/consultations",
    icon: <FaUserDoctor size={24} />,
    label: "مشاوره با گیاه پزشک",
    tooltipLabel: "مشاوره‌ها",
  },
  {
    href: "/user/tickets",
    icon: <HiOutlineTicket size={24} />,
    label: "تیکت‌های پشتیبانی",
    tooltipLabel: "تیکت‌ها",
  },
  {
    href: "/user/wishlist",
    icon: <FcLike size={24} />,
    label: "علاقمندی‌ها",
    tooltipLabel: "علاقمندی",
  },
  {
    href: "/user/profile",
    icon: <ImProfile size={24} />,
    label: "مشخصات کاربری",
    tooltipLabel: "پروفایل",
  },
];

export const DOCTOR_PANEL_LINKS: PanelLink[] = [
  {
    href: "/user/consultations/list",
    icon: <FaUserDoctor size={24} />,
    label: "مشاوره‌های من",
    tooltipLabel: "مشاوره‌ها",
  },
  {
    href: "/user/articles",
    icon: <PiArticleNyTimesBold size={24} />,
    label: "مقاله‌های من",
    tooltipLabel: "مقاله‌ها",
  },
  {
    href: "/user/comments",
    icon: <MdOutlineComment size={24} />,
    label: "کامنت‌ها",
    tooltipLabel: "کامنت‌ها",
  },
  {
    href: "/user/tickets",
    icon: <HiOutlineTicket size={24} />,
    label: "تیکت‌های پشتیبانی",
    tooltipLabel: "تیکت‌ها",
  },
  {
    href: "/user/profile",
    icon: <ImProfile size={24} />,
    label: "مشخصات کاربری",
    tooltipLabel: "پروفایل",
  },
];

export const ADMIN_PANEL_LINKS: PanelLink[] = [
  {
    href: "/admin/dashboard",
    icon: <LuLayoutDashboard size={24} />,
    label: "داشبورد",
    tooltipLabel: "داشبورد",
  },
  {
    href: "/admin/orders",
    icon: <LuNotebookPen size={24} />,
    label: "سفارش‌ها",
    tooltipLabel: "سفارش‌ها",
  },
  {
    href: "/admin/products",
    icon: <MdOutlineShoppingCart size={24} />,
    label: "محصولات",
    tooltipLabel: "محصولات",
  },
  {
    href: "/admin/users",
    icon: <GrUserSettings size={24} />,
    label: "کاربران",
    tooltipLabel: "کاربران",
  },
  {
    href: "/admin/articles",
    icon: <PiArticleNyTimesBold size={24} />,
    label: "مقاله‌ها",
    tooltipLabel: "مقاله‌ها",
  },
  {
    href: "/admin/consultations",
    icon: <FaUserDoctor size={24} />,
    label: "مشاوره‌ها",
    tooltipLabel: "مشاوره‌ها",
  },
  {
    href: "/admin/tickets",
    icon: <HiOutlineTicket size={24} />,
    label: "تیکت‌های پشتیبانی",
    tooltipLabel: "تیکت‌ها",
  },

  {
    href: "/admin/comments",
    icon: <MdOutlineComment size={24} />,
    label: "کامنت‌ها",
    tooltipLabel: "کامنت‌ها",
  },

  {
    href: "/admin/contact-messages",
    icon: <HiOutlineMail size={24} />,
    label: "پیام‌های دریافتی",
    tooltipLabel: "پیام‌ها",
  },

  {
    href: "/admin/profile",
    icon: <ImProfile size={24} />,
    label: "مشخصات کاربری",
    tooltipLabel: "پروفایل",
  },
];
