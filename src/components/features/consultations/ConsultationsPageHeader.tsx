"use client";

import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import { useEffect } from "react";

export default function ConsultationsPageHeader() {
  const { consultation, refresh } = useAllNotifications();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <OutlineButton
      href="/user/consultations/list"
      className="relative h-10 w-37.5 text-center font-medium"
    >
      مشاوره های من
      <NotificationBadge count={consultation} className="-top-2 -right-1" />
    </OutlineButton>
  );
}
