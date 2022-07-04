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

export const updateInvestorSearch = (search: string) => {
  return typedAction("investors/UPDATE_SEARCH", search);
};

export const updateCurrentAccount = (order: IInvestorAccountsData | undefined) => {
  return typedAction("investors/UPDATE_CURRENT_ACCOUNT", order);
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

export const addOrderHistory = (orders: ITransactionsTab) => {
  return typedAction("investors/ADD_ORDER_HISTORY", orders);
};

export const updateOrderHistorySort = (sort: ITransactionsSort[]) => {
  return typedAction("investors/UPDATE_ORDER_HISTORY_SORT", sort);
};

export type InvestorsAction = ReturnType<
  | typeof addOrderHistory
  | typeof resetAllFilter
  | typeof resetInvestors
  | typeof updateAllFilter
  | typeof updateAllSort
  | typeof updateCurrentAccount
  | typeof updateCurrentInvestor
  | typeof updateInvestors
  | typeof updateOrderHistorySort
  | typeof updateInvestorSearch
>;

export const InvestorsActionProps = {
  addOrderHistory,
  resetAllFilter,
  resetInvestors,
  updateAllFilter,
  updateAllSort,
  updateCurrentAccount,
  updateCurrentInvestor,
  updateInvestors,
  updateInvestorSearch,
  updateOrderHistorySort,
};

export type InvestorsActionsType = typeof InvestorsActionProps;
