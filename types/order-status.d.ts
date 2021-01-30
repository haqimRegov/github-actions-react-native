declare type OrderStatusKey =
  | "completed"
  | "pendingDoc"
  | "pendingPayment"
  | "pendingDocAndPayment"
  | "pendingHardcopy"
  | "rejected"
  | "reroutedHq"
  | "reroutedBr"
  | "submitted"
  | "void";

declare type OrderStatusType =
  | "Completed"
  | "Pending Doc"
  | "Pending Payment"
  | "Pending Doc & Payment"
  | "Pending Hardcopy"
  | "Submitted"
  | "Rejected"
  | "Void"
  | "HQ - Rerouted"
  | "BR - Rerouted";

declare type OrderStatusLabelValue = Record<OrderStatusKey, OrderStatusType>;
