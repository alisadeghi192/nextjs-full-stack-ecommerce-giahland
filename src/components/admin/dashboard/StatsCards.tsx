"use client";
import { toPersianNumber, toPersianPrice } from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import CountUp from "react-countup";
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
  const isSidebarOpen = useIsSidebarOpen();
  return (
    <div
      className={`grid grid-cols-4 gap-4 ${isSidebarOpen ? "max-xl:grid-cols-2" : "max-lg:grid-cols-2"} max-xs:grid-cols-1`}
    >
      <StatCard
        title="سفارش‌ها"
        value={
          <CountUp
            start={0}
            end={ordersCount}
            duration={2.5}
            formattingFn={(value) => toPersianNumber(value)}
          />
        }
        icon={<BsTruck className="size-6 text-white" />}
        color="bg-primary"
      />
      <StatCard
        title="درآمد کل"
        value={
          <CountUp
            start={0}
            end={totalRevenue}
            duration={2.5}
            formattingFn={(value) => toPersianPrice(value)}
          />
        }
        icon={<BsCurrencyDollar className="size-6 text-white" />}
        color="bg-amber-500"
      />
      <StatCard
        title="محصولات"
        value={
          <CountUp
            start={0}
            end={productsCount}
            duration={2.5}
            formattingFn={(value) => toPersianNumber(value)}
          />
        }
        icon={<BsTree className="size-6 text-white" />}
        color="bg-blue-500"
      />
      <StatCard
        title="کاربران"
        value={
          <>
            <CountUp
              start={0}
              end={usersCount}
              duration={2.5}
              formattingFn={(value) => toPersianNumber(value)}
            />
            {" کاربر و "}
            <CountUp
              start={0}
              end={doctorsCount}
              duration={2.5}
              formattingFn={(value) => toPersianNumber(value)}
            />
            {" پزشک"}
          </>
        }
        icon={<BsPeople className="size-6 text-white" />}
        color="bg-purple-500"
      />
    </div>
  );
}
