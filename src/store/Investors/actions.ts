import { typedAction } from "../actionCreator";

export const updateInvestors = (investors: IInvestorsDashboard) => {
  return typedAction("investors/UPDATE_INVESTORS", investors);
};

export const resetInvestors = () => {
  return typedAction("investors/RESET_INVESTORS");
};
export const resetAllFilter = () => {
  return typedAction("investors/RESET_ALL_FILTER");
};

export const updateSearch = (search: string) => {
  return typedAction("investors/UPDATE_SEARCH", search);
};

export const updateCurrentInvestor = (order: IInvestorData | undefined) => {
  return typedAction("investors/VIEW_INVESTOR", order);
};

export const updateAllSort = (sort: IInvestorsSort[]) => {
  return typedAction("investors/UPDATE_ALL_SORT", sort);
};

export const updateAllFilter = (filter: IInvestorsFilter) => {
  return typedAction("investors/UPDATE_ALL_FILTER", filter);
};

export type InvestorsAction = ReturnType<
  | typeof updateInvestors
  | typeof resetInvestors
  | typeof resetAllFilter
  | typeof updateSearch
  | typeof updateCurrentInvestor
  | typeof updateAllSort
  | typeof updateAllFilter
>;

export const InvestorsActionProps = {
  updateInvestors,
  resetInvestors,
  resetAllFilter,
  updateSearch,
  updateCurrentInvestor,
  updateAllSort,
  updateAllFilter,
};

export type InvestorsActionsType = typeof InvestorsActionProps;
