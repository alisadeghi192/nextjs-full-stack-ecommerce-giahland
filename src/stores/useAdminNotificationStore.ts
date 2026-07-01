import { create } from "zustand";

interface AdminNotificationState {
  tickets: number;      
  contact: number;     
  total: number;        
  setUnread: (data: Partial<AdminNotificationState>) => void;
}

export const useAdminNotificationStore = create<AdminNotificationState>((set) => ({
  tickets: 0,
  contact: 0,
  total: 0,
  setUnread: (data) => set((state) => ({ ...state, ...data })),
}));