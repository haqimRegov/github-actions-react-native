import { OrderSummaryAction } from "./actions";
import { orderSummaryInitialState, orderSummaryState } from "./state";

export function orderSummaryReducer(state = orderSummaryInitialState, action: OrderSummaryAction): orderSummaryState {
  switch (action.type) {
    case "orders/ADD_ORDERS":
      return {
        orders: action.payload,
      };

    case "orders/RESET_ORDERS":
      return {
        orders: [],
      };

    default:
      return state;
  }
}
