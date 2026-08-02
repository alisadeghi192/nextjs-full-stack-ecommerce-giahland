"use client";
import { toPersianNumber } from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import CountUp from "react-countup";
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
      value: discountedProducts || 0,
      icon: <BsTag className="size-5 text-white" />,
      color: "bg-rose-500",
    },
    {
      label: "مقالات",
      value: articles || 0,
      icon: <BsNewspaper className="size-5 text-white" />,
      color: "bg-emerald-500",
    },
    {
      label: "مشاوره‌های فعال",
      value: consultations || 0,
      icon: <BsChatDots className="size-5 text-white" />,
      color: "bg-indigo-500",
    },
  ];
  const isSidebarOpen = useIsSidebarOpen();
  return (
    <div
      className={`grid grid-cols-3 gap-4 ${isSidebarOpen ? "max-lg:grid-cols-1" : "max-sm:grid-cols-1"} `}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 transition-colors max-xs:p-2 flex items-center gap-4 rounded-xl border bg-white dark:bg-shade3 p-4 shadow-lg"
        >
          <div className={`rounded-xl p-3 ${stat.color}`}>{stat.icon}</div>
          <div className="flex w-full items-center justify-between">
            <p className="text-primary dark:text-primary-dark transition-colors font-medium">{stat.label}</p>
            <p className="text-xl font-bold max-sm:text-base max-sm:font-medium">
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                formattingFn={(value) => toPersianNumber(value)}
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
