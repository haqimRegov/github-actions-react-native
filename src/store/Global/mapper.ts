import { bindActionCreators, Dispatch } from "redux";

import { AcknowledgementActionProps } from "../Acknowledgement";
import { ClientActionProps } from "../Client";
import { EDDActionProps } from "../EDD";
import { ForceUpdateActionProps } from "../ForceUpdate";
import { InvestorsActionProps } from "../Investors";
import { NewSalesActionProps } from "../NewSales";
import { OnboardingActionProps } from "../Onboarding";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { ProductsActionProps } from "../Products";
import { RiskAssessmentActionProps } from "../RiskAssessment";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { TransactionsActionProps } from "../Transactions";
import { GlobalActionProps } from "./actions";

export const GlobalMapStateToProps = (state: RootState) => ({
  agent: state.global.agent,
  config: state.global.config,
  events: state.global.events,
  global: state.global,
  isLoading: state.global.loading,
  unreadMessages: state.global.unreadMessages,
});

export const GlobalMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...AcknowledgementActionProps,
      ...ClientActionProps,
      ...EDDActionProps,
      ...ForceUpdateActionProps,
      ...GlobalActionProps,
      ...InvestorsActionProps,
      ...NewSalesActionProps,
      ...OnboardingActionProps,
      ...PersonalInfoActionProps,
      ...ProductsActionProps,
      ...RiskAssessmentActionProps,
      ...SelectedFundActionProps,
      ...TransactionsActionProps,
    },
    dispatch,
  );
};

export type GlobalStoreProps = ReturnType<typeof GlobalMapStateToProps> & ReturnType<typeof GlobalMapDispatchToProps>;
