"use client";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { getUnreadCounts } from "../actions/getUnreadCounts.actions";

export function useNotifications() {
  const { setUnread, ...state } = useNotificationStore();

  const fetchUnread = async () => {
    const data = await getUnreadCounts();
    setUnread(data);
  };

  return {
    ...state,
    refresh: fetchUnread,
  };
}