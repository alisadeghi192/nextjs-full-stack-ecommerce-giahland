"use client";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { getAdminUnreadCounts } from "../actions/getAdminUnreadCounts.actions";

export function useAdminNotifications() {
  const { adminTickets, adminContact, adminComments, setUnread } =
    useNotificationStore();

  const refresh = async () => {
    const data = await getAdminUnreadCounts();
    setUnread({
      adminTickets: data.adminTickets,
      adminContact: data.adminContact,
      adminComments: data.adminComments,
    });
  };

  const total = adminTickets + adminContact + adminComments;

  return {
    tickets: adminTickets,
    contact: adminContact,
    comments: adminComments,
    total,
    refresh,
  };
}
