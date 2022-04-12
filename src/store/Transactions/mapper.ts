import { bindActionCreators, Dispatch } from "redux";

import { GlobalActionProps } from "../Global/actions";
import { RootState } from "../rootReducer";
import { TransactionsActionProps } from "./actions";

export const TransactionsMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  approved: state.transactions.approved,
  config: state.global.config,
  currentOrder: state.transactions.currentOrder,
  loading: state.global.loading,
  incomplete: state.transactions.incomplete,
  rejected: state.transactions.rejected,
  search: state.transactions.search,
  selectedOrders: state.transactions.selectedOrders,
  transactions: state.transactions,
  unreadMessages: state.global.unreadMessages,
});

export const TransactionsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...TransactionsActionProps, ...GlobalActionProps }, dispatch);
};

export type TransactionsStoreProps = ReturnType<typeof TransactionsMapStateToProps> & ReturnType<typeof TransactionsMapDispatchToProps>;
