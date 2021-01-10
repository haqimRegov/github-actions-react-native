import { typedAction } from "../actionCreator";

export const addOrders = (orders: IInvestmentSummary) => {
  return typedAction("acknowledgement/ADD_ORDERS", orders);
};

export const updateReceipts = (receipts: IOnboardingReceiptState[]) => {
  return typedAction("acknowledgement/UPDATE_RECEIPTS", receipts);
};

export const resetOrders = () => {
  return typedAction("acknowledgement/RESET_ORDERS");
};

export const resetReceipts = () => {
  return typedAction("acknowledgement/RESET_RECEIPTS");
};

export const updatePaymentSummary = (summary: IPurchaseSummary) => {
  return typedAction("acknowledgement/UPDATE_PAYMENT_SUMMARY", summary);
};

export const resetPaymentSummary = () => {
  return typedAction("acknowledgement/RESET_PAYMENT_SUMMARY");
};

export type AcknowledgementAction = ReturnType<
  | typeof addOrders
  | typeof resetOrders
  | typeof updateReceipts
  | typeof resetReceipts
  | typeof updatePaymentSummary
  | typeof resetPaymentSummary
>;

export const AcknowledgementActionProps = {
  addOrders,
  updateReceipts,
  resetOrders,
  resetReceipts,
  updatePaymentSummary,
  resetPaymentSummary,
};

export type AcknowledgementActionTypes = typeof AcknowledgementActionProps;
