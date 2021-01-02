import { OnboardingPaymentAction } from "./actions";
import { onboardingPaymentInitialState, onboardingPaymentState } from "./state";

export function onboardingPaymentReducer(state = onboardingPaymentInitialState, action: OnboardingPaymentAction): onboardingPaymentState {
  switch (action.type) {
    case "onboardingPayment/UPDATE_PAYMENT_SUMMARY":
      return {
        paymentSummary: action.payload,
      };

    case "onboardingPayment/RESET_PAYMENT_SUMMARY":
      return {
        paymentSummary: undefined,
      };

    default:
      return state;
  }
}
