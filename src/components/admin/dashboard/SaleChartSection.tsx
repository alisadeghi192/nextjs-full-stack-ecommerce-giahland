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
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title=" فروش ماهانه 📈" className="mb-0!"/>
        <h3 className="text-lg font-bold"></h3>
        <span className="text-neutral9 text-sm">۱۲ ماه اخیر</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3"  />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#717171", textAnchor:"start"}}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
              tickMargin={12}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#717171", textAnchor:"start", dy:-2}}
              tickFormatter={(value) =>
                `${toPersianNumber(+(value / 1000000).toFixed(0))}` + "میلیون"
              }
              domain={[0, 200000000]}
              ticks={[0, 50000000, 100000000, 150000000, 200000000]}
              tickMargin={0}
            />
            <Tooltip
              cursor={{ stroke: "#417F56", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #efefef",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              formatter={(value) => [
                toPersianNumber(Number(value) || 0) + " تومان",
                "فروش",
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#417F56"
              strokeWidth={3}
              dot={{
                fill: "#417F56",
                stroke: "#fff",
                strokeWidth: 2,
                r: 5,
              }}
              activeDot={{
                fill: "#417F56",
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