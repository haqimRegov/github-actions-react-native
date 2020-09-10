import { typedAction } from "../actionCreator";

export const addOrders = (orders: IOrderSummary[]) => {
  return typedAction("orders/ADD_ORDERS", orders);
};

export const resetOrders = () => {
  return typedAction("orders/RESET_ORDERS");
};

export type OrderSummaryAction = ReturnType<typeof addOrders | typeof resetOrders>;

export const OrderSummaryActionProps = { addOrders, resetOrders };

export type OrderSummaryActionTypes = typeof OrderSummaryActionProps;
