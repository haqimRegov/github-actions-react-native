export type acknowledgementState = {
  orders?: IInvestmentSummary;
};

export const acknowledgementInitialState: acknowledgementState = {
  orders: undefined,
};
