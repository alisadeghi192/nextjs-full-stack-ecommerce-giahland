"use client";

import { useAdminNotificationStore } from "@/stores/useAdminNotificationStore";
import { getAdminUnreadCounts } from "../actions/getAdminUnreadCounts.actions";

export function useAdminNotifications() {
  const { setUnread , ...state } = useAdminNotificationStore();

  const fetchUnread = async () => {
    const data = await getAdminUnreadCounts();
    setUnread(data);
  };

  return {
    ...state,
    refresh : fetchUnread,
  };
}