"use client"
import { toPersianNumber } from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { BsChatDots, BsNewspaper, BsTag } from "react-icons/bs";

interface QuickStatsProps {
  discountedProducts: number;
  articles: number;
  consultations: number;
}

export default function QuickStats({
  discountedProducts,
  articles,
  consultations,
}: QuickStatsProps) {
  const stats = [
    {
      label: "محصولات تخفیف‌دار",
      value: toPersianNumber(discountedProducts)  || 0,
      icon: <BsTag className="size-5 text-white" />,
      color: "bg-rose-500",
    },
    {
      label: "مقالات",
      value:  toPersianNumber(articles)  || 0,
      icon: <BsNewspaper className="size-5 text-white" />,
      color: "bg-emerald-500",
    },
    {
      label: "مشاوره‌های فعال",
      value: toPersianNumber(consultations)  || 0,
      icon: <BsChatDots className="size-5 text-white" />,
      color: "bg-indigo-500",
    },
  ];
  const isSidebarOpen =  useIsSidebarOpen()
  return (
    <div className={`grid grid-cols-3 gap-4 ${isSidebarOpen? "max-lg:grid-cols-1":"max-sm:grid-cols-1"} `}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-neutral3 flex items-center gap-4 rounded-xl border bg-white p-4 max-xs:p-2 shadow-lg"
        >
          <div className={`rounded-xl p-3 ${stat.color}`}>{stat.icon}</div>
          <div className="flex items-center justify-between w-full">
            <p className="text-primary font-medium">{stat.label}</p>
            <p className="text-xl font-bold max-sm:text-base max-sm:font-medium">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
