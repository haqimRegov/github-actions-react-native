import { typedAction } from "../actionCreator";

export const addSelectedFund = (fund: IProduct[]) => {
  return typedAction("selectedFund/ADD_FUND", fund);
};

export const addInvestmentDetails = (details: IProductSales[]) => {
  return typedAction("selectedFund/ADD_INVESTMENT_DETAILS", details);
};

export const resetInvestmentDetails = () => {
  return typedAction("selectedFund/RESET_INVESTMENT_DETAILS");
};

export const addViewFund = (fund: IProduct | undefined) => {
  return typedAction("selectedFund/VIEW_FUND", fund);
};

export const resetViewFund = () => {
  return typedAction("selectedFund/RESET_VIEW_FUND");
};

export const resetSelectedFund = () => {
  return typedAction("selectedFund/RESET_SELECTED_FUND");
};

export type SelectedFundAction = ReturnType<
  | typeof addSelectedFund
  | typeof addInvestmentDetails
  | typeof resetInvestmentDetails
  | typeof resetSelectedFund
  | typeof addViewFund
  | typeof resetViewFund
>;

export const SelectedFundActionProps = {
  addSelectedFund,
  addInvestmentDetails,
  resetInvestmentDetails,
  resetSelectedFund,
  addViewFund,
  resetViewFund,
};

export type SelectedFundActionsType = typeof SelectedFundActionProps;
