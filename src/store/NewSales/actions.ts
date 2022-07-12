import { typedAction } from "../actionCreator";
import { INewSalesToast, NewSalesState } from "./state";

export const addAccountNo = (accountNo: string) => {
  return typedAction("newSales/ADD_ACCOUNT_NO", accountNo);
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

export const resetNewSalesSteps = () => {
  return typedAction("newSales/RESET_STEPS");
};

export const updateToastVisible = (toggle: boolean) => {
  return typedAction("newSales/UPDATE_TOAST_VISIBLE", toggle);
};

export const updateToast = (toast: INewSalesToast) => {
  return typedAction("newSales/UPDATE_TOAST_TEXT", toast);
};

export type NewSalesAction = ReturnType<
  | typeof addAccountNo
  | typeof addRiskInfo
  | typeof resetNewSalesSteps
  | typeof updateNewSales
  | typeof updateNewSalesDisabledSteps
  | typeof updateNewSalesFinishedSteps
  | typeof updateToast
  | typeof updateToastVisible
>;

export const NewSalesActionProps = {
  addAccountNo,
  addRiskInfo,
  resetNewSalesSteps,
  updateNewSales,
  updateNewSalesDisabledSteps,
  updateNewSalesFinishedSteps,
  updateToast,
  updateToastVisible,
};

export type NewSalesActionsType = typeof NewSalesActionProps;
