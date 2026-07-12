"use client";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { getNotifications } from "../actions/getNotifications.actions";

export function useAllNotifications() {
  const {
    consultation,
    ticket,
    doctorComments,
    adminTickets,
    adminContact,
    adminComments,
    setUnread,
  } = useNotificationStore();

  const refresh = async () => {
    const data = await getNotifications();
    setUnread({
      consultation: data.consultation,
      ticket: data.ticket,
      doctorComments: data.doctorComments,
      adminTickets: data.adminTickets,
      adminContact: data.adminContact,
      adminComments: data.adminComments,
    });
  };

  const userTotal = consultation + ticket;
  const doctorTotal = consultation + ticket + doctorComments;
  const adminTotal = adminTickets + adminContact + adminComments;

  return {
    consultation,
    ticket,
    doctorComments,
    adminTickets,
    adminContact,
    adminComments,
    userTotal,
    doctorTotal,
    adminTotal,
    refresh,
  };
}