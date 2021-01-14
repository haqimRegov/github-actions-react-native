import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client";
import { GlobalActionProps } from "../Global";
import { OnboardingActionProps } from "../Onboarding";
import { PersonalInfoActionProps } from "../PersonalInfo";
import { ProductsActionProps } from "../Products";
import { RiskAssessmentActionProps } from "../RiskAssessment";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund";
import { AcknowledgementActionProps } from "./actions";

export const AcknowledgementMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  onboarding: state.onboarding,
  orders: state.acknowledgement.orders,
  receipts: state.acknowledgement.receipts,
  personalInfo: state.personalInfo,
  paymentSummary: state.acknowledgement.paymentSummary,
});

export const AcknowledgementMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      ...AcknowledgementActionProps,
      ...GlobalActionProps,
      ...OnboardingActionProps,
      ...PersonalInfoActionProps,
      ...ClientActionProps,
      ...SelectedFundActionProps,
      ...RiskAssessmentActionProps,
      ...ProductsActionProps,
    },
    dispatch,
  );
};

export type AcknowledgementStoreProps = ReturnType<typeof AcknowledgementMapStateToProps> &
  ReturnType<typeof AcknowledgementMapDispatchToProps>;
