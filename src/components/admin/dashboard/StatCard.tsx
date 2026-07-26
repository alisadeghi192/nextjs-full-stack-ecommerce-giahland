import React from "react";

interface StatCardProps {
  title: string;
  value: number | string | React.ReactNode;
  icon: React.ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <div className="border-neutral3 rounded-xl border bg-white p-4 max-xs:p-2 shadow-lg transition-all hover:shadow-xl max-xs:flex max-xs:items-center max-xs:justify-between">
      <div className="flex items-center justify-center gap-x-4">
        <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
        <p className="text-primary text-lg font-medium max-sm:text-base">{title}</p>
      </div>
      <div className="mt-2 max-xs:mt-0">
        <p className="text-center text-xl font-bold max-sm:text-base max-sm:font-medium">{value}</p>
      </div>
    </div>
  );
}