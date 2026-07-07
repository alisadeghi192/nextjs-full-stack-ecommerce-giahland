"use client";

import { useNotificationStore } from "@/stores/useNotificationStore";
import { getDoctorCommentCounts } from "../actions/getDoctorCommentCounts.actions";

export function useDoctorNotifications() {
  const { doctorComments, setUnread } = useNotificationStore();

  const refresh = async () => {
    const data = await getDoctorCommentCounts();
    setUnread({ doctorComments: data.doctorComments });
  };

  return {
    count: doctorComments,
    refresh,
  };
}
