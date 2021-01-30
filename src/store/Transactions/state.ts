interface ITransactionState extends ITransactionsDashboard {
  selectedOrders: IDashboardOrder[];
  search: string;
  currentOrder: string;
}

export type transactionsState = ITransactionState;

export const transactionsInitialState: transactionsState = {
  approved: {
    orders: [],
    page: 1,
    pages: 1,
    sort: [],
  },
  pending: {
    orders: [],
    page: 1,
    pages: 1,
    sort: [],
  },
  rejected: {
    orders: [],
    page: 1,
    pages: 1,
    sort: [],
  },
  selectedOrders: [],
  approvedCount: 0,
  rejectedCount: 0,
  pendingCount: 0,
  search: "",
  currentOrder: "",
};
