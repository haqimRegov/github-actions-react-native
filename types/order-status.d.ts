declare type OrderStatusKey =
  | "completed"
  | "pendingDoc"
  | "pendingPayment"
  | "pendingDocAndPayment"
  | "pendingHardcopy"
  | "pendingInitialOrder"
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
  | "Pending Initial Order"
  | "Submitted"
  | "Rejected"
  | "Void"
  | "HQ - Rerouted"
  | "BR - Rerouted";

declare type IOrderStatus = Record<OrderStatusKey, OrderStatusType>;
declare type OrderStatusLabelValue = { label: OrderStatusType; value: OrderStatusType };
