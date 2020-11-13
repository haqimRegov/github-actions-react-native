declare type OrderStatusKey =
  | "completed"
  | "edd"
  | "pending"
  | "pendingDoc"
  | "pendingPayment"
  | "rejected"
  | "rejectedBr"
  | "rejectedHq"
  | "submitted"
  | "terminated"
  | "void";

declare type OrderStatusType =
  | "BR-Rejected"
  | "Completed"
  | "EDD"
  | "HQ-Rejected"
  | "Pending Doc"
  | "Pending Payment"
  | "Pending"
  | "Rejected"
  | "Submitted"
  | "Terminated"
  | "Void";

declare type OrderStatusDictionary = Record<OrderStatusKey, OrderStatusType>;
