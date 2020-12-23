import { typedAction } from "../actionCreator";

export const addOrders = (orders: IOrderSummary[]) => {
  return typedAction("orders/ADD_ORDERS", orders);
};

export const resetOrders = () => {
  return typedAction("orders/RESET_ORDERS");
};

export type AcknowledgementAction = ReturnType<typeof addOrders | typeof resetOrders>;

export const AcknowledgementActionProps = { addOrders, resetOrders };

export type AcknowledgementActionTypes = typeof AcknowledgementActionProps;
