import { typedAction } from "../actionCreator";
import { IEDDState } from "./state";

export const updateCases = (eddState: IEDDState) => {
  return typedAction("edd/UPDATE_CASES", eddState);
};

export const updateNewCasesFilter = (newCaseFilter: IEDDFilter) => {
  return typedAction("edd/UPDATE_NEW_CASES_FILTER", newCaseFilter);
};

export const updateHistoryFilter = (historyFilter: IEDDFilter) => {
  return typedAction("edd/UPDATE_HISTORY_FILTER", historyFilter);
};

export const updateNewCasesSort = (newCaseSort: IEDDDashboardSort[]) => {
  return typedAction("edd/UPDATE_NEW_CASES_SORT", newCaseSort);
};

export const updateHistorySort = (historySort: IEDDDashboardSort[]) => {
  return typedAction("edd/UPDATE_HISTORY_SORT", historySort);
};

export const resetNewCasesFilter = () => {
  return typedAction("edd/RESET_NEW_CASES_FILTER");
};

export const resetHistoryFilter = () => {
  return typedAction("edd/RESET_HISTORY_FILTER");
};

export const updatePill = (pill: EDDNewCaseTagKey) => {
  return typedAction("edd/UPDATE_PILL", pill);
};

export const updateCurrentCase = (currentCase: IEDDDashboardCase) => {
  return typedAction("edd/UPDATE_CURRENT_CASE", currentCase);
};

export const updateSearch = (search: string) => {
  return typedAction("edd/UPDATE_SEARCH", search);
};

export const resetEDD = () => {
  return typedAction("edd/RESET_EDD");
};

export type eddActions = ReturnType<
  | typeof resetHistoryFilter
  | typeof resetNewCasesFilter
  | typeof updateCases
  | typeof updateCurrentCase
  | typeof updateHistoryFilter
  | typeof updateHistorySort
  | typeof updateNewCasesFilter
  | typeof updateNewCasesSort
  | typeof updatePill
  | typeof updateSearch
  | typeof resetEDD
>;

export const EDDActionProps = {
  resetEDD,
  resetHistoryFilter,
  resetNewCasesFilter,
  updateCases,
  updateCurrentCase,
  updateHistoryFilter,
  updateHistorySort,
  updateNewCasesFilter,
  updateNewCasesSort,
  updatePill,
  updateSearch,
};

export type eddActionType = typeof EDDActionProps;
