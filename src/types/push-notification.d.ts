declare interface IPushNotification {
  data: {
    badge?: string;
    [key: string]: any;
  };
  messageId?: string;
  notification: { body: string; title: string; [key: string]: any };
  [key: string]: any;
}
