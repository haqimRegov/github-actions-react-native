import { DICTIONARY_TRANSACTIONS_DATE, DICTIONARY_TRANSACTIONS_TYPE } from "../../data/dictionary";

interface ITransactionState extends ITransactionsDashboard {
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
    sort: [],
  },
  pending: {
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
    sort: [],
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
    sort: [],
  },
  selectedOrders: [],
  approvedCount: 0,
  rejectedCount: 0,
  pendingCount: 0,
  search: "",
  currentOrder: undefined,
};
