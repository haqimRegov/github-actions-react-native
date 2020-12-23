export type acknowledgementState = {
  orders: IOrderSummary[];
};

export const acknowledgementInitialState: acknowledgementState = {
  orders: [],
};
