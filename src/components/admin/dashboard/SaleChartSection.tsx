"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import { toPersianNumber } from "@/lib/utils/format";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "فروردین", value: 185_500_000 },
  { month: "اردیبهشت", value: 172_620_000 },
  { month: "خرداد", value: 95_890_000 },
  { month: "تیر", value: 80_150_000 },
  { month: "مرداد", value: 65_220_000 },
  { month: "شهریور", value: 105_630_000 },
  { month: "مهر", value: 130_500_000 },
  { month: "آبان", value: 128_500_000 },
  { month: "آذر", value: 165_300_000 },
  { month: "دی", value: 82_500_000 },
  { month: "بهمن", value: 40_500_000 },
  { month: "اسفند", value: 180_000_000 },
];

export default function SaleChartSection() {
  return (
    <div className="dark:bg-shade3 dark:shadow-shade6 rounded-xl bg-white p-4 shadow-lg transition-colors">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title=" فروش ماهانه 📈" className="mb-0!" />
        <h3 className="text-lg font-bold"></h3>
        <span className="text-neutral9 dark:text-text-dark text-sm">۱۲ ماه اخیر</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "var(--chart-text)",
                textAnchor: "start",
              }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
              tickMargin={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "var(--chart-text)",
                textAnchor: "start",
                dy: -2,
              }}
              tickFormatter={(value) =>
                `${toPersianNumber(+(value / 1000000).toFixed(0))}` + "میلیون"
              }
              domain={[0, 200000000]}
              ticks={[0, 50000000, 100000000, 150000000, 200000000]}
              tickMargin={0}
            />
            <Tooltip
              cursor={{ stroke: "var(--chart-tooltip-stroke)", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                border: "1px solid var(--chart-tooltip-border)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              itemStyle={{
                color: "var(--chart-tooltip-stroke)"
              }}
              formatter={(value) => [
                toPersianNumber(Number(value) || 0) + " تومان",
                "فروش",
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-line-color)"
              strokeWidth={3}
              dot={{
                fill: "var(--chart-dot-stroke)",
                stroke: "#fff",
                strokeWidth: 2,
                r: 5,
              }}
              activeDot={{
                fill: "var(--chart-dot-stroke)",
                stroke: "#fff",
                strokeWidth: 2,
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
