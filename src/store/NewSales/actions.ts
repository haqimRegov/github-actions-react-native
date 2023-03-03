import { typedAction } from "../actionCreator";
import { NewSalesState } from "./state";

export const addAccountDetails = (accountDetails: INewSalesAccountDetails) => {
  return typedAction("newSales/ADD_ACCOUNT_DETAILS", accountDetails);
};

export const addBankDetails = (bankDetails: IGetAllBanksResult) => {
  return typedAction("newSales/ADD_BANK_DETAILS", bankDetails);
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

export const updateToastText = (value: string) => {
  return typedAction("newSales/UPDATE_TOAST_TEXT", value);
};

export const resetNewSalesToast = () => {
  return typedAction("newSales/RESET_TOAST_TEXT");
};

export const updateTransactionType = (type: TTransactionType) => {
  return typedAction("newSales/UPDATE_TRANSACTION_TYPE", type);
};

export type NewSalesAction = ReturnType<
  | typeof addAccountDetails
  | typeof addBankDetails
  | typeof addRiskInfo
  | typeof resetNewSales
  | typeof resetNewSalesToast
  | typeof updateNewSales
  | typeof updateNewSalesDisabledSteps
  | typeof updateNewSalesFinishedSteps
  | typeof updateToastText
  | typeof updateTransactionType
>;

export const NewSalesActionProps = {
  addAccountDetails,
  addBankDetails,
  addRiskInfo,
  resetNewSales,
  resetNewSalesToast,
  updateNewSales,
  updateNewSalesDisabledSteps,
  updateNewSalesFinishedSteps,
  updateToastText,
  updateTransactionType,
};

export type NewSalesActionsType = typeof NewSalesActionProps;
