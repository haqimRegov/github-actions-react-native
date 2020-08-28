import { typedAction } from "../actionCreator";

export const addSelectedFund = (fund: IFund[]) => {
  return typedAction("selectedFund/ADD_FUND", fund);
};

export const addInvestmentDetails = (details: IFundSales[]) => {
  return typedAction("selectedFund/ADD_INVESTMENT_DETAILS", details);
};

export const resetInvestmentDetails = () => {
  return typedAction("selectedFund/RESET_INVESTMENT_DETAILS");
};

export const resetSelectedFund = () => {
  return typedAction("selectedFund/RESET_FUND");
};

export type SelectedFundAction = ReturnType<
  typeof addSelectedFund | typeof addInvestmentDetails | typeof resetInvestmentDetails | typeof resetSelectedFund
>;

export const SelectedFundActionProps = { addSelectedFund, addInvestmentDetails, resetInvestmentDetails, resetSelectedFund };

export type SelectedFundActionsType = typeof SelectedFundActionProps;
