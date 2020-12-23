import { bindActionCreators, Dispatch } from "redux";

import { OnboardingActionProps } from "../Onboarding";
import { RootState } from "../rootReducer";
import { AcknowledgementActionProps } from "./actions";

export const AcknowledgementMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  finishedSteps: state.onboarding.finishedSteps,
  investmentDetails: state.selectedFund.investmentDetails,
  orders: state.acknowledgement.orders,
  personalInfo: state.personalInfo,
});

export const AcknowledgementMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...AcknowledgementActionProps, ...OnboardingActionProps }, dispatch);
};

export type AcknowledgementStoreProps = ReturnType<typeof AcknowledgementMapStateToProps> &
  ReturnType<typeof AcknowledgementMapDispatchToProps>;
