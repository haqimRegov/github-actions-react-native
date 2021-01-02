import { bindActionCreators, Dispatch } from "redux";

import { OnboardingActionProps } from "../Onboarding";
import { RootState } from "../rootReducer";
import { OnboardingPaymentActionProps } from "./actions";

export const OnboardingPaymentMapStateToProps = (state: RootState) => ({
  accountType: state.client.accountType,
  finishedSteps: state.onboarding.finishedSteps,
  details: state.client.details,
  paymentSummary: state.onboardingPayment.paymentSummary,
});

export const OnboardingPaymentMapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({ ...OnboardingPaymentActionProps, ...OnboardingActionProps }, dispatch);
};

export type OnboardingPaymentStoreProps = ReturnType<typeof OnboardingPaymentMapStateToProps> &
  ReturnType<typeof OnboardingPaymentMapDispatchToProps>;
