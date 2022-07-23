import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { ForceUpdateActionProps } from "../ForceUpdate";
import { GlobalActionProps } from "../Global/actions";
import { NewSalesActionProps } from "../NewSales";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { ProductsActionProps } from "../Products";
import { RiskAssessmentActionProps } from "../RiskAssessment";
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
  newSales: state.newSales,
  personalInfo: state.personalInfo,
  riskAssessment: state.riskAssessment,
  search: state.investors.search,
  unreadMessages: state.global.unreadMessages,
});

export const InvestorsMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...InvestorsActionProps,
      ...ClientActionProps,
      ...ForceUpdateActionProps,
      ...GlobalActionProps,
      ...NewSalesActionProps,
      ...PersonalInfoActionProps,
      ...ProductsActionProps,
      ...RiskAssessmentActionProps,
      ...TransactionsActionProps,
    },
    dispatch,
  );
};

export type InvestorsStoreProps = ReturnType<typeof InvestorsMapStateToProps> & ReturnType<typeof InvestorsMapDispatchToProps>;
