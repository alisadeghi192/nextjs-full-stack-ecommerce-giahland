export interface INotificationState {
  consultation: number;
  ticket: number;
  doctorComments: number;
  adminTickets: number;
  adminContact: number;
  adminComments: number;

  setUnread: (data: Partial<INotificationState>) => void;
}



export interface IUnreadCounts {
  consultation?: number;
  ticket?: number;
  doctorComments?: number;
  adminTickets?: number;
  adminContact?: number;
  adminComments?: number;
}
