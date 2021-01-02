export type onboardingPaymentState = {
  paymentSummary?: IPurchaseSummaryState;
};

export const onboardingPaymentInitialState: onboardingPaymentState = {
  paymentSummary: undefined,
};
