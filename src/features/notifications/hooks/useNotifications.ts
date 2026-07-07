"use client";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { getUnreadCounts } from "../actions/getUnreadCounts.actions";

export function useNotifications() {
  const { consultation, ticket, setUnread } = useNotificationStore();
  
  const refresh = async () => {
    const data = await getUnreadCounts();
    setUnread({ consultation: data.consultation, ticket: data.ticket });
  };
  
  const total = consultation + ticket;
  
  return {
    consultation,
    ticket,
    total,
    refresh,
  };
}