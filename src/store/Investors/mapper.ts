import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { ForceUpdateActionProps } from "../ForceUpdate";
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
  investors: state.investors,
  loading: state.global.loading,
  personalInfo: state.personalInfo,
  search: state.investors.search,
  unreadMessages: state.global.unreadMessages,
});

export const InvestorsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...InvestorsActionProps,
      ...ForceUpdateActionProps,
      ...TransactionsActionProps,
      ...PersonalInfoActionProps,
      ...ClientActionProps,
      ...GlobalActionProps,
    },
    dispatch,
  );
};

export type InvestorsStoreProps = ReturnType<typeof InvestorsMapStateToProps> & ReturnType<typeof InvestorsMapDispatchToProps>;
