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

export const updateTransactions = (transactions: transactionsState) => {
  return typedAction("transactions/UPDATE_TRANSACTIONS", transactions);
};

export const viewOrder = (order: string) => {
  return typedAction("transactions/VIEW_ORDER", order);
};

export type TransactionsAction = ReturnType<
  | typeof addApprovedOrders
  | typeof addPendingOrders
  | typeof addRejectedOrders
  | typeof addSelectedOrders
  | typeof resetTransactions
  | typeof viewOrder
>;

export const TransactionsActionProps = {
  addApprovedOrders,
  addPendingOrders,
  addRejectedOrders,
  addSelectedOrders,
  resetTransactions,
  viewOrder,
};

export type TransactionsActionsType = typeof TransactionsActionProps;
