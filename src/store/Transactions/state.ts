interface ITransactionState extends ITransactionsDashboard {
  availableFilters: ITransactionsAvailableFilter;
  currentOrder: IDashboardOrder | undefined;
  downloadInitiated: boolean;
  search: string;
  selectedOrders: IDashboardOrder[];
}

export type transactionsState = ITransactionState;

export const transactionsInitialState: transactionsState = {
  approved: {
    filter: {
      dateSorting: "",
      startDate: undefined,
      endDate: new Date(),
      transactionsType: [],
      accountType: [],
      orderStatus: [],
    },
    orders: [],
    page: 1,
    pages: 1,
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
  incomplete: {
    filter: {
      dateSorting: "",
      startDate: undefined,
      endDate: new Date(),
      transactionsType: [],
      accountType: [],
      orderStatus: [],
    },
    orders: [],
    page: 1,
    pages: 1,
    pill: "pending",
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
  rejected: {
    filter: {
      dateSorting: "",
      startDate: undefined,
      endDate: new Date(),
      transactionsType: [],
      accountType: [],
      orderStatus: [],
    },
    orders: [],
    page: 1,
    pages: 1,
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
  availableFilters: {
    transactionType: [],
    agentStatus: [],
    accountType: [],
  },
  downloadInitiated: false,
  selectedOrders: [],
  approvedCount: 0,
  rejectedCount: 0,
  incompleteCount: 0,
  reroutedCount: 0,
  submittedCount: 0,
  pendingCount: 0,
  search: "",
  currentOrder: undefined,
};
