"use client";

import { toPersianNumber } from "@/lib/utils/format";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export default function NotificationBadge({
  count,
  className = "",
}: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <span
      className={`bg-error absolute flex size-5.5 items-center justify-center rounded-full px-1 text-xs font-medium text-white ${className}`}
    >
      {count > 99 ? "+۹۹" : toPersianNumber(count)}
    </span>
  );
}
