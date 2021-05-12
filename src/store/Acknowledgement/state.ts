export type acknowledgementState = {
  agreeTerms: IAgreeTerms;
  orders?: IInvestmentSummary;
  paymentSummary?: IPurchaseSummaryState;
  receipts?: IOnboardingReceiptState[];
};

export const acknowledgementInitialState: acknowledgementState = {
  agreeTerms: {
    agree1: false,
    agree2: false,
    agree3: false,
  },
  orders: undefined,
  paymentSummary: undefined,
  receipts: [],
};
