import { typedAction } from "../actionCreator";
import { transactionsState } from "./state";

export const addApprovedOrders = (orders: ITransactionsDashboard) => {
  return typedAction("transactions/ADD_APPROVED_ORDERS", orders);
};

export const addPendingOrders = (orders: ITransactionsDashboard) => {
  return typedAction("transactions/ADD_PENDING_ORDERS", orders);
};

export const addRejectedOrders = (orders: ITransactionsDashboard) => {
  return typedAction("transactions/ADD_REJECTED_ORDERS", orders);
};

export const addSelectedOrders = (orders: IApplicationHistoryTable[]) => {
  return typedAction("transactions/ADD_SELECTED_ORDERS", orders);
};

export const resetTransactions = () => {
  return typedAction("transactions/RESET_TRANSACTIONS");
};

export const resetApprovedFilter = () => {
  return typedAction("transactions/RESET_APPROVED_FILTER");
};

export const resetRejectedFilter = () => {
  return typedAction("transactions/RESET_REJECTED_FILTER");
};

export const resetPendingFilter = () => {
  return typedAction("transactions/RESET_PENDING_FILTER");
};

export const resetSelectedOrder = () => {
  return typedAction("transactions/RESET_SELECTED_ORDER");
};

export const updatedSelectedOrder = (orders: IDashboardOrder[]) => {
  return typedAction("transactions/UPDATE_SELECTED_ORDER", orders);
};

export const updateTransactions = (transactions: transactionsState) => {
  return typedAction("transactions/UPDATE_TRANSACTIONS", transactions);
};

export const updateSearch = (search: string) => {
  return typedAction("transactions/UPDATE_SEARCH", search);
};

export const updateCurrentOrder = (order: IDashboardOrder | undefined) => {
  return typedAction("transactions/VIEW_ORDER", order);
};

export const updatePendingSort = (sort: ITransactionsSort[]) => {
  return typedAction("transactions/UPDATE_PENDING_SORT", sort);
};

export const updateApprovedSort = (sort: ITransactionsSort[]) => {
  return typedAction("transactions/UPDATE_APPROVED_SORT", sort);
};

export const updateRejectedSort = (sort: ITransactionsSort[]) => {
  return typedAction("transactions/UPDATE_REJECTED_SORT", sort);
};

export const updatePendingFilter = (filter: ITransactionsFilter) => {
  return typedAction("transactions/UPDATE_PENDING_FILTER", filter);
};

export const updateApprovedFilter = (filter: ITransactionsFilter) => {
  return typedAction("transactions/UPDATE_APPROVED_FILTER", filter);
};

export const updateRejectedFilter = (filter: ITransactionsFilter) => {
  return typedAction("transactions/UPDATE_REJECTED_FILTER", filter);
};

export type TransactionsAction = ReturnType<
  | typeof addApprovedOrders
  | typeof addPendingOrders
  | typeof addRejectedOrders
  | typeof addSelectedOrders
  | typeof resetApprovedFilter
  | typeof resetPendingFilter
  | typeof resetRejectedFilter
  | typeof resetSelectedOrder
  | typeof resetTransactions
  | typeof updateApprovedFilter
  | typeof updateApprovedSort
  | typeof updateCurrentOrder
  | typeof updatedSelectedOrder
  | typeof updatePendingFilter
  | typeof updatePendingSort
  | typeof updateRejectedFilter
  | typeof updateRejectedSort
  | typeof updateSearch
  | typeof updateTransactions
>;

export const TransactionsActionProps = {
  addApprovedOrders,
  addPendingOrders,
  addRejectedOrders,
  addSelectedOrders,
  resetApprovedFilter,
  resetPendingFilter,
  resetRejectedFilter,
  resetSelectedOrder,
  resetTransactions,
  updateApprovedFilter,
  updateApprovedSort,
  updateCurrentOrder,
  updatedSelectedOrder,
  updatePendingFilter,
  updatePendingSort,
  updateRejectedFilter,
  updateRejectedSort,
  updateSearch,
  updateTransactions,
};

export type TransactionsActionsType = typeof TransactionsActionProps;
