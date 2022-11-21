import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client/actions";
import { ForceUpdateActionProps } from "../ForceUpdate";
import { GlobalActionProps } from "../Global/actions";
import { NewSalesActionProps } from "../NewSales";
import { OnboardingActionProps } from "../Onboarding/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { ProductsActionProps } from "../Products/actions";
import { RiskAssessmentActionProps } from "../RiskAssessment/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund/actions";
import { TransactionsActionProps } from "../Transactions";
import { AcknowledgementActionProps } from "./actions";

export const AcknowledgementMapStateToProps = (state: RootState) => ({
  agreeTerms: state.acknowledgement.agreeTerms,
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  newSales: state.newSales,
  onboarding: state.onboarding,
  forceUpdate: state.forceUpdate,
  orders: state.acknowledgement.orders,
  outsideRisk: state.selectedFund.outsideRisk,
  receipts: state.acknowledgement.receipts,
  personalInfo: state.personalInfo,
  paymentSummary: state.acknowledgement.paymentSummary,
  transactions: state.transactions,
});

export const AcknowledgementMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...AcknowledgementActionProps,
      ...ForceUpdateActionProps,
      ...GlobalActionProps,
      ...NewSalesActionProps,
      ...OnboardingActionProps,
      ...PersonalInfoActionProps,
      ...ClientActionProps,
      ...SelectedFundActionProps,
      ...RiskAssessmentActionProps,
      ...TransactionsActionProps,
      ...ProductsActionProps,
    },
    dispatch,
  );
};

export type AcknowledgementStoreProps = ReturnType<typeof AcknowledgementMapStateToProps> &
  ReturnType<typeof AcknowledgementMapDispatchToProps>;
