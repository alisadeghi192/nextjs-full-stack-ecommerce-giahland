import { create } from "zustand";

interface NotificationState {
  consultation: number;
  ticket: number;
  totalUnread: number;
  setUnread: (data: Partial<NotificationState>) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  consultation: 0,
  ticket: 0,
  totalUnread: 0,
  setUnread: (data) => set((state) => ({ ...state, ...data })),
}));