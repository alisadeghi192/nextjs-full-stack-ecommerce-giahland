"use client"
import { toPersianNumber, toPersianPrice } from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import { BsCurrencyDollar, BsPeople, BsTree, BsTruck } from "react-icons/bs";
import StatCard from "./StatCard";

interface StatsCardsProps {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
  doctorsCount: number;
  totalRevenue: number;
}

export default function StatsCards({
  ordersCount,
  productsCount,
  usersCount,
  doctorsCount,
  totalRevenue,
}: StatsCardsProps) {

  const isSidebarOpen = useIsSidebarOpen()
  return (
    <div className={`grid grid-cols-4 gap-4 ${isSidebarOpen? "max-xl:grid-cols-2":"max-lg:grid-cols-2"}  max-xs:grid-cols-1`}>
      <StatCard
        title="سفارش‌ها"
        value={toPersianNumber(ordersCount)}
        icon={<BsTruck className="size-6 text-white" />}
        color="bg-primary"
      />
      <StatCard
        title="درآمد کل"
        value={toPersianPrice(totalRevenue)}
        icon={<BsCurrencyDollar className="size-6 text-white" />}
        color="bg-amber-500"
      />
      <StatCard
        title="محصولات"
        value={toPersianNumber(productsCount)}
        icon={<BsTree className="size-6 text-white" />}
        color="bg-blue-500"
      />
      <StatCard
        title="کاربران"
        value={`${toPersianNumber(usersCount)} کاربر و ${toPersianNumber(doctorsCount)} پزشک`}
        icon={<BsPeople className="size-6 text-white" />}
        color="bg-purple-500"
      />
    </div>
  );
}
