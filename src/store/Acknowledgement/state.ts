export type acknowledgementState = {
  orders?: IInvestmentSummary;
  paymentSummary?: IPurchaseSummaryState;
  receipts?: IOnboardingReceiptState[];
};

export const acknowledgementInitialState: acknowledgementState = {
  orders: undefined,
  paymentSummary: undefined,
  receipts: [],
};
