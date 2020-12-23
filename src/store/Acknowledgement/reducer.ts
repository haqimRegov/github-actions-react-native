import { AcknowledgementAction } from "./actions";
import { acknowledgementInitialState, acknowledgementState } from "./state";

export function acknowledgementReducer(state = acknowledgementInitialState, action: AcknowledgementAction): acknowledgementState {
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
