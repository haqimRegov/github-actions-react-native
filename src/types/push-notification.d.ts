declare interface IPushNotification {
  data: {
    badge?: string;
    [key: string]: unknown;
  };
  messageId?: string;
  notification: { body: string; title: string; [key: string]: unknown };
  [key: string]: unknown;
}
