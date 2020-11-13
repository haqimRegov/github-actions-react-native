export type transactionsState = {
  approved: ITransactionTab;
  pending: ITransactionTab;
  rejected: ITransactionTab;
  selectedOrders: IApplicationHistoryTable[];
  orderCount: IOrderCount;
  viewOrder: string;
};

export const transactionsInitialState: transactionsState = {
  approved: {
    currentPage: 0,
    orders: [],
    totalPages: 0,
  },
  pending: {
    currentPage: 0,
    orders: [],
    totalPages: 0,
  },
  rejected: {
    currentPage: 0,
    orders: [],
    totalPages: 0,
  },
  selectedOrders: [],
  orderCount: {
    approved: 0,
    pending: 0,
    rejected: 0,
  },
  viewOrder: "",
};
