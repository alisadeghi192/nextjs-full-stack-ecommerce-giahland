"use client";

import { toPersianNumber } from "@/lib/utils/format";
import CountUp from "react-countup";

interface AboutStatsItemProps {
  end: number;
  label: string;
}

const AboutStatsItem = ({ end, label }: AboutStatsItemProps) => {
  return (
    <div className="flex h-31.5 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl">
      <span className="text-shade3 text-[32px]/11.25 font-medium">
        <CountUp
          start={0}
          end={end}
          duration={1.5}
          formattingFn={(value) => toPersianNumber(value)}
        />
        +
      </span>
      <span className="text-shade4 leading-7.25">
        {label}
      </span>
    </div>
  );
};

export default AboutStatsItem;
