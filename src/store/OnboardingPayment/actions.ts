import { typedAction } from "../actionCreator";

export const updatePaymentSummary = (summary: IPurchaseSummary) => {
  return typedAction("onboardingPayment/UPDATE_PAYMENT_SUMMARY", summary);
};

export const resetPaymentSummary = () => {
  return typedAction("onboardingPayment/RESET_PAYMENT_SUMMARY");
};

export type OnboardingPaymentAction = ReturnType<typeof updatePaymentSummary | typeof resetPaymentSummary>;

export const OnboardingPaymentActionProps = { updatePaymentSummary, resetPaymentSummary };

export type OnboardingPaymentActionTypes = typeof OnboardingPaymentActionProps;
