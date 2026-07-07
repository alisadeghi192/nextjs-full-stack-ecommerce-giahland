"use client";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { getDoctorCommentCounts } from "../actions/getDoctorCommentCounts.actions";
import { getUnreadCounts } from "../actions/getUnreadCounts.actions";

export function useDoctorNotifications() {
  const { consultation, ticket, doctorComments, setUnread } = useNotificationStore();

  const total = consultation + ticket + doctorComments;

  const refresh = async () => {
    const [unreadData, commentData] = await Promise.all([
      getUnreadCounts(),
      getDoctorCommentCounts(),
    ]);

    setUnread({
      consultation: unreadData.consultation,
      ticket: unreadData.ticket,
      doctorComments: commentData.doctorComments,
    });
  };

  return {
    consultation,
    ticket,
    doctorComments,
    total,
    refresh,
  };
}