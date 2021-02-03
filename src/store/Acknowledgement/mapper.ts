import { bindActionCreators, Dispatch } from "redux";

import { ClientActionProps } from "../Client/actions";
import { GlobalActionProps } from "../Global/actions";
import { OnboardingActionProps } from "../Onboarding/actions";
import { PersonalInfoActionProps } from "../PersonalInfo/actions";
import { ProductsActionProps } from "../Products/actions";
import { RiskAssessmentActionProps } from "../RiskAssessment/actions";
import { RootState } from "../rootReducer";
import { SelectedFundActionProps } from "../SelectedFund/actions";
import { AcknowledgementActionProps } from "./actions";

export const AcknowledgementMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  agent: state.global.agent,
  details: state.client.details,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  onboarding: state.onboarding,
  orders: state.acknowledgement.orders,
  outsideRisk: state.selectedFund.outsideRisk,
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
