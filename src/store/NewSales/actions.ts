import { typedAction } from "../actionCreator";
import { INewSalesToast, NewSalesState } from "./state";

export const addAccountDetails = (accountDetails: INewSalesAccountDetails) => {
  return typedAction("newSales/ADD_ACCOUNT_DETAILS", accountDetails);
};

export const addRiskInfo = (riskInfo: IRiskProfile) => {
  return typedAction("newSales/ADD_RISK_INFO", riskInfo);
};

export const updateNewSalesDisabledSteps = (steps: TypeNewSalesKey[]) => {
  return typedAction("newSales/UPDATE_DISABLED_STEPS", steps);
};

export const updateNewSalesFinishedSteps = (steps: TypeNewSalesKey[]) => {
  return typedAction("newSales/UPDATE_STEPS", steps);
};

export const updateNewSales = (newSales: NewSalesState) => {
  return typedAction("newSales/UPDATE_NEW_SALES", newSales);
};

export const resetNewSales = () => {
  return typedAction("newSales/RESET_NEW_SALES");
};

export const updateToastVisible = (toggle: boolean) => {
  return typedAction("newSales/UPDATE_TOAST_VISIBLE", toggle);
};

export const updateToast = (toast: INewSalesToast) => {
  return typedAction("newSales/UPDATE_TOAST_TEXT", toast);
};

export const updateTransactionType = (type: TTransactionType) => {
  return typedAction("newSales/UPDATE_TRANSACTION_TYPE", type);
};

export type NewSalesAction = ReturnType<
  | typeof addAccountDetails
  | typeof addRiskInfo
  | typeof resetNewSales
  | typeof updateNewSales
  | typeof updateNewSalesDisabledSteps
  | typeof updateNewSalesFinishedSteps
  | typeof updateToast
  | typeof updateToastVisible
  | typeof updateTransactionType
>;

export const NewSalesActionProps = {
  addAccountDetails,
  addRiskInfo,
  resetNewSales,
  updateNewSales,
  updateNewSalesDisabledSteps,
  updateNewSalesFinishedSteps,
  updateToast,
  updateToastVisible,
  updateTransactionType,
};

export type NewSalesActionsType = typeof NewSalesActionProps;
