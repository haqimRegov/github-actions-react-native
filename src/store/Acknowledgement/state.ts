import { IOrderSummary } from "../../../types/order-summary";

export type orderSummaryState = {
  orders: IOrderSummary[];
};

export const orderSummaryInitialState: orderSummaryState = {
  orders: [],
};
