import { typedAction } from "../actionCreator";
import { acknowledgementState } from "./state";

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

export const updateAgree = (acknowledgement: acknowledgementState) => {
  return typedAction("acknowledgement/UPDATE_AGREE", acknowledgement);
};

export const updatePaymentSummary = (summary: IPurchaseSummary) => {
  return typedAction("acknowledgement/UPDATE_PAYMENT_SUMMARY", summary);
};

export const resetPaymentSummary = () => {
  return typedAction("acknowledgement/RESET_PAYMENT_SUMMARY");
};

export const resetAcknowledgement = () => {
  return typedAction("acknowledgement/RESET_ACKNOWLEDGEMENT");
};

export type AcknowledgementAction = ReturnType<
  | typeof addOrders
  | typeof resetOrders
  | typeof updateReceipts
  | typeof resetReceipts
  | typeof updateAgree
  | typeof updatePaymentSummary
  | typeof resetPaymentSummary
  | typeof resetAcknowledgement
>;

export const AcknowledgementActionProps = {
  addOrders,
  updateReceipts,
  resetOrders,
  resetReceipts,
  updateAgree,
  updatePaymentSummary,
  resetPaymentSummary,
  resetAcknowledgement,
};

export type AcknowledgementActionTypes = typeof AcknowledgementActionProps;
