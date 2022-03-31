declare interface INotificationItem {
  createdAt: string;
  id: string;
  isRead: boolean;
  isSeen: boolean;
  localIsRead: boolean;
  message: string;
  sender?: string;
  source?: string;
  title: string;
}

declare interface INotificationList {
  date: Date;
  messages: INotificationItem[];
}

declare interface IInbox {
  notifications: INotificationList[];
  newMessageCount: string;
  page: string;
  pages: string;
}
