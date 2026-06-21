"use client";

import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import Link from "next/link";
import { useEffect } from "react";

export default function ConsultationsPageHeader() {
  const { consultation, refresh } = useNotifications();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Link
      href="/user/consultations/list"
      className="text-primary border-primary relative flex h-10 w-37.5 items-center justify-center rounded-xl border text-center font-medium"
    >
      مشاوره های من
      <NotificationBadge count={consultation} className="-top-2 -right-1"/>
    </Link>
  );
}
