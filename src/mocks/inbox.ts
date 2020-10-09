import moment from "moment";

export const SAMPLE_INBOX: INotificationItem[] = [
  {
    id: 1,
    title: "Order Created - O-PI001",
    message:
      "Your Order Number O-RI001 is now Void and we are unable to proceed with this submission. Please continue the account opening in another application. Thank you",
    isRead: false,
    createdAt: moment().subtract(2, "hours").toDate(),
  },
  {
    id: 2,
    title: "Order Created - O-PI002",
    message:
      "Your Order Number O-RI001 is now Void and we are unable to proceed with this submission. Please continue the account opening in another application. Thank you",
    isRead: false,
    createdAt: moment().subtract(2, "hours").toDate(),
  },
  {
    id: 3,
    title: "Order Created - O-PI003",
    message:
      "Your Order Number O-RI001 is now Void and we are unable to proceed with this submission. Please continue the account opening in another application. Thank you",
    isRead: true,
    createdAt: moment().subtract(1, "days").toDate(),
  },
  {
    id: 4,
    title: "Order Created - O-PI004",
    message:
      "Your Order Number O-RI001 is now Void and we are unable to proceed with this submission. Please continue the account opening in another application. Thank you",
    isRead: true,
    createdAt: moment().subtract(2, "days").toDate(),
  },
];
