declare interface INotificationItem {
  createdAt: Date;
  id: number | string;
  isRead: boolean;
  message: string;
  title: string;
}

declare interface INotificationList {
  date: Date;
  messages: INotificationItem[];
}
