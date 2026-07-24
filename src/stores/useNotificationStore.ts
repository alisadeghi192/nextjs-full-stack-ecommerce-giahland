import { INotificationState } from "@/features/notifications/types/notification.types";
import { create } from "zustand";

export const useNotificationStore = create<INotificationState>((set) => ({
  consultation: 0,
  ticket: 0,

  doctorComments: 0,
  
  adminTickets: 0,
  adminContact: 0,
  adminComments: 0,
  setUnread: (data) => set((state) => ({ ...state, ...data })),
}));