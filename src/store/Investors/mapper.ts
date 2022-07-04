import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { GlobalActionProps } from "../Global/actions";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { RootState } from "../rootReducer";
import { TransactionsActionProps } from "../Transactions";
import { InvestorsActionProps } from "./actions";

export const InvestorsMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  all: state.investors.all,
  client: state.client,
  config: state.global.config,
  currentAccount: state.investors.currentAccount,
  currentInvestor: state.investors.currentInvestor,
  currentOrder: state.transactions.currentOrder,
  currentOrderHistory: state.investors.currentOrderHistory,
  investors: state.investors,
  loading: state.global.loading,
  orderHistory: state.investors.orderHistory,
  personalInfo: state.personalInfo,
  search: state.investors.search,
  unreadMessages: state.global.unreadMessages,
});

export const InvestorsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    { ...InvestorsActionProps, ...TransactionsActionProps, ...PersonalInfoActionProps, ...ClientActionProps, ...GlobalActionProps },
    dispatch,
  );
};

export type InvestorsStoreProps = ReturnType<typeof InvestorsMapStateToProps> & ReturnType<typeof InvestorsMapDispatchToProps>;
