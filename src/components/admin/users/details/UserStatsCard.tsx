"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import { toPersianDate, toPersianNumber, toPersianPrice } from "@/lib/utils/format";

interface UserStatsCardProps {
  stats: {
    ordersCount: number;
    totalSpent: number;
    commentsCount: number;
    lastActivity: Date;
  };
}


export default function UserStatsCard({ stats }: UserStatsCardProps) {
  return (
    <div className="rounded-xl border border-neutral3 dark:border-neutral10 dark:shadow-shade6 dark:bg-shade3 bg-white p-4 shadow-lg">
      <SectionTitle title="آمار" className="mb-4!" />
      <div className="space-y-3 mx-4">
        <div className="flex justify-between border-b border-neutral3 dark:border-neutral8 pb-2">
          <span className="text-neutral9 dark:text-text-dark">تعداد سفارش‌ها</span>
          <span className="font-bold">{toPersianNumber(stats.ordersCount)}</span>
        </div>
        <div className="flex justify-between border-b border-neutral3 dark:border-neutral8 pb-2">
          <span className="text-neutral9 dark:text-text-dark">مجموع خرید</span>
          <span className="font-bold">{toPersianPrice(stats.totalSpent)}</span>
        </div>
        <div className="flex justify-between border-b border-neutral3 dark:border-neutral8 pb-2">
          <span className="text-neutral9 dark:text-text-dark">تعداد کامنت‌ها</span>
          <span className="font-bold">{toPersianNumber(stats.commentsCount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral9 dark:text-text-dark">آخرین فعالیت</span>
          <span className="font-bold">{toPersianDate(new Date(stats.lastActivity))}</span>
        </div>
      </div>
    </div>
  );
}