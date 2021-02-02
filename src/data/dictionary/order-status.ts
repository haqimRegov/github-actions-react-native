export const DICTIONARY_ORDER_STATUS: IOrderStatus = {
  completed: "Completed",
  pendingDoc: "Pending Doc",
  pendingDocAndPayment: "Pending Doc & Payment",
  pendingHardcopy: "Pending Hardcopy",
  pendingPayment: "Pending Payment",
  rejected: "Rejected",
  reroutedBr: "BR - Rerouted",
  reroutedHq: "HQ - Rerouted",
  submitted: "Submitted",
  void: "Void",
};

export const DICTIONARY_PENDING_STATUS_FILTER: OrderStatusLabelValue[] = [
  { label: "Pending Doc", value: "Pending Doc" },
  { label: "Pending Hardcopy", value: "Pending Hardcopy" },
  { label: "Pending Payment", value: "Pending Payment" },
  { label: "BR - Rerouted", value: "BR - Rerouted" },
  { label: "HQ - Rerouted", value: "HQ - Rerouted" },
  { label: "Submitted", value: "Submitted" },
];

export const DICTIONARY_APPROVED_STATUS_FILTER: OrderStatusLabelValue[] = [{ label: "Completed", value: "Completed" }];

export const DICTIONARY_REJECTED_STATUS_FILTER: OrderStatusLabelValue[] = [
  { label: "Rejected", value: "Rejected" },
  { label: "Void", value: "Void" },
];
