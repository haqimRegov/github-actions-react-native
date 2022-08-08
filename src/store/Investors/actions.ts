import { typedAction } from "../actionCreator";

export const updateInvestors = (investors: IInvestorsDashboard) => {
  return typedAction("investors/UPDATE_INVESTORS", investors);
};

export const partialResetInvestors = () => {
  return typedAction("investors/PARTIAL_RESET_INVESTORS");
};

export const resetInvestors = () => {
  return typedAction("investors/RESET_INVESTORS");
};

export const resetAllFilter = () => {
  return typedAction("investors/RESET_ALL_FILTER");
};

export const updateInvestorSearch = (search: string) => {
  return typedAction("investors/UPDATE_SEARCH", search);
};

export const updateCurrentAccount = (account: ICurrentAccount | undefined) => {
  return typedAction("investors/UPDATE_CURRENT_ACCOUNT", account);
};

export const updateCurrentInvestor = (order: IInvestorData | undefined) => {
  return typedAction("investors/UPDATE_CURRENT_INVESTOR", order);
};

export const updateAllSort = (sort: IInvestorsSort[]) => {
  return typedAction("investors/UPDATE_ALL_SORT", sort);
};

export const updateAllFilter = (filter: IInvestorsFilter) => {
  return typedAction("investors/UPDATE_ALL_FILTER", filter);
};

export type InvestorsAction = ReturnType<
  | typeof partialResetInvestors
  | typeof resetAllFilter
  | typeof resetInvestors
  | typeof updateAllFilter
  | typeof updateAllSort
  | typeof updateCurrentAccount
  | typeof updateCurrentInvestor
  | typeof updateInvestors
  | typeof updateInvestorSearch
>;

export const InvestorsActionProps = {
  partialResetInvestors,
  resetAllFilter,
  resetInvestors,
  updateAllFilter,
  updateAllSort,
  updateCurrentAccount,
  updateCurrentInvestor,
  updateInvestors,
  updateInvestorSearch,
};

export type InvestorsActionsType = typeof InvestorsActionProps;
