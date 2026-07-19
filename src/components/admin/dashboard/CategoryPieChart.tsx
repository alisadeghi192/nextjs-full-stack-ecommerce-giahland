"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "آپارتمانی", value: 45 },
  { name: "دکوراتیو", value: 30 },
  { name: "کادویی", value: 25 },
];

const COLORS = ["#2E7D5E", "#E67E22", "#2980B9"];

export default function CategoryPieChart() {
  return (
    <div className="h-full rounded-xl bg-white p-4 shadow-lg">
      <div className="mb-4">
        <SectionTitle title="سهم فروش هر دسته" className="mb-0!"/>
        <h3 className="text-lg font-bold"></h3>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #efefef",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                backgroundColor: "white",
              }}
              formatter={(value, name) => [
                `${value}% `,
                `سهم ${name}`,
              ]}
            />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#333",
              }}
              formatter={(value) => (
                <span style={{ marginRight: "6px" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
