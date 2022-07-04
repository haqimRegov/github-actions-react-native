import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { GlobalActionProps } from "../Global/actions";
import { InvestorsActionProps } from "../Investors";
import { RootState } from "../rootReducer";
import { TransactionsActionProps } from "./actions";

export const TransactionsMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  approved: state.transactions.approved,
  availableFilters: state.transactions.availableFilters,
  client: state.client,
  config: state.global.config,
  currentOrder: state.transactions.currentOrder,
  downloadInitiated: state.transactions.downloadInitiated,
  loading: state.global.loading,
  incomplete: state.transactions.incomplete,
  rejected: state.transactions.rejected,
  search: state.transactions.search,
  selectedOrders: state.transactions.selectedOrders,
  transactions: state.transactions,
  unreadMessages: state.global.unreadMessages,
});

export const TransactionsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...TransactionsActionProps, ...ClientActionProps, ...InvestorsActionProps, ...GlobalActionProps }, dispatch);
};

export type TransactionsStoreProps = ReturnType<typeof TransactionsMapStateToProps> & ReturnType<typeof TransactionsMapDispatchToProps>;
