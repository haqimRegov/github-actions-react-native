import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { EDDActionProps } from "../EDD";
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
  investors: state.investors,
  rejected: state.transactions.rejected,
  search: state.transactions.search,
  selectedOrders: state.transactions.selectedOrders,
  showOpenAccount: state.forceUpdate.showOpenAccount,
  transactions: state.transactions,
  unreadMessages: state.global.unreadMessages,
});

export const TransactionsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...TransactionsActionProps, ...ClientActionProps, ...InvestorsActionProps, ...EDDActionProps, ...GlobalActionProps },
    dispatch,
  );
};

export type TransactionsStoreProps = ReturnType<typeof TransactionsMapStateToProps> & ReturnType<typeof TransactionsMapDispatchToProps>;
