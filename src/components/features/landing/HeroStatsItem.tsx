"use client";

import { toPersianNumber } from "@/lib/utils/format";
import CountUp from "react-countup";

interface HeroStatsItemProps {
  end: number;
  label: string;
}

const HeroStatsItem = ({ end, label }: HeroStatsItemProps) => {
  return (
    <div className="flex basis-1/3 flex-col gap-y-1 max-md:text-center">
      <span className="text-shade3 dark:text-primary-dark transition-colors text-[32px]/11.25 font-medium max-md:text-2xl/8.5 max-md:font-normal">
        <CountUp
          start={0}
          end={end}
          duration={2.5}
          formattingFn={(value) => toPersianNumber(value)}
        />
        +
      </span>
      <span className="text-shade4 dark:text-primary-dark transition-colors text-xl/8 font-normal max-lg:text-base">
        {label}
      </span>
    </div>
  );
};

export default HeroStatsItem;
