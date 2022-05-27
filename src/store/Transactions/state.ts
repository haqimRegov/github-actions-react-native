import { DICTIONARY_TRANSACTIONS_DATE, DICTIONARY_TRANSACTIONS_TYPE } from "../../data/dictionary";

interface ITransactionState extends ITransactionsDashboard {
  downloadInitiated: boolean;
  selectedOrders: IDashboardOrder[];
  search: string;
  currentOrder: IDashboardOrder | undefined;
}

export type transactionsState = ITransactionState;

export const transactionsInitialState: transactionsState = {
  approved: {
    filter: {
      dateSorting: DICTIONARY_TRANSACTIONS_DATE[1].value,
      startDate: undefined,
      endDate: new Date(),
      transactionsType: DICTIONARY_TRANSACTIONS_TYPE[0].value,
      accountType: "",
      orderStatus: [],
    },
    orders: [],
    page: 1,
    pages: 1,
    sort: [{ value: "descending", column: "lastUpdated" }],
  },
  incomplete: {
    filter: {
      dateSorting: DICTIONARY_TRANSACTIONS_DATE[1].value,
      startDate: undefined,
      endDate: new Date(),
      transactionsType: DICTIONARY_TRANSACTIONS_TYPE[0].value,
      accountType: "",
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
      dateSorting: DICTIONARY_TRANSACTIONS_DATE[1].value,
      startDate: undefined,
      endDate: new Date(),
      transactionsType: DICTIONARY_TRANSACTIONS_TYPE[0].value,
      accountType: "",
      orderStatus: [],
    },
    orders: [],
    page: 1,
    pages: 1,
    sort: [{ value: "descending", column: "lastUpdated" }],
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
