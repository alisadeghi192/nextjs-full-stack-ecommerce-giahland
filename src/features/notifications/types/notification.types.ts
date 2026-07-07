export interface NotificationState {
  consultation: number;
  ticket: number;

  doctorComments: number;

  adminTickets: number;
  adminContact: number;
  adminComments: number;

  setUnread: (data: Partial<NotificationState>) => void;
}

export interface SharedUnreadCounts {
  consultation: number;
  ticket: number;
  total: number;
}

export interface DoctorUnreadCounts {
  doctorComments: number;
}

export interface AdminUnreadCounts {
  adminTickets: number;
  adminContact: number;
  adminComments: number;
  total: number;
}

export interface UnreadCounts {
  consultation?: number;
  ticket?: number;
  doctorComments?: number;
  adminTickets?: number;
  adminContact?: number;
  adminComments?: number;
}
